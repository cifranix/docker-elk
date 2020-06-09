"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topLogEntryCategoriesResponseRT = exports.logEntryCategoryBucketRT = exports.createTopLogEntryCategoriesQuery = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _elasticsearch_runtime_types = require("../../../utils/elasticsearch_runtime_types");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createTopLogEntryCategoriesQuery = (logEntryCategoriesJobId, startTime, endTime, size, datasets, sortDirection = 'desc') => ({ ..._common.defaultRequestParameters,
  body: {
    query: {
      bool: {
        filter: [...(0, _common.createTimeRangeFilters)(startTime, endTime), ...createDatasetsFilters(datasets), {
          bool: {
            should: [{
              bool: {
                filter: [...(0, _common.createResultTypeFilters)('model_plot'), {
                  range: {
                    actual: {
                      gt: 0
                    }
                  }
                }]
              }
            }, {
              bool: {
                filter: (0, _common.createResultTypeFilters)('record')
              }
            }],
            minimum_should_match: 1
          }
        }]
      }
    },
    aggs: {
      terms_category_id: {
        terms: {
          field: 'by_field_value',
          size,
          order: {
            'filter_model_plot>sum_actual': sortDirection
          }
        },
        aggs: {
          filter_model_plot: {
            filter: {
              term: {
                result_type: 'model_plot'
              }
            },
            aggs: {
              sum_actual: {
                sum: {
                  field: 'actual'
                }
              },
              terms_dataset: {
                terms: {
                  field: 'partition_field_value',
                  size: 1000
                }
              }
            }
          },
          filter_record: {
            filter: {
              term: {
                result_type: 'record'
              }
            },
            aggs: {
              maximum_record_score: {
                max: {
                  field: 'record_score'
                }
              },
              terms_dataset: {
                terms: {
                  field: 'partition_field_value',
                  size: 1000
                },
                aggs: {
                  maximum_record_score: {
                    max: {
                      field: 'record_score'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  index: (0, _common.getMlResultIndex)(logEntryCategoriesJobId),
  size: 0
});

exports.createTopLogEntryCategoriesQuery = createTopLogEntryCategoriesQuery;

const createDatasetsFilters = datasets => datasets.length > 0 ? [{
  terms: {
    partition_field_value: datasets
  }
}] : [];

const metricAggregationRT = rt.type({
  value: rt.union([rt.number, rt.null])
});
const logEntryCategoryBucketRT = rt.type({
  key: rt.string,
  doc_count: rt.number,
  filter_record: rt.type({
    maximum_record_score: metricAggregationRT,
    terms_dataset: rt.type({
      buckets: rt.array(rt.type({
        key: rt.string,
        doc_count: rt.number,
        maximum_record_score: metricAggregationRT
      }))
    })
  }),
  filter_model_plot: rt.type({
    sum_actual: metricAggregationRT,
    terms_dataset: rt.type({
      buckets: rt.array(rt.type({
        key: rt.string,
        doc_count: rt.number
      }))
    })
  })
});
exports.logEntryCategoryBucketRT = logEntryCategoryBucketRT;
const topLogEntryCategoriesResponseRT = rt.intersection([_elasticsearch_runtime_types.commonSearchSuccessResponseFieldsRT, rt.type({
  aggregations: rt.type({
    terms_category_id: rt.type({
      buckets: rt.array(logEntryCategoryBucketRT)
    })
  })
})]);
exports.topLogEntryCategoriesResponseRT = topLogEntryCategoriesResponseRT;