"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuckets = getBuckets;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getBuckets({
  serviceName,
  groupId,
  bucketSize,
  setup
}) {
  var _resp$aggregations;

  const {
    start,
    end,
    uiFiltersES,
    client,
    indices
  } = setup;
  const filter = [{
    term: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
    }
  }, {
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }, ...uiFiltersES];

  if (groupId) {
    filter.push({
      term: {
        [_elasticsearch_fieldnames.ERROR_GROUP_ID]: groupId
      }
    });
  }

  const params = {
    index: indices['apm_oss.errorIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter
        }
      },
      aggs: {
        distribution: {
          histogram: {
            field: '@timestamp',
            min_doc_count: 0,
            interval: bucketSize,
            extended_bounds: {
              min: start,
              max: end
            }
          }
        }
      }
    }
  };
  const resp = await client.search(params);
  const buckets = (((_resp$aggregations = resp.aggregations) === null || _resp$aggregations === void 0 ? void 0 : _resp$aggregations.distribution.buckets) || []).map(bucket => ({
    key: bucket.key,
    count: bucket.doc_count
  }));
  return {
    noHits: resp.hits.total.value === 0,
    buckets
  };
}