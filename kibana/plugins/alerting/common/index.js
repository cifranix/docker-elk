"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BASE_ALERT_API_PATH: true
};
exports.BASE_ALERT_API_PATH = void 0;

var _alert = require("./alert");

Object.keys(_alert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert[key];
    }
  });
});

var _alert_type = require("./alert_type");

Object.keys(_alert_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert_type[key];
    }
  });
});

var _alert_instance = require("./alert_instance");

Object.keys(_alert_instance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert_instance[key];
    }
  });
});

var _alert_task_instance = require("./alert_task_instance");

Object.keys(_alert_task_instance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert_task_instance[key];
    }
  });
});

var _alert_navigation = require("./alert_navigation");

Object.keys(_alert_navigation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _alert_navigation[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const BASE_ALERT_API_PATH = '/api/alert';
exports.BASE_ALERT_API_PATH = BASE_ALERT_API_PATH;