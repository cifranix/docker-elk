"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiCapabilitiesForFeatures = uiCapabilitiesForFeatures;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ELIGIBLE_FLAT_MERGE_KEYS = ['catalogue'];

function uiCapabilitiesForFeatures(features) {
  const featureCapabilities = features.map(getCapabilitiesFromFeature);
  return buildCapabilities(...featureCapabilities);
}

function getCapabilitiesFromFeature(feature) {
  var _feature$privileges;

  const UIFeatureCapabilities = {
    catalogue: {},
    [feature.id]: {}
  };

  if (feature.catalogue) {
    UIFeatureCapabilities.catalogue = { ...UIFeatureCapabilities.catalogue,
      ...feature.catalogue.reduce((acc, capability) => ({ ...acc,
        [capability]: true
      }), {})
    };
  }

  const featurePrivileges = Object.values((_feature$privileges = feature.privileges) !== null && _feature$privileges !== void 0 ? _feature$privileges : {});

  if (feature.subFeatures) {
    featurePrivileges.push(...feature.subFeatures.map(sf => sf.privilegeGroups.map(pg => pg.privileges)).flat(2));
  }

  featurePrivileges.forEach(privilege => {
    UIFeatureCapabilities[feature.id] = { ...UIFeatureCapabilities[feature.id],
      ...privilege.ui.reduce((privilegeAcc, capability) => ({ ...privilegeAcc,
        [capability]: true
      }), {})
    };
  });
  return UIFeatureCapabilities;
}

function buildCapabilities(...allFeatureCapabilities) {
  return allFeatureCapabilities.reduce((acc, capabilities) => {
    const mergableCapabilities = _lodash.default.omit(capabilities, ...ELIGIBLE_FLAT_MERGE_KEYS);

    const mergedFeatureCapabilities = { ...mergableCapabilities,
      ...acc
    };
    ELIGIBLE_FLAT_MERGE_KEYS.forEach(key => {
      mergedFeatureCapabilities[key] = { ...mergedFeatureCapabilities[key],
        ...capabilities[key]
      };
    });
    return mergedFeatureCapabilities;
  }, {});
}