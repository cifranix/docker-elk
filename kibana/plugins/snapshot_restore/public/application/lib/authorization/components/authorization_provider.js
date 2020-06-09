"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizationProvider = exports.AuthorizationContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _use_request = require("../../../services/http/use_request");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialValue = {
  isLoading: true,
  apiError: null,
  privileges: {
    hasAllPrivileges: true,
    missingPrivileges: {}
  }
};
var AuthorizationContext = (0, _react.createContext)(initialValue);
exports.AuthorizationContext = AuthorizationContext;

var AuthorizationProvider = function AuthorizationProvider(_ref) {
  var privilegesEndpoint = _ref.privilegesEndpoint,
      children = _ref.children;

  var _useRequest = (0, _use_request.useRequest)({
    path: privilegesEndpoint,
    method: 'get'
  }),
      isLoading = _useRequest.isLoading,
      error = _useRequest.error,
      privilegesData = _useRequest.data;

  var value = {
    isLoading: isLoading,
    privileges: isLoading ? {
      hasAllPrivileges: true,
      missingPrivileges: {}
    } : privilegesData,
    apiError: error ? error : null
  };
  return _react.default.createElement(AuthorizationContext.Provider, {
    value: value
  }, children);
};

exports.AuthorizationProvider = AuthorizationProvider;