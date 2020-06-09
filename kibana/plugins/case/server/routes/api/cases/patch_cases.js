"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPatchCasesApi = initPatchCasesApi;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _api = require("../../../../common/api");

var _utils = require("../utils");

var _helpers = require("./helpers");

var _helpers2 = require("../../../services/user_actions/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPatchCasesApi({
  caseService,
  router,
  userActionService
}) {
  router.patch({
    path: '/api/cases',
    validate: {
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const query = (0, _pipeable.pipe)((0, _api.excess)(_api.CasesPatchRequestRt).decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const myCases = await caseService.getCases({
        client,
        caseIds: query.cases.map(q => q.id)
      });
      let nonExistingCases = [];
      const conflictedCases = query.cases.filter(q => {
        const myCase = myCases.saved_objects.find(c => c.id === q.id);

        if (myCase && myCase.error) {
          nonExistingCases = [...nonExistingCases, q];
          return false;
        }

        return myCase == null || (myCase === null || myCase === void 0 ? void 0 : myCase.version) !== q.version;
      });

      if (nonExistingCases.length > 0) {
        throw _boom.default.notFound(`These cases ${nonExistingCases.map(c => c.id).join(', ')} do not exist. Please check you have the correct ids.`);
      }

      if (conflictedCases.length > 0) {
        throw _boom.default.conflict(`These cases ${conflictedCases.map(c => c.id).join(', ')} has been updated. Please refresh before saving additional updates.`);
      }

      const updateCases = query.cases.map(thisCase => {
        const currentCase = myCases.saved_objects.find(c => c.id === thisCase.id);
        return currentCase != null ? (0, _helpers.getCaseToUpdate)(currentCase.attributes, thisCase) : {
          id: thisCase.id,
          version: thisCase.version
        };
      });
      const updateFilterCases = updateCases.filter(updateCase => {
        const {
          id,
          version,
          ...updateCaseAttributes
        } = updateCase;
        return Object.keys(updateCaseAttributes).length > 0;
      });

      if (updateFilterCases.length > 0) {
        const {
          username,
          full_name,
          email
        } = await caseService.getUser({
          request,
          response
        });
        const updatedDt = new Date().toISOString();
        const updatedCases = await caseService.patchCases({
          client,
          cases: updateFilterCases.map(thisCase => {
            const {
              id: caseId,
              version,
              ...updateCaseAttributes
            } = thisCase;
            let closedInfo = {};

            if (updateCaseAttributes.status && updateCaseAttributes.status === 'closed') {
              closedInfo = {
                closed_at: updatedDt,
                closed_by: {
                  email,
                  full_name,
                  username
                }
              };
            } else if (updateCaseAttributes.status && updateCaseAttributes.status === 'open') {
              closedInfo = {
                closed_at: null,
                closed_by: null
              };
            }

            return {
              caseId,
              updatedAttributes: { ...updateCaseAttributes,
                ...closedInfo,
                updated_at: updatedDt,
                updated_by: {
                  email,
                  full_name,
                  username
                }
              },
              version
            };
          })
        });
        const returnUpdatedCase = myCases.saved_objects.filter(myCase => updatedCases.saved_objects.some(updatedCase => updatedCase.id === myCase.id)).map(myCase => {
          var _ref;

          const updatedCase = updatedCases.saved_objects.find(c => c.id === myCase.id);
          return (0, _utils.flattenCaseSavedObject)({ ...myCase,
            ...updatedCase,
            attributes: { ...myCase.attributes,
              ...(updatedCase === null || updatedCase === void 0 ? void 0 : updatedCase.attributes)
            },
            references: myCase.references,
            version: (_ref = updatedCase === null || updatedCase === void 0 ? void 0 : updatedCase.version) !== null && _ref !== void 0 ? _ref : myCase.version
          });
        });
        await userActionService.postUserActions({
          client,
          actions: (0, _helpers2.buildCaseUserActions)({
            originalCases: myCases.saved_objects,
            updatedCases: updatedCases.saved_objects,
            actionDate: updatedDt,
            actionBy: {
              email,
              full_name,
              username
            }
          })
        });
        return response.ok({
          body: _api.CasesResponseRt.encode(returnUpdatedCase)
        });
      }

      throw _boom.default.notAcceptable('All update fields are identical to current version.');
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}