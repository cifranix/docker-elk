"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalySeverityIndicator = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnomalySeverityIndicator = function AnomalySeverityIndicator(_ref) {
  var anomalyScore = _ref.anomalyScore;
  var severityColor = (0, _react.useMemo)(function () {
    return getColorForAnomalyScore(anomalyScore);
  }, [anomalyScore]);
  return _react.default.createElement(_eui.EuiHealth, {
    color: severityColor
  }, (0, _log_analysis.formatAnomalyScore)(anomalyScore));
};

exports.AnomalySeverityIndicator = AnomalySeverityIndicator;

var getColorForAnomalyScore = function getColorForAnomalyScore(anomalyScore) {
  var severityCategory = (0, _log_analysis.getSeverityCategoryForScore)(anomalyScore);

  if (severityCategory != null && severityCategory in _log_analysis.ML_SEVERITY_COLORS) {
    return _log_analysis.ML_SEVERITY_COLORS[severityCategory];
  } else {
    return 'subdued';
  }
};