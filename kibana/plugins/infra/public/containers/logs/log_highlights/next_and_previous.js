"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNextAndPrevious = void 0;

var _lodash = require("lodash");

var _react = require("react");

var _log_entry = require("../../../utils/log_entry");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useNextAndPrevious = function useNextAndPrevious(_ref) {
  var highlightTerms = _ref.highlightTerms,
      jumpToTargetPosition = _ref.jumpToTargetPosition,
      logEntryHighlights = _ref.logEntryHighlights,
      visibleMidpoint = _ref.visibleMidpoint;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      currentTimeKey = _useState2[0],
      setCurrentTimeKey = _useState2[1];

  var entries = (0, _react.useMemo)( // simplification, because we only support one highlight phrase for now
  function () {
    return logEntryHighlights && logEntryHighlights.length > 0 ? logEntryHighlights[0].entries : [];
  }, [logEntryHighlights]);
  (0, _react.useEffect)(function () {
    setCurrentTimeKey(null);
  }, [highlightTerms]);
  (0, _react.useEffect)(function () {
    if (currentTimeKey) {
      jumpToTargetPosition(currentTimeKey);
    }
  }, [currentTimeKey, jumpToTargetPosition]);
  (0, _react.useEffect)(function () {
    if (currentTimeKey === null && entries.length > 0) {
      var initialIndex = visibleMidpoint ? clampValue((0, _log_entry.getLogEntryIndexBeforeTime)(entries, visibleMidpoint), 0, entries.length - 1) : 0;
      var initialTimeKey = (0, _log_entry.getUniqueLogEntryKey)(entries[initialIndex]);
      setCurrentTimeKey(initialTimeKey);
    }
  }, [currentTimeKey, entries, setCurrentTimeKey, visibleMidpoint]);
  var indexOfCurrentTimeKey = (0, _react.useMemo)(function () {
    if (currentTimeKey && entries.length > 0) {
      return (0, _log_entry.getLogEntryIndexAtTime)(entries, currentTimeKey);
    } else {
      return null;
    }
  }, [currentTimeKey, entries]);
  var hasPreviousHighlight = (0, _react.useMemo)(function () {
    return (0, _lodash.isNumber)(indexOfCurrentTimeKey) && indexOfCurrentTimeKey > 0;
  }, [indexOfCurrentTimeKey]);
  var hasNextHighlight = (0, _react.useMemo)(function () {
    return entries.length > 0 && (0, _lodash.isNumber)(indexOfCurrentTimeKey) && indexOfCurrentTimeKey < entries.length - 1;
  }, [indexOfCurrentTimeKey, entries]);
  var goToPreviousHighlight = (0, _react.useCallback)(function () {
    if (entries.length && (0, _lodash.isNumber)(indexOfCurrentTimeKey)) {
      var previousIndex = indexOfCurrentTimeKey - 1;
      var entryTimeKey = (0, _log_entry.getUniqueLogEntryKey)(entries[previousIndex]);
      setCurrentTimeKey(entryTimeKey);
    }
  }, [indexOfCurrentTimeKey, entries]);
  var goToNextHighlight = (0, _react.useCallback)(function () {
    if (entries.length > 0 && (0, _lodash.isNumber)(indexOfCurrentTimeKey)) {
      var nextIndex = indexOfCurrentTimeKey + 1;
      var entryTimeKey = (0, _log_entry.getUniqueLogEntryKey)(entries[nextIndex]);
      setCurrentTimeKey(entryTimeKey);
    }
  }, [indexOfCurrentTimeKey, entries]);
  return {
    currentHighlightKey: currentTimeKey,
    hasPreviousHighlight: hasPreviousHighlight,
    hasNextHighlight: hasNextHighlight,
    goToPreviousHighlight: goToPreviousHighlight,
    goToNextHighlight: goToNextHighlight
  };
};

exports.useNextAndPrevious = useNextAndPrevious;

var clampValue = function clampValue(value, minValue, maxValue) {
  return Math.min(Math.max(value, minValue), maxValue);
};