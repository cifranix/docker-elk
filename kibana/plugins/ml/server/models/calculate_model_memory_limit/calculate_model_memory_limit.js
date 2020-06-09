"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateModelMemoryLimitProvider = calculateModelMemoryLimitProvider;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _field_types = require("../../../common/constants/field_types");

var _fields_service = require("../fields_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Retrieves overall and max bucket cardinalities.
 */
const cardinalityCheckProvider = callAsCurrentUser => {
  const fieldsService = (0, _fields_service.fieldsServiceProvider)(callAsCurrentUser);
  return async (analysisConfig, indexPattern, query, timeFieldName, earliestMs, latestMs) => {
    /**
     * Fields not involved in cardinality check
     */
    const excludedKeywords = new Set(
    /**
     * The keyword which is used to mean the output of categorization,
     * so it will have cardinality zero in the actual input data.
     */
    _field_types.MLCATEGORY);
    const {
      detectors,
      influencers,
      bucket_span: bucketSpan
    } = analysisConfig;
    let overallCardinality = {};
    let maxBucketCardinality = {}; // Get fields required for the model memory estimation

    const overallCardinalityFields = detectors.reduce((acc, {
      by_field_name: byFieldName,
      partition_field_name: partitionFieldName,
      over_field_name: overFieldName
    }) => {
      [byFieldName, partitionFieldName, overFieldName].filter(field => field !== undefined && field !== '' && !excludedKeywords.has(field)).forEach(key => {
        acc.add(key);
      });
      return acc;
    }, new Set());
    const maxBucketFieldCardinalities = influencers.filter(influencerField => !!influencerField && !excludedKeywords.has(influencerField) && !overallCardinalityFields.has(influencerField));

    if (overallCardinalityFields.size > 0) {
      overallCardinality = await fieldsService.getCardinalityOfFields(indexPattern, [...overallCardinalityFields], query, timeFieldName, earliestMs, latestMs);
    }

    if (maxBucketFieldCardinalities.length > 0) {
      maxBucketCardinality = await fieldsService.getMaxBucketCardinalities(indexPattern, maxBucketFieldCardinalities, query, timeFieldName, earliestMs, latestMs, bucketSpan);
    }

    return {
      overallCardinality,
      maxBucketCardinality
    };
  };
};

function calculateModelMemoryLimitProvider(callAsCurrentUser) {
  const getCardinalities = cardinalityCheckProvider(callAsCurrentUser);
  /**
   * Retrieves an estimated size of the model memory limit used in the job config
   * based on the cardinality of the fields being used to split the data
   * and influencers.
   */

  return async function calculateModelMemoryLimit(analysisConfig, indexPattern, query, timeFieldName, earliestMs, latestMs, allowMMLGreaterThanMax = false) {
    let maxModelMemoryLimit;

    try {
      var _resp$limits;

      const resp = await callAsCurrentUser('ml.info');

      if ((resp === null || resp === void 0 ? void 0 : (_resp$limits = resp.limits) === null || _resp$limits === void 0 ? void 0 : _resp$limits.max_model_memory_limit) !== undefined) {
        maxModelMemoryLimit = resp.limits.max_model_memory_limit.toUpperCase();
      }
    } catch (e) {
      throw new Error('Unable to retrieve max model memory limit');
    }

    const {
      overallCardinality,
      maxBucketCardinality
    } = await getCardinalities(analysisConfig, indexPattern, query, timeFieldName, earliestMs, latestMs);
    const estimatedModelMemoryLimit = (await callAsCurrentUser('ml.estimateModelMemory', {
      body: {
        analysis_config: analysisConfig,
        overall_cardinality: overallCardinality,
        max_bucket_cardinality: maxBucketCardinality
      }
    })).model_memory_estimate.toUpperCase();
    let modelMemoryLimit = estimatedModelMemoryLimit; // if max_model_memory_limit has been set,
    // make sure the estimated value is not greater than it.

    if (!allowMMLGreaterThanMax && maxModelMemoryLimit !== undefined) {
      // @ts-ignore
      const maxBytes = (0, _numeral.default)(maxModelMemoryLimit).value(); // @ts-ignore

      const mmlBytes = (0, _numeral.default)(estimatedModelMemoryLimit).value();

      if (mmlBytes > maxBytes) {
        // @ts-ignore
        modelMemoryLimit = `${Math.floor(maxBytes / (0, _numeral.default)('1MB').value())}MB`;
      }
    }

    return {
      estimatedModelMemoryLimit,
      modelMemoryLimit,
      ...(maxModelMemoryLimit ? {
        maxModelMemoryLimit
      } : {})
    };
  };
}