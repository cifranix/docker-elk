"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActionTypeExecutorResult", {
  enumerable: true,
  get: function () {
    return _types.ActionTypeExecutorResult;
  }
});
exports.ServiceConnectorCaseResponseRt = exports.ServiceConnectorCaseParamsRt = exports.ServiceConnectorCommentParamsRt = exports.CasesResponseRt = exports.CasesPatchRequestRt = exports.CasePatchRequestRt = exports.CasesFindResponseRt = exports.CaseResponseRt = exports.CasesFindRequestRt = exports.CaseExternalServiceRequestRt = exports.CasePostRequestRt = exports.CaseAttributesRt = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _saved_object = require("../saved_object");

var _user = require("../user");

var _comment = require("./comment");

var _status = require("./status");

var _types = require("../../../../actions/server/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const StatusRt = rt.union([rt.literal('open'), rt.literal('closed')]);
const CaseBasicRt = rt.type({
  description: rt.string,
  status: StatusRt,
  tags: rt.array(rt.string),
  title: rt.string
});
const CaseExternalServiceBasicRt = rt.type({
  connector_id: rt.string,
  connector_name: rt.string,
  external_id: rt.string,
  external_title: rt.string,
  external_url: rt.string
});
const CaseFullExternalServiceRt = rt.union([rt.intersection([CaseExternalServiceBasicRt, rt.type({
  pushed_at: rt.string,
  pushed_by: _user.UserRT
})]), rt.null]);
const CaseAttributesRt = rt.intersection([CaseBasicRt, rt.type({
  closed_at: rt.union([rt.string, rt.null]),
  closed_by: rt.union([_user.UserRT, rt.null]),
  created_at: rt.string,
  created_by: _user.UserRT,
  external_service: CaseFullExternalServiceRt,
  updated_at: rt.union([rt.string, rt.null]),
  updated_by: rt.union([_user.UserRT, rt.null])
})]);
exports.CaseAttributesRt = CaseAttributesRt;
const CasePostRequestRt = rt.type({
  description: rt.string,
  tags: rt.array(rt.string),
  title: rt.string
});
exports.CasePostRequestRt = CasePostRequestRt;
const CaseExternalServiceRequestRt = CaseExternalServiceBasicRt;
exports.CaseExternalServiceRequestRt = CaseExternalServiceRequestRt;
const CasesFindRequestRt = rt.partial({
  tags: rt.union([rt.array(rt.string), rt.string]),
  status: StatusRt,
  reporters: rt.union([rt.array(rt.string), rt.string]),
  defaultSearchOperator: rt.union([rt.literal('AND'), rt.literal('OR')]),
  fields: rt.array(rt.string),
  page: _saved_object.NumberFromString,
  perPage: _saved_object.NumberFromString,
  search: rt.string,
  searchFields: rt.array(rt.string),
  sortField: rt.string,
  sortOrder: rt.union([rt.literal('desc'), rt.literal('asc')])
});
exports.CasesFindRequestRt = CasesFindRequestRt;
const CaseResponseRt = rt.intersection([CaseAttributesRt, rt.type({
  id: rt.string,
  totalComment: rt.number,
  version: rt.string
}), rt.partial({
  comments: rt.array(_comment.CommentResponseRt)
})]);
exports.CaseResponseRt = CaseResponseRt;
const CasesFindResponseRt = rt.intersection([rt.type({
  cases: rt.array(CaseResponseRt),
  page: rt.number,
  per_page: rt.number,
  total: rt.number
}), _status.CasesStatusResponseRt]);
exports.CasesFindResponseRt = CasesFindResponseRt;
const CasePatchRequestRt = rt.intersection([rt.partial(CaseBasicRt.props), rt.type({
  id: rt.string,
  version: rt.string
})]);
exports.CasePatchRequestRt = CasePatchRequestRt;
const CasesPatchRequestRt = rt.type({
  cases: rt.array(CasePatchRequestRt)
});
exports.CasesPatchRequestRt = CasesPatchRequestRt;
const CasesResponseRt = rt.array(CaseResponseRt);
/*
 * This type are related to this file below
 * x-pack/plugins/actions/server/builtin_action_types/servicenow/schema.ts
 * why because this schema is not share in a common folder
 * so we redefine then so we can use/validate types
 */

exports.CasesResponseRt = CasesResponseRt;
const ServiceConnectorUserParams = rt.type({
  fullName: rt.union([rt.string, rt.null]),
  username: rt.string
});
const ServiceConnectorCommentParamsRt = rt.type({
  commentId: rt.string,
  comment: rt.string,
  createdAt: rt.string,
  createdBy: ServiceConnectorUserParams,
  updatedAt: rt.union([rt.string, rt.null]),
  updatedBy: rt.union([ServiceConnectorUserParams, rt.null])
});
exports.ServiceConnectorCommentParamsRt = ServiceConnectorCommentParamsRt;
const ServiceConnectorCaseParamsRt = rt.intersection([rt.type({
  caseId: rt.string,
  createdAt: rt.string,
  createdBy: ServiceConnectorUserParams,
  incidentId: rt.union([rt.string, rt.null]),
  title: rt.string,
  updatedAt: rt.union([rt.string, rt.null]),
  updatedBy: rt.union([ServiceConnectorUserParams, rt.null])
}), rt.partial({
  description: rt.string,
  comments: rt.array(ServiceConnectorCommentParamsRt)
})]);
exports.ServiceConnectorCaseParamsRt = ServiceConnectorCaseParamsRt;
const ServiceConnectorCaseResponseRt = rt.intersection([rt.type({
  number: rt.string,
  incidentId: rt.string,
  pushedDate: rt.string,
  url: rt.string
}), rt.partial({
  comments: rt.array(rt.type({
    commentId: rt.string,
    pushedDate: rt.string
  }))
})]);
exports.ServiceConnectorCaseResponseRt = ServiceConnectorCaseResponseRt;