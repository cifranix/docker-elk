"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNodeDetails = useNodeDetails;

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _runtime_types = require("../../../common/runtime_types");

var _use_http_request = require("../../hooks/use_http_request");

var _node_details_api = require("../../../common/http_api/node_details_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useNodeDetails(metrics, nodeId, nodeType, sourceId, timerange, cloudId) {
  var decodeResponse = function decodeResponse(response) {
    return (0, _pipeable.pipe)(_node_details_api.NodeDetailsMetricDataResponseRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity));
  };

  var _useHTTPRequest = (0, _use_http_request.useHTTPRequest)('/api/metrics/node_details', 'POST', JSON.stringify({
    metrics: metrics,
    nodeId: nodeId,
    nodeType: nodeType,
    timerange: timerange,
    cloudId: cloudId,
    sourceId: sourceId
  }), decodeResponse),
      error = _useHTTPRequest.error,
      loading = _useHTTPRequest.loading,
      response = _useHTTPRequest.response,
      makeRequest = _useHTTPRequest.makeRequest;

  return {
    error: error,
    loading: loading,
    metrics: response ? response.metrics : [],
    makeRequest: makeRequest
  };
}