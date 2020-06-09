"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPostCaseConfigure = initPostCaseConfigure;

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
function initPostCaseConfigure({
  caseConfigureService,
  caseService,
  router
}) {
  router.post({
    path: '/api/cases/configure',
    validate: {
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      var _post$version;

      const client = context.core.savedObjects.client;
      const query = (0, _pipeable.pipe)(_api.CasesConfigureRequestRt.decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const myCaseConfigure = await caseConfigureService.find({
        client
      });

      if (myCaseConfigure.saved_objects.length > 0) {
        await Promise.all(myCaseConfigure.saved_objects.map(cc => caseConfigureService.delete({
          client,
          caseConfigureId: cc.id
        })));
      }

      const {
        email,
        full_name,
        username
      } = await caseService.getUser({
        request,
        response
      });
      const creationDate = new Date().toISOString();
      const post = await caseConfigureService.post({
        client,
        attributes: { ...query,
          created_at: creationDate,
          created_by: {
            email,
            full_name,
            username
          },
          updated_at: null,
          updated_by: null
        }
      });
      return response.ok({
        body: _api.CaseConfigureResponseRt.encode({ ...post.attributes,
          version: (_post$version = post.version) !== null && _post$version !== void 0 ? _post$version : ''
        })
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}