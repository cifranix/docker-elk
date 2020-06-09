"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithAppDependencies = exports.setupEnvironment = exports.services = void 0;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _xhr = _interopRequireDefault(require("axios/lib/adapters/xhr"));

var _mocks = require("../../../../../../src/core/public/mocks");

var _app_context = require("../../../public/application/app_context");

var _http = require("../../../public/application/services/http");

var _breadcrumbs = require("../../../public/application/services/breadcrumbs");

var _documentation = require("../../../public/application/services/documentation");

var _notification = require("../../../public/application/services/notification");

var _services = require("../../../public/services");

var _ui_metric = require("../../../public/application/services/ui_metric");

var _api = require("../../../public/application/services/api");

var _selectors = require("../../../public/application/store/selectors");

var _http_requests = require("./http_requests");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @kbn/eslint/no-restricted-paths */
const mockHttpClient = _axios.default.create({
  adapter: _xhr.default
});

const services = {
  extensionsService: new _services.ExtensionsService(),
  uiMetricService: new _ui_metric.UiMetricService('index_management')
};
exports.services = services;
services.uiMetricService.setup({
  reportUiStats() {}

});
(0, _selectors.setExtensionsService)(services.extensionsService);
(0, _api.setUiMetricService)(services.uiMetricService);
const appDependencies = {
  services,
  core: {},
  plugins: {}
};

const setupEnvironment = () => {
  // Mock initialization of services
  // @ts-ignore
  _http.httpService.setup(mockHttpClient);

  _breadcrumbs.breadcrumbService.setup(() => undefined);

  _documentation.documentationService.setup(_mocks.docLinksServiceMock.createStartContract());

  _notification.notificationService.setup(_mocks.notificationServiceMock.createSetupContract());

  const {
    server,
    httpRequestsMockHelpers
  } = (0, _http_requests.init)();
  return {
    server,
    httpRequestsMockHelpers
  };
};

exports.setupEnvironment = setupEnvironment;

const WithAppDependencies = Comp => props => _react.default.createElement(_app_context.AppContextProvider, {
  value: appDependencies
}, _react.default.createElement(Comp, props));

exports.WithAppDependencies = WithAppDependencies;