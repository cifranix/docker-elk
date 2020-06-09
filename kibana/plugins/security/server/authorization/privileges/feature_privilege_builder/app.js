"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeaturePrivilegeAppBuilder = void 0;

var _feature_privilege_builder = require("./feature_privilege_builder");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class FeaturePrivilegeAppBuilder extends _feature_privilege_builder.BaseFeaturePrivilegeBuilder {
  getActions(privilegeDefinition, feature) {
    const appIds = privilegeDefinition.app;

    if (!appIds) {
      return [];
    }

    return appIds.map(appId => this.actions.app.get(appId));
  }

}

exports.FeaturePrivilegeAppBuilder = FeaturePrivilegeAppBuilder;