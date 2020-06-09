"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaFeatures = exports.createFeature = void 0;

var _public = require("../../../../../features/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var createFeature = function createFeature(config) {
  var excludeFromBaseAll = config.excludeFromBaseAll,
      excludeFromBaseRead = config.excludeFromBaseRead,
      rest = _objectWithoutProperties(config, ["excludeFromBaseAll", "excludeFromBaseRead"]);

  return new _public.Feature(_objectSpread({
    icon: 'discoverApp',
    navLinkId: 'kibana:discover',
    app: [],
    catalogue: [],
    privileges: {
      all: {
        excludeFromBasePrivileges: excludeFromBaseAll,
        savedObject: {
          all: ['all-type'],
          read: ['read-type']
        },
        ui: ['read-ui', 'all-ui', "read-".concat(config.id), "all-".concat(config.id)]
      },
      read: {
        excludeFromBasePrivileges: excludeFromBaseRead,
        savedObject: {
          all: [],
          read: ['read-type']
        },
        ui: ['read-ui', "read-".concat(config.id)]
      }
    }
  }, rest));
};

exports.createFeature = createFeature;
var kibanaFeatures = [createFeature({
  id: 'no_sub_features',
  name: 'Feature 1: No Sub Features'
}), createFeature({
  id: 'with_sub_features',
  name: 'Mutually Exclusive Sub Features',
  subFeatures: [{
    name: 'Cool Sub Feature',
    privilegeGroups: [{
      groupType: 'mutually_exclusive',
      privileges: [{
        id: 'cool_all',
        name: 'All',
        includeIn: 'all',
        savedObject: {
          all: ['all-cool-type'],
          read: ['read-cool-type']
        },
        ui: ['cool_read-ui', 'cool_all-ui']
      }, {
        id: 'cool_read',
        name: 'Read',
        includeIn: 'read',
        savedObject: {
          all: [],
          read: ['read-cool-type']
        },
        ui: ['cool_read-ui']
      }]
    }, {
      groupType: 'independent',
      privileges: [{
        id: 'cool_toggle_1',
        name: 'Cool toggle 1',
        includeIn: 'all',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_toggle_1-ui']
      }, {
        id: 'cool_toggle_2',
        name: 'Cool toggle 2',
        includeIn: 'read',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_toggle_2-ui']
      }, {
        id: 'cool_excluded_toggle',
        name: 'Cool excluded toggle',
        includeIn: 'none',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_excluded_toggle-ui']
      }]
    }]
  }]
}), createFeature({
  id: 'with_excluded_sub_features',
  name: 'Excluded Sub Features',
  subFeatures: [{
    name: 'Excluded Sub Feature',
    privilegeGroups: [{
      groupType: 'independent',
      privileges: [{
        id: 'cool_toggle_1',
        name: 'Cool toggle 1',
        includeIn: 'none',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_toggle_1-ui']
      }]
    }]
  }]
}), createFeature({
  id: 'excluded_from_base',
  name: 'Excluded from base',
  excludeFromBaseAll: true,
  excludeFromBaseRead: true,
  subFeatures: [{
    name: 'Cool Sub Feature',
    privilegeGroups: [{
      groupType: 'mutually_exclusive',
      privileges: [{
        id: 'cool_all',
        name: 'All',
        includeIn: 'all',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_read-ui', 'cool_all-ui']
      }, {
        id: 'cool_read',
        name: 'Read',
        includeIn: 'read',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_read-ui']
      }]
    }, {
      groupType: 'independent',
      privileges: [{
        id: 'cool_toggle_1',
        name: 'Cool toggle 2',
        includeIn: 'all',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_toggle_1-ui']
      }, {
        id: 'cool_toggle_2',
        name: 'Cool toggle 2',
        includeIn: 'read',
        savedObject: {
          all: [],
          read: []
        },
        ui: ['cool_toggle_2-ui']
      }]
    }]
  }]
})];
exports.kibanaFeatures = kibanaFeatures;