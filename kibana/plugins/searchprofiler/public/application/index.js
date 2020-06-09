"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;

var _react = _interopRequireDefault(require("react"));

var _containers = require("./containers");

var _app_context = require("./contexts/app_context");

var _profiler_context = require("./contexts/profiler_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function App(_ref) {
  var I18nContext = _ref.I18nContext,
      initialLicenseStatus = _ref.initialLicenseStatus,
      notifications = _ref.notifications,
      http = _ref.http;
  return _react.default.createElement(I18nContext, null, _react.default.createElement(_app_context.AppContextProvider, {
    args: {
      initialLicenseStatus: initialLicenseStatus,
      notifications: notifications,
      http: http
    }
  }, _react.default.createElement(_profiler_context.ProfileContextProvider, null, _react.default.createElement(_containers.Main, null))));
}