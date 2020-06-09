"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceNodesLocalFiltersRoute = exports.errorGroupsLocalFiltersRoute = exports.metricsLocalFiltersRoute = exports.transactionsLocalFiltersRoute = exports.tracesLocalFiltersRoute = exports.transactionGroupsLocalFiltersRoute = exports.servicesLocalFiltersRoute = exports.uiFiltersEnvironmentsRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _lodash = require("lodash");

var _setup_request = require("../lib/helpers/setup_request");

var _get_environments = require("../lib/ui_filters/get_environments");

var _config = require("../lib/ui_filters/local_ui_filters/config");

var _get_ui_filters_es = require("../lib/helpers/convert_ui_filters/get_ui_filters_es");

var _local_ui_filters = require("../lib/ui_filters/local_ui_filters");

var _services = require("../../common/projections/services");

var _transaction_groups = require("../../common/projections/transaction_groups");

var _metrics = require("../../common/projections/metrics");

var _errors = require("../../common/projections/errors");

var _transactions = require("../../common/projections/transactions");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

var _json_rt = require("../../common/runtime_types/json_rt");

var _service_nodes = require("../../common/projections/service_nodes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const uiFiltersEnvironmentsRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/ui_filters/environments',
  params: {
    query: t.intersection([t.partial({
      serviceName: t.string
    }), _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.query;
    return (0, _get_environments.getEnvironments)(setup, serviceName);
  }
}));
exports.uiFiltersEnvironmentsRoute = uiFiltersEnvironmentsRoute;
const filterNamesRt = t.type({
  filterNames: _json_rt.jsonRt.pipe(t.array(t.keyof(Object.fromEntries(_config.localUIFilterNames.map(filterName => [filterName, null])))))
});
const localUiBaseQueryRt = t.intersection([filterNamesRt, _default_api_types.uiFiltersRt, _default_api_types.rangeRt]);

function createLocalFiltersRoute({
  path,
  getProjection,
  queryRt
}) {
  return (0, _create_route.createRoute)(() => ({
    path,
    params: {
      query: t.intersection([localUiBaseQueryRt, queryRt])
    },
    handler: async ({
      context,
      request
    }) => {
      const setup = await (0, _setup_request.setupRequest)(context, request);
      const {
        query
      } = context.params;
      const {
        uiFilters,
        filterNames
      } = query;
      const parsedUiFilters = JSON.parse(uiFilters);
      const projection = getProjection({
        query,
        setup: { ...setup,
          uiFiltersES: (0, _get_ui_filters_es.getUiFiltersES)(setup.dynamicIndexPattern, (0, _lodash.omit)(parsedUiFilters, filterNames))
        }
      });
      return (0, _local_ui_filters.getLocalUIFilters)({
        projection,
        setup,
        uiFilters: parsedUiFilters,
        localFilterNames: filterNames
      });
    }
  }));
}

const servicesLocalFiltersRoute = createLocalFiltersRoute({
  path: `/api/apm/ui_filters/local_filters/services`,
  getProjection: ({
    setup
  }) => (0, _services.getServicesProjection)({
    setup
  }),
  queryRt: t.type({})
});
exports.servicesLocalFiltersRoute = servicesLocalFiltersRoute;
const transactionGroupsLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/transactionGroups',
  getProjection: ({
    setup,
    query
  }) => {
    const {
      transactionType,
      serviceName,
      transactionName
    } = query;
    return (0, _transaction_groups.getTransactionGroupsProjection)({
      setup,
      options: {
        type: 'top_transactions',
        transactionType,
        serviceName,
        transactionName
      }
    });
  },
  queryRt: t.intersection([t.type({
    serviceName: t.string,
    transactionType: t.string
  }), t.partial({
    transactionName: t.string
  })])
});
exports.transactionGroupsLocalFiltersRoute = transactionGroupsLocalFiltersRoute;
const tracesLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/traces',
  getProjection: ({
    setup
  }) => {
    return (0, _transaction_groups.getTransactionGroupsProjection)({
      setup,
      options: {
        type: 'top_traces'
      }
    });
  },
  queryRt: t.type({})
});
exports.tracesLocalFiltersRoute = tracesLocalFiltersRoute;
const transactionsLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/transactions',
  getProjection: ({
    setup,
    query
  }) => {
    const {
      transactionType,
      serviceName,
      transactionName
    } = query;
    return (0, _transactions.getTransactionsProjection)({
      setup,
      transactionType,
      serviceName,
      transactionName
    });
  },
  queryRt: t.type({
    transactionType: t.string,
    transactionName: t.string,
    serviceName: t.string
  })
});
exports.transactionsLocalFiltersRoute = transactionsLocalFiltersRoute;
const metricsLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/metrics',
  getProjection: ({
    setup,
    query
  }) => {
    const {
      serviceName,
      serviceNodeName
    } = query;
    return (0, _metrics.getMetricsProjection)({
      setup,
      serviceName,
      serviceNodeName
    });
  },
  queryRt: t.intersection([t.type({
    serviceName: t.string
  }), t.partial({
    serviceNodeName: t.string
  })])
});
exports.metricsLocalFiltersRoute = metricsLocalFiltersRoute;
const errorGroupsLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/errorGroups',
  getProjection: ({
    setup,
    query
  }) => {
    const {
      serviceName
    } = query;
    return (0, _errors.getErrorGroupsProjection)({
      setup,
      serviceName
    });
  },
  queryRt: t.type({
    serviceName: t.string
  })
});
exports.errorGroupsLocalFiltersRoute = errorGroupsLocalFiltersRoute;
const serviceNodesLocalFiltersRoute = createLocalFiltersRoute({
  path: '/api/apm/ui_filters/local_filters/serviceNodes',
  getProjection: ({
    setup,
    query
  }) => {
    return (0, _service_nodes.getServiceNodesProjection)({
      setup,
      serviceName: query.serviceName
    });
  },
  queryRt: t.type({
    serviceName: t.string
  })
});
exports.serviceNodesLocalFiltersRoute = serviceNodesLocalFiltersRoute;