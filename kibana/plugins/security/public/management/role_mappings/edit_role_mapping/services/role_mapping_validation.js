"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRoleMappingName = validateRoleMappingName;
exports.validateRoleMappingRoles = validateRoleMappingRoles;
exports.validateRoleMappingRoleTemplates = validateRoleMappingRoleTemplates;
exports.validateRoleMappingRules = validateRoleMappingRules;
exports.validateRoleMappingForSave = validateRoleMappingForSave;

var _i18n = require("@kbn/i18n");

var _model = require("../../model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateRoleMappingName(_ref) {
  var name = _ref.name;

  if (!name) {
    return invalid(_i18n.i18n.translate('xpack.security.role_mappings.validation.invalidName', {
      defaultMessage: 'Name is required.'
    }));
  }

  return valid();
}

function validateRoleMappingRoles(_ref2) {
  var roles = _ref2.roles;

  if (roles && !roles.length) {
    return invalid(_i18n.i18n.translate('xpack.security.role_mappings.validation.invalidRoles', {
      defaultMessage: 'At least one role is required.'
    }));
  }

  return valid();
}

function validateRoleMappingRoleTemplates(_ref3) {
  var roleTemplates = _ref3.role_templates;

  if (roleTemplates && !roleTemplates.length) {
    return invalid(_i18n.i18n.translate('xpack.security.role_mappings.validation.invalidRoleTemplates', {
      defaultMessage: 'At least one role template is required.'
    }));
  }

  return valid();
}

function validateRoleMappingRules(_ref4) {
  var rules = _ref4.rules;

  try {
    var _generateRulesFromRaw = (0, _model.generateRulesFromRaw)(rules),
        parsedRules = _generateRulesFromRaw.rules;

    if (!parsedRules) {
      return invalid(_i18n.i18n.translate('xpack.security.role_mappings.validation.invalidRoleRule', {
        defaultMessage: 'At least one rule is required.'
      }));
    }
  } catch (e) {
    return invalid(e.message);
  }

  return valid();
}

function validateRoleMappingForSave(roleMapping) {
  var _validateRoleMappingN = validateRoleMappingName(roleMapping),
      isNameInvalid = _validateRoleMappingN.isInvalid,
      nameError = _validateRoleMappingN.error;

  var _validateRoleMappingR = validateRoleMappingRoles(roleMapping),
      areRolesInvalid = _validateRoleMappingR.isInvalid,
      rolesError = _validateRoleMappingR.error;

  var _validateRoleMappingR2 = validateRoleMappingRoleTemplates(roleMapping),
      areRoleTemplatesInvalid = _validateRoleMappingR2.isInvalid,
      roleTemplatesError = _validateRoleMappingR2.error;

  var _validateRoleMappingR3 = validateRoleMappingRules(roleMapping),
      areRulesInvalid = _validateRoleMappingR3.isInvalid,
      rulesError = _validateRoleMappingR3.error;

  var canSave = !isNameInvalid && (!areRolesInvalid || !areRoleTemplatesInvalid) && !areRulesInvalid;

  if (canSave) {
    return valid();
  }

  return invalid(nameError || rulesError || rolesError || roleTemplatesError);
}

function valid() {
  return {
    isInvalid: false
  };
}

function invalid(error) {
  return {
    isInvalid: true,
    error: error
  };
}