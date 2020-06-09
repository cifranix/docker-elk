"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFeature = validateFeature;
exports.uiCapabilitiesRegex = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Each feature gets its own property on the UICapabilities object,
// but that object has a few built-in properties which should not be overwritten.
const prohibitedFeatureIds = ['catalogue', 'management', 'navLinks'];
const featurePrivilegePartRegex = /^[a-zA-Z0-9_-]+$/;
const subFeaturePrivilegePartRegex = /^[a-zA-Z0-9_-]+$/;
const managementSectionIdRegex = /^[a-zA-Z0-9_-]+$/;
const uiCapabilitiesRegex = /^[a-zA-Z0-9:_-]+$/;
exports.uiCapabilitiesRegex = uiCapabilitiesRegex;

const managementSchema = _joi.default.object().pattern(managementSectionIdRegex, _joi.default.array().items(_joi.default.string().regex(uiCapabilitiesRegex)));

const catalogueSchema = _joi.default.array().items(_joi.default.string().regex(uiCapabilitiesRegex));

const privilegeSchema = _joi.default.object({
  excludeFromBasePrivileges: _joi.default.boolean(),
  management: managementSchema,
  catalogue: catalogueSchema,
  api: _joi.default.array().items(_joi.default.string()),
  app: _joi.default.array().items(_joi.default.string()),
  savedObject: _joi.default.object({
    all: _joi.default.array().items(_joi.default.string()).required(),
    read: _joi.default.array().items(_joi.default.string()).required()
  }).required(),
  ui: _joi.default.array().items(_joi.default.string().regex(uiCapabilitiesRegex)).required()
});

const subFeaturePrivilegeSchema = _joi.default.object({
  id: _joi.default.string().regex(subFeaturePrivilegePartRegex).required(),
  name: _joi.default.string().required(),
  includeIn: _joi.default.string().allow('all', 'read', 'none').required(),
  management: managementSchema,
  catalogue: catalogueSchema,
  api: _joi.default.array().items(_joi.default.string()),
  app: _joi.default.array().items(_joi.default.string()),
  savedObject: _joi.default.object({
    all: _joi.default.array().items(_joi.default.string()).required(),
    read: _joi.default.array().items(_joi.default.string()).required()
  }).required(),
  ui: _joi.default.array().items(_joi.default.string().regex(uiCapabilitiesRegex)).required()
});

const subFeatureSchema = _joi.default.object({
  name: _joi.default.string().required(),
  privilegeGroups: _joi.default.array().items(_joi.default.object({
    groupType: _joi.default.string().valid('mutually_exclusive', 'independent').required(),
    privileges: _joi.default.array().items(subFeaturePrivilegeSchema).min(1)
  }))
});

const schema = _joi.default.object({
  id: _joi.default.string().regex(featurePrivilegePartRegex).invalid(...prohibitedFeatureIds).required(),
  name: _joi.default.string().required(),
  order: _joi.default.number(),
  excludeFromBasePrivileges: _joi.default.boolean(),
  validLicenses: _joi.default.array().items(_joi.default.string().valid('basic', 'standard', 'gold', 'platinum', 'enterprise', 'trial')),
  icon: _joi.default.string(),
  description: _joi.default.string(),
  navLinkId: _joi.default.string().regex(uiCapabilitiesRegex),
  app: _joi.default.array().items(_joi.default.string()).required(),
  management: managementSchema,
  catalogue: catalogueSchema,
  privileges: _joi.default.object({
    all: privilegeSchema,
    read: privilegeSchema
  }).allow(null).required(),
  subFeatures: _joi.default.when('privileges', {
    is: null,
    then: _joi.default.array().items(subFeatureSchema).max(0),
    otherwise: _joi.default.array().items(subFeatureSchema)
  }),
  privilegesTooltip: _joi.default.string(),
  reserved: _joi.default.object({
    privilege: privilegeSchema.required(),
    description: _joi.default.string().required()
  })
});

