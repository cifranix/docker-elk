"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserializeTemplateList = deserializeTemplateList;
exports.serializeTemplate = serializeTemplate;
exports.deserializeTemplate = deserializeTemplate;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const hasEntries = (data = {}) => Object.entries(data).length > 0;

function deserializeTemplateList(indexTemplatesByName, managedTemplatePrefix) {
  const indexTemplateNames = Object.keys(indexTemplatesByName);
  const deserializedTemplates = indexTemplateNames.map(name => {
    const {
      version,
      order,
      index_patterns: indexPatterns = [],
      settings = {},
      aliases = {},
      mappings = {}
    } = indexTemplatesByName[name];
    return {
      name,
      version,
      order,
      indexPatterns: indexPatterns.sort(),
      hasSettings: hasEntries(settings),
      hasAliases: hasEntries(aliases),
      hasMappings: hasEntries(mappings),
      ilmPolicy: settings && settings.index && settings.index.lifecycle,
      isManaged: Boolean(managedTemplatePrefix && name.startsWith(managedTemplatePrefix))
    };
  });
  return deserializedTemplates;
}

function serializeTemplate(template) {
  const {
    name,
    version,
    order,
    indexPatterns,
    settings,
    aliases,
    mappings
  } = template;
  const serializedTemplate = {
    name,
    version,
    order,
    index_patterns: indexPatterns,
    settings,
    aliases,
    mappings
  };
  return serializedTemplate;
}

function deserializeTemplate(templateEs, managedTemplatePrefix) {
  const {
    name,
    version,
    order,
    index_patterns: indexPatterns,
    settings,
    aliases,
    mappings
  } = templateEs;
  const deserializedTemplate = {
    name,
    version,
    order,
    indexPatterns: indexPatterns.sort(),
    settings,
    aliases,
    mappings,
    ilmPolicy: settings && settings.index && settings.index.lifecycle,
    isManaged: Boolean(managedTemplatePrefix && name.startsWith(managedTemplatePrefix))
  };
  return deserializedTemplate;
}