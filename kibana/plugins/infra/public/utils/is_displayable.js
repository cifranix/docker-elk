"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDisplayable = void 0;

var _lodash = require("lodash");

var _ecs_allowed_list = require("../../common/ecs_allowed_list");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fieldStartsWith = function fieldStartsWith(field) {
  return function (name) {
    return (0, _lodash.startsWith)(field.name, name);
  };
};

var isDisplayable = function isDisplayable(field) {
  var additionalPrefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // We need to start with at least one prefix, even if it's empty
  var prefixes = additionalPrefixes && additionalPrefixes.length ? additionalPrefixes : ['']; // Create a set of allowed list based on the prefixes

  var allowedList = prefixes.reduce(function (acc, prefix) {
    return (0, _lodash.uniq)([].concat(_toConsumableArray(acc), _toConsumableArray((0, _ecs_allowed_list.getAllowedListForPrefix)(prefix))));
  }, []); // If the field is displayable and part of the allowed list or covered by the prefix

  return field.displayable && prefixes.some(fieldStartsWith(field)) || allowedList.some(fieldStartsWith(field));
};

exports.isDisplayable = isDisplayable;