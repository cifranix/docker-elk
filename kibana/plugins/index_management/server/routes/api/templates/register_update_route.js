"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUpdateRoute = registerUpdateRoute;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../../../../common/lib");

var _index = require("../index");

var _validate_schemas = require("./validate_schemas");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const bodySchema = _validate_schemas.templateSchema;

const paramsSchema = _configSchema.schema.object({
  name: _configSchema.schema.string()
});

const querySchema = _configSchema.schema.object({
  include_type_name: _configSchema.schema.maybe(_configSchema.schema.string())
});

function registerUpdateRoute({
  router,
  license,
  lib
}) {
  router.put({
    path: (0, _index.addBasePath)('/templates/{name}'),
    validate: {
      body: bodySchema,
      params: paramsSchema,
      query: querySchema
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      callAsCurrentUser
    } = ctx.core.elasticsearch.dataClient;
    const {
      name
    } = req.params;
    const {
      include_type_name
    } = req.query;
    const template = req.body;
    const serializedTemplate = (0, _lib.serializeTemplate)(template);
    const {
      order,
      index_patterns,
      version,
      settings,
      mappings,
      aliases
    } = serializedTemplate; // Verify the template exists (ES will throw 404 if not)

    const doesExist = await callAsCurrentUser('indices.existsTemplate', {
      name
    });

    if (!doesExist) {
      return res.notFound();
    }

    try {
      // Next, update index template
      const response = await callAsCurrentUser('indices.putTemplate', {
        name,
        order,
        include_type_name,
        body: {
          index_patterns,
          version,
          settings,
          mappings,
          aliases
        }
      });
      return res.ok({
        body: response
      });
    } catch (e) {
      if (lib.isEsError(e)) {
        return res.customError({
          statusCode: e.statusCode,
          body: e
        });
      } // Case: default


      return res.internalError({
        body: e
      });
    }
  }));
}