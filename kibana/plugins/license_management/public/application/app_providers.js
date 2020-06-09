"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProviders = void 0;

var _react = _interopRequireDefault(require("react"));

var history = _interopRequireWildcard(require("history"));

var _reactRedux = require("react-redux");

var _constants = require("../../common/constants");

var _app_context = require("./app_context");

var _store = require("./store");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var AppProviders = function AppProviders(_ref) {
  var appDependencies = _ref.appDependencies,
      children = _ref.children;
  var core = appDependencies.core,
      plugins = appDependencies.plugins,
      services = appDependencies.services,
      initialLicense = appDependencies.store.initialLicense;
  var http = core.http,
      toasts = core.notifications.toasts,
      I18nContext = core.i18n.Context; // Setup Redux store

  var thunkServices = {
    // So we can imperatively control the hash route
    history: history.createHashHistory({
      basename: _constants.BASE_PATH
    }),
    toasts: toasts,
    http: http,
    telemetry: plugins.telemetry,
    licensing: plugins.licensing,
    breadcrumbService: services.breadcrumbService
  };
  var initialState = {
    license: initialLicense
  };
  var store = (0, _store.licenseManagementStore)(initialState, thunkServices);
  return _react.default.createElement(I18nContext, null, _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_app_context.AppContextProvider, {
    value: appDependencies
  }, children)));
};

exports.AppProviders = AppProviders;