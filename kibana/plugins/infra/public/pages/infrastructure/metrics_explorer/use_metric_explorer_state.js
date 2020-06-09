"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMetricsExplorerState = void 0;

var _react = require("react");

var _use_metrics_explorer_data = require("../../../containers/metrics_explorer/use_metrics_explorer_data");

var _use_metrics_explorer_options = require("../../../containers/metrics_explorer/use_metrics_explorer_options");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useMetricsExplorerState = function useMetricsExplorerState(source, derivedIndexPattern) {
  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      refreshSignal = _useState2[0],
      setRefreshSignal = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      afterKey = _useState4[0],
      setAfterKey = _useState4[1];

  var _useContext = (0, _react.useContext)(_use_metrics_explorer_options.MetricsExplorerOptionsContainer.Context),
      defaultViewState = _useContext.defaultViewState,
      options = _useContext.options,
      currentTimerange = _useContext.currentTimerange,
      chartOptions = _useContext.chartOptions,
      setChartOptions = _useContext.setChartOptions,
      setTimeRange = _useContext.setTimeRange,
      setOptions = _useContext.setOptions;

  var _useMetricsExplorerDa = (0, _use_metrics_explorer_data.useMetricsExplorerData)(options, source, derivedIndexPattern, currentTimerange, afterKey, refreshSignal),
      loading = _useMetricsExplorerDa.loading,
      error = _useMetricsExplorerDa.error,
      data = _useMetricsExplorerDa.data;

  var handleRefresh = (0, _react.useCallback)(function () {
    setAfterKey(null);
    setRefreshSignal(refreshSignal + 1);
  }, [refreshSignal]);
  var handleTimeChange = (0, _react.useCallback)(function (start, end) {
    setAfterKey(null);
    setTimeRange(_objectSpread({}, currentTimerange, {
      from: start,
      to: end
    }));
  }, [currentTimerange, setTimeRange]);
  var handleGroupByChange = (0, _react.useCallback)(function (groupBy) {
    setAfterKey(null);
    setOptions(_objectSpread({}, options, {
      groupBy: groupBy || void 0
    }));
  }, [options, setOptions]);
  var handleFilterQuerySubmit = (0, _react.useCallback)(function (query) {
    setAfterKey(null);
    setOptions(_objectSpread({}, options, {
      filterQuery: query
    }));
  }, [options, setOptions]);
  var handleMetricsChange = (0, _react.useCallback)(function (metrics) {
    setAfterKey(null);
    setOptions(_objectSpread({}, options, {
      metrics: metrics
    }));
  }, [options, setOptions]);
  var handleAggregationChange = (0, _react.useCallback)(function (aggregation) {
    setAfterKey(null);
    var metrics = aggregation === 'count' ? [{
      aggregation: aggregation
    }] : options.metrics.filter(function (metric) {
      return metric.aggregation !== 'count';
    }).map(function (metric) {
      return _objectSpread({}, metric, {
        aggregation: aggregation
      });
    });
    setOptions(_objectSpread({}, options, {
      aggregation: aggregation,
      metrics: metrics
    }));
  }, [options, setOptions]);
  var onViewStateChange = (0, _react.useCallback)(function (vs) {
    if (vs.chartOptions) {
      setChartOptions(vs.chartOptions);
    }

    if (vs.currentTimerange) {
      setTimeRange(vs.currentTimerange);
    }

    if (vs.options) {
      setOptions(vs.options);
    }
  }, [setChartOptions, setOptions, setTimeRange]);
  return {
    loading: loading,
    error: error,
    data: data,
    currentTimerange: currentTimerange,
    options: options,
    chartOptions: chartOptions,
    setChartOptions: setChartOptions,
    handleAggregationChange: handleAggregationChange,
    handleMetricsChange: handleMetricsChange,
    handleFilterQuerySubmit: handleFilterQuerySubmit,
    handleGroupByChange: handleGroupByChange,
    handleTimeChange: handleTimeChange,
    handleRefresh: handleRefresh,
    handleLoadMore: setAfterKey,
    defaultViewState: defaultViewState,
    onViewStateChange: onViewStateChange,
    refreshSignal: refreshSignal,
    afterKey: afterKey
  };
};

exports.useMetricsExplorerState = useMetricsExplorerState;