function validateFeature(feature) {
  var _feature$subFeatures;

  const validateResult = _joi.default.validate(feature, schema);

  if (validateResult.error) {
    throw validateResult.error;
  } // the following validation can't be enforced by the Joi schema, since it'd require us looking "up" the object graph for the list of valid value, which they explicitly forbid.


  const {
    app = [],
    management = {},
    catalogue = []
  } = feature;
  const unseenApps = new Set(app);
  const managementSets = Object.entries(management).map(entry => [entry[0], new Set(entry[1])]);
  const unseenManagement = new Map(managementSets);
  const unseenCatalogue = new Set(catalogue);

  function validateAppEntry(privilegeId, entry = []) {
    entry.forEach(privilegeApp => unseenApps.delete(privilegeApp));
    const unknownAppEntries = (0, _lodash.difference)(entry, app);

    if (unknownAppEntries.length > 0) {
      throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown app entries: ${unknownAppEntries.join(', ')}`);
    }
  }

  function validateCatalogueEntry(privilegeId, entry = []) {
    entry.forEach(privilegeCatalogue => unseenCatalogue.delete(privilegeCatalogue));
    const unknownCatalogueEntries = (0, _lodash.difference)(entry || [], catalogue);

    if (unknownCatalogueEntries.length > 0) {
      throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown catalogue entries: ${unknownCatalogueEntries.join(', ')}`);
    }
  }

  function validateManagementEntry(privilegeId, managementEntry = {}) {
    Object.entries(managementEntry).forEach(([managementSectionId, managementSectionEntry]) => {
      if (unseenManagement.has(managementSectionId)) {
        managementSectionEntry.forEach(entry => {
          var _unseenManagement$get;

          unseenManagement.get(managementSectionId).delete(entry);

          if (((_unseenManagement$get = unseenManagement.get(managementSectionId)) === null || _unseenManagement$get === void 0 ? void 0 : _unseenManagement$get.size) === 0) {
            unseenManagement.delete(managementSectionId);
          }
        });
      }

      if (!management[managementSectionId]) {
        throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown management section: ${managementSectionId}`);
      }

      const unknownSectionEntries = (0, _lodash.difference)(managementSectionEntry, management[managementSectionId]);

      if (unknownSectionEntries.length > 0) {
        throw new Error(`Feature privilege ${feature.id}.${privilegeId} has unknown management entries for section ${managementSectionId}: ${unknownSectionEntries.join(', ')}`);
      }
    });
  }

  const privilegeEntries = [];

  if (feature.privileges) {
    privilegeEntries.push(...Object.entries(feature.privileges));
  }

  if (feature.reserved) {
    privilegeEntries.push(['reserved', feature.reserved.privilege]);
  }

  if (privilegeEntries.length === 0) {
    return;
  }

  privilegeEntries.forEach(([privilegeId, privilegeDefinition]) => {
    if (!privilegeDefinition) {
      throw new Error('Privilege definition may not be null or undefined');
    }

    validateAppEntry(privilegeId, privilegeDefinition.app);
    validateCatalogueEntry(privilegeId, privilegeDefinition.catalogue);
    validateManagementEntry(privilegeId, privilegeDefinition.management);
  });
  const subFeatureEntries = (_feature$subFeatures = feature.subFeatures) !== null && _feature$subFeatures !== void 0 ? _feature$subFeatures : [];
  subFeatureEntries.forEach(subFeature => {
    subFeature.privilegeGroups.forEach(subFeaturePrivilegeGroup => {
      subFeaturePrivilegeGroup.privileges.forEach(subFeaturePrivilege => {
        validateAppEntry(subFeaturePrivilege.id, subFeaturePrivilege.app);
        validateCatalogueEntry(subFeaturePrivilege.id, subFeaturePrivilege.catalogue);
        validateManagementEntry(subFeaturePrivilege.id, subFeaturePrivilege.management);
      });
    });
  });

  if (unseenApps.size > 0) {
    throw new Error(`Feature ${feature.id} specifies app entries which are not granted to any privileges: ${Array.from(unseenApps.values()).join(',')}`);
  }

  if (unseenCatalogue.size > 0) {
    throw new Error(`Feature ${feature.id} specifies catalogue entries which are not granted to any privileges: ${Array.from(unseenCatalogue.values()).join(',')}`);
  }

  if (unseenManagement.size > 0) {
    const ungrantedManagement = Array.from(unseenManagement.entries()).reduce((acc, entry) => {
      const values = Array.from(entry[1].values()).map(managementPage => `${entry[0]}.${managementPage}`);
      return [...acc, ...values];
    }, []);
    throw new Error(`Feature ${feature.id} specifies management entries which are not granted to any privileges: ${ungrantedManagement.join(',')}`);
  }
}