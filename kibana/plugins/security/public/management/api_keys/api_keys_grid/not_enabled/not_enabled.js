"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotEnabled = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotEnabled = function NotEnabled(_ref) {
  var docLinks = _ref.docLinks;
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.apiKeys.table.apiKeysDisabledErrorTitle",
      defaultMessage: "API keys not enabled in Elasticsearch"
    }),
    color: "danger",
    iconType: "alert"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.apiKeys.table.apiKeysDisabledErrorDescription",
    defaultMessage: "Contact your system administrator and refer to the {link} to enable API keys.",
    values: {
      link: _react.default.createElement(_eui.EuiLink, {
        href: "".concat(docLinks.getApiKeyServiceSettingsDocUrl()),
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.apiKeys.table.apiKeysDisabledErrorLinkText",
        defaultMessage: "docs"
      }))
    }
  }));
};

exports.NotEnabled = NotEnabled;