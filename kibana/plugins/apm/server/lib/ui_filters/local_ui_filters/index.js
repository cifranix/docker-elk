"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalUIFilters = getLocalUIFilters;

var _lodash = require("lodash");

var _get_local_filter_query = require("./get_local_filter_query");

var _config = require("./config");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getLocalUIFilters({
  setup,
  projection,
  uiFilters,
  localFilterNames
}) {
  const {
    client,
    dynamicIndexPattern
  } = setup;
  const projectionWithoutAggs = (0, _lodash.cloneDeep)(projection);
  delete projectionWithoutAggs.body.aggs;
  return Promise.all(localFilterNames.map(async name => {
    var _response$aggregation;

    const query = (0, _get_local_filter_query.getLocalFilterQuery)({
      indexPattern: dynamicIndexPattern,
      uiFilters,
      projection,
      localUIFilterName: name
    });
    const response = await client.search(query);
    const filter = _config.localUIFilters[name];
    return { ...filter,
      options: (0, _lodash.sortByOrder)(((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.by_terms.buckets.map(bucket => {
        return {
          name: bucket.key,
          count: 'bucket_count' in bucket ? bucket.bucket_count.value : bucket.doc_count
        };
      })) || [], 'count', 'desc')
    };
  }));
}