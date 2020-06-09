"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModeSwitcher = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui_styled_components = require("../../../../../../legacy/common/eui_styled_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ModeSwitcher = (0, _eui_styled_components.withTheme)(function (_ref) {
  var onSave = _ref.onSave,
      onEditCancel = _ref.onEditCancel,
      onEdit = _ref.onEdit,
      onAdd = _ref.onAdd,
      mode = _ref.mode,
      customMetrics = _ref.customMetrics,
      theme = _ref.theme;

  if (['editMetric', 'addMetric'].includes(mode)) {
    return null;
  }

  return _react.default.createElement("div", {
    style: {
      borderTop: "".concat(theme.eui.euiBorderWidthThin, " solid ").concat(theme.eui.euiBorderColor),
      padding: 12
    }
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, mode === 'edit' ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "left",
    onClick: onEditCancel,
    "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.modeSwitcher.cancelAriaLabel', {
      defaultMessage: 'Cancel edit mode'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.modeSwitcher.cancel",
    defaultMessage: "Cancel"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: onSave,
    size: "s",
    fill: true,
    "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.modeSwitcher.saveButtonAriaLabel', {
      defaultMessage: 'Save changes to custom metrics'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.modeSwitcher.saveButton",
    defaultMessage: "Save"
  })))) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "left",
    onClick: onEdit,
    disabled: customMetrics.length === 0,
    "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.modeSwitcher.editAriaLabel', {
      defaultMessage: 'Edit custom metrics'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.modeSwitcher.edit",
    defaultMessage: "Edit"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onAdd,
    size: "s",
    flush: "right",
    "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.modeSwitcher.addMetricAriaLabel', {
      defaultMessage: 'Add custom metric'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.modeSwitcher.addMetric",
    defaultMessage: "Add metric"
  }))))));
});
exports.ModeSwitcher = ModeSwitcher;