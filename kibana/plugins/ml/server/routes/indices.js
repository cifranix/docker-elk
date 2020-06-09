"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indicesRoutes = indicesRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Indices routes.
 */
function indicesRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup Indices
   *
   * @api {post} /api/ml/indices/field_caps
   * @apiName FieldCaps
   * @apiDescription Retrieves the capabilities of fields among multiple indices.
   */
  router.post({
    path: '/api/ml/indices/field_caps',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.maybe(_configSchema.schema.string()),
        fields: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string()))
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        body: {
          index,
          fields: requestFields
        }
      } = request;
      const fields = requestFields !== undefined && Array.isArray(requestFields) ? requestFields.join(',') : '*';
      const result = await context.ml.mlClient.callAsCurrentUser('fieldCaps', {
        index,
        fields
      });
      return response.ok({
        body: result
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}