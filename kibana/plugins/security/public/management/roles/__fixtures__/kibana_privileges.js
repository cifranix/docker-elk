"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKibanaPrivileges = exports.createRawKibanaPrivileges = void 0;

var _authorization = require("../../../../server/authorization");

var _privileges = require("../../../../server/authorization/privileges");

var _model = require("../model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
var createRawKibanaPrivileges = function createRawKibanaPrivileges(features) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$allowSubFeatureP = _ref.allowSubFeaturePrivileges,
      allowSubFeaturePrivileges = _ref$allowSubFeatureP === void 0 ? true : _ref$allowSubFeatureP;

  var featuresService = {
    getFeatures: function getFeatures() {
      return features;
    }
  };
  var licensingService = {
    getFeatures: function getFeatures() {
      return {
        allowSubFeaturePrivileges: allowSubFeaturePrivileges
      };
    }
  };
  return (0, _privileges.privilegesFactory)(new _authorization.Actions('unit_test_version'), featuresService, licensingService).get();
};

exports.createRawKibanaPrivileges = createRawKibanaPrivileges;

var createKibanaPrivileges = function createKibanaPrivileges(features) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$allowSubFeature = _ref2.allowSubFeaturePrivileges,
      allowSubFeaturePrivileges = _ref2$allowSubFeature === void 0 ? true : _ref2$allowSubFeature;

  return new _model.KibanaPrivileges(createRawKibanaPrivileges(features, {
    allowSubFeaturePrivileges: allowSubFeaturePrivileges
  }), features);
};

exports.createKibanaPrivileges = createKibanaPrivileges;