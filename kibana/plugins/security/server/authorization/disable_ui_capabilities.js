"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableUICapabilitiesFactory = disableUICapabilitiesFactory;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function disableUICapabilitiesFactory(request, features, logger, authz) {
  const featureNavLinkIds = features.map(feature => feature.navLinkId).filter(navLinkId => navLinkId != null);

  const shouldDisableFeatureUICapability = (featureId, uiCapability) => {
    // if the navLink isn't for a feature that we have registered, we don't wish to
    // disable it based on privileges
    return featureId !== 'navLinks' || featureNavLinkIds.includes(uiCapability);
  };

  const disableAll = uiCapabilities => {
    return (0, _lodash.mapValues)(uiCapabilities, (featureUICapabilities, featureId) => (0, _lodash.mapValues)(featureUICapabilities, (value, uiCapability) => {
      if (typeof value === 'boolean') {
        if (shouldDisableFeatureUICapability(featureId, uiCapability)) {
          return false;
        }

        return value;
      }

      if ((0, _lodash.isObject)(value)) {
        return (0, _lodash.mapValues)(value, () => false);
      }

      throw new Error(`Expected value type of boolean or object, but found ${value}`);
    }));
  };

  const usingPrivileges = async uiCapabilities => {
    function getActionsForFeatureCapability(featureId, uiCapability, value) {
      if (typeof value === 'boolean') {
        return [authz.actions.ui.get(featureId, uiCapability)];
      }

      if ((0, _lodash.isObject)(value)) {
        return Object.keys(value).map(item => authz.actions.ui.get(featureId, uiCapability, item));
      }

      throw new Error(`Expected value type of boolean or object, but found ${value}`);
    }

    const uiActions = Object.entries(uiCapabilities).reduce((acc, [featureId, featureUICapabilities]) => [...acc, ...(0, _lodash.flatten)(Object.entries(featureUICapabilities).map(([uiCapability, value]) => {
      return getActionsForFeatureCapability(featureId, uiCapability, value);
    }))], []);
    let checkPrivilegesResponse;

    try {
      const checkPrivilegesDynamically = authz.checkPrivilegesDynamicallyWithRequest(request);
      checkPrivilegesResponse = await checkPrivilegesDynamically(uiActions);
    } catch (err) {
      // if we get a 401/403, then we want to disable all uiCapabilities, as this
      // is generally when the user hasn't authenticated yet and we're displaying the
      // login screen, which isn't driven any uiCapabilities
      if (err.statusCode === 401 || err.statusCode === 403) {
        logger.debug(`Disabling all uiCapabilities because we received a ${err.statusCode}: ${err.message}`);
        return disableAll(uiCapabilities);
      }

      throw err;
    }

    const checkPrivilegesForCapability = (enabled, featureId, ...uiCapabilityParts) => {
      // if the uiCapability has already been disabled, we don't want to re-enable it
      if (!enabled) {
        return false;
      }

      const action = authz.actions.ui.get(featureId, ...uiCapabilityParts);
      return checkPrivilegesResponse.privileges[action] === true;
    };

    return (0, _lodash.mapValues)(uiCapabilities, (featureUICapabilities, featureId) => {
      return (0, _lodash.mapValues)(featureUICapabilities, (value, uiCapability) => {
        if (typeof value === 'boolean') {
          if (!shouldDisableFeatureUICapability(featureId, uiCapability)) {
            return value;
          }

          return checkPrivilegesForCapability(value, featureId, uiCapability);
        }

        if ((0, _lodash.isObject)(value)) {
          const res = (0, _lodash.mapValues)(value, (enabled, subUiCapability) => {
            return checkPrivilegesForCapability(enabled, featureId, uiCapability, subUiCapability);
          });
          return res;
        }

        throw new Error(`Unexpected UI Capability value. Expected boolean or object, but found ${value}`);
      });
    });
  };

  return {
    all: disableAll,
    usingPrivileges
  };
}