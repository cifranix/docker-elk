"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAndTransformMetrics = fetchAndTransformMetrics;

var _metrics = require("../helpers/metrics");

var _transform_metrics_chart = require("./transform_metrics_chart");

var _metrics2 = require("../../../common/projections/metrics");

var _merge_projection = require("../../../common/projections/util/merge_projection");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetchAndTransformMetrics({
  setup,
  serviceName,
  serviceNodeName,
  chartBase,
  aggs,
  additionalFilters = []
}) {
  const {
    start,
    end,
    client
  } = setup;
  const projection = (0, _metrics2.getMetricsProjection)({
    setup,
    serviceName,
    serviceNodeName
  });
  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      size: 0,
      query: {
        bool: {
          filter: [...projection.body.query.bool.filter, ...additionalFilters]
        }
      },
      aggs: {
        timeseriesData: {
          date_histogram: (0, _metrics.getMetricsDateHistogramParams)(start, end),
          aggs
        },
        ...aggs
      }
    }
  });
  const response = await client.search(params);
  return (0, _transform_metrics_chart.transformDataToMetricsChart)(response, chartBase);
}