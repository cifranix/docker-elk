"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyChart = exports.CHART_TYPE = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _anomalies = require("../common/anomalies");

var _model_bounds = require("./model_bounds");

var _line = require("./line");

var _scatter = require("./scatter");

var _axes = require("../common/axes");

var _utils = require("../common/utils");

var _loading_wrapper = require("../loading_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CHART_TYPE;
exports.CHART_TYPE = CHART_TYPE;

(function (CHART_TYPE) {
  CHART_TYPE[CHART_TYPE["LINE"] = 0] = "LINE";
  CHART_TYPE[CHART_TYPE["SCATTER"] = 1] = "SCATTER";
})(CHART_TYPE || (exports.CHART_TYPE = CHART_TYPE = {}));

var AnomalyChart = function AnomalyChart(_ref) {
  var chartType = _ref.chartType,
      _ref$chartData = _ref.chartData,
      chartData = _ref$chartData === void 0 ? [] : _ref$chartData,
      modelData = _ref.modelData,
      anomalyData = _ref.anomalyData,
      height = _ref.height,
      width = _ref.width,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading;
  var data = chartType === CHART_TYPE.SCATTER ? flattenData(chartData) : chartData;
  var xDomain = (0, _utils.getXRange)(data);
  return _react.default.createElement("div", {
    style: {
      width: width,
      height: height
    },
    "data-test-subj": "mlAnomalyChart ".concat(CHART_TYPE[chartType])
  }, _react.default.createElement(_loading_wrapper.LoadingWrapper, {
    height: height,
    hasData: data.length > 0,
    loading: loading
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    xDomain: xDomain,
    tooltip: _charts.TooltipType.None
  }), _react.default.createElement(_axes.Axes, {
    chartData: data
  }), _react.default.createElement(_anomalies.Anomalies, {
    anomalyData: anomalyData
  }), _react.default.createElement(_model_bounds.ModelBounds, {
    modelData: modelData
  }), chartType === CHART_TYPE.LINE && _react.default.createElement(_line.Line, {
    chartData: data
  }), chartType === CHART_TYPE.SCATTER && _react.default.createElement(_scatter.Scatter, {
    chartData: data
  }))));
};

exports.AnomalyChart = AnomalyChart;

function flattenData(data) {
  var chartData = data.reduce(function (p, c) {
    p.push.apply(p, _toConsumableArray(c.values.map(function (v) {
      return {
        time: c.time,
        value: v.value
      };
    })));
    return p;
  }, []);
  return chartData;
}