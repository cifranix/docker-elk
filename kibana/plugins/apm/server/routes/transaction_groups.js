"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionGroupsAvgDurationByCountry = exports.transactionGroupsAvgDurationByBrowser = exports.transactionGroupsBreakdownRoute = exports.transactionGroupsDistributionRoute = exports.transactionGroupsChartsRoute = exports.transactionGroupsRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setup_request = require("../lib/helpers/setup_request");

var _charts = require("../lib/transactions/charts");

var _distribution = require("../lib/transactions/distribution");

var _breakdown = require("../lib/transactions/breakdown");

var _transaction_groups = require("../lib/transaction_groups");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

var _avg_duration_by_browser = require("../lib/transactions/avg_duration_by_browser");

var _avg_duration_by_country = require("../lib/transactions/avg_duration_by_country");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transactionGroupsRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/transaction_groups',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.type({
      transactionType: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    const {
      transactionType
    } = context.params.query;
    return (0, _transaction_groups.getTransactionGroupList)({
      type: 'top_transactions',
      serviceName,
      transactionType
    }, setup);
  }
}));
exports.transactionGroupsRoute = transactionGroupsRoute;
const transactionGroupsChartsRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/transaction_groups/charts',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.partial({
      transactionType: t.string,
      transactionName: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    const {
      transactionType,
      transactionName
    } = context.params.query;
    return (0, _charts.getTransactionCharts)({
      serviceName,
      transactionType,
      transactionName,
      setup
    });
  }
}));
exports.transactionGroupsChartsRoute = transactionGroupsChartsRoute;
const transactionGroupsDistributionRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/transaction_groups/distribution',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.type({
      transactionType: t.string,
      transactionName: t.string
    }), t.partial({
      transactionId: t.string,
      traceId: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    const {
      transactionType,
      transactionName,
      transactionId = '',
      traceId = ''
    } = context.params.query;
    return (0, _distribution.getTransactionDistribution)({
      serviceName,
      transactionType,
      transactionName,
      transactionId,
      traceId,
      setup
    });
  }
}));
exports.transactionGroupsDistributionRoute = transactionGroupsDistributionRoute;
const transactionGroupsBreakdownRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/transaction_groups/breakdown',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.type({
      transactionType: t.string
    }), t.partial({
      transactionName: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    const {
      transactionName,
      transactionType
    } = context.params.query;
    return (0, _breakdown.getTransactionBreakdown)({
      serviceName,
      transactionName,
      transactionType,
      setup
    });
  }
}));
exports.transactionGroupsBreakdownRoute = transactionGroupsBreakdownRoute;
const transactionGroupsAvgDurationByBrowser = (0, _create_route.createRoute)(() => ({
  path: `/api/apm/services/{serviceName}/transaction_groups/avg_duration_by_browser`,
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.partial({
      transactionType: t.string,
      transactionName: t.string
    }), _default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    return (0, _avg_duration_by_browser.getTransactionAvgDurationByBrowser)({
      serviceName,
      setup
    });
  }
}));
exports.transactionGroupsAvgDurationByBrowser = transactionGroupsAvgDurationByBrowser;
const transactionGroupsAvgDurationByCountry = (0, _create_route.createRoute)(() => ({
  path: `/api/apm/services/{serviceName}/transaction_groups/avg_duration_by_country`,
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([_default_api_types.uiFiltersRt, _default_api_types.rangeRt, t.partial({
      transactionName: t.string
    })])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    const {
      transactionName
    } = context.params.query;
    return (0, _avg_duration_by_country.getTransactionAvgDurationByCountry)({
      serviceName,
      transactionName,
      setup
    });
  }
}));
exports.transactionGroupsAvgDurationByCountry = transactionGroupsAvgDurationByCountry;