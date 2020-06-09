"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceMapServiceNodeRoute = exports.serviceMapRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var t = _interopRequireWildcard(require("io-ts"));

var _service_map = require("../../common/service_map");

var _setup_request = require("../lib/helpers/setup_request");

var _get_service_map = require("../lib/service_map/get_service_map");

var _get_service_map_service_node_info = require("../lib/service_map/get_service_map_service_node_info");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const serviceMapRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/service-map',
  params: {
    query: t.intersection([t.partial({
      environment: t.string,
      serviceName: t.string
    }), _default_api_types.rangeRt])
  },
  handler: async ({
    context,
    request
  }) => {
    if (!context.config['xpack.apm.serviceMapEnabled']) {
      throw _boom.default.notFound();
    }

    if (!(0, _service_map.isValidPlatinumLicense)(context.licensing.license)) {
      throw _boom.default.forbidden(_service_map.invalidLicenseMessage);
    }

    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      query: {
        serviceName,
        environment
      }
    } = context.params;
    return (0, _get_service_map.getServiceMap)({
      setup,
      serviceName,
      environment
    });
  }
}));
exports.serviceMapRoute = serviceMapRoute;
const serviceMapServiceNodeRoute = (0, _create_route.createRoute)(() => ({
  path: `/api/apm/service-map/service/{serviceName}`,
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
    if (!context.config['xpack.apm.serviceMapEnabled']) {
      throw _boom.default.notFound();
    }

    if (!(0, _service_map.isValidPlatinumLicense)(context.licensing.license)) {
      throw _boom.default.forbidden(_service_map.invalidLicenseMessage);
    }

    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      query: {
        environment
      },
      path: {
        serviceName
      }
    } = context.params;
    return (0, _get_service_map_service_node_info.getServiceMapServiceNodeInfo)({
      setup,
      serviceName,
      environment
    });
  }
}));
exports.serviceMapServiceNodeRoute = serviceMapServiceNodeRoute;