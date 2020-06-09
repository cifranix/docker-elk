"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionCharts = getTransactionCharts;

var _get_anomaly_data = require("./get_anomaly_data");

var _get_timeseries_data = require("./get_timeseries_data");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDates(apmTimeseries) {
  return apmTimeseries.responseTimes.avg.map(p => p.x);
}

async function getTransactionCharts(options) {
  const apmTimeseries = await (0, _get_timeseries_data.getApmTimeseriesData)(options);
  const anomalyTimeseries = await (0, _get_anomaly_data.getAnomalySeries)({ ...options,
    timeSeriesDates: getDates(apmTimeseries)
  });
  return {
    apmTimeseries,
    anomalyTimeseries
  };
}