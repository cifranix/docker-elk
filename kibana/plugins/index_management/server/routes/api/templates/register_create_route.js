"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCreateRoute = registerCreateRoute;

var _i18n = require("@kbn/i18n");

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

const querySchema = _configSchema.schema.object({
  include_type_name: _configSchema.schema.maybe(_configSchema.schema.string())
});

function registerCreateRoute({
  router,
  license,
  lib
}) {
  router.put({
    path: (0, _index.addBasePath)('/templates'),
    validate: {
      body: bodySchema,
      query: querySchema
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      callAsCurrentUser
    } = ctx.core.elasticsearch.dataClient;
    const template = req.body;
    const {
      include_type_name
    } = req.query;
    const serializedTemplate = (0, _lib.serializeTemplate)(template);
    const {
      name,
      order,
      index_patterns,
      version,
      settings,
      mappings,
      aliases
    } = serializedTemplate; // Check that template with the same name doesn't already exist

    const templateExists = await callAsCurrentUser('indices.existsTemplate', {
      name
    });

    if (templateExists) {
      return res.conflict({
        body: new Error(_i18n.i18n.translate('xpack.idxMgmt.createRoute.duplicateTemplateIdErrorMessage', {
          defaultMessage: "There is already a template with name '{name}'.",
          values: {
            name
          }
        }))
      });
    }

    try {
      // Otherwise create new index template
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