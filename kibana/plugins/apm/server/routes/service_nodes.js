"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceNodesRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _create_route = require("./create_route");

var _setup_request = require("../lib/helpers/setup_request");

var _service_nodes = require("../lib/service_nodes");

var _default_api_types = require("./default_api_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const serviceNodesRoute = (0, _create_route.createRoute)(core => ({
  path: '/api/apm/services/{serviceName}/serviceNodes',
  params: {
    path: t.type({
      serviceName: t.string
    }),
    query: t.intersection([_default_api_types.rangeRt, _default_api_types.uiFiltersRt])
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
    return (0, _service_nodes.getServiceNodes)({
      setup,
      serviceName
    });
  }
}));
exports.serviceNodesRoute = serviceNodesRoute;