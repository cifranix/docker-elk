"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMlBucketSize = getMlBucketSize;

var _ml_job_constants = require("../../../../../common/ml_job_constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getMlBucketSize({
  serviceName,
  transactionType,
  setup
}) {
  const {
    client,
    start,
    end
  } = setup;
  const params = {
    index: (0, _ml_job_constants.getMlIndex)(serviceName, transactionType),
    body: {
      _source: 'bucket_span',
      size: 1,
      query: {
        bool: {
          filter: [{
            exists: {
              field: 'bucket_span'
            }
          }, {
            range: {
              timestamp: {
                gte: start,
                lte: end,
                format: 'epoch_millis'
              }
            }
          }]
        }
      }
    }
  };

  try {
    var _resp$hits$hits$;

    const resp = await client.search(params);
    return ((_resp$hits$hits$ = resp.hits.hits[0]) === null || _resp$hits$hits$ === void 0 ? void 0 : _resp$hits$hits$._source.bucket_span) || 0;
  } catch (err) {
    const isHttpError = 'statusCode' in err;

    if (isHttpError) {
      return 0;
    }

    throw err;
  }
}