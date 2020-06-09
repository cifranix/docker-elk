"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedPrompt = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UnauthorizedPrompt = function UnauthorizedPrompt() {
  return _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "spacesApp",
    iconColor: 'danger',
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.spaces.management.unauthorizedPrompt.permissionDeniedTitle",
      defaultMessage: "Permission denied"
    })),
    body: _react2.default.createElement("p", {
      "data-test-subj": "permissionDeniedMessage"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.spaces.management.unauthorizedPrompt.permissionDeniedDescription",
      defaultMessage: "You do not have permission to manage spaces."
    }))
  });
};

exports.UnauthorizedPrompt = UnauthorizedPrompt;