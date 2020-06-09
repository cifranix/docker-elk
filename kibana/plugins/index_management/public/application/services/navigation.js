"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getILMPolicyPath = exports.getIndexListUri = void 0;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getIndexListUri = function getIndexListUri(filter) {
  if (filter) {
    // React router tries to decode url params but it can't because the browser partially
    // decodes them. So we have to encode both the URL and the filter to get it all to
    // work correctly for filters with URL unsafe characters in them.
    return encodeURI("#".concat(_constants.BASE_PATH, "indices/filter/").concat(encodeURIComponent(filter)));
  } // If no filter, URI is already safe so no need to encode.


  return "#".concat(_constants.BASE_PATH, "indices");
};

exports.getIndexListUri = getIndexListUri;

var getILMPolicyPath = function getILMPolicyPath(policyName) {
  return encodeURI("#/management/elasticsearch/index_lifecycle_management/policies/edit/".concat(encodeURIComponent(policyName)));
};

exports.getILMPolicyPath = getILMPolicyPath;