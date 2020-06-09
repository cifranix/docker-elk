"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatasetForField = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getDatasetForField = async (framework, requestContext, field, indexPattern) => {
  var _response$hits$hits, _response$hits$hits$;

  const params = {
    allowNoIndices: true,
    ignoreUnavailable: true,
    terminateAfter: 1,
    index: indexPattern,
    body: {
      query: {
        exists: {
          field
        }
      },
      size: 1,
      _source: ['event.dataset']
    }
  };
  const response = await framework.callWithRequest(requestContext, 'search', params);

  if (response.hits.total.value === 0) {
    return null;
  }

  return (_response$hits$hits = response.hits.hits) === null || _response$hits$hits === void 0 ? void 0 : (_response$hits$hits$ = _response$hits$hits[0]._source.event) === null || _response$hits$hits$ === void 0 ? void 0 : _response$hits$hits$.dataset;
};

exports.getDatasetForField = getDatasetForField;