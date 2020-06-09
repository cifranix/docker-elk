"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PermissionDenied = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PermissionDenied = function PermissionDenied() {
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "none"
  }, _react2.default.createElement(_eui.EuiPageContent, {
    horizontalPosition: "center"
  }, _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "securityApp",
    title: _react2.default.createElement("h2", {
      "data-test-subj": "apiKeysPermissionDeniedMessage"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.apiKeys.deniedPermissionTitle",
      defaultMessage: "You need permission to manage API keys"
    })),
    body: _react2.default.createElement("p", {
      "data-test-subj": "permissionDeniedMessage"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.apiKeys.noPermissionToManageRolesDescription",
      defaultMessage: "Contact your system administrator."
    }))
  })));
};

exports.PermissionDenied = PermissionDenied;