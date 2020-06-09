"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findActionRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../lib");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// config definition
const querySchema = _configSchema.schema.object({
  per_page: _configSchema.schema.number({
    defaultValue: 20,
    min: 0
  }),
  page: _configSchema.schema.number({
    defaultValue: 1,
    min: 1
  }),
  search: _configSchema.schema.maybe(_configSchema.schema.string()),
  default_search_operator: _configSchema.schema.oneOf([_configSchema.schema.literal('OR'), _configSchema.schema.literal('AND')], {
    defaultValue: 'OR'
  }),
  search_fields: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string()), _configSchema.schema.string()])),
  sort_field: _configSchema.schema.maybe(_configSchema.schema.string()),
  sort_order: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.literal('asc'), _configSchema.schema.literal('desc')])),
  has_reference: _configSchema.schema.maybe( // use nullable as maybe is currently broken
  // in config-schema
  _configSchema.schema.nullable(_configSchema.schema.object({
    type: _configSchema.schema.string(),
    id: _configSchema.schema.string()
  }))),
  fields: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string())),
  filter: _configSchema.schema.maybe(_configSchema.schema.string())
});

const findActionRoute = (router, licenseState) => {
  router.get({
    path: `${_common.BASE_ACTION_API_PATH}/_find`,
    validate: {
      query: querySchema
    },
    options: {
      tags: ['access:actions-read']
    }
  }, router.handleLegacyErrors(async function (context, req, res) {
    (0, _lib.verifyApiAccess)(licenseState);

    if (!context.actions) {
      return res.badRequest({
        body: 'RouteHandlerContext is not registered for actions'
      });
    }

    const actionsClient = context.actions.getActionsClient();
    const query = req.query;
    const options = {
      perPage: query.per_page,
      page: query.page,
      search: query.search,
      defaultSearchOperator: query.default_search_operator,
      sortField: query.sort_field,
      fields: query.fields,
      filter: query.filter,
      sortOrder: query.sort_order
    };

    if (query.search_fields) {
      options.searchFields = Array.isArray(query.search_fields) ? query.search_fields : [query.search_fields];
    }

    if (query.has_reference) {
      options.hasReference = query.has_reference;
    }

    const findResult = await actionsClient.find({
      options
    });
    return res.ok({
      body: findResult
    });
  }));
};

exports.findActionRoute = findActionRoute;