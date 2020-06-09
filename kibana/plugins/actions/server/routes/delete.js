"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteActionRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _lib = require("../lib");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramSchema = _configSchema.schema.object({
  id: _configSchema.schema.string()
});

const deleteActionRoute = (router, licenseState) => {
  router.delete({
    path: `${_common.BASE_ACTION_API_PATH}/{id}`,
    validate: {
      params: paramSchema
    },
    options: {
      tags: ['access:actions-all']
    }
  }, router.handleLegacyErrors(async function (context, req, res) {
    (0, _lib.verifyApiAccess)(licenseState);

    if (!context.actions) {
      return res.badRequest({
        body: 'RouteHandlerContext is not registered for actions'
      });
    }

    const actionsClient = context.actions.getActionsClient();
    const {
      id
    } = req.params;
    await actionsClient.delete({
      id
    });
    return res.noContent();
  }));
};

exports.deleteActionRoute = deleteActionRoute;