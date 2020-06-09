"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithStreamItems = void 0;

var _react = require("react");

var _log_highlights = require("./log_highlights/log_highlights");

var _log_entries = require("./log_entries");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WithStreamItems = function WithStreamItems(_ref) {
  var children = _ref.children;

  var _useContext = (0, _react.useContext)(_log_entries.LogEntriesState.Context),
      _useContext2 = _slicedToArray(_useContext, 2),
      logEntries = _useContext2[0],
      logEntriesCallbacks = _useContext2[1];

  var _useContext3 = (0, _react.useContext)(_log_highlights.LogHighlightsState.Context),
      currentHighlightKey = _useContext3.currentHighlightKey,
      logEntryHighlightsById = _useContext3.logEntryHighlightsById;

  var items = (0, _react.useMemo)(function () {
    return logEntries.isReloading ? [] : logEntries.entries.map(function (logEntry) {
      return createLogEntryStreamItem(logEntry, logEntryHighlightsById[logEntry.id] || []);
    });
  }, [logEntries.entries, logEntries.isReloading, logEntryHighlightsById]);
  return children(_objectSpread({}, logEntries, {}, logEntriesCallbacks, {
    items: items,
    currentHighlightKey: currentHighlightKey
  }));
};

exports.WithStreamItems = WithStreamItems;

var createLogEntryStreamItem = function createLogEntryStreamItem(logEntry, highlights) {
  return {
    kind: 'logEntry',
    logEntry: logEntry,
    highlights: highlights
  };
};