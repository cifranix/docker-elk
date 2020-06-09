"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.getFullPath = getFullPath;
exports.sendPost = sendPost;
exports.sendGet = sendGet;
exports.sendPut = sendPut;
exports.sendDelete = sendDelete;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _httpClient;

function init(httpClient) {
  _httpClient = httpClient;
}

function getFullPath(path) {
  if (path) {
    return "".concat(_constants.API_BASE_PATH, "/").concat(path);
  }

  return _constants.API_BASE_PATH;
}

function sendPost(path, payload) {
  return _httpClient.post(getFullPath(path), {
    body: JSON.stringify(payload)
  });
}

function sendGet(path) {
  return _httpClient.get(getFullPath(path));
}

function sendPut(path, payload) {
  return _httpClient.put(getFullPath(path), {
    body: JSON.stringify(payload)
  });
}

function sendDelete(path) {
  return _httpClient.delete(getFullPath(path));
}