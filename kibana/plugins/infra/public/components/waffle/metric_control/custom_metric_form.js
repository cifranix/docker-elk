"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomMetricForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _snapshot_api = require("../../../../common/http_api/snapshot_api");

var _eui_styled_components = require("../../../../../../legacy/common/eui_styled_components");

var _AGGREGATION_LABELS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AGGREGATION_LABELS = (_AGGREGATION_LABELS = {}, _defineProperty(_AGGREGATION_LABELS, 'avg', _i18n.i18n.translate('xpack.infra.waffle.customMetrics.aggregationLables.avg', {
  defaultMessage: 'Average'
})), _defineProperty(_AGGREGATION_LABELS, 'max', _i18n.i18n.translate('xpack.infra.waffle.customMetrics.aggregationLables.max', {
  defaultMessage: 'Max'
})), _defineProperty(_AGGREGATION_LABELS, 'min', _i18n.i18n.translate('xpack.infra.waffle.customMetrics.aggregationLables.min', {
  defaultMessage: 'Min'
})), _defineProperty(_AGGREGATION_LABELS, 'rate', _i18n.i18n.translate('xpack.infra.waffle.customMetrics.aggregationLables.rate', {
  defaultMessage: 'Rate'
})), _AGGREGATION_LABELS);
var CustomMetricForm = (0, _eui_styled_components.withTheme)(function (_ref) {
  var theme = _ref.theme,
      onCancel = _ref.onCancel,
      fields = _ref.fields,
      onChange = _ref.onChange,
      metric = _ref.metric;

  var _useState = (0, _react.useState)(metric ? metric.label : void 0),
      _useState2 = _slicedToArray(_useState, 2),
      label = _useState2[0],
      setLabel = _useState2[1];

  var _useState3 = (0, _react.useState)(metric ? metric.aggregation : 'avg'),
      _useState4 = _slicedToArray(_useState3, 2),
      aggregation = _useState4[0],
      setAggregation = _useState4[1];

  var _useState5 = (0, _react.useState)(metric ? metric.field : void 0),
      _useState6 = _slicedToArray(_useState5, 2),
      field = _useState6[0],
      setField = _useState6[1];

  var handleSubmit = (0, _react.useCallback)(function () {
    if (metric && aggregation && field) {
      onChange(_objectSpread({}, metric, {
        label: label,
        aggregation: aggregation,
        field: field
      }));
    } else if (aggregation && field) {
      var newMetric = {
        type: 'custom',
        id: _uuid.default.v1(),
        label: label,
        aggregation: aggregation,
        field: field
      };
      onChange(newMetric);
    }
  }, [metric, aggregation, field, onChange, label]);
  var handleLabelChange = (0, _react.useCallback)(function (e) {
    setLabel(e.target.value);
  }, [setLabel]);
  var handleFieldChange = (0, _react.useCallback)(function (selectedOptions) {
    setField(selectedOptions[0].label);
  }, [setField]);
  var handleAggregationChange = (0, _react.useCallback)(function (e) {
    var value = e.target.value;
    var aggValue = _snapshot_api.SnapshotCustomAggregationRT.is(value) ? value : 'avg';
    setAggregation(aggValue);
  }, [setAggregation]);
  var fieldOptions = fields.filter(function (f) {
    return f.aggregatable && f.type === 'number' && !(field && field === f.name);
  }).map(function (f) {
    return {
      label: f.name
    };
  });

  var aggregationOptions = _snapshot_api.SNAPSHOT_CUSTOM_AGGREGATIONS.map(function (k) {
    return {
      text: AGGREGATION_LABELS[k],
      value: k
    };
  });

  var isSubmitDisabled = !field || !aggregation;
  var title = metric ? _i18n.i18n.translate('xpack.infra.waffle.customMetricPanelLabel.edit', {
    defaultMessage: 'Edit custom metric'
  }) : _i18n.i18n.translate('xpack.infra.waffle.customMetricPanelLabel.add', {
    defaultMessage: 'Add custom metric'
  });
  var titleAriaLabel = metric ? _i18n.i18n.translate('xpack.infra.waffle.customMetricPanelLabel.editAriaLabel', {
    defaultMessage: 'Back to custom metrics edit mode'
  }) : _i18n.i18n.translate('xpack.infra.waffle.customMetricPanelLabel.addAriaLabel', {
    defaultMessage: 'Back to metric picker'
  });
  return _react.default.createElement("div", {
    style: {
      width: 685
    }
  }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiPopoverTitle, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "arrowLeft",
    onClick: onCancel,
    color: "text",
    size: "xs",
    flush: "left",
    style: {
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    "aria-label": titleAriaLabel
  }, title)), _react.default.createElement("div", {
    style: {
      padding: theme.eui.paddingSizes.m,
      borderBottom: "".concat(theme.eui.euiBorderWidthThin, " solid ").concat(theme.eui.euiBorderColor)
    }
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.waffle.customMetrics.metricLabel', {
      defaultMessage: 'Metric'
    }),
    display: "rowCompressed",
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    onChange: handleAggregationChange,
    value: aggregation,
    options: aggregationOptions,
    fullWidth: true
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement("span", null, "of"))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    placeholder: _i18n.i18n.translate('xpack.infra.waffle.customMetrics.fieldPlaceholder', {
      defaultMessage: 'Select a field'
    }),
    singleSelection: {
      asPlainText: true
    },
    selectedOptions: field ? [{
      label: field
    }] : [],
    options: fieldOptions,
    onChange: handleFieldChange,
    isClearable: false
  })))), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.waffle.customMetrics.labelLabel', {
      defaultMessage: 'Label (optional)'
    }),
    display: "rowCompressed",
    fullWidth: true
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "label",
    placeholder: _i18n.i18n.translate('xpack.infra.waffle.customMetrics.labelPlaceholder', {
      defaultMessage: 'Choose a name to appear in the "Metric" dropdown'
    }),
    value: label,
    fullWidth: true,
    onChange: handleLabelChange
  }))), _react.default.createElement("div", {
    style: {
      padding: theme.eui.paddingSizes.m,
      textAlign: 'right'
    }
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onCancel,
    size: "s",
    style: {
      paddingRight: theme.eui.paddingSizes.xl
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.cancelLabel",
    defaultMessage: "Cancel"
  })), _react.default.createElement(_eui.EuiButton, {
    type: "submit",
    size: "s",
    fill: true,
    onClick: handleSubmit,
    disabled: isSubmitDisabled
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.waffle.customMetrics.submitLabel",
    defaultMessage: "Save"
  })))));
});
exports.CustomMetricForm = CustomMetricForm;