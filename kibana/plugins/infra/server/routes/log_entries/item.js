"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLogEntriesItemRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _configSchema = require("@kbn/config-schema");

var _runtime_types = require("../../../common/runtime_types");

var _http_api = require("../../../common/http_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const escapeHatch = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

const initLogEntriesItemRoute = ({
  framework,
  sources,
  logEntries
}) => {
  framework.registerRoute({
    method: 'post',
    path: _http_api.LOG_ENTRIES_ITEM_PATH,
    validate: {
      body: escapeHatch
    }
  }, async (requestContext, request, response) => {
    try {
      const payload = (0, _pipeable.pipe)(_http_api.logEntriesItemRequestRT.decode(request.body), (0, _Either.fold)((0, _runtime_types.throwErrors)(_boom.default.badRequest), _function.identity));
      const {
        id,
        sourceId
      } = payload;
      const sourceConfiguration = (await sources.getSourceConfiguration(requestContext, sourceId)).configuration;
      const logEntry = await logEntries.getLogItem(requestContext, id, sourceConfiguration);
      return response.ok({
        body: _http_api.logEntriesItemResponseRT.encode({
          data: logEntry
        })
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.initLogEntriesItemRoute = initLogEntriesItemRoute;