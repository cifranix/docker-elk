"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anomalySeriesFetcher = anomalySeriesFetcher;

var _ml_job_constants = require("../../../../../common/ml_job_constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function anomalySeriesFetcher({
  serviceName,
  transactionType,
  intervalString,
  mlBucketSize,
  setup
}) {
  const {
    client,
    start,
    end
  } = setup; // move the start back with one bucket size, to ensure to get anomaly data in the beginning
  // this is required because ML has a minimum bucket size (default is 900s) so if our buckets are smaller, we might have several null buckets in the beginning

  const newStart = start - mlBucketSize * 1000;
  const params = {
    index: (0, _ml_job_constants.getMlIndex)(serviceName, transactionType),
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            exists: {
              field: 'bucket_span'
            }
          }, {
            range: {
              timestamp: {
                gte: newStart,
                lte: end,
                format: 'epoch_millis'
              }
            }
          }]
        }
      },
      aggs: {
        ml_avg_response_times: {
          date_histogram: {
            field: 'timestamp',
            fixed_interval: intervalString,
            min_doc_count: 0,
            extended_bounds: {
              min: newStart,
              max: end
            }
          },
          aggs: {
            anomaly_score: {
              max: {
                field: 'anomaly_score'
              }
            },
            lower: {
              min: {
                field: 'model_lower'
              }
            },
            upper: {
              max: {
                field: 'model_upper'
              }
            }
          }
        }
      }
    }
  };

  try {
    const response = await client.search(params);
    return response;
  } catch (err) {
    const isHttpError = 'statusCode' in err;

    if (isHttpError) {
      return;
    }

    throw err;
  }
}