"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeCreateWorkpadRoute = initializeCreateWorkpadRoute;

var _constants = require("../../../../../legacy/plugins/canvas/common/lib/constants");

var _get_id = require("../../../../../legacy/plugins/canvas/public/lib/get_id");

var _workpad_schema = require("./workpad_schema");

var _ok_response = require("../ok_response");

var _catch_error_handler = require("../catch_error_handler");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initializeCreateWorkpadRoute(deps) {
  const {
    router
  } = deps;
  router.post({
    path: `${_constants.API_ROUTE_WORKPAD}`,
    validate: {
      body: _workpad_schema.WorkpadSchema
    },
    options: {
      body: {
        maxBytes: 26214400,
        accepts: ['application/json']
      }
    }
  }, (0, _catch_error_handler.catchErrorHandler)(async (context, request, response) => {
    if (!request.body) {
      return response.badRequest({
        body: 'A workpad payload is required'
      });
    }

    const workpad = request.body;
    const now = new Date().toISOString();
    const {
      id,
      ...payload
    } = workpad;
    await context.core.savedObjects.client.create(_constants.CANVAS_TYPE, { ...payload,
      '@timestamp': now,
      '@created': now
    }, {
      id: id || (0, _get_id.getId)('workpad')
    });
    return response.ok({
      body: _ok_response.okResponse
    });
  }));
}