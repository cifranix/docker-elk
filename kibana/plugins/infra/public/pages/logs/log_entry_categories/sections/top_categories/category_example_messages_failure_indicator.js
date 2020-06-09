"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryExampleMessagesFailureIndicator = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CategoryExampleMessagesFailureIndicator = function CategoryExampleMessagesFailureIndicator(_ref) {
  var onRetry = _ref.onRetry;
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "eui-textNoWrap"
  }, _react2.default.createElement(_eui.EuiTextColor, {
    color: "danger"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.logEntryCategories.exampleLoadingFailureDescription",
    defaultMessage: "Failed to load category examples."
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    onClick: onRetry,
    size: "s"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.logEntryCategories.exampleLoadingFailureRetryButtonLabel",
    defaultMessage: "Retry"
  }))));
};

exports.CategoryExampleMessagesFailureIndicator = CategoryExampleMessagesFailureIndicator;