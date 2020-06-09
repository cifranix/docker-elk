"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartSectionVis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _charts = require("@elastic/charts");

var _eui = require("@elastic/eui");

var _get_chart_theme = require("../../../components/metrics_explorer/helpers/get_chart_theme");

var _series_chart = require("./series_chart");

var _helpers = require("./helpers");

var _error_message = require("./error_message");

var _use_kibana_ui_setting = require("../../../utils/use_kibana_ui_setting");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ChartSectionVis = function ChartSectionVis(_ref) {
  var id = _ref.id,
      onChangeRangeTime = _ref.onChangeRangeTime,
      metric = _ref.metric,
      stopLiveStreaming = _ref.stopLiveStreaming,
      isLiveStreaming = _ref.isLiveStreaming,
      formatter = _ref.formatter,
      formatterTemplate = _ref.formatterTemplate,
      stacked = _ref.stacked,
      seriesOverrides = _ref.seriesOverrides,
      type = _ref.type;
  var isDarkMode = (0, _public.useUiSetting)('theme:darkMode');

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      dateFormat = _useKibanaUiSetting2[0];

  var valueFormatter = (0, _react.useCallback)((0, _helpers.getFormatter)(formatter, formatterTemplate), [formatter, formatterTemplate]);
  var dateFormatter = (0, _react.useMemo)(function () {
    return metric != null ? (0, _charts.niceTimeFormatter)((0, _helpers.getMaxMinTimestamp)(metric)) : undefined;
  }, [metric]);
  var handleTimeChange = (0, _react.useCallback)(function (from, to) {
    if (onChangeRangeTime) {
      if (isLiveStreaming && stopLiveStreaming) {
        stopLiveStreaming();
      }

      onChangeRangeTime({
        from: (0, _moment.default)(from).toISOString(),
        to: (0, _moment.default)(to).toISOString(),
        interval: '>=1m'
      });
    }
  }, [onChangeRangeTime, isLiveStreaming, stopLiveStreaming]);
  var tooltipProps = {
    headerFormatter: (0, _react.useCallback)(function (data) {
      return (0, _moment.default)(data.value).format(dateFormat || 'Y-MM-DD HH:mm:ss.SSS');
    }, [dateFormat])
  };

  if (!id) {
    return null;
  } else if (!metric) {
    return _react.default.createElement(_error_message.ErrorMessage, {
      title: _i18n.i18n.translate('xpack.infra.chartSection.missingMetricDataText', {
        defaultMessage: 'Missing Data'
      }),
      body: _i18n.i18n.translate('xpack.infra.chartSection.missingMetricDataBody', {
        defaultMessage: 'The data for this chart is missing.'
      })
    });
  } else if (metric.series.some(_helpers.seriesHasLessThen2DataPoints)) {
    return _react.default.createElement(_error_message.ErrorMessage, {
      title: _i18n.i18n.translate('xpack.infra.chartSection.notEnoughDataPointsToRenderTitle', {
        defaultMessage: 'Not Enough Data'
      }),
      body: _i18n.i18n.translate('xpack.infra.chartSection.notEnoughDataPointsToRenderText', {
        defaultMessage: 'Not enough data points to render chart, try increasing the time range.'
      })
    });
  }

  return _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement("div", {
    className: "infrastructureChart",
    style: {
      height: 250,
      marginBottom: 16
    }
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Axis, {
    id: "timestamp",
    position: _charts.Position.Bottom,
    showOverlappingTicks: true,
    tickFormat: dateFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: "values",
    position: _charts.Position.Left,
    tickFormat: valueFormatter
  }), metric && metric.series.map(function (series) {
    return _react.default.createElement(_series_chart.SeriesChart, {
      key: "series-".concat(id, "-").concat(series.id),
      id: "series-".concat(id, "-").concat(series.id),
      series: series,
      name: (0, _helpers.getChartName)(seriesOverrides, series.id, series.id),
      type: (0, _helpers.getChartType)(seriesOverrides, type, series.id),
      color: (0, _helpers.getChartColor)(seriesOverrides, series.id),
      stack: stacked
    });
  }), _react.default.createElement(_charts.Settings, {
    tooltip: tooltipProps,
    onBrushEnd: handleTimeChange,
    theme: (0, _get_chart_theme.getChartTheme)(isDarkMode),
    showLegend: true,
    showLegendExtra: true,
    legendPosition: "right"
  }))));
};

exports.ChartSectionVis = ChartSectionVis;