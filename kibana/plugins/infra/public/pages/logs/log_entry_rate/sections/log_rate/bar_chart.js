"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRateBarChart = void 0;

var _charts = require("@elastic/charts");

var _i18n = require("@kbn/i18n");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _use_kibana_ui_setting = require("../../../../../utils/use_kibana_ui_setting");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogEntryRateBarChart = function LogEntryRateBarChart(_ref) {
  var series = _ref.series,
      setTimeRange = _ref.setTimeRange,
      timeRange = _ref.timeRange;

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      dateFormat = _useKibanaUiSetting2[0];

  var _useKibanaUiSetting3 = (0, _use_kibana_ui_setting.useKibanaUiSetting)('theme:darkMode'),
      _useKibanaUiSetting4 = _slicedToArray(_useKibanaUiSetting3, 1),
      isDarkMode = _useKibanaUiSetting4[0];

  var chartDateFormatter = (0, _react.useMemo)(function () {
    return (0, _charts.niceTimeFormatter)([timeRange.startTime, timeRange.endTime]);
  }, [timeRange]);
  var tooltipProps = (0, _react.useMemo)(function () {
    return {
      headerFormatter: function headerFormatter(tooltipData) {
        return (0, _moment.default)(tooltipData.value).format(dateFormat || 'Y-MM-DD HH:mm:ss.SSS');
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
      height: 200,
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
    id: "averageValues",
    name: _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionLineSeriesName', {
      defaultMessage: 'Log entries per 15 minutes (avg)'
    }),
    xScaleType: "time",
    yScaleType: "linear",
    xAccessor: 'time',
    yAccessors: ['value'],
    splitSeriesAccessors: ['group'],
    stackAccessors: ['time'],
    data: series
  }), _react.default.createElement(_charts.Settings, {
    onBrushEnd: handleBrushEnd,
    tooltip: tooltipProps,
    theme: isDarkMode ? _charts.DARK_THEME : _charts.LIGHT_THEME,
    showLegend: true,
    showLegendExtra: true,
    legendPosition: "right",
    xDomain: {
      min: timeRange.startTime,
      max: timeRange.endTime
    }
  })));
};

exports.LogEntryRateBarChart = LogEntryRateBarChart;