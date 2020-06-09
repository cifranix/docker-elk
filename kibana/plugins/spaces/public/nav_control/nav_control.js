"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSpacesNavControl = initSpacesNavControl;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _nav_control_popover = require("./nav_control_popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initSpacesNavControl(spacesManager, core) {
  var I18nContext = core.i18n.Context;
  core.chrome.navControls.registerLeft({
    order: 1000,
    mount: function mount(targetDomElement) {
      if (core.http.anonymousPaths.isAnonymous(window.location.pathname)) {
        return function () {
          return null;
        };
      }

      _reactDom.default.render(_react.default.createElement(I18nContext, null, _react.default.createElement(_nav_control_popover.NavControlPopover, {
        spacesManager: spacesManager,
        serverBasePath: core.http.basePath.serverBasePath,
        anchorPosition: "downLeft",
        capabilities: core.application.capabilities,
        navigateToApp: core.application.navigateToApp
      })), targetDomElement);

      return function () {
        _reactDom.default.unmountComponentAtNode(targetDomElement);
      };
    }
  });
}