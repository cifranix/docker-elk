"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = exports.sendRequest = void 0;

var _shared_imports = require("../../shared_imports");

var _http = require("./http");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var sendRequest = function sendRequest(config) {
  return (0, _shared_imports.sendRequest)(_http.httpService.httpClient, config);
};

exports.sendRequest = sendRequest;

var useRequest = function useRequest(config) {
  return (0, _shared_imports.useRequest)(_http.httpService.httpClient, config);
};

exports.useRequest = useRequest;