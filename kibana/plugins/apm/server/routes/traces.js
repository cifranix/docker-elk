"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracesByIdRoute = exports.tracesRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setup_request = require("../lib/helpers/setup_request");

var _get_trace = require("../lib/traces/get_trace");

var _transaction_groups = require("../lib/transaction_groups");

var _create_route = require("./create_route");

var _default_api_types = require("./default_api_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const tracesRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/traces',
  params: {
    query: t.intersection([_default_api_types.rangeRt, _default_api_types.uiFiltersRt])
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    return (0, _transaction_groups.getTransactionGroupList)({
      type: 'top_traces'
    }, setup);
  }
}));
exports.tracesRoute = tracesRoute;
const tracesByIdRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/traces/{traceId}',
  params: {
    path: t.type({
      traceId: t.string
    }),
    query: _default_api_types.rangeRt
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    return (0, _get_trace.getTrace)(context.params.path.traceId, setup);
  }
}));
exports.tracesByIdRoute = tracesByIdRoute;