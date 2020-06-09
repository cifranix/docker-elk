"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const register = ({
  router,
  getLicenseStatus,
  log
}) => {
  router.post({
    path: '/api/searchprofiler/profile',
    validate: {
      body: _configSchema.schema.object({
        query: _configSchema.schema.object({}, {
          unknowns: 'allow'
        }),
        index: _configSchema.schema.string()
      })
    }
  }, async (ctx, request, response) => {
    const currentLicenseStatus = getLicenseStatus();

    if (!currentLicenseStatus.valid) {
      return response.forbidden({
        body: {
          message: currentLicenseStatus.message
        }
      });
    }

    const {
      core: {
        elasticsearch
      }
    } = ctx;
    const {
      body: {
        query,
        index
      }
    } = request;
    const parsed = {
      // Activate profiler mode for this query.
      profile: true,
      ...query
    };
    const body = {
      index,
      body: JSON.stringify(parsed, null, 2)
    };

    try {
      const resp = await elasticsearch.dataClient.callAsCurrentUser('search', body);
      return response.ok({
        body: {
          ok: true,
          resp
        }
      });
    } catch (err) {
      log.error(err);
      return response.customError({
        statusCode: err.status || 500,
        body: err.body ? {
          message: err.message,
          attributes: err.body
        } : err
      });
    }
  });
};

exports.register = register;