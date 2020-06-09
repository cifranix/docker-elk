"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClosablePopoverTitle = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ClosablePopoverTitle = function ClosablePopoverTitle(_ref) {
  var children = _ref.children,
      onClose = _ref.onClose;
  return _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, children), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "cross",
    color: "danger",
    "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.components.closablePopoverTitle.closeLabel', {
      defaultMessage: 'Close'
    }),
    onClick: function onClick() {
      return onClose();
    }
  }))));
};

exports.ClosablePopoverTitle = ClosablePopoverTitle;