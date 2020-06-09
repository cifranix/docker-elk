"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerMetrics = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _color_palette = require("../../../common/color_palette");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsExplorerMetrics = function MetricsExplorerMetrics(_ref) {
  var options = _ref.options,
      onChange = _ref.onChange,
      fields = _ref.fields,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? false : _ref$autoFocus;
  var colors = Object.keys(_color_palette.MetricsExplorerColor);

  var _useState = (0, _react.useState)(autoFocus),
      _useState2 = _slicedToArray(_useState, 2),
      shouldFocus = _useState2[0],
      setShouldFocus = _useState2[1]; // the EuiCombobox forwards the ref to an input element


  var autoFocusInputElement = (0, _react.useCallback)(function (inputElement) {
    if (inputElement && shouldFocus) {
      inputElement.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);
  var handleChange = (0, _react.useCallback)(function (selectedOptions) {
    onChange(selectedOptions.map(function (opt, index) {
      return {
        aggregation: options.aggregation,
        field: opt.value,
        color: colors[index]
      };
    }));
  }, [onChange, options.aggregation, colors]);
  var comboOptions = fields.map(function (field) {
    return {
      label: field.name,
      value: field.name
    };
  });
  var selectedOptions = options.metrics.filter(function (m) {
    return m.aggregation !== 'count';
  }).map(function (metric) {
    return {
      label: metric.field || '',
      value: metric.field || '',
      color: (0, _color_palette.colorTransformer)(metric.color || _color_palette.MetricsExplorerColor.color0)
    };
  });

  var placeholderText = _i18n.i18n.translate('xpack.infra.metricsExplorer.metricComboBoxPlaceholder', {
    defaultMessage: 'choose a metric to plot'
  });

  return _react.default.createElement(_eui.EuiComboBox, {
    "aria-label": placeholderText,
    isDisabled: options.aggregation === 'count',
    placeholder: placeholderText,
    fullWidth: true,
    options: comboOptions,
    selectedOptions: selectedOptions,
    onChange: handleChange,
    isClearable: true,
    inputRef: autoFocusInputElement
  });
};

exports.MetricsExplorerMetrics = MetricsExplorerMetrics;