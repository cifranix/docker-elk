"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceAnnotationsRoute = exports.serviceNodeMetadataRoute = exports.serviceTransactionTypesRoute = exports.serviceAgentNameRoute = exports.servicesRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setup_request = require("../lib/helpers/setup_request");

var _get_service_agent_name = require("../lib/services/get_service_agent_name");

var _get_services = require("../lib/services/get_services");

var _get_service_transaction_types = require("../lib/services/get_service_transaction_types");

var _get_service_node_metadata = require("../lib/services/get_service_node_metadata");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

var _annotations = require("../lib/services/annotations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const servicesRoute = (0, _create_route.createRoute)(core => ({
  path: '/api/apm/services',
  params: {
    query: t.intersection([_default_api_types.uiFiltersRt, _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const services = await (0, _get_services.getServices)(setup);
    return services;
  }
}));
exports.servicesRoute = servicesRoute;
const serviceAgentNameRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/agent_name',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: _default_api_types.rangeRt
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    return (0, _get_service_agent_name.getServiceAgentName)(serviceName, setup);
  }
}));
exports.serviceAgentNameRoute = serviceAgentNameRoute;
const serviceTransactionTypesRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/transaction_types',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: _default_api_types.rangeRt
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      serviceName
    } = context.params.path;
    return (0, _get_service_transaction_types.getServiceTransactionTypes)(serviceName, setup);
  }
}));
exports.serviceTransactionTypesRoute = serviceTransactionTypesRoute;
const serviceNodeMetadataRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/node/{serviceNodeName}/metadata',
  params: {
    path: t.type({
      serviceName: t.string,
      serviceNodeName: t.string
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
      serviceNodeName
    } = context.params.path;
    return (0, _get_service_node_metadata.getServiceNodeMetadata)({
      setup,
      serviceName,
      serviceNodeName
    });
  }
}));
exports.serviceNodeMetadataRoute = serviceNodeMetadataRoute;
const serviceAnnotationsRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/services/{serviceName}/annotations',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([_default_api_types.rangeRt, t.partial({
      environment: t.string
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
      environment
    } = context.params.query;
    return (0, _annotations.getServiceAnnotations)({
      setup,
      serviceName,
      environment
    });
  }
}));
exports.serviceAnnotationsRoute = serviceAnnotationsRoute;