"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppWithoutRouter = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _constants = require("../../common/constants");

var _home = require("./sections/home");

var _template_create = require("./sections/template_create");

var _template_clone = require("./sections/template_clone");

var _template_edit = require("./sections/template_edit");

var _app_context = require("./app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var App = function App() {
  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  (0, _react.useEffect)(function () {
    return uiMetricService.trackMetric('loaded', _constants.UIM_APP_LOAD);
  }, [uiMetricService]);
  return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(AppWithoutRouter, null));
}; // Export this so we can test it with a different router.


exports.App = App;

var AppWithoutRouter = function AppWithoutRouter() {
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "create_template"),
    component: _template_create.TemplateCreate
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "clone_template/:name*"),
    component: _template_clone.TemplateClone
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "edit_template/:name*"),
    component: _template_edit.TemplateEdit
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(_constants.BASE_PATH, ":section(indices|templates)"),
    component: _home.IndexManagementHome
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    from: "".concat(_constants.BASE_PATH),
    to: "".concat(_constants.BASE_PATH, "indices")
  }));
};

exports.AppWithoutRouter = AppWithoutRouter;