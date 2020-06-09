"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortTable = void 0;

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var unitMagnitude = {
  kb: 1,
  mb: 2,
  gb: 3,
  tb: 4,
  pb: 5
};

var stringSort = function stringSort(fieldName) {
  return function (item) {
    return item[fieldName];
  };
};

var numericSort = function numericSort(fieldName) {
  return function (item) {
    return +item[fieldName];
  };
};

var byteSort = function byteSort(fieldName) {
  return function (item) {
    var rawValue = item[fieldName]; // raw value can be missing if index is closed

    if (!rawValue) {
      return 0;
    }

    var matchResult = rawValue.match(/(.*)([kmgtp]b)/);

    if (!matchResult) {
      return 0;
    }

    var _matchResult = _slicedToArray(matchResult, 3),
        number = _matchResult[1],
        unit = _matchResult[2];

    return +number * Math.pow(1024, unitMagnitude[unit]);
  };
};

var sorters = {
  name: stringSort('name'),
  status: stringSort('status'),
  health: stringSort('health'),
  primary: numericSort('primary'),
  replica: numericSort('replica'),
  documents: numericSort('documents'),
  size: byteSort('size'),
  primary_size: byteSort('primary_size')
};

var sortTable = function sortTable() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var sortField = arguments.length > 1 ? arguments[1] : undefined;
  var isSortAscending = arguments.length > 2 ? arguments[2] : undefined;
  var sorted = (0, _lodash.sortBy)(array, sorters[sortField]);
  return isSortAscending ? sorted : sorted.reverse();
};

exports.sortTable = sortTable;