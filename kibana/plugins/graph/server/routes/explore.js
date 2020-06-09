"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerExploreRoute = registerExploreRoute;

var _configSchema = require("@kbn/config-schema");

var _boom = _interopRequireDefault(require("boom"));

var _lodash = require("lodash");

var _license_state = require("../lib/license_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerExploreRoute({
  router,
  licenseState
}) {
  router.post({
    path: '/api/graph/graphExplore',
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.string(),
        query: _configSchema.schema.object({}, {
          unknowns: 'allow'
        })
      })
    }
  }, router.handleLegacyErrors(async ({
    core: {
      elasticsearch: {
        dataClient: {
          callAsCurrentUser: callCluster
        }
      }
    }
  }, request, response) => {
    (0, _license_state.verifyApiAccess)(licenseState);

    try {
      return response.ok({
        body: {
          resp: await callCluster('transport.request', {
            path: '/' + encodeURIComponent(request.body.index) + '/_graph/explore',
            body: request.body.query,
            method: 'POST',
            query: {}
          })
        }
      });
    } catch (error) {
      // Extract known reasons for bad choice of field
      const relevantCause = (0, _lodash.get)(error, 'body.error.root_cause', []).find(cause => {
        return cause.reason.includes('Fielddata is disabled on text fields') || cause.reason.includes('No support for examining floating point') || cause.reason.includes('Sample diversifying key must be a single valued-field') || cause.reason.includes('Failed to parse query') || cause.type === 'parsing_exception';
      });

      if (relevantCause) {
        throw _boom.default.badRequest(relevantCause.reason);
      }

      return response.internalError({
        body: {
          message: error.message
        }
      });
    }
  }));
}