"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featurePrivilegeIterator = featurePrivilegeIterator;

var _lodash = _interopRequireDefault(require("lodash"));

var _sub_feature_privilege_iterator = require("./sub_feature_privilege_iterator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function* featurePrivilegeIterator(feature, options) {
  for (const entry of Object.entries((_feature$privileges = feature.privileges) !== null && _feature$privileges !== void 0 ? _feature$privileges : {})) {
    var _feature$privileges;

    const [privilegeId, privilege] = entry;

    if (options.predicate && !options.predicate(privilegeId, privilege)) {
      continue;
    }

    if (options.augmentWithSubFeaturePrivileges) {
      yield {
        privilegeId,
        privilege: mergeWithSubFeatures(privilegeId, privilege, feature)
      };
    } else {
      yield {
        privilegeId,
        privilege
      };
    }
  }
}

function mergeWithSubFeatures(privilegeId, privilege, feature) {
  const mergedConfig = _lodash.default.cloneDeep(privilege);

  for (const subFeaturePrivilege of (0, _sub_feature_privilege_iterator.subFeaturePrivilegeIterator)(feature)) {
    var _mergedConfig$managem, _subFeaturePrivilege$;

    if (subFeaturePrivilege.includeIn !== 'read' && subFeaturePrivilege.includeIn !== privilegeId) {
      continue;
    }

    mergedConfig.api = mergeArrays(mergedConfig.api, subFeaturePrivilege.api);
    mergedConfig.app = mergeArrays(mergedConfig.app, subFeaturePrivilege.app);
    mergedConfig.catalogue = mergeArrays(mergedConfig.catalogue, subFeaturePrivilege.catalogue);
    const managementEntries = Object.entries((_mergedConfig$managem = mergedConfig.management) !== null && _mergedConfig$managem !== void 0 ? _mergedConfig$managem : {});
    const subFeatureManagementEntries = Object.entries((_subFeaturePrivilege$ = subFeaturePrivilege.management) !== null && _subFeaturePrivilege$ !== void 0 ? _subFeaturePrivilege$ : {});
    mergedConfig.management = [managementEntries, subFeatureManagementEntries].flat().reduce((acc, [sectionId, managementApps]) => {
      return { ...acc,
        [sectionId]: mergeArrays(acc[sectionId], managementApps)
      };
    }, {});
    mergedConfig.ui = mergeArrays(mergedConfig.ui, subFeaturePrivilege.ui);
    mergedConfig.savedObject.all = mergeArrays(mergedConfig.savedObject.all, subFeaturePrivilege.savedObject.all);
    mergedConfig.savedObject.read = mergeArrays(mergedConfig.savedObject.read, subFeaturePrivilege.savedObject.read);
  }

  return mergedConfig;
}

function mergeArrays(input1, input2) {
  const first = input1 !== null && input1 !== void 0 ? input1 : [];
  const second = input2 !== null && input2 !== void 0 ? input2 : [];
  return Array.from(new Set([...first, ...second]));
}