"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _constants = require("../../common/constants");

var _components = require("./components");

var _constants2 = require("./constants");

var _authorization = require("./lib/authorization");

var _clone_transform = require("./sections/clone_transform");

var _create_transform = require("./sections/create_transform");

var _transform_management = require("./sections/transform_management");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var App = function App() {
  var _useContext = (0, _react.useContext)(_authorization.AuthorizationContext),
      apiError = _useContext.apiError;

  if (apiError !== null) {
    return _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.transform.app.checkingPrivilegesErrorMessage",
        defaultMessage: "Error fetching user privileges from the server."
      }),
      error: apiError
    });
  }

  return _react.default.createElement("div", {
    "data-test-subj": "transformApp"
  }, _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(_constants2.CLIENT_BASE_PATH).concat(_constants2.SECTION_SLUG.CLONE_TRANSFORM, "/:transformId"),
    component: _clone_transform.CloneTransformSection
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(_constants2.CLIENT_BASE_PATH).concat(_constants2.SECTION_SLUG.CREATE_TRANSFORM, "/:savedObjectId"),
    component: _create_transform.CreateTransformSection
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: _constants2.CLIENT_BASE_PATH + _constants2.SECTION_SLUG.HOME,
    component: _transform_management.TransformManagementSection
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    from: _constants2.CLIENT_BASE_PATH,
    to: _constants2.CLIENT_BASE_PATH + _constants2.SECTION_SLUG.HOME
  }))));
};

exports.App = App;

var renderApp = function renderApp(element, appDependencies) {
  var I18nContext = appDependencies.i18n.Context;
  (0, _reactDom.render)(_react.default.createElement(_public.KibanaContextProvider, {
    services: appDependencies
  }, _react.default.createElement(_authorization.AuthorizationProvider, {
    privilegesEndpoint: "".concat(_constants.API_BASE_PATH, "privileges")
  }, _react.default.createElement(I18nContext, null, _react.default.createElement(App, null)))), element);
  return function () {
    (0, _reactDom.unmountComponentAtNode)(element);
  };
};

exports.renderApp = renderApp;