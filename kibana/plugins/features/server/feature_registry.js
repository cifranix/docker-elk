"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureRegistry = void 0;

var _lodash = require("lodash");

var _common = require("../common");

var _feature_schema = require("./feature_schema");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FeatureRegistry {
  constructor() {
    _defineProperty(this, "locked", false);

    _defineProperty(this, "features", {});
  }

  register(feature) {
    if (this.locked) {
      throw new Error(`Features are locked, can't register new features. Attempt to register ${feature.id} failed.`);
    }

    (0, _feature_schema.validateFeature)(feature);

    if (feature.id in this.features) {
      throw new Error(`Feature with id ${feature.id} is already registered.`);
    }

    const featureCopy = (0, _lodash.cloneDeep)(feature);
    this.features[feature.id] = applyAutomaticPrivilegeGrants(featureCopy);
  }

  getAll() {
    this.locked = true;
    return Object.values(this.features).map(featureConfig => new _common.Feature(featureConfig));
  }

}

exports.FeatureRegistry = FeatureRegistry;

function applyAutomaticPrivilegeGrants(feature) {
  var _feature$privileges, _feature$privileges2, _feature$reserved;

  const allPrivilege = (_feature$privileges = feature.privileges) === null || _feature$privileges === void 0 ? void 0 : _feature$privileges.all;
  const readPrivilege = (_feature$privileges2 = feature.privileges) === null || _feature$privileges2 === void 0 ? void 0 : _feature$privileges2.read;
  const reservedPrivilege = (_feature$reserved = feature.reserved) === null || _feature$reserved === void 0 ? void 0 : _feature$reserved.privilege;
  applyAutomaticAllPrivilegeGrants(allPrivilege, reservedPrivilege);
  applyAutomaticReadPrivilegeGrants(readPrivilege);
  return feature;
}

function applyAutomaticAllPrivilegeGrants(...allPrivileges) {
  allPrivileges.forEach(allPrivilege => {
    if (allPrivilege) {
      allPrivilege.savedObject.all = (0, _lodash.uniq)([...allPrivilege.savedObject.all, 'telemetry']);
      allPrivilege.savedObject.read = (0, _lodash.uniq)([...allPrivilege.savedObject.read, 'config', 'url']);
    }
  });
}

function applyAutomaticReadPrivilegeGrants(...readPrivileges) {
  readPrivileges.forEach(readPrivilege => {
    if (readPrivilege) {
      readPrivilege.savedObject.read = (0, _lodash.uniq)([...readPrivilege.savedObject.read, 'config', 'url']);
    }
  });
}