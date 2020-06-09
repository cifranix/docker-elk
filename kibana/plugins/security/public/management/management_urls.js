"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditRoleMappingHref = exports.getCreateRoleMappingHref = exports.getEditRoleHref = exports.ROLE_MAPPINGS_PATH = exports.EDIT_USERS_PATH = exports.USERS_PATH = exports.CLONE_ROLES_PATH = exports.EDIT_ROLES_PATH = exports.ROLES_PATH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MANAGEMENT_PATH = '/management';
var SECURITY_PATH = "".concat(MANAGEMENT_PATH, "/security");
var ROLES_PATH = "".concat(SECURITY_PATH, "/roles");
exports.ROLES_PATH = ROLES_PATH;
var EDIT_ROLES_PATH = "".concat(ROLES_PATH, "/edit");
exports.EDIT_ROLES_PATH = EDIT_ROLES_PATH;
var CLONE_ROLES_PATH = "".concat(ROLES_PATH, "/clone");
exports.CLONE_ROLES_PATH = CLONE_ROLES_PATH;
var USERS_PATH = "".concat(SECURITY_PATH, "/users");
exports.USERS_PATH = USERS_PATH;
var EDIT_USERS_PATH = "".concat(USERS_PATH, "/edit");
exports.EDIT_USERS_PATH = EDIT_USERS_PATH;
var ROLE_MAPPINGS_PATH = "".concat(SECURITY_PATH, "/role_mappings");
exports.ROLE_MAPPINGS_PATH = ROLE_MAPPINGS_PATH;
var CREATE_ROLE_MAPPING_PATH = "".concat(ROLE_MAPPINGS_PATH, "/edit");

var getEditRoleHref = function getEditRoleHref(roleName) {
  return "#".concat(ROLES_PATH, "/edit/").concat(encodeURIComponent(roleName));
};

exports.getEditRoleHref = getEditRoleHref;

var getCreateRoleMappingHref = function getCreateRoleMappingHref() {
  return "#".concat(CREATE_ROLE_MAPPING_PATH);
};

exports.getCreateRoleMappingHref = getCreateRoleMappingHref;

var getEditRoleMappingHref = function getEditRoleMappingHref(roleMappingName) {
  return "#".concat(CREATE_ROLE_MAPPING_PATH, "/").concat(encodeURIComponent(roleMappingName));
};

exports.getEditRoleMappingHref = getEditRoleMappingHref;