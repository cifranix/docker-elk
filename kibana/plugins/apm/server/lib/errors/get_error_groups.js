"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorGroups = getErrorGroups;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _errors = require("../../../common/projections/errors");

var _merge_projection = require("../../../common/projections/util/merge_projection");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getErrorGroups({
  serviceName,
  sortField,
  sortDirection = 'desc',
  setup
}) {
  var _resp$aggregations;

  const {
    client
  } = setup; // sort buckets by last occurrence of error

  const sortByLatestOccurrence = sortField === 'latestOccurrenceAt';
  const projection = (0, _errors.getErrorGroupsProjection)({
    setup,
    serviceName
  });
  const order = sortByLatestOccurrence ? {
    max_timestamp: sortDirection
  } : {
    _count: sortDirection
  };
  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      size: 0,
      aggs: {
        error_groups: {
          terms: { ...projection.body.aggs.error_groups.terms,
            size: 500,
            order
          },
          aggs: {
            sample: {
              top_hits: {
                _source: [_elasticsearch_fieldnames.ERROR_LOG_MESSAGE, _elasticsearch_fieldnames.ERROR_EXC_MESSAGE, _elasticsearch_fieldnames.ERROR_EXC_HANDLED, _elasticsearch_fieldnames.ERROR_CULPRIT, _elasticsearch_fieldnames.ERROR_GROUP_ID, '@timestamp'],
                sort: [{
                  '@timestamp': 'desc'
                }],
                size: 1
              }
            },
            ...(sortByLatestOccurrence ? {
              max_timestamp: {
                max: {
                  field: '@timestamp'
                }
              }
            } : {})
          }
        }
      }
    }
  });
  const resp = await client.search(params); // aggregations can be undefined when no matching indices are found.
  // this is an exception rather than the rule so the ES type does not account for this.

  const hits = (((_resp$aggregations = resp.aggregations) === null || _resp$aggregations === void 0 ? void 0 : _resp$aggregations.error_groups.buckets) || []).map(bucket => {
    var _source$error$log, _source$error$excepti, _source$error$excepti2, _source$error$excepti3;

    const source = bucket.sample.hits.hits[0]._source;
    const message = ((_source$error$log = source.error.log) === null || _source$error$log === void 0 ? void 0 : _source$error$log.message) || ((_source$error$excepti = source.error.exception) === null || _source$error$excepti === void 0 ? void 0 : (_source$error$excepti2 = _source$error$excepti[0]) === null || _source$error$excepti2 === void 0 ? void 0 : _source$error$excepti2.message);
    return {
      message,
      occurrenceCount: bucket.doc_count,
      culprit: source.error.culprit,
      groupId: source.error.grouping_key,
      latestOccurrenceAt: source['@timestamp'],
      handled: (_source$error$excepti3 = source.error.exception) === null || _source$error$excepti3 === void 0 ? void 0 : _source$error$excepti3[0].handled
    };
  });
  return hits;
}