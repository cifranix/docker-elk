"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProviders = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../common/constants");

var _authorization = require("./lib/authorization");

var _app_context = require("./app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AppProviders = function AppProviders(_ref) {
  var appDependencies = _ref.appDependencies,
      children = _ref.children;
  var core = appDependencies.core;
  var I18nContext = core.i18n.Context;
  return _react.default.createElement(_authorization.AuthorizationProvider, {
    privilegesEndpoint: "".concat(_constants.API_BASE_PATH, "privileges")
  }, _react.default.createElement(I18nContext, null, _react.default.createElement(_app_context.AppContextProvider, {
    value: appDependencies
  }, children)));
};

exports.AppProviders = AppProviders;