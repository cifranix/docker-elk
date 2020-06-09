"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecatedBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _optional_tooltip = require("./optional_tooltip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DeprecatedBadge = function DeprecatedBadge(props) {
  return _react.default.createElement(_optional_tooltip.OptionalToolTip, {
    tooltipContent: props.tooltipContent
  }, _react.default.createElement(_eui.EuiBadge, {
    "data-test-subj": props['data-test-subj'],
    color: "warning"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.deprecatedBadge",
    defaultMessage: "Deprecated"
  })));
};

exports.DeprecatedBadge = DeprecatedBadge;