"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorDistributionRoute = exports.errorGroupsRoute = exports.errorsRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _create_route = require("./create_route");

var _get_distribution = require("../lib/errors/distribution/get_distribution");

var _get_error_group = require("../lib/errors/get_error_group");

var _get_error_groups = require("../lib/errors/get_error_groups");

var _setup_request = require("../lib/helpers/setup_request");

var _default_api_types = require("./default_api_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const errorsRoute = (0, _create_route.createRoute)(core => ({
  path: '/api/apm/services/{serviceName}/errors',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.partial({
      sortField: t.string,
      sortDirection: t.union([t.literal('asc'), t.literal('desc')])
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
      sortField,
      sortDirection
    } = params.query;
    return (0, _get_error_groups.getErrorGroups)({
      serviceName,
      sortField,
      sortDirection,
      setup
    });
  }
}));
exports.errorsRoute = errorsRoute;
const errorGroupsRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/errors/{groupId}',
  params: {
    path: t.type({
      serviceName: t.string,
      groupId: t.string
    }),
    query: t.intersection([_default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName,
      groupId
    } = context.params.path;
    return (0, _get_error_group.getErrorGroup)({
      serviceName,
      groupId,
      setup
    });
  }
}));
exports.errorGroupsRoute = errorGroupsRoute;
const errorDistributionRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/errors/distribution',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([t.partial({
      groupId: t.string
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
      groupId
    } = params.query;
    return (0, _get_distribution.getErrorDistribution)({
      serviceName,
      groupId,
      setup
    });
  }
}));
exports.errorDistributionRoute = errorDistributionRoute;