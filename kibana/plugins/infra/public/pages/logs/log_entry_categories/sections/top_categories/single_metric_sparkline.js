"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricSparkline = void 0;

var _react = _interopRequireWildcard(require("react"));

var _charts = require("@elastic/charts");

var _eui_charts_theme = require("@elastic/eui/dist/eui_charts_theme");

var _use_kibana_ui_setting = require("../../../../../utils/use_kibana_ui_setting");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var timestampAccessor = 'timestamp';
var valueAccessor = ['value'];
var sparklineSize = {
  height: 20,
  width: 100
};

var SingleMetricSparkline = function SingleMetricSparkline(_ref) {
  var metric = _ref.metric,
      timeRange = _ref.timeRange;

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('theme:darkMode'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      isDarkMode = _useKibanaUiSetting2[0];

  var theme = (0, _react.useMemo)(function () {
    return [// localThemeOverride,
    _eui_charts_theme.EUI_SPARKLINE_THEME_PARTIAL, isDarkMode ? _eui_charts_theme.EUI_CHARTS_THEME_DARK.theme : _eui_charts_theme.EUI_CHARTS_THEME_LIGHT.theme];
  }, [isDarkMode]);
  var xDomain = (0, _react.useMemo)(function () {
    return {
      max: timeRange.endTime,
      min: timeRange.startTime
    };
  }, [timeRange]);
  return _react.default.createElement(_charts.Chart, {
    size: sparklineSize
  }, _react.default.createElement(_charts.Settings, {
    showLegend: false,
    theme: theme,
    tooltip: "none",
    xDomain: xDomain
  }), _react.default.createElement(_charts.AreaSeries, {
    data: metric,
    id: "metric",
    xAccessor: timestampAccessor,
    xScaleType: "time",
    yAccessors: valueAccessor
  }));
};

exports.SingleMetricSparkline = SingleMetricSparkline;