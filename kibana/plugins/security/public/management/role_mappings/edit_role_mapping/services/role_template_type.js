"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStoredRoleTemplate = isStoredRoleTemplate;
exports.isInlineRoleTemplate = isInlineRoleTemplate;
exports.isInvalidRoleTemplate = isInvalidRoleTemplate;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isStoredRoleTemplate(roleMappingTemplate) {
  return roleMappingTemplate.template != null && roleMappingTemplate.template.hasOwnProperty('id') && typeof roleMappingTemplate.template.id === 'string';
}

function isInlineRoleTemplate(roleMappingTemplate) {
  return roleMappingTemplate.template != null && roleMappingTemplate.template.hasOwnProperty('source') && typeof roleMappingTemplate.template.source === 'string';
}

function isInvalidRoleTemplate(roleMappingTemplate) {
  return !isStoredRoleTemplate(roleMappingTemplate) && !isInlineRoleTemplate(roleMappingTemplate);
}