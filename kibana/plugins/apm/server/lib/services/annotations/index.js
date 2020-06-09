"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceAnnotations = getServiceAnnotations;

var _lodash = require("lodash");

var _annotations = require("../../../../common/annotations");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceAnnotations({
  setup,
  serviceName,
  environment
}) {
  var _ref, _aggregations;

  const {
    start,
    end,
    client,
    indices
  } = setup;
  const filter = [{
    term: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }, {
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }];

  if (environment) {
    filter.push({
      term: {
        [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: environment
      }
    });
  }

  const versions = (_ref = (_aggregations = (await client.search({
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 0,
      track_total_hits: false,
      query: {
        bool: {
          filter
        }
      },
      aggs: {
        versions: {
          terms: {
            field: _elasticsearch_fieldnames.SERVICE_VERSION
          }
        }
      }
    }
  })).aggregations) === null || _aggregations === void 0 ? void 0 : _aggregations.versions.buckets.map(bucket => bucket.key)) !== null && _ref !== void 0 ? _ref : [];

  if (versions.length > 1) {
    const annotations = await Promise.all(versions.map(async version => {
      var _response$aggregation;

      const response = await client.search({
        index: indices['apm_oss.transactionIndices'],
        body: {
          size: 0,
          query: {
            bool: {
              filter: filter.filter(esFilter => !Object.keys(esFilter).includes('range')).concat({
                term: {
                  [_elasticsearch_fieldnames.SERVICE_VERSION]: version
                }
              })
            }
          },
          aggs: {
            first_seen: {
              min: {
                field: '@timestamp'
              }
            }
          },
          track_total_hits: false
        }
      });
      const firstSeen = (_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.first_seen.value;

      if (!(0, _lodash.isNumber)(firstSeen)) {
        throw new Error('First seen for version was unexpectedly undefined or null.');
      }

      if (firstSeen < start || firstSeen > end) {
        return null;
      }

      return {
        type: _annotations.AnnotationType.VERSION,
        id: version,
        time: firstSeen,
        text: version
      };
    }));
    return {
      annotations: annotations.filter(Boolean)
    };
  }

  return {
    annotations: []
  };
}