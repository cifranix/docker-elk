"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPostDynamicSettingsRoute = exports.createGetDynamicSettingsRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _Either = require("fp-ts/lib/Either");

var _PathReporter = require("io-ts/lib/PathReporter");

var _runtime_types = require("../../../../legacy/plugins/uptime/common/runtime_types");

var _saved_objects = require("../lib/saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetDynamicSettingsRoute = libs => ({
  method: 'GET',
  path: '/api/uptime/dynamic_settings',
  validate: false,
  options: {
    tags: ['access:uptime-read']
  },
  handler: async ({
    dynamicSettings
  }, _context, _request, response) => {
    return response.ok({
      body: dynamicSettings
    });
  }
});

exports.createGetDynamicSettingsRoute = createGetDynamicSettingsRoute;

const createPostDynamicSettingsRoute = libs => ({
  method: 'POST',
  path: '/api/uptime/dynamic_settings',
  validate: {
    body: _configSchema.schema.object({}, {
      unknowns: 'allow'
    })
  },
  options: {
    tags: ['access:uptime-write']
  },
  handler: async ({
    savedObjectsClient
  }, _context, request, response) => {
    const decoded = _runtime_types.DynamicSettingsType.decode(request.body);

    if ((0, _Either.isRight)(decoded)) {
      const newSettings = decoded.right;
      await _saved_objects.savedObjectsAdapter.setUptimeDynamicSettings(savedObjectsClient, newSettings);
      return response.ok({
        body: {
          success: true
        }
      });
    } else {
      const error = _PathReporter.PathReporter.report(decoded).join(', ');

      return response.badRequest({
        body: error
      });
    }
  }
});

exports.createPostDynamicSettingsRoute = createPostDynamicSettingsRoute;