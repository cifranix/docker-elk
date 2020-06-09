"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalySeverityIndicatorList = void 0;

var _react = _interopRequireDefault(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

var _anomaly_severity_indicator = require("./anomaly_severity_indicator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnomalySeverityIndicatorList = function AnomalySeverityIndicatorList(_ref) {
  var datasets = _ref.datasets;
  return _react.default.createElement("ul", null, datasets.map(function (dataset) {
    var datasetLabel = (0, _log_analysis.getFriendlyNameForPartitionId)(dataset.name);
    return _react.default.createElement("li", {
      key: datasetLabel
    }, _react.default.createElement(_anomaly_severity_indicator.AnomalySeverityIndicator, {
      anomalyScore: dataset.maximumAnomalyScore
    }));
  }));
};

exports.AnomalySeverityIndicatorList = AnomalySeverityIndicatorList;