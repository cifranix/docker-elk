"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeaturePrivilegeNavlinkBuilder = void 0;

var _feature_privilege_builder = require("./feature_privilege_builder");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class FeaturePrivilegeNavlinkBuilder extends _feature_privilege_builder.BaseFeaturePrivilegeBuilder {
  getActions(privilegeDefinition, feature) {
    return feature.navLinkId ? [this.actions.ui.get('navLinks', feature.navLinkId)] : [];
  }

}

exports.FeaturePrivilegeNavlinkBuilder = FeaturePrivilegeNavlinkBuilder;