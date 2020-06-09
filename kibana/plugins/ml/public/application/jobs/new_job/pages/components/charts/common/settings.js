"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChartColors = useChartColors;
exports.getChartSettings = getChartSettings;
exports.seriesStyle = exports.defaultChartSettings = void 0;

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _job_creator = require("../../../../common/job_creator");

var _time_buckets = require("../../../../../../util/time_buckets");

var _use_ui_settings_context = require("../../../../../../contexts/kibana/use_ui_settings_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useChartColors() {
  var IS_DARK_THEME = (0, _use_ui_settings_context.useUiSettings)().get('theme:darkMode');
  var themeName = IS_DARK_THEME ? _eui_theme_dark.default : _eui_theme_light.default;
  return {
    LINE_COLOR: themeName.euiColorPrimary,
    MODEL_COLOR: themeName.euiColorPrimary,
    EVENT_RATE_COLOR: themeName.euiColorPrimary,
    EVENT_RATE_COLOR_WITH_ANOMALIES: themeName.euiColorLightShade
  };
}

var defaultChartSettings = {
  width: '100%',
  height: '300px',
  cols: 1,
  intervalMs: 0
};
exports.defaultChartSettings = defaultChartSettings;
var seriesStyle = {
  line: {
    strokeWidth: 2,
    visible: true,
    opacity: 1
  },
  border: {
    visible: false,
    strokeWidth: 0
  },
  point: {
    visible: false,
    radius: 2,
    strokeWidth: 4,
    opacity: 0.5
  },
  area: {
    opacity: 0.25,
    visible: false
  }
};
exports.seriesStyle = seriesStyle;

function getChartSettings(jobCreator, chartInterval) {
  var cs = _objectSpread({}, defaultChartSettings, {
    intervalMs: chartInterval.getInterval().asMilliseconds()
  });

  if ((0, _job_creator.isPopulationJobCreator)(jobCreator)) {
    // for population charts, use a larger interval based on
    // the calculation from TimeBuckets, but without the
    // bar target and max bars which have been set for the
    // general chartInterval
    var interval = new _time_buckets.TimeBuckets();
    interval.setInterval('auto');
    interval.setBounds(chartInterval.getBounds());
    cs.intervalMs = interval.getInterval().asMilliseconds();
  }

  if (cs.intervalMs < jobCreator.bucketSpanMs) {
    // don't allow the chart interval to be smaller than the bucket span
    cs.intervalMs = jobCreator.bucketSpanMs;
  }

  if ((0, _job_creator.isMultiMetricJobCreator)(jobCreator) || (0, _job_creator.isPopulationJobCreator)(jobCreator)) {
    if (jobCreator.aggFieldPairs.length > 2 && (0, _job_creator.isMultiMetricJobCreator)(jobCreator)) {
      cs.cols = 3;
      cs.height = '150px';
      cs.intervalMs = cs.intervalMs * 3;
    } else if (jobCreator.aggFieldPairs.length > 1) {
      cs.cols = 2;
      cs.height = '200px';
      cs.intervalMs = cs.intervalMs * 2;
    }
  }

  return cs;
}