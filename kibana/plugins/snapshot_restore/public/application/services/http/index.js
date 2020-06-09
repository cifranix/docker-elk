"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  setUiMetricService: true,
  HttpService: true,
  httpService: true
};
Object.defineProperty(exports, "HttpService", {
  enumerable: true,
  get: function get() {
    return _http.HttpService;
  }
});
Object.defineProperty(exports, "httpService", {
  enumerable: true,
  get: function get() {
    return _http.httpService;
  }
});
exports.setUiMetricService = void 0;

var _policy_requests = require("./policy_requests");

Object.keys(_policy_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _policy_requests[key];
    }
  });
});

var _repository_requests = require("./repository_requests");

Object.keys(_repository_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _repository_requests[key];
    }
  });
});

var _restore_requests = require("./restore_requests");

Object.keys(_restore_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _restore_requests[key];
    }
  });
});

var _snapshot_requests = require("./snapshot_requests");

Object.keys(_snapshot_requests).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _snapshot_requests[key];
    }
  });
});

var _http = require("./http");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var setUiMetricService = function setUiMetricService(uiMetricService) {
  (0, _policy_requests.setUiMetricServicePolicy)(uiMetricService);
  (0, _repository_requests.setUiMetricServiceRepository)(uiMetricService);
  (0, _restore_requests.setUiMetricServiceRestore)(uiMetricService);
  (0, _snapshot_requests.setUiMetricServiceSnapshot)(uiMetricService);
};

exports.setUiMetricService = setUiMetricService;