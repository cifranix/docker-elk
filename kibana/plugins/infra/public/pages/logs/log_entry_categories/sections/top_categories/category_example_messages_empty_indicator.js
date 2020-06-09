"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryExampleMessagesEmptyIndicator = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CategoryExampleMessagesEmptyIndicator = function CategoryExampleMessagesEmptyIndicator(_ref) {
  var onReload = _ref.onReload;
  return _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "eui-textNoWrap"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.logEntryCategories.exampleEmptyDescription",
    defaultMessage: "No examples found within the selected time range. Increase the log entry retention period to improve message sample availability."
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    onClick: onReload,
    size: "s"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.logEntryCategories.exampleEmptyReloadButtonLabel",
    defaultMessage: "Reload"
  }))));
};

exports.CategoryExampleMessagesEmptyIndicator = CategoryExampleMessagesEmptyIndicator;