"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithMetricsExplorerOptionsUrlState = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var t = _interopRequireWildcard(require("io-ts"));

var _ThrowReporter = require("io-ts/lib/ThrowReporter");

var _color_palette = require("../../../common/color_palette");

var _url_state = require("../../utils/url_state");

var _use_metrics_explorer_options = require("./use_metrics_explorer_options");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WithMetricsExplorerOptionsUrlState = function WithMetricsExplorerOptionsUrlState() {
  var _useContext = (0, _react.useContext)(_use_metrics_explorer_options.MetricsExplorerOptionsContainer.Context),
      options = _useContext.options,
      chartOptions = _useContext.chartOptions,
      setChartOptions = _useContext.setChartOptions,
      currentTimerange = _useContext.currentTimerange,
      setRawOptions = _useContext.setOptions,
      setTimeRange = _useContext.setTimeRange;

  var setOptions = function setOptions(value) {
    setRawOptions(value);
  };

  var urlState = (0, _react.useMemo)(function () {
    return {
      options: options,
      chartOptions: chartOptions,
      timerange: currentTimerange
    };
  }, [options, chartOptions, currentTimerange]);

  var handleChange = function handleChange(newUrlState) {
    if (newUrlState && newUrlState.options) {
      setOptions(newUrlState.options);
    }

    if (newUrlState && newUrlState.timerange) {
      setTimeRange(newUrlState.timerange);
    }

    if (newUrlState && newUrlState.chartOptions) {
      setChartOptions(newUrlState.chartOptions);
    }
  };

  return _react.default.createElement(_url_state.UrlStateContainer, {
    urlState: urlState,
    urlStateKey: "metricsExplorer",
    mapToUrlState: mapToUrlState,
    onChange: handleChange,
    onInitialize: handleChange,
    populateWithInitialState: true
  });
};

exports.WithMetricsExplorerOptionsUrlState = WithMetricsExplorerOptionsUrlState;

function isMetricExplorerOptions(subject) {
  var MetricRequired = t.type({
    aggregation: t.string
  });
  var MetricOptional = t.partial({
    field: t.string,
    rate: t.boolean,
    color: t.keyof(Object.fromEntries((0, _lodash.values)(_color_palette.MetricsExplorerColor).map(function (c) {
      return [c, null];
    }))),
    label: t.string
  });
  var Metric = t.intersection([MetricRequired, MetricOptional]);
  var OptionsRequired = t.type({
    aggregation: t.string,
    metrics: t.array(Metric)
  });
  var OptionsOptional = t.partial({
    limit: t.number,
    groupBy: t.string,
    filterQuery: t.string
  });
  var Options = t.intersection([OptionsRequired, OptionsOptional]);
  var result = Options.decode(subject);

  try {
    _ThrowReporter.ThrowReporter.report(result);

    return true;
  } catch (e) {
    return false;
  }
}

function isMetricExplorerChartOptions(subject) {
  var ChartOptions = t.type({
    yAxisMode: t.keyof(Object.fromEntries((0, _lodash.values)(_use_metrics_explorer_options.MetricsExplorerYAxisMode).map(function (v) {
      return [v, null];
    }))),
    type: t.keyof(Object.fromEntries((0, _lodash.values)(_use_metrics_explorer_options.MetricsExplorerChartType).map(function (v) {
      return [v, null];
    }))),
    stack: t.boolean
  });
  var result = ChartOptions.decode(subject);

  try {
    _ThrowReporter.ThrowReporter.report(result);

    return true;
  } catch (e) {
    return false;
  }
}

function isMetricExplorerTimeOption(subject) {
  var TimeRange = t.type({
    from: t.string,
    to: t.string,
    interval: t.string
  });
  var result = TimeRange.decode(subject);

  try {
    _ThrowReporter.ThrowReporter.report(result);

    return true;
  } catch (e) {
    return false;
  }
}

var mapToUrlState = function mapToUrlState(value) {
  var finalState = {};

  if (value) {
    if (value.options && isMetricExplorerOptions(value.options)) {
      (0, _lodash.set)(finalState, 'options', value.options);
    }

    if (value.timerange && isMetricExplorerTimeOption(value.timerange)) {
      (0, _lodash.set)(finalState, 'timerange', value.timerange);
    }

    if (value.chartOptions && isMetricExplorerChartOptions(value.chartOptions)) {
      (0, _lodash.set)(finalState, 'chartOptions', value.chartOptions);
    }

    return finalState;
  }
};