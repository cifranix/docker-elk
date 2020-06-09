"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryCountSparkline = void 0;

var _react = _interopRequireWildcard(require("react"));

var _single_metric_comparison = require("./single_metric_comparison");

var _single_metric_sparkline = require("./single_metric_sparkline");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogEntryCountSparkline = function LogEntryCountSparkline(_ref) {
  var currentCount = _ref.currentCount,
      histograms = _ref.histograms,
      timeRange = _ref.timeRange;
  var metric = (0, _react.useMemo)(function () {
    var _ref2, _histograms$find, _histograms$find$buck;

    return (_ref2 = (_histograms$find = histograms.find(function (histogram) {
      return histogram.histogramId === 'history';
    })) === null || _histograms$find === void 0 ? void 0 : (_histograms$find$buck = _histograms$find.buckets) === null || _histograms$find$buck === void 0 ? void 0 : _histograms$find$buck.map(function (_ref3) {
      var timestamp = _ref3.startTime,
          value = _ref3.logEntryCount;
      return {
        timestamp: timestamp,
        value: value
      };
    })) !== null && _ref2 !== void 0 ? _ref2 : [];
  }, [histograms]);
  var referenceCount = (0, _react.useMemo)(function () {
    var _ref4, _histograms$find2, _histograms$find2$buc, _histograms$find2$buc2;

    return (_ref4 = (_histograms$find2 = histograms.find(function (histogram) {
      return histogram.histogramId === 'reference';
    })) === null || _histograms$find2 === void 0 ? void 0 : (_histograms$find2$buc = _histograms$find2.buckets) === null || _histograms$find2$buc === void 0 ? void 0 : (_histograms$find2$buc2 = _histograms$find2$buc[0]) === null || _histograms$find2$buc2 === void 0 ? void 0 : _histograms$find2$buc2.logEntryCount) !== null && _ref4 !== void 0 ? _ref4 : 0;
  }, [histograms]);
  var overallTimeRange = (0, _react.useMemo)(function () {
    return {
      endTime: timeRange.endTime,
      startTime: timeRange.startTime - (timeRange.endTime - timeRange.startTime)
    };
  }, [timeRange.endTime, timeRange.startTime]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_single_metric_sparkline.SingleMetricSparkline, {
    metric: metric,
    timeRange: overallTimeRange
  }), _react.default.createElement(_single_metric_comparison.SingleMetricComparison, {
    previousValue: referenceCount,
    currentValue: currentCount
  }));
};

exports.LogEntryCountSparkline = LogEntryCountSparkline;