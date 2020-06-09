"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseUserActionsResponseRt = exports.CaseUserActionAttributesRt = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _user = require("../user");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* To the next developer, if you add/removed fields here
 * make sure to check this file (x-pack/plugins/case/server/services/user_actions/helpers.ts) too
 */
const UserActionFieldRt = rt.array(rt.union([rt.literal('comment'), rt.literal('description'), rt.literal('pushed'), rt.literal('tags'), rt.literal('title'), rt.literal('status')]));
const UserActionRt = rt.union([rt.literal('add'), rt.literal('create'), rt.literal('delete'), rt.literal('update'), rt.literal('push-to-service')]); // TO DO change state to status

const CaseUserActionBasicRT = rt.type({
  action_field: UserActionFieldRt,
  action: UserActionRt,
  action_at: rt.string,
  action_by: _user.UserRT,
  new_value: rt.union([rt.string, rt.null]),
  old_value: rt.union([rt.string, rt.null])
});
const CaseUserActionResponseRT = rt.intersection([CaseUserActionBasicRT, rt.type({
  action_id: rt.string,
  case_id: rt.string,
  comment_id: rt.union([rt.string, rt.null])
})]);
const CaseUserActionAttributesRt = CaseUserActionBasicRT;
exports.CaseUserActionAttributesRt = CaseUserActionAttributesRt;
const CaseUserActionsResponseRt = rt.array(CaseUserActionResponseRT);
exports.CaseUserActionsResponseRt = CaseUserActionsResponseRt;