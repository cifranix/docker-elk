"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllCommentsResponseRt = exports.CommentsResponseRt = exports.CommentPatchRequestRt = exports.AllCommentsResponseRT = exports.CommentResponseRt = exports.CommentRequestRt = exports.CommentAttributesRt = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _user = require("../user");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CommentBasicRt = rt.type({
  comment: rt.string
});
const CommentAttributesRt = rt.intersection([CommentBasicRt, rt.type({
  created_at: rt.string,
  created_by: _user.UserRT,
  pushed_at: rt.union([rt.string, rt.null]),
  pushed_by: rt.union([_user.UserRT, rt.null]),
  updated_at: rt.union([rt.string, rt.null]),
  updated_by: rt.union([_user.UserRT, rt.null])
})]);
exports.CommentAttributesRt = CommentAttributesRt;
const CommentRequestRt = CommentBasicRt;
exports.CommentRequestRt = CommentRequestRt;
const CommentResponseRt = rt.intersection([CommentAttributesRt, rt.type({
  id: rt.string,
  version: rt.string
})]);
exports.CommentResponseRt = CommentResponseRt;
const AllCommentsResponseRT = rt.array(CommentResponseRt);
exports.AllCommentsResponseRT = AllCommentsResponseRT;
const CommentPatchRequestRt = rt.intersection([rt.partial(CommentRequestRt.props), rt.type({
  id: rt.string,
  version: rt.string
})]);
exports.CommentPatchRequestRt = CommentPatchRequestRt;
const CommentsResponseRt = rt.type({
  comments: rt.array(CommentResponseRt),
  page: rt.number,
  per_page: rt.number,
  total: rt.number
});
exports.CommentsResponseRt = CommentsResponseRt;
const AllCommentsResponseRt = rt.array(CommentResponseRt);
exports.AllCommentsResponseRt = AllCommentsResponseRt;