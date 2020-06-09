"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageErrorCode = getPageErrorCode;
exports.PageError = PageError;

var _react = _interopRequireDefault(require("react"));

var _page_error_not_exist = require("./page_error_not_exist");

var _page_error_forbidden = require("./page_error_forbidden");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPageErrorCode(errorOrErrors) {
  var errors = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
  var firstError = errors.find(function (error) {
    if (error) {
      return [403, 404].includes(error.statusCode);
    }

    return false;
  });

  if (firstError) {
    return firstError.statusCode;
  }
}

function PageError(_ref) {
  var errorCode = _ref.errorCode,
      id = _ref.id;

  switch (errorCode) {
    case 404:
      return _react.default.createElement(_page_error_not_exist.PageErrorNotExist, {
        id: id
      });

    case 403:
    default:
      return _react.default.createElement(_page_error_forbidden.PageErrorForbidden, null);
  }
}