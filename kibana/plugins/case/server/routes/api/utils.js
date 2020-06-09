"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapError = wrapError;
exports.escapeHatch = exports.sortToSnake = exports.flattenCommentSavedObject = exports.flattenCommentSavedObjects = exports.transformComments = exports.flattenCaseSavedObject = exports.flattenCaseSavedObjects = exports.transformCases = exports.transformNewComment = exports.transformNewCase = void 0;

var _configSchema = require("@kbn/config-schema");

var _boom = require("boom");

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const transformNewCase = ({
  createdDate,
  email,
  full_name,
  newCase,
  username
}) => ({ ...newCase,
  closed_at: null,
  closed_by: null,
  created_at: createdDate,
  created_by: {
    email,
    full_name,
    username
  },
  external_service: null,
  status: 'open',
  updated_at: null,
  updated_by: null
});

exports.transformNewCase = transformNewCase;

const transformNewComment = ({
  comment,
  createdDate,
  email,
  full_name,
  username
}) => ({
  comment,
  created_at: createdDate,
  created_by: {
    email,
    full_name,
    username
  },
  pushed_at: null,
  pushed_by: null,
  updated_at: null,
  updated_by: null
});

exports.transformNewComment = transformNewComment;

function wrapError(error) {
  var _error$statusCode;

  const options = {
    statusCode: (_error$statusCode = error.statusCode) !== null && _error$statusCode !== void 0 ? _error$statusCode : 500
  };
  const boom = (0, _boom.isBoom)(error) ? error : (0, _boom.boomify)(error, options);
  return {
    body: boom,
    headers: boom.output.headers,
    statusCode: boom.output.statusCode
  };
}

const transformCases = (cases, countOpenCases, countClosedCases, totalCommentByCase) => ({
  page: cases.page,
  per_page: cases.per_page,
  total: cases.total,
  cases: flattenCaseSavedObjects(cases.saved_objects, totalCommentByCase),
  count_open_cases: countOpenCases,
  count_closed_cases: countClosedCases
});

exports.transformCases = transformCases;

const flattenCaseSavedObjects = (savedObjects, totalCommentByCase) => savedObjects.reduce((acc, savedObject) => {
  var _ref, _totalCommentByCase$f;

  return [...acc, flattenCaseSavedObject(savedObject, [], (_ref = (_totalCommentByCase$f = totalCommentByCase.find(tc => tc.caseId === savedObject.id)) === null || _totalCommentByCase$f === void 0 ? void 0 : _totalCommentByCase$f.totalComments) !== null && _ref !== void 0 ? _ref : 0)];
}, []);

exports.flattenCaseSavedObjects = flattenCaseSavedObjects;

const flattenCaseSavedObject = (savedObject, comments = [], totalComment = 0) => {
  var _savedObject$version;

  return {
    id: savedObject.id,
    version: (_savedObject$version = savedObject.version) !== null && _savedObject$version !== void 0 ? _savedObject$version : '0',
    comments: flattenCommentSavedObjects(comments),
    totalComment,
    ...savedObject.attributes
  };
};

exports.flattenCaseSavedObject = flattenCaseSavedObject;

const transformComments = comments => ({
  page: comments.page,
  per_page: comments.per_page,
  total: comments.total,
  comments: flattenCommentSavedObjects(comments.saved_objects)
});

exports.transformComments = transformComments;

const flattenCommentSavedObjects = savedObjects => savedObjects.reduce((acc, savedObject) => {
  return [...acc, flattenCommentSavedObject(savedObject)];
}, []);

exports.flattenCommentSavedObjects = flattenCommentSavedObjects;

const flattenCommentSavedObject = savedObject => {
  var _savedObject$version2;

  return {
    id: savedObject.id,
    version: (_savedObject$version2 = savedObject.version) !== null && _savedObject$version2 !== void 0 ? _savedObject$version2 : '0',
    ...savedObject.attributes
  };
};

exports.flattenCommentSavedObject = flattenCommentSavedObject;

const sortToSnake = sortField => {
  switch (sortField) {
    case 'status':
      return _types.SortFieldCase.status;

    case 'createdAt':
    case 'created_at':
      return _types.SortFieldCase.createdAt;

    case 'closedAt':
    case 'closed_at':
      return _types.SortFieldCase.closedAt;

    default:
      return _types.SortFieldCase.createdAt;
  }
};

exports.sortToSnake = sortToSnake;

const escapeHatch = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

exports.escapeHatch = escapeHatch;