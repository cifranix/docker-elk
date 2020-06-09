"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeaturePrivilegeSavedObjectBuilder = void 0;

var _lodash = require("lodash");

var _feature_privilege_builder = require("./feature_privilege_builder");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const readOperations = ['bulk_get', 'get', 'find'];
const writeOperations = ['create', 'bulk_create', 'update', 'bulk_update', 'delete'];
const allOperations = [...readOperations, ...writeOperations];

class FeaturePrivilegeSavedObjectBuilder extends _feature_privilege_builder.BaseFeaturePrivilegeBuilder {
  getActions(privilegeDefinition, feature) {
    return (0, _lodash.uniq)([...(0, _lodash.flatten)(privilegeDefinition.savedObject.all.map(type => [...allOperations.map(operation => this.actions.savedObject.get(type, operation))])), ...(0, _lodash.flatten)(privilegeDefinition.savedObject.read.map(type => [...readOperations.map(operation => this.actions.savedObject.get(type, operation))]))]);
  }

}

exports.FeaturePrivilegeSavedObjectBuilder = FeaturePrivilegeSavedObjectBuilder;