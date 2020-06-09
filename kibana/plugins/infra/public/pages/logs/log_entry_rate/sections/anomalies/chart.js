"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesChart = void 0;

var _charts = require("@elastic/charts");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

var _use_kibana_ui_setting = require("../../../../../utils/use_kibana_ui_setting");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AnomaliesChart = function AnomaliesChart(_ref) {
  var chartId = _ref.chartId,
      series = _ref.series,
      annotations = _ref.annotations,
      setTimeRange = _ref.setTimeRange,
      timeRange = _ref.timeRange,
      renderAnnotationTooltip = _ref.renderAnnotationTooltip;

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat', 'Y-MM-DD HH:mm:ss.SSS'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      dateFormat = _useKibanaUiSetting2[0];

  var _useKibanaUiSetting3 = (0, _use_kibana_ui_setting.useKibanaUiSetting)('theme:darkMode'),
      _useKibanaUiSetting4 = _slicedToArray(_useKibanaUiSetting3, 1),
      isDarkMode = _useKibanaUiSetting4[0];

  var chartDateFormatter = (0, _react.useMemo)(function () {
    return (0, _charts.niceTimeFormatter)([timeRange.startTime, timeRange.endTime]);
  }, [timeRange]);
  var logEntryRateSpecId = 'averageValues';
  var tooltipProps = (0, _react.useMemo)(function () {
    return {
      headerFormatter: function headerFormatter(tooltipData) {
        return (0, _moment.default)(tooltipData.value).format(dateFormat);
      }
    };
  }, [dateFormat]);
  var handleBrushEnd = (0, _react.useCallback)(function (startTime, endTime) {
    setTimeRange({
      endTime: endTime,
      startTime: startTime
    });
  }, [setTimeRange]);
  return _react.default.createElement("div", {
    style: {
      height: 160,
      width: '100%'
    }
  }, _react.default.createElement(_charts.Chart, {
    className: "log-entry-rate-chart"
  }, _react.default.createElement(_charts.Axis, {
    id: "timestamp",
    position: "bottom",
    showOverlappingTicks: true,
    tickFormat: chartDateFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: "values",
    position: "left",
    tickFormat: function tickFormat(value) {
      return (0, _numeral.default)(value.toPrecision(3)).format('0[.][00]a');
    } // https://github.com/adamwdraper/Numeral-js/issues/194

  }), _react.default.createElement(_charts.BarSeries, {
    id: logEntryRateSpecId,
    name: _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesSectionLineSeriesName', {
      defaultMessage: 'Log entries per 15 minutes (avg)'
    }),
    xScaleType: "time",
    yScaleType: "linear",
    xAccessor: 'time',
    yAccessors: ['value'],
    data: series,
    barSeriesStyle: barSeriesStyle
  }), renderAnnotations(annotations, chartId, renderAnnotationTooltip), _react.default.createElement(_charts.Settings, {
    onBrushEnd: handleBrushEnd,
    tooltip: tooltipProps,
    baseTheme: isDarkMode ? _charts.DARK_THEME : _charts.LIGHT_THEME,
    xDomain: {
      min: timeRange.startTime,
      max: timeRange.endTime
    }
  })));
};

exports.AnomaliesChart = AnomaliesChart;
var severityConfigs = {
  warning: {
    id: "anomalies-warning",
    style: {
      fill: _log_analysis.ML_SEVERITY_COLORS.warning,
      opacity: 0.7
    }
  },
  minor: {
    id: "anomalies-minor",
    style: {
      fill: _log_analysis.ML_SEVERITY_COLORS.minor,
      opacity: 0.7
    }
  },
  major: {
    id: "anomalies-major",
    style: {
      fill: _log_analysis.ML_SEVERITY_COLORS.major,
      opacity: 0.7
    }
  },
  critical: {
    id: "anomalies-critical",
    style: {
      fill: _log_analysis.ML_SEVERITY_COLORS.critical,
      opacity: 0.7
    }
  }
};

var renderAnnotations = function renderAnnotations(annotations, chartId, renderAnnotationTooltip) {
  return Object.entries(annotations).map(function (entry, index) {
    return _react.default.createElement(_charts.RectAnnotation, {
      key: "".concat(chartId, ":").concat(entry[0]),
      dataValues: entry[1],
      id: severityConfigs[entry[0]].id,
      style: severityConfigs[entry[0]].style,
      renderTooltip: renderAnnotationTooltip
    });
  });
};

var barSeriesStyle = {
  rect: {
    fill: '#D3DAE6',
    opacity: 0.6
  }
}; // TODO: Acquire this from "theme" as euiColorLightShade