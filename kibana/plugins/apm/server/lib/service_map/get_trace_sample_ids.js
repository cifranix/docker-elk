"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraceSampleIds = getTraceSampleIds;

var _lodash = require("lodash");

var _range_filter = require("../helpers/range_filter");

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MAX_TRACES_TO_INSPECT = 1000;

async function getTraceSampleIds({
  serviceName,
  environment,
  setup
}) {
  var _tracesSampleResponse;

  const {
    start,
    end,
    client,
    indices,
    config
  } = setup;
  const rangeQuery = {
    range: (0, _range_filter.rangeFilter)(start, end)
  };
  const query = {
    bool: {
      filter: [{
        term: {
          [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'span'
        }
      }, {
        exists: {
          field: _elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE
        }
      }, rangeQuery]
    }
  };

  if (serviceName) {
    query.bool.filter.push({
      term: {
        [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
      }
    });
  }

  if (environment) {
    query.bool.filter.push({
      term: {
        [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: environment
      }
    });
  }

  const fingerprintBucketSize = serviceName ? config['xpack.apm.serviceMapFingerprintBucketSize'] : config['xpack.apm.serviceMapFingerprintGlobalBucketSize'];
  const traceIdBucketSize = serviceName ? config['xpack.apm.serviceMapTraceIdBucketSize'] : config['xpack.apm.serviceMapTraceIdGlobalBucketSize'];
  const samplerShardSize = traceIdBucketSize * 10;
  const params = {
    index: [indices['apm_oss.spanIndices']],
    body: {
      size: 0,
      query,
      aggs: {
        connections: {
          composite: {
            sources: [{
              [_elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE]: {
                terms: {
                  field: _elasticsearch_fieldnames.SPAN_DESTINATION_SERVICE_RESOURCE
                }
              }
            }, {
              [_elasticsearch_fieldnames.SERVICE_NAME]: {
                terms: {
                  field: _elasticsearch_fieldnames.SERVICE_NAME
                }
              }
            }, {
              [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: {
                terms: {
                  field: _elasticsearch_fieldnames.SERVICE_ENVIRONMENT,
                  missing_bucket: true
                }
              }
            }],
            size: fingerprintBucketSize
          },
          aggs: {
            sample: {
              sampler: {
                shard_size: samplerShardSize
              },
              aggs: {
                trace_ids: {
                  terms: {
                    field: _elasticsearch_fieldnames.TRACE_ID,
                    size: traceIdBucketSize,
                    execution_hint: 'map',
                    // remove bias towards large traces by sorting on trace.id
                    // which will be random-esque
                    order: {
                      _key: 'desc'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const tracesSampleResponse = await client.search(params); // make sure at least one trace per composite/connection bucket
  // is queried

  const traceIdsWithPriority = ((_tracesSampleResponse = tracesSampleResponse.aggregations) === null || _tracesSampleResponse === void 0 ? void 0 : _tracesSampleResponse.connections.buckets.flatMap(bucket => bucket.sample.trace_ids.buckets.map((sampleDocBucket, index) => ({
    traceId: sampleDocBucket.key,
    priority: index
  })))) || [];
  const traceIds = (0, _lodash.take)((0, _lodash.uniq)((0, _lodash.sortBy)(traceIdsWithPriority, 'priority').map(({
    traceId
  }) => traceId)), MAX_TRACES_TO_INSPECT);
  return {
    traceIds
  };
}