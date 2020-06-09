"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basicResolvers = void 0;

var _index_utils = require("../util/index_utils");

var _license = require("../license");

var _check_privilege = require("../privilege/check_privilege");

var _check_ml_nodes = require("../ml_nodes_check/check_ml_nodes");

var _ml_server_info = require("../services/ml_server_info");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var basicResolvers = function basicResolvers(_ref) {
  var indexPatterns = _ref.indexPatterns;
  return {
    checkFullLicense: _license.checkFullLicense,
    getMlNodeCount: _check_ml_nodes.getMlNodeCount,
    loadMlServerInfo: _ml_server_info.loadMlServerInfo,
    loadIndexPatterns: function loadIndexPatterns() {
      return (0, _index_utils.loadIndexPatterns)(indexPatterns);
    },
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    loadSavedSearches: _index_utils.loadSavedSearches
  };
};

exports.basicResolvers = basicResolvers;