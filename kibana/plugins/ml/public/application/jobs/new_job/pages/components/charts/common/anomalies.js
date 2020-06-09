"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Anomalies = void 0;

var _react = _interopRequireWildcard(require("react"));

var _charts = require("@elastic/charts");

var _anomaly_utils = require("../../../../../../../../common/util/anomaly_utils");

var _anomalies = require("../../../../../../../../common/constants/anomalies");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAnomalyStyle(threshold) {
  return {
    line: {
      stroke: (0, _anomaly_utils.getSeverityColor)(threshold),
      strokeWidth: 3,
      opacity: 1
    }
  };
}

function splitAnomalySeverities(anomalies) {
  var severities = {
    critical: [],
    major: [],
    minor: [],
    warning: [],
    unknown: [],
    low: []
  };
  anomalies.forEach(function (a) {
    if (a.value !== 0) {
      severities[a.severity].push({
        dataValue: a.time
      });
    }
  });
  return severities;
}

var Anomalies = function Anomalies(_ref) {
  var anomalyData = _ref.anomalyData;
  var anomalies = anomalyData === undefined ? [] : anomalyData;
  var severities = splitAnomalySeverities(anomalies);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_charts.LineAnnotation, {
    id: "low",
    domainType: _charts.AnnotationDomainTypes.XDomain,
    dataValues: severities.low,
    style: getAnomalyStyle(_anomalies.ANOMALY_THRESHOLD.LOW),
    hideTooltips: true
  }), _react.default.createElement(_charts.LineAnnotation, {
    id: "warning",
    domainType: _charts.AnnotationDomainTypes.XDomain,
    dataValues: severities.warning,
    style: getAnomalyStyle(_anomalies.ANOMALY_THRESHOLD.WARNING),
    hideTooltips: true
  }), _react.default.createElement(_charts.LineAnnotation, {
    id: "minor",
    domainType: _charts.AnnotationDomainTypes.XDomain,
    dataValues: severities.minor,
    style: getAnomalyStyle(_anomalies.ANOMALY_THRESHOLD.MINOR),
    hideTooltips: true
  }), _react.default.createElement(_charts.LineAnnotation, {
    id: "major",
    domainType: _charts.AnnotationDomainTypes.XDomain,
    dataValues: severities.major,
    style: getAnomalyStyle(_anomalies.ANOMALY_THRESHOLD.MAJOR),
    hideTooltips: true
  }), _react.default.createElement(_charts.LineAnnotation, {
    id: "critical",
    domainType: _charts.AnnotationDomainTypes.XDomain,
    dataValues: severities.critical,
    style: getAnomalyStyle(_anomalies.ANOMALY_THRESHOLD.CRITICAL),
    hideTooltips: true
  }));
};

exports.Anomalies = Anomalies;