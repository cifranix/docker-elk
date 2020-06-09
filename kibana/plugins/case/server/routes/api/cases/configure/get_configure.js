"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetCaseConfigure = initGetCaseConfigure;

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetCaseConfigure({
  caseConfigureService,
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/configure',
    validate: false
  }, async (context, request, response) => {
    try {
      var _myCaseConfigure$save;

      const client = context.core.savedObjects.client;
      const myCaseConfigure = await caseConfigureService.find({
        client
      });
      return response.ok({
        body: myCaseConfigure.saved_objects.length > 0 ? _api.CaseConfigureResponseRt.encode({ ...myCaseConfigure.saved_objects[0].attributes,
          version: (_myCaseConfigure$save = myCaseConfigure.saved_objects[0].version) !== null && _myCaseConfigure$save !== void 0 ? _myCaseConfigure$save : ''
        }) : {}
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}