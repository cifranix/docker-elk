"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLogEntriesRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _configSchema = require("@kbn/config-schema");

var _runtime_types = require("../../../common/runtime_types");

var _log_entries = require("../../../common/http_api/log_entries");

var _serialized_query = require("../../utils/serialized_query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const escapeHatch = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

const initLogEntriesRoute = ({
  framework,
  logEntries
}) => {
  framework.registerRoute({
    method: 'post',
    path: _log_entries.LOG_ENTRIES_PATH,
    validate: {
      body: escapeHatch
    }
  }, async (requestContext, request, response) => {
    try {
      const payload = (0, _pipeable.pipe)(_log_entries.logEntriesRequestRT.decode(request.body), (0, _Either.fold)((0, _runtime_types.throwErrors)(_boom.default.badRequest), _function.identity));
      const {
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp,
        sourceId,
        query,
        size
      } = payload;
      let entries;

      if ('center' in payload) {
        entries = await logEntries.getLogEntriesAround__new(requestContext, sourceId, {
          startTimestamp,
          endTimestamp,
          query: (0, _serialized_query.parseFilterQuery)(query),
          center: payload.center,
          size
        });
      } else {
        let cursor;

        if ('before' in payload) {
          cursor = {
            before: payload.before
          };
        } else if ('after' in payload) {
          cursor = {
            after: payload.after
          };
        }

        entries = await logEntries.getLogEntries(requestContext, sourceId, {
          startTimestamp,
          endTimestamp,
          query: (0, _serialized_query.parseFilterQuery)(query),
          cursor,
          size
        });
      }

      const hasEntries = entries.length > 0;
      return response.ok({
        body: _log_entries.logEntriesResponseRT.encode({
          data: {
            entries,
            topCursor: hasEntries ? entries[0].cursor : null,
            bottomCursor: hasEntries ? entries[entries.length - 1].cursor : null
          }
        })
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.initLogEntriesRoute = initLogEntriesRoute;