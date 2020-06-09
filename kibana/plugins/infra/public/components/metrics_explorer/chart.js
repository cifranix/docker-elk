"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _charts = require("@elastic/charts");

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _use_metrics_explorer_options = require("../../containers/metrics_explorer/use_metrics_explorer_options");

var _public = require("../../../../observability/public");

var _create_formatter_for_metric = require("./helpers/create_formatter_for_metric");

var _series_chart = require("./series_chart");

var _chart_context_menu = require("./chart_context_menu");

var _empty_chart = require("./empty_chart");

var _no_metrics = require("./no_metrics");

var _get_chart_theme = require("./helpers/get_chart_theme");

var _use_kibana_ui_setting = require("../../utils/use_kibana_ui_setting");

var _calculate_domain = require("./helpers/calculate_domain");

var _public2 = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  text-align: left;\n  flex: 1 1 auto;\n  margin: 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsExplorerChart = function MetricsExplorerChart(_ref) {
  var _useKibana$services$a;

  var source = _ref.source,
      options = _ref.options,
      chartOptions = _ref.chartOptions,
      series = _ref.series,
      title = _ref.title,
      onFilter = _ref.onFilter,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? '100%' : _ref$width,
      timeRange = _ref.timeRange,
      onTimeChange = _ref.onTimeChange;
  var uiCapabilities = (_useKibana$services$a = (0, _public2.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  var isDarkMode = (0, _public2.useUiSetting)('theme:darkMode');
  var metrics = options.metrics;

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      dateFormat = _useKibanaUiSetting2[0];

  var handleTimeChange = function handleTimeChange(from, to) {
    onTimeChange((0, _moment.default)(from).toISOString(), (0, _moment.default)(to).toISOString());
  };

  var dateFormatter = (0, _react.useMemo)(function () {
    return series.rows.length > 0 ? (0, _charts.niceTimeFormatter)([(0, _lodash.first)(series.rows).timestamp, (0, _lodash.last)(series.rows).timestamp]) : function (value) {
      return "".concat(value);
    };
  }, [series.rows]);
  var tooltipProps = {
    headerFormatter: (0, _react.useCallback)(function (data) {
      return (0, _moment.default)(data.value).format(dateFormat || 'Y-MM-DD HH:mm:ss.SSS');
    }, [dateFormat])
  };
  var yAxisFormater = (0, _react.useCallback)((0, _create_formatter_for_metric.createFormatterForMetric)((0, _lodash.first)(metrics)), [options]);
  var dataDomain = (0, _calculate_domain.calculateDomain)(series, metrics, chartOptions.stack);
  var domain = chartOptions.yAxisMode === _use_metrics_explorer_options.MetricsExplorerYAxisMode.fromZero ? _objectSpread({}, dataDomain, {
    min: 0
  }) : dataDomain;
  return _react.default.createElement("div", {
    style: {
      padding: 24
    }
  }, options.groupBy ? _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(ChartTitle, null, _react.default.createElement(_eui.EuiToolTip, {
    content: title,
    anchorClassName: "metricsExplorerTitleAnchor"
  }, _react.default.createElement("span", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_chart_context_menu.MetricsExplorerChartContextMenu, {
    timeRange: timeRange,
    options: options,
    chartOptions: chartOptions,
    series: series,
    onFilter: onFilter,
    source: source,
    uiCapabilities: uiCapabilities
  })))) : _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_chart_context_menu.MetricsExplorerChartContextMenu, {
    options: options,
    chartOptions: chartOptions,
    series: series,
    source: source,
    timeRange: timeRange,
    uiCapabilities: uiCapabilities
  }))), _react.default.createElement("div", {
    className: "infrastructureChart",
    style: {
      height: height,
      width: width
    }
  }, metrics.length && series.rows.length > 0 ? _react.default.createElement(_charts.Chart, null, metrics.map(function (metric, id) {
    return _react.default.createElement(_series_chart.MetricExplorerSeriesChart, {
      type: chartOptions.type,
      key: id,
      metric: metric,
      id: id,
      series: series,
      stack: chartOptions.stack
    });
  }), _react.default.createElement(_charts.Axis, {
    id: 'timestamp',
    position: _charts.Position.Bottom,
    showOverlappingTicks: true,
    tickFormat: dateFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: 'values',
    position: _charts.Position.Left,
    tickFormat: yAxisFormater,
    domain: domain
  }), _react.default.createElement(_charts.Settings, {
    tooltip: tooltipProps,
    onBrushEnd: handleTimeChange,
    theme: (0, _get_chart_theme.getChartTheme)(isDarkMode)
  })) : options.metrics.length > 0 ? _react.default.createElement(_empty_chart.MetricsExplorerEmptyChart, null) : _react.default.createElement(_no_metrics.MetricsExplorerNoMetrics, null)));
};

exports.MetricsExplorerChart = MetricsExplorerChart;

var ChartTitle = _public.euiStyled.div(_templateObject());