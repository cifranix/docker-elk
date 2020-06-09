"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInventoryMeta = useInventoryMeta;

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _react = require("react");

var _runtime_types = require("../../../common/runtime_types");

var _use_http_request = require("../../hooks/use_http_request");

var _inventory_meta_api = require("../../../common/http_api/inventory_meta_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function useInventoryMeta(sourceId, nodeType) {
  var decodeResponse = function decodeResponse(response) {
    return (0, _pipeable.pipe)(_inventory_meta_api.InventoryMetaResponseRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity));
  };

  var _useHTTPRequest = (0, _use_http_request.useHTTPRequest)('/api/infra/inventory/meta', 'POST', JSON.stringify({
    sourceId: sourceId,
    nodeType: nodeType
  }), decodeResponse),
      error = _useHTTPRequest.error,
      loading = _useHTTPRequest.loading,
      response = _useHTTPRequest.response,
      makeRequest = _useHTTPRequest.makeRequest;

  (0, _react.useEffect)(function () {
    makeRequest();
  }, [makeRequest]);
  return {
    error: error,
    loading: loading,
    accounts: response ? response.accounts : [],
    regions: response ? response.regions : [],
    makeRequest: makeRequest
  };
}