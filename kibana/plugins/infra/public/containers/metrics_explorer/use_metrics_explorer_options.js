"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerOptionsContainer = exports.useMetricsExplorerOptions = exports.DEFAULT_OPTIONS = exports.DEFAULT_METRICS = exports.DEFAULT_CHART_OPTIONS = exports.DEFAULT_TIMERANGE = exports.MetricsExplorerYAxisMode = exports.MetricsExplorerChartType = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

var _color_palette = require("../../../common/color_palette");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsExplorerChartType;
exports.MetricsExplorerChartType = MetricsExplorerChartType;

(function (MetricsExplorerChartType) {
  MetricsExplorerChartType["line"] = "line";
  MetricsExplorerChartType["area"] = "area";
  MetricsExplorerChartType["bar"] = "bar";
})(MetricsExplorerChartType || (exports.MetricsExplorerChartType = MetricsExplorerChartType = {}));

var MetricsExplorerYAxisMode;
exports.MetricsExplorerYAxisMode = MetricsExplorerYAxisMode;

(function (MetricsExplorerYAxisMode) {
  MetricsExplorerYAxisMode["fromZero"] = "fromZero";
  MetricsExplorerYAxisMode["auto"] = "auto";
})(MetricsExplorerYAxisMode || (exports.MetricsExplorerYAxisMode = MetricsExplorerYAxisMode = {}));

var DEFAULT_TIMERANGE = {
  from: 'now-1h',
  to: 'now',
  interval: '>=10s'
};
exports.DEFAULT_TIMERANGE = DEFAULT_TIMERANGE;
var DEFAULT_CHART_OPTIONS = {
  type: MetricsExplorerChartType.line,
  yAxisMode: MetricsExplorerYAxisMode.fromZero,
  stack: false
};
exports.DEFAULT_CHART_OPTIONS = DEFAULT_CHART_OPTIONS;
var DEFAULT_METRICS = [{
  aggregation: 'avg',
  field: 'system.cpu.user.pct',
  color: _color_palette.MetricsExplorerColor.color0
}, {
  aggregation: 'avg',
  field: 'kubernetes.pod.cpu.usage.node.pct',
  color: _color_palette.MetricsExplorerColor.color1
}, {
  aggregation: 'avg',
  field: 'docker.cpu.total.pct',
  color: _color_palette.MetricsExplorerColor.color2
}];
exports.DEFAULT_METRICS = DEFAULT_METRICS;
var DEFAULT_OPTIONS = {
  aggregation: 'avg',
  metrics: DEFAULT_METRICS
};
exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

function parseJsonOrDefault(value, defaultValue) {
  if (!value) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return defaultValue;
  }
}

function useStateWithLocalStorage(key, defaultState) {
  var storageState = localStorage.getItem(key);

  var _useState = (0, _react.useState)(parseJsonOrDefault(storageState, defaultState)),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

var useMetricsExplorerOptions = function useMetricsExplorerOptions() {
  var _useStateWithLocalSto = useStateWithLocalStorage('MetricsExplorerOptions', DEFAULT_OPTIONS),
      _useStateWithLocalSto2 = _slicedToArray(_useStateWithLocalSto, 2),
      options = _useStateWithLocalSto2[0],
      setOptions = _useStateWithLocalSto2[1];

  var _useStateWithLocalSto3 = useStateWithLocalStorage('MetricsExplorerTimeRange', DEFAULT_TIMERANGE),
      _useStateWithLocalSto4 = _slicedToArray(_useStateWithLocalSto3, 2),
      currentTimerange = _useStateWithLocalSto4[0],
      setTimeRange = _useStateWithLocalSto4[1];

  var _useStateWithLocalSto5 = useStateWithLocalStorage('MetricsExplorerChartOptions', DEFAULT_CHART_OPTIONS),
      _useStateWithLocalSto6 = _slicedToArray(_useStateWithLocalSto5, 2),
      chartOptions = _useStateWithLocalSto6[0],
      setChartOptions = _useStateWithLocalSto6[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isAutoReloading = _useState4[0],
      setAutoReloading = _useState4[1];

  return {
    defaultViewState: {
      options: DEFAULT_OPTIONS,
      chartOptions: DEFAULT_CHART_OPTIONS,
      currentTimerange: DEFAULT_TIMERANGE
    },
    options: options,
    chartOptions: chartOptions,
    setChartOptions: setChartOptions,
    currentTimerange: currentTimerange,
    isAutoReloading: isAutoReloading,
    setOptions: setOptions,
    setTimeRange: setTimeRange,
    startAutoReload: function startAutoReload() {
      return setAutoReloading(true);
    },
    stopAutoReload: function stopAutoReload() {
      return setAutoReloading(false);
    }
  };
};

exports.useMetricsExplorerOptions = useMetricsExplorerOptions;
var MetricsExplorerOptionsContainer = (0, _constate.default)(useMetricsExplorerOptions);
exports.MetricsExplorerOptionsContainer = MetricsExplorerOptionsContainer;