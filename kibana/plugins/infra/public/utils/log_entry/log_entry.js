"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFieldSegment = exports.isConstantSegment = exports.isFieldColumn = exports.isMessageColumn = exports.isTimestampColumn = exports.getLogEntryAtTime = exports.getLogEntryIndexAtTime = exports.getLogEntryIndexAfterTime = exports.getLogEntryIndexBeforeTime = exports.getUniqueLogEntryKey = exports.getLogEntryKey = void 0;

var _d3Array = require("d3-array");

var _time = require("../../../common/time");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getLogEntryKey = function getLogEntryKey(entry) {
  return entry.cursor;
};

exports.getLogEntryKey = getLogEntryKey;

var getUniqueLogEntryKey = function getUniqueLogEntryKey(entry) {
  return _objectSpread({}, entry.cursor, {
    gid: entry.id
  });
};

exports.getUniqueLogEntryKey = getUniqueLogEntryKey;
var logEntryTimeBisector = (0, _d3Array.bisector)((0, _time.compareToTimeKey)(getLogEntryKey));
var getLogEntryIndexBeforeTime = logEntryTimeBisector.left;
exports.getLogEntryIndexBeforeTime = getLogEntryIndexBeforeTime;
var getLogEntryIndexAfterTime = logEntryTimeBisector.right;
exports.getLogEntryIndexAfterTime = getLogEntryIndexAfterTime;
var getLogEntryIndexAtTime = (0, _time.getIndexAtTimeKey)(getLogEntryKey);
exports.getLogEntryIndexAtTime = getLogEntryIndexAtTime;

var getLogEntryAtTime = function getLogEntryAtTime(entries, time) {
  var entryIndex = getLogEntryIndexAtTime(entries, time);
  return entryIndex !== null ? entries[entryIndex] : null;
};

exports.getLogEntryAtTime = getLogEntryAtTime;

var isTimestampColumn = function isTimestampColumn(column) {
  return column != null && 'timestamp' in column;
};

exports.isTimestampColumn = isTimestampColumn;

var isMessageColumn = function isMessageColumn(column) {
  return column != null && 'message' in column;
};

exports.isMessageColumn = isMessageColumn;

var isFieldColumn = function isFieldColumn(column) {
  return column != null && 'field' in column;
};

exports.isFieldColumn = isFieldColumn;

var isConstantSegment = function isConstantSegment(segment) {
  return 'constant' in segment;
};

exports.isConstantSegment = isConstantSegment;

var isFieldSegment = function isFieldSegment(segment) {
  return 'field' in segment && 'value' in segment;
};

exports.isFieldSegment = isFieldSegment;