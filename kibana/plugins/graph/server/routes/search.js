"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSearchRoute = registerSearchRoute;

var _configSchema = require("@kbn/config-schema");

var _license_state = require("../lib/license_state");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerSearchRoute({
  router,
  licenseState
}) {
  router.post({
    path: '/api/graph/searchProxy',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string(),
        body: _configSchema.schema.object({}, {
          unknowns: 'allow'
        })
      })
    }
  }, router.handleLegacyErrors(async ({
    core: {
      uiSettings: {
        client: uiSettings
      },
      elasticsearch: {
        dataClient: {
          callAsCurrentUser: callCluster
        }
      }
    }
  }, request, response) => {
    (0, _license_state.verifyApiAccess)(licenseState);
    const includeFrozen = await uiSettings.get('search:includeFrozen');

    try {
      return response.ok({
        body: {
          resp: await callCluster('search', {
            index: request.body.index,
            body: request.body.body,
            rest_total_hits_as_int: true,
            ignore_throttled: !includeFrozen
          })
        }
      });
    } catch (error) {
      return response.customError({
        statusCode: error.statusCode || 500,
        body: {
          message: error.message
        }
      });
    }
  }));
}