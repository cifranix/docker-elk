"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutFrame = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("./i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * @todo This component can be moved to `kibana_react`.
 */
var FlyoutFrame = function FlyoutFrame(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      footer = _ref.footer,
      onClose = _ref.onClose,
      children = _ref.children;

  var headerFragment = title && _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h1", null, title)));

  var footerFragment = (onClose || footer) && _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, onClose && _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: onClose,
    flush: "left",
    "data-test-subj": "flyoutCloseButton"
  }, _i18n.txtClose)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    "data-test-subj": "flyoutFooter"
  }, footer)));

  return _react.default.createElement(_react.default.Fragment, null, headerFragment, _react.default.createElement(_eui.EuiFlyoutBody, null, children), footerFragment);
};

exports.FlyoutFrame = FlyoutFrame;