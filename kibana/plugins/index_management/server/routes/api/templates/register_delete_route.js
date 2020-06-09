"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDeleteRoute = registerDeleteRoute;

var _configSchema = require("@kbn/config-schema");

var _index = require("../index");

var _helpers = require("../../helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramsSchema = _configSchema.schema.object({
  names: _configSchema.schema.string()
});

function registerDeleteRoute({
  router,
  license
}) {
  router.delete({
    path: (0, _index.addBasePath)('/templates/{names}'),
    validate: {
      params: paramsSchema
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      names
    } = req.params;
    const templateNames = names.split(',');
    const response = {
      templatesDeleted: [],
      errors: []
    };
    await Promise.all(templateNames.map(async name => {
      try {
        await ctx.core.elasticsearch.dataClient.callAsCurrentUser('indices.deleteTemplate', {
          name
        });
        return response.templatesDeleted.push(name);
      } catch (e) {
        return response.errors.push({
          name,
          error: (0, _helpers.wrapEsError)(e)
        });
      }
    }));
    return res.ok({
      body: response
    });
  }));
}