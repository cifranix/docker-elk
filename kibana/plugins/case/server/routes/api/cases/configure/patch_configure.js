"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPatchCaseConfigure = initPatchCaseConfigure;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPatchCaseConfigure({
  caseConfigureService,
  caseService,
  router
}) {
  router.patch({
    path: '/api/cases/configure',
    validate: {
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      var _patch$version;

      const client = context.core.savedObjects.client;
      const query = (0, _pipeable.pipe)(_api.CasesConfigurePatchRt.decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const myCaseConfigure = await caseConfigureService.find({
        client
      });
      const {
        version,
        ...queryWithoutVersion
      } = query;

      if (myCaseConfigure.saved_objects.length === 0) {
        throw _boom.default.conflict('You can not patch this configuration since you did not created first with a post');
      }

      if (version !== myCaseConfigure.saved_objects[0].version) {
        throw _boom.default.conflict('This configuration has been updated. Please refresh before saving additional updates.');
      }

      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const updateDate = new Date().toISOString();
      const patch = await caseConfigureService.patch({
        client,
        caseConfigureId: myCaseConfigure.saved_objects[0].id,
        updatedAttributes: { ...queryWithoutVersion,
          updated_at: updateDate,
          updated_by: {
            email,
            full_name,
            username
          }
        }
      });
      return response.ok({
        body: _api.CaseConfigureResponseRt.encode({ ...myCaseConfigure.saved_objects[0].attributes,
          ...patch.attributes,
          version: (_patch$version = patch.version) !== null && _patch$version !== void 0 ? _patch$version : ''
        })
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}