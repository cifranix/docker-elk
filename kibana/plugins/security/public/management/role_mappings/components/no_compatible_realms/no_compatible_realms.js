"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoCompatibleRealms = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoCompatibleRealms = function NoCompatibleRealms(_ref) {
  var docLinks = _ref.docLinks;
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.roleMappings.noCompatibleRealmsErrorTitle",
      defaultMessage: "No compatible realms are enabled in Elasticsearch"
    }),
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.roleMappings.noCompatibleRealmsErrorDescription",
    defaultMessage: "Role mappings will not be applied to any users. Contact your system administrator and refer to the {link} for more information.",
    values: {
      link: _react.default.createElement(_eui.EuiLink, {
        href: docLinks.getRoleMappingDocUrl(),
        external: true,
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roleMappings.noCompatibleRealmsErrorLinkText",
        defaultMessage: "docs"
      }))
    }
  }));
};

exports.NoCompatibleRealms = NoCompatibleRealms;