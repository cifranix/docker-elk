"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listActionTypesRoute = void 0;

var _lib = require("../lib");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const listActionTypesRoute = (router, licenseState) => {
  router.get({
    path: `${_common.BASE_ACTION_API_PATH}/types`,
    validate: {},
    options: {
      tags: ['access:actions-read']
    }
  }, router.handleLegacyErrors(async function (context, req, res) {
    (0, _lib.verifyApiAccess)(licenseState);

    if (!context.actions) {
      return res.badRequest({
        body: 'RouteHandlerContext is not registered for actions'
      });
    }

    return res.ok({
      body: context.actions.listTypes()
    });
  }));
};

exports.listActionTypesRoute = listActionTypesRoute;