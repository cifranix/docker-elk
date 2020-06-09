"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCustomLinkRoute = exports.updateCustomLinkRoute = exports.createCustomLinkRoute = exports.listCustomLinksRoute = exports.customLinkTransactionRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _lodash = require("lodash");

var _custom_link_filter_options = require("../../../common/custom_link/custom_link_filter_options");

var _setup_request = require("../../lib/helpers/setup_request");

var _create_or_update_custom_link = require("../../lib/settings/custom_link/create_or_update_custom_link");

var _custom_link_types = require("../../lib/settings/custom_link/custom_link_types");

var _delete_custom_link = require("../../lib/settings/custom_link/delete_custom_link");

var _get_transaction = require("../../lib/settings/custom_link/get_transaction");

var _list_custom_links = require("../../lib/settings/custom_link/list_custom_links");

var _create_route = require("../create_route");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const customLinkTransactionRoute = (0, _create_route.createRoute)(core => ({
  path: '/api/apm/settings/custom_links/transaction',
  params: {
    query: _custom_link_types.filterOptionsRt
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      query
    } = context.params; // picks only the items listed in FILTER_OPTIONS

    const filters = (0, _lodash.pick)(query, _custom_link_filter_options.FILTER_OPTIONS);
    return await (0, _get_transaction.getTransaction)({
      setup,
      filters
    });
  }
}));
exports.customLinkTransactionRoute = customLinkTransactionRoute;
const listCustomLinksRoute = (0, _create_route.createRoute)(core => ({
  path: '/api/apm/settings/custom_links',
  params: {
    query: _custom_link_types.filterOptionsRt
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      query
    } = context.params; // picks only the items listed in FILTER_OPTIONS

    const filters = (0, _lodash.pick)(query, _custom_link_filter_options.FILTER_OPTIONS);
    return await (0, _list_custom_links.listCustomLinks)({
      setup,
      filters
    });
  }
}));
exports.listCustomLinksRoute = listCustomLinksRoute;
const createCustomLinkRoute = (0, _create_route.createRoute)(() => ({
  method: 'POST',
  path: '/api/apm/settings/custom_links',
  params: {
    body: _custom_link_types.payloadRt
  },
  options: {
    tags: ['access:apm', 'access:apm_write']
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const customLink = context.params.body;
    const res = await (0, _create_or_update_custom_link.createOrUpdateCustomLink)({
      customLink,
      setup
    });
    return res;
  }
}));
exports.createCustomLinkRoute = createCustomLinkRoute;
const updateCustomLinkRoute = (0, _create_route.createRoute)(() => ({
  method: 'PUT',
  path: '/api/apm/settings/custom_links/{id}',
  params: {
    path: t.type({
      id: t.string
    }),
    body: _custom_link_types.payloadRt
  },
  options: {
    tags: ['access:apm', 'access:apm_write']
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      id
    } = context.params.path;
    const customLink = context.params.body;
    const res = await (0, _create_or_update_custom_link.createOrUpdateCustomLink)({
      customLinkId: id,
      customLink,
      setup
    });
    return res;
  }
}));
exports.updateCustomLinkRoute = updateCustomLinkRoute;
const deleteCustomLinkRoute = (0, _create_route.createRoute)(() => ({
  method: 'DELETE',
  path: '/api/apm/settings/custom_links/{id}',
  params: {
    path: t.type({
      id: t.string
    })
  },
  options: {
    tags: ['access:apm', 'access:apm_write']
  },
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const {
      id
    } = context.params.path;
    const res = await (0, _delete_custom_link.deleteCustomLink)({
      customLinkId: id,
      setup
    });
    return res;
  }
}));
exports.deleteCustomLinkRoute = deleteCustomLinkRoute;