"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlattenedFields = getFlattenedFields;
exports.toggleSelectedField = exports.getDefaultSelectableFields = exports.getSelectableFields = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getFlattenedFields(obj) {
  var flatDocFields = [];
  var newDocFields = Object.keys(obj);
  newDocFields.forEach(function (f) {
    var fieldValue = obj[f];

    if (_typeof(fieldValue) !== 'object' || fieldValue === null || Array.isArray(fieldValue)) {
      flatDocFields.push(f);
    } else {
      var innerFields = getFlattenedFields(fieldValue);
      var flattenedFields = innerFields.map(function (d) {
        return "".concat(f, ".").concat(d);
      });
      flatDocFields.push.apply(flatDocFields, _toConsumableArray(flattenedFields));
    }
  });
  return flatDocFields;
}

var getSelectableFields = function getSelectableFields(docs) {
  if (docs.length === 0) {
    return [];
  }

  var newDocFields = getFlattenedFields(docs[0]);
  newDocFields.sort();
  return newDocFields;
};

exports.getSelectableFields = getSelectableFields;

var getDefaultSelectableFields = function getDefaultSelectableFields(docs) {
  if (docs.length === 0) {
    return [];
  }

  var newDocFields = getFlattenedFields(docs[0]);
  newDocFields.sort();
  return newDocFields.filter(function (k) {
    var value = false;
    docs.forEach(function (row) {
      var source = row;

      if (source[k] !== null) {
        value = true;
      }
    });
    return value;
  });
};

exports.getDefaultSelectableFields = getDefaultSelectableFields;

var toggleSelectedField = function toggleSelectedField(selectedFields, column) {
  var index = selectedFields.indexOf(column);

  if (index === -1) {
    selectedFields.push(column);
  } else {
    selectedFields.splice(index, 1);
  }

  selectedFields.sort();
  return selectedFields;
};

exports.toggleSelectedField = toggleSelectedField;