"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerChartOptions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _use_metrics_explorer_options = require("../../containers/metrics_explorer/use_metrics_explorer_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsExplorerChartOptions = function MetricsExplorerChartOptions(_ref) {
  var chartOptions = _ref.chartOptions,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setPopoverState = _useState2[1];

  var handleClosePopover = (0, _react.useCallback)(function () {
    setPopoverState(false);
  }, []);
  var handleOpenPopover = (0, _react.useCallback)(function () {
    setPopoverState(true);
  }, []);

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    iconSide: "left",
    iconType: "eye",
    onClick: handleOpenPopover
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.metricsExplorer.customizeChartOptions",
    defaultMessage: "Customize"
  }));

  var yAxisRadios = [{
    id: _use_metrics_explorer_options.MetricsExplorerYAxisMode.auto,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.autoLabel', {
      defaultMessage: 'Automatic (min to max)'
    })
  }, {
    id: _use_metrics_explorer_options.MetricsExplorerYAxisMode.fromZero,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.fromZeroLabel', {
      defaultMessage: 'From zero (0 to max)'
    })
  }];
  var typeRadios = [{
    id: _use_metrics_explorer_options.MetricsExplorerChartType.line,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.lineLabel', {
      defaultMessage: 'Line'
    })
  }, {
    id: _use_metrics_explorer_options.MetricsExplorerChartType.area,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.areaLabel', {
      defaultMessage: 'Area'
    })
  }, {
    id: _use_metrics_explorer_options.MetricsExplorerChartType.bar,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.barLabel', {
      defaultMessage: 'Bar'
    })
  }];
  var handleYAxisChange = (0, _react.useCallback)(function (id) {
    onChange(_objectSpread({}, chartOptions, {
      yAxisMode: id
    }));
  }, [chartOptions, onChange]);
  var handleTypeChange = (0, _react.useCallback)(function (id) {
    onChange(_objectSpread({}, chartOptions, {
      type: id
    }));
  }, [chartOptions, onChange]);
  var handleStackChange = (0, _react.useCallback)(function (e) {
    onChange(_objectSpread({}, chartOptions, {
      stack: e.target.checked
    }));
  }, [chartOptions, onChange]);
  return _react.default.createElement(_eui.EuiPopover, {
    id: "MetricExplorerChartOptionsPopover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: handleClosePopover
  }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.typeLabel', {
      defaultMessage: 'Chart style'
    })
  }, _react.default.createElement(_eui.EuiRadioGroup, {
    compressed: true,
    options: typeRadios,
    idSelected: chartOptions.type,
    onChange: handleTypeChange
  })), _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.stackLabel', {
      defaultMessage: 'Stack series'
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.stackSwitchLabel', {
      defaultMessage: 'Stack'
    }),
    checked: chartOptions.stack,
    onChange: handleStackChange
  })), _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    label: _i18n.i18n.translate('xpack.infra.metricsExplorer.chartOptions.yAxisDomainLabel', {
      defaultMessage: 'Y Axis Domain'
    })
  }, _react.default.createElement(_eui.EuiRadioGroup, {
    compressed: true,
    options: yAxisRadios,
    idSelected: chartOptions.yAxisMode,
    onChange: handleYAxisChange
  }))));
};

exports.MetricsExplorerChartOptions = MetricsExplorerChartOptions;