"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupCapabilitiesSwitcher = setupCapabilitiesSwitcher;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setupCapabilitiesSwitcher(core, spacesService, logger) {
  return async (request, capabilities) => {
    const isAnonymousRequest = !request.route.options.authRequired;

    if (isAnonymousRequest) {
      return capabilities;
    }

    try {
      const [activeSpace, [, {
        features
      }]] = await Promise.all([spacesService.getActiveSpace(request), core.getStartServices()]);
      const registeredFeatures = features.getFeatures(); // try to retrieve capabilities for authenticated or "maybe authenticated" users

      return toggleCapabilities(registeredFeatures, capabilities, activeSpace);
    } catch (e) {
      logger.debug(`Error toggling capabilities for request to ${request.url.pathname}: ${e}`);
      return capabilities;
    }
  };
}

function toggleCapabilities(features, capabilities, activeSpace) {
  const clonedCapabilities = _lodash.default.cloneDeep(capabilities);

  toggleDisabledFeatures(features, clonedCapabilities, activeSpace);
  return clonedCapabilities;
}

function toggleDisabledFeatures(features, capabilities, activeSpace) {
  const disabledFeatureKeys = activeSpace.disabledFeatures;
  const disabledFeatures = disabledFeatureKeys.map(key => features.find(feature => feature.id === key)).filter(feature => typeof feature !== 'undefined');
  const navLinks = capabilities.navLinks;
  const catalogueEntries = capabilities.catalogue;
  const managementItems = capabilities.management;

  for (const feature of disabledFeatures) {
    // Disable associated navLink, if one exists
    if (feature.navLinkId && navLinks.hasOwnProperty(feature.navLinkId)) {
      navLinks[feature.navLinkId] = false;
    } // Disable associated catalogue entries


    const privilegeCatalogueEntries = feature.catalogue || [];
    privilegeCatalogueEntries.forEach(catalogueEntryId => {
      catalogueEntries[catalogueEntryId] = false;
    }); // Disable associated management items

    const privilegeManagementSections = feature.management || {};
    Object.entries(privilegeManagementSections).forEach(([sectionId, sectionItems]) => {
      sectionItems.forEach(item => {
        if (managementItems.hasOwnProperty(sectionId) && managementItems[sectionId].hasOwnProperty(item)) {
          managementItems[sectionId][item] = false;
        }
      });
    }); // Disable "sub features" that match the disabled feature

    if (capabilities.hasOwnProperty(feature.id)) {
      const capability = capabilities[feature.id];
      Object.keys(capability).forEach(featureKey => {
        capability[featureKey] = false;
      });
    }
  }
}