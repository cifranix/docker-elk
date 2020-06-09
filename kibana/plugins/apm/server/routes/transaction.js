"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionByTraceIdRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setup_request = require("../lib/helpers/setup_request");

var _get_transaction_by_trace = require("../lib/transactions/get_transaction_by_trace");

var _create_route = require("./create_route");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transactionByTraceIdRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/transaction/{traceId}',
  params: {
    path: t.type({
      traceId: t.string
    })
  },
  handler: async ({
    context,
    request
  }) => {
    const {
      traceId
    } = context.params.path;
    const setup = await (0, _setup_request.setupRequest)(context, request);
    return (0, _get_transaction_by_trace.getRootTransactionByTraceId)(traceId, setup);
  }
}));
exports.transactionByTraceIdRoute = transactionByTraceIdRoute;