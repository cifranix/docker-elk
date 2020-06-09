"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsEditMode = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _get_custom_metric_label = require("./get_custom_metric_label");

var _eui_styled_components = require("../../../../../../legacy/common/eui_styled_components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ICON_WIDTH = 36;
var MetricsEditMode = (0, _eui_styled_components.withTheme)(function (_ref) {
  var theme = _ref.theme,
      customMetrics = _ref.customMetrics,
      options = _ref.options,
      onEdit = _ref.onEdit,
      onDelete = _ref.onDelete;
  return _react.default.createElement("div", {
    style: {
      width: 256
    }
  }, options.map(function (option) {
    return _react.default.createElement("div", {
      key: option.value,
      style: {
        padding: '14px 14px 13px 36px'
      }
    }, _react.default.createElement("span", {
      style: {
        color: theme.eui.euiButtonColorDisabled
      }
    }, option.text));
  }), customMetrics.map(function (metric) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      key: metric.id,
      alignItems: "center",
      gutterSize: "none",
      style: {
        padding: '10px 0px 9px'
      }
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        width: ICON_WIDTH
      }
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "pencil",
      onClick: function onClick() {
        return onEdit(metric);
      },
      "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.editMode.editButtonAriaLabel', {
        defaultMessage: 'Edit custom metric for {name}',
        values: {
          name: (0, _get_custom_metric_label.getCustomMetricLabel)(metric)
        }
      })
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: 1,
      style: {
        overflow: 'hidden'
      }
    }, (0, _get_custom_metric_label.getCustomMetricLabel)(metric)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        width: ICON_WIDTH,
        textAlign: 'right'
      }
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "trash",
      color: "danger",
      onClick: function onClick() {
        return onDelete(metric);
      },
      "aria-label": _i18n.i18n.translate('xpack.infra.waffle.customMetrics.editMode.deleteAriaLabel', {
        defaultMessage: 'Delete custom metric for {name}',
        values: {
          name: (0, _get_custom_metric_label.getCustomMetricLabel)(metric)
        }
      })
    })));
  }));
});
exports.MetricsEditMode = MetricsEditMode;