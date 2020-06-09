"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTransformListButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RefreshTransformListButton = function RefreshTransformListButton(_ref) {
  var onClick = _ref.onClick,
      isLoading = _ref.isLoading;
  return _react.default.createElement(_eui.EuiButton, {
    color: "secondary",
    iconType: "refresh",
    "data-test-subj": "transformRefreshTransformListButton",
    onClick: onClick,
    isLoading: isLoading
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformList.refreshButtonLabel",
    defaultMessage: "Reload"
  }));
};

exports.RefreshTransformListButton = RefreshTransformListButton;