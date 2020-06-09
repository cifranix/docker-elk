"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartGrid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _split_cards = require("../split_cards");

var _detector_title = require("../detector_title");

var _anomaly_chart = require("../../../charts/anomaly_chart");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ChartGrid = function ChartGrid(_ref) {
  var aggFieldPairList = _ref.aggFieldPairList,
      chartSettings = _ref.chartSettings,
      splitField = _ref.splitField,
      fieldValues = _ref.fieldValues,
      lineChartsData = _ref.lineChartsData,
      modelData = _ref.modelData,
      anomalyData = _ref.anomalyData,
      deleteDetector = _ref.deleteDetector,
      jobType = _ref.jobType,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading;
  var animateSplit = (0, _split_cards.useAnimateSplit)();
  return _react.default.createElement(_split_cards.SplitCards, {
    fieldValues: fieldValues,
    splitField: splitField,
    numberOfDetectors: aggFieldPairList.length,
    jobType: jobType,
    animate: animateSplit
  }, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: chartSettings.cols
  }, aggFieldPairList.map(function (af, i) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: i,
      "data-test-subj": "mlDetector ".concat(i)
    }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_detector_title.DetectorTitle, {
      index: i,
      agg: aggFieldPairList[i].agg,
      field: aggFieldPairList[i].field,
      deleteDetector: deleteDetector
    }), _react.default.createElement(_anomaly_chart.AnomalyChart, {
      chartType: _anomaly_chart.CHART_TYPE.LINE,
      chartData: lineChartsData[i],
      modelData: modelData[i],
      anomalyData: anomalyData[i],
      height: chartSettings.height,
      width: chartSettings.width,
      loading: loading
    })));
  })));
};

exports.ChartGrid = ChartGrid;