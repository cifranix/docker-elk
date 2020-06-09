"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGetAllRoute = registerGetAllRoute;
exports.registerGetOneRoute = registerGetOneRoute;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../../../../common/lib");

var _get_managed_templates = require("../../../lib/get_managed_templates");

var _index = require("../index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerGetAllRoute({
  router,
  license
}) {
  router.get({
    path: (0, _index.addBasePath)('/templates'),
    validate: false
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      callAsCurrentUser
    } = ctx.core.elasticsearch.dataClient;
    const managedTemplatePrefix = await (0, _get_managed_templates.getManagedTemplatePrefix)(callAsCurrentUser);
    const indexTemplatesByName = await callAsCurrentUser('indices.getTemplate', {
      include_type_name: true
    });
    return res.ok({
      body: (0, _lib.deserializeTemplateList)(indexTemplatesByName, managedTemplatePrefix)
    });
  }));
}

const paramsSchema = _configSchema.schema.object({
  name: _configSchema.schema.string()
});

function registerGetOneRoute({
  router,
  license,
  lib
}) {
  router.get({
    path: (0, _index.addBasePath)('/templates/{name}'),
    validate: {
      params: paramsSchema
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      name
    } = req.params;
    const {
      callAsCurrentUser
    } = ctx.core.elasticsearch.dataClient;

    try {
      const managedTemplatePrefix = await (0, _get_managed_templates.getManagedTemplatePrefix)(callAsCurrentUser);
      const indexTemplateByName = await callAsCurrentUser('indices.getTemplate', {
        name,
        include_type_name: true
      });

      if (indexTemplateByName[name]) {
        return res.ok({
          body: (0, _lib.deserializeTemplate)({ ...indexTemplateByName[name],
            name
          }, managedTemplatePrefix)
        });
      }

      return res.notFound();
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