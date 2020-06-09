"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractReferences = extractReferences;
exports.injectReferences = injectReferences;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function extractReferences(_ref) {
  var attributes = _ref.attributes,
      _ref$references = _ref.references,
      references = _ref$references === void 0 ? [] : _ref$references;
  // For some reason, wsState comes in stringified 2x
  var state = JSON.parse(JSON.parse(String(attributes.wsState)));
  var indexPattern = state.indexPattern;

  if (!indexPattern) {
    throw new Error('indexPattern attribute is missing in "wsState"');
  }

  state.indexPatternRefName = 'indexPattern_0';
  delete state.indexPattern;
  return {
    references: [].concat(_toConsumableArray(references), [{
      name: 'indexPattern_0',
      type: 'index-pattern',
      id: indexPattern
    }]),
    attributes: _objectSpread({}, attributes, {
      wsState: JSON.stringify(JSON.stringify(state))
    })
  };
}

function injectReferences(savedObject, references) {
  // Skip if wsState is missing, at the time of development of this, there is no guarantee each
  // saved object has wsState.
  if (typeof savedObject.wsState !== 'string') {
    return;
  } // Only need to parse / stringify once here compared to extractReferences


  var state = JSON.parse(savedObject.wsState); // Like the migration, skip injectReferences if "indexPatternRefName" is missing

  if (!state.indexPatternRefName) {
    return;
  }

  var indexPatternReference = references.find(function (reference) {
    return reference.name === state.indexPatternRefName;
  });

  if (!indexPatternReference) {
    // Throw an error as "indexPatternRefName" means the reference exists within
    // "references" and in this scenario we have bad data.
    throw new Error("Could not find reference \"".concat(state.indexPatternRefName, "\""));
  }

  state.indexPattern = indexPatternReference.id;
  delete state.indexPatternRefName;
  savedObject.wsState = JSON.stringify(state);
}