"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricsChartsRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setup_request = require("../lib/helpers/setup_request");

var _get_metrics_chart_data_by_agent = require("../lib/metrics/get_metrics_chart_data_by_agent");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const metricsChartsRoute = (0, _create_route.createRoute)(() => ({
  path: `/api/apm/services/{serviceName}/metrics/charts`,
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.type({
      agentName: t.string
    }), t.partial({
      serviceNodeName: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      params
    } = context;
    const {
      serviceName
    } = params.path;
    const {
      agentName,
      serviceNodeName
    } = params.query;
    return await (0, _get_metrics_chart_data_by_agent.getMetricsChartDataByAgent)({
      setup,
      serviceName,
      agentName,
      serviceNodeName
    });
  }
}));
exports.metricsChartsRoute = metricsChartsRoute;