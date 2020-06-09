"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTransformsAuditMessagesRoutes = registerTransformsAuditMessagesRoutes;

var _error_wrappers = require("../../../../../legacy/server/lib/create_router/error_wrappers");

var _index = require("../index");

var _error_utils = require("./error_utils");

var _schema = require("./schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ML_DF_NOTIFICATION_INDEX_PATTERN = '.transform-notifications-read';
const SIZE = 500;

function registerTransformsAuditMessagesRoutes({
  router,
  license
}) {
  router.get({
    path: (0, _index.addBasePath)('transforms/{transformId}/messages'),
    validate: _schema.schemaTransformId
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      transformId
    } = req.params; // search for audit messages,
    // transformId is optional. without it, all transforms will be listed.

    const query = {
      bool: {
        filter: [{
          bool: {
            must_not: {
              term: {
                level: 'activity'
              }
            }
          }
        }]
      }
    }; // if no transformId specified, load all of the messages

    if (transformId !== undefined) {
      query.bool.filter.push({
        bool: {
          should: [{
            term: {
              transform_id: '' // catch system messages

            }
          }, {
            term: {
              transform_id: transformId // messages for specified transformId

            }
          }]
        }
      });
    }

    try {
      const resp = await ctx.transform.dataClient.callAsCurrentUser('search', {
        index: ML_DF_NOTIFICATION_INDEX_PATTERN,
        ignore_unavailable: true,
        rest_total_hits_as_int: true,
        size: SIZE,
        body: {
          sort: [{
            timestamp: {
              order: 'desc'
            }
          }, {
            transform_id: {
              order: 'asc'
            }
          }],
          query
        }
      });
      let messages = [];

      if (resp.hits.total !== 0) {
        messages = resp.hits.hits.map(hit => hit._source);
        messages.reverse();
      }

      return res.ok({
        body: messages
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
}