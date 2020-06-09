"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimHitsTotal = shimHitsTotal;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Temporary workaround until https://github.com/elastic/kibana/issues/26356 is addressed.
 * Since we are setting `track_total_hits` in the request, `hits.total` will be an object
 * containing the `value`.
 */
function shimHitsTotal(response) {
  var _ref, _ref2, _response$hits, _response$hits2;

  const total = (_ref = (_ref2 = (_response$hits = response.hits) === null || _response$hits === void 0 ? void 0 : _response$hits.total) === null || _ref2 === void 0 ? void 0 : _ref2.value) !== null && _ref !== void 0 ? _ref : (_response$hits2 = response.hits) === null || _response$hits2 === void 0 ? void 0 : _response$hits2.total;
  const hits = { ...response.hits,
    total
  };
  return { ...response,
    hits
  };
}