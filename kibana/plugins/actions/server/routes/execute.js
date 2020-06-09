"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeActionRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../lib");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramSchema = _configSchema.schema.object({
  id: _configSchema.schema.string()
});

const bodySchema = _configSchema.schema.object({
  params: _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.any())
});

const executeActionRoute = (router, licenseState, actionExecutor) => {
  router.post({
    path: `${_common.BASE_ACTION_API_PATH}/{id}/_execute`,
    validate: {
      body: bodySchema,
      params: paramSchema
    },
    options: {
      tags: ['access:actions-read']
    }
  }, router.handleLegacyErrors(async function (context, req, res) {
    (0, _lib.verifyApiAccess)(licenseState);
    const {
      params
    } = req.body;
    const {
      id
    } = req.params;

    try {
      const body = await actionExecutor.execute({
        params,
        request: req,
        actionId: id
      });
      return body ? res.ok({
        body
      }) : res.noContent();
    } catch (e) {
      if ((0, _lib.isErrorThatHandlesItsOwnResponse)(e)) {
        return e.sendResponse(res);
      }

      throw e;
    }
  }));
};

exports.executeActionRoute = executeActionRoute;