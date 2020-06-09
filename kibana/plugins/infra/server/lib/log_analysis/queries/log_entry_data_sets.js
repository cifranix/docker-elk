"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntryDatasetsResponseRT = exports.createLogEntryDatasetsQuery = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _elasticsearch_runtime_types = require("../../../utils/elasticsearch_runtime_types");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createLogEntryDatasetsQuery = (logEntryAnalysisJobId, startTime, endTime, size, afterKey) => ({ ..._common.defaultRequestParameters,
  body: {
    query: {
      bool: {
        filter: [{
          range: {
            timestamp: {
              gte: startTime,
              lt: endTime
            }
          }
        }, {
          term: {
            result_type: {
              value: 'model_plot'
            }
          }
        }]
      }
    },
    aggs: {
      dataset_buckets: {
        composite: {
          after: afterKey,
          size,
          sources: [{
            dataset: {
              terms: {
                field: 'partition_field_value',
                order: 'asc'
              }
            }
          }]
        }
      }
    }
  },
  index: (0, _common.getMlResultIndex)(logEntryAnalysisJobId),
  size: 0
});

exports.createLogEntryDatasetsQuery = createLogEntryDatasetsQuery;
const compositeDatasetKeyRT = rt.type({
  dataset: rt.string
});
const logEntryDatasetBucketRT = rt.type({
  key: compositeDatasetKeyRT
});
const logEntryDatasetsResponseRT = rt.intersection([_elasticsearch_runtime_types.commonSearchSuccessResponseFieldsRT, rt.type({
  aggregations: rt.type({
    dataset_buckets: rt.intersection([rt.type({
      buckets: rt.array(logEntryDatasetBucketRT)
    }), rt.partial({
      after_key: compositeDatasetKeyRT
    })])
  })
})]);
exports.logEntryDatasetsResponseRT = logEntryDatasetsResponseRT;