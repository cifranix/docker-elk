"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resultsServiceRoutes = resultsServiceRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _results_service_schema = require("./schemas/results_service_schema");

var _results_service = require("../models/results_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAnomaliesTableData(context, payload) {
  const rs = (0, _results_service.resultsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    jobIds,
    criteriaFields,
    influencers,
    aggregationInterval,
    threshold,
    earliestMs,
    latestMs,
    dateFormatTz,
    maxRecords,
    maxExamples,
    influencersFilterQuery
  } = payload;
  return rs.getAnomaliesTableData(jobIds, criteriaFields, influencers, aggregationInterval, threshold, earliestMs, latestMs, dateFormatTz, maxRecords, maxExamples, influencersFilterQuery);
}

function getCategoryDefinition(context, payload) {
  const rs = (0, _results_service.resultsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  return rs.getCategoryDefinition(payload.jobId, payload.categoryId);
}

function getCategoryExamples(context, payload) {
  const rs = (0, _results_service.resultsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    jobId,
    categoryIds,
    maxExamples
  } = payload;
  return rs.getCategoryExamples(jobId, categoryIds, maxExamples);
}

function getMaxAnomalyScore(context, payload) {
  const rs = (0, _results_service.resultsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    jobIds,
    earliestMs,
    latestMs
  } = payload;
  return rs.getMaxAnomalyScore(jobIds, earliestMs, latestMs);
}

function getPartitionFieldsValues(context, payload) {
  const rs = (0, _results_service.resultsServiceProvider)(context.ml.mlClient.callAsCurrentUser);
  const {
    jobId,
    searchTerm,
    criteriaFields,
    earliestMs,
    latestMs
  } = payload;
  return rs.getPartitionFieldsValues(jobId, searchTerm, criteriaFields, earliestMs, latestMs);
}
/**
 * Routes for results service
 */


function resultsServiceRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup ResultsService
   *
   * @api {post} /api/ml/results/anomalies_table_data Prepare anomalies records for table display
   * @apiName GetAnomaliesTableData
   * @apiDescription Retrieves anomaly records for an anomaly detection job and formats them for anomalies table display
   */
  router.post({
    path: '/api/ml/results/anomalies_table_data',
    validate: {
      body: _configSchema.schema.object(_results_service_schema.anomaliesTableDataSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getAnomaliesTableData(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup ResultsService
   *
   * @api {post} /api/ml/results/category_definition Returns category definition
   * @apiName GetCategoryDefinition
   * @apiDescription Returns the definition of the category with the specified ID and job ID
   */

  router.post({
    path: '/api/ml/results/category_definition',
    validate: {
      body: _configSchema.schema.object(_results_service_schema.categoryDefinitionSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getCategoryDefinition(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup ResultsService
   *
   * @api {post} /api/ml/results/max_anomaly_score Returns the maximum anomaly_score
   * @apiName GetMaxAnomalyScore
   * @apiDescription Returns the maximum anomaly score of the bucket results for the request job ID(s) and time range
   */

  router.post({
    path: '/api/ml/results/max_anomaly_score',
    validate: {
      body: _configSchema.schema.object(_results_service_schema.maxAnomalyScoreSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getMaxAnomalyScore(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup ResultsService
   *
   * @api {post} /api/ml/results/category_examples Returns category examples
   * @apiName GetCategoryExamples
   * @apiDescription Returns examples for the categories with the specified IDs from the job with the supplied ID
   */

  router.post({
    path: '/api/ml/results/category_examples',
    validate: {
      body: _configSchema.schema.object(_results_service_schema.categoryExamplesSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getCategoryExamples(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup ResultsService
   *
   * @api {post} /api/ml/results/partition_fields_values Returns partition fields values
   * @apiName GetPartitionFieldsValues
   * @apiDescription Returns the partition fields with values that match the provided criteria for the specified job ID.
   */

  router.post({
    path: '/api/ml/results/partition_fields_values',
    validate: {
      body: _configSchema.schema.object(_results_service_schema.partitionFieldValuesSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await getPartitionFieldsValues(context, request.body);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}