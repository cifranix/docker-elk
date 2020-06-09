"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPartitionFieldsValuesFactory = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _index_patterns = require("../../../common/constants/index_patterns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PARTITION_FIELDS = ['partition_field', 'over_field', 'by_field'];

/**
 * Gets an object for aggregation query to retrieve field name and values.
 * @param fieldType - Field type
 * @param query - Optional query string for partition value
 * @returns {Object}
 */
function getFieldAgg(fieldType, query) {
  const AGG_SIZE = 100;
  const fieldNameKey = `${fieldType}_name`;
  const fieldValueKey = `${fieldType}_value`;
  return {
    [fieldNameKey]: {
      terms: {
        field: fieldNameKey
      }
    },
    [fieldValueKey]: {
      filter: {
        wildcard: {
          [fieldValueKey]: {
            value: query ? `*${query}*` : '*'
          }
        }
      },
      aggs: {
        values: {
          terms: {
            size: AGG_SIZE,
            field: fieldValueKey
          }
        }
      }
    }
  };
}
/**
 * Gets formatted result for particular field from aggregation response.
 * @param fieldType - Field type
 * @param aggs - Aggregation response
 */


function getFieldObject(fieldType, aggs) {
  const fieldNameKey = `${fieldType}_name`;
  const fieldValueKey = `${fieldType}_value`;
  return aggs[fieldNameKey].buckets.length > 0 ? {
    [fieldType]: {
      name: aggs[fieldNameKey].buckets[0].key,
      values: aggs[fieldValueKey].values.buckets.map(({
        key
      }) => key)
    }
  } : {};
}

const getPartitionFieldsValuesFactory = callWithRequest =>
/**
 * Gets the record of partition fields with possible values that fit the provided queries.
 * @param jobId - Job ID
 * @param searchTerm - object of queries for partition fields, e.g. { partition_field: 'query' }
 * @param criteriaFields - key - value pairs of the term field, e.g. { detector_index: 0 }
 * @param earliestMs
 * @param latestMs
 */
async function getPartitionFieldsValues(jobId, searchTerm = {}, criteriaFields, earliestMs, latestMs) {
  var _job$model_plot_confi;

  const jobsResponse = await callWithRequest('ml.jobs', {
    jobId: [jobId]
  });

  if (jobsResponse.count === 0 || jobsResponse.jobs === undefined) {
    throw _boom.default.notFound(`Job with the id "${jobId}" not found`);
  }

  const job = jobsResponse.jobs[0];
  const isModelPlotEnabled = job === null || job === void 0 ? void 0 : (_job$model_plot_confi = job.model_plot_config) === null || _job$model_plot_confi === void 0 ? void 0 : _job$model_plot_confi.enabled;
  const resp = await callWithRequest('search', {
    index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    size: 0,
    body: {
      query: {
        bool: {
          filter: [...criteriaFields.map(({
            fieldName,
            fieldValue
          }) => {
            return {
              term: {
                [fieldName]: fieldValue
              }
            };
          }), {
            term: {
              job_id: jobId
            }
          }, {
            range: {
              timestamp: {
                gte: earliestMs,
                lte: latestMs,
                format: 'epoch_millis'
              }
            }
          }, {
            term: {
              result_type: isModelPlotEnabled ? 'model_plot' : 'record'
            }
          }]
        }
      },
      aggs: { ...PARTITION_FIELDS.reduce((acc, key) => {
          return { ...acc,
            ...getFieldAgg(key, searchTerm[key])
          };
        }, {})
      }
    }
  });
  return PARTITION_FIELDS.reduce((acc, key) => {
    return { ...acc,
      ...getFieldObject(key, resp.aggregations)
    };
  }, {});
};

exports.getPartitionFieldsValuesFactory = getPartitionFieldsValuesFactory;