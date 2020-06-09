"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerExecuteRoute = registerExecuteRoute;

var _configSchema = require("@kbn/config-schema");

var _constants = require("../../../common/constants");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const bodySchema = _configSchema.schema.string();

function registerExecuteRoute({
  router,
  license
}) {
  router.post({
    path: `${_constants.API_BASE_PATH}/execute`,
    validate: {
      body: bodySchema
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const body = req.body;

    try {
      const callAsCurrentUser = ctx.core.elasticsearch.dataClient.callAsCurrentUser;
      const response = await callAsCurrentUser('scriptsPainlessExecute', {
        body
      });
      return res.ok({
        body: response
      });
    } catch (e) {
      if ((0, _lib.isEsError)(e)) {
        // Assume invalid painless script was submitted
        // Return 200 with error object
        return res.ok({
          body: e.body
        });
      }

      return res.internalError({
        body: e
      });
    }
  }));
}