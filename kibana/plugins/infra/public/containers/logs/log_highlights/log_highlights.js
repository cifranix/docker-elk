"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogHighlightsState = exports.useLogHighlightsState = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

var _reactUse = require("react-use");

var _log_entry_highlights = require("./log_entry_highlights");

var _log_summary_highlights = require("./log_summary_highlights");

var _next_and_previous = require("./next_and_previous");

var _log_position = require("../log_position");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FETCH_THROTTLE_INTERVAL = 3000;

var useLogHighlightsState = function useLogHighlightsState(_ref) {
  var sourceId = _ref.sourceId,
      sourceVersion = _ref.sourceVersion,
      centerCursor = _ref.centerCursor,
      size = _ref.size,
      filterQuery = _ref.filterQuery;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      highlightTerms = _useState2[0],
      setHighlightTerms = _useState2[1];

  var _useContext = (0, _react.useContext)(_log_position.LogPositionState.Context),
      visibleMidpoint = _useContext.visibleMidpoint,
      jumpToTargetPosition = _useContext.jumpToTargetPosition,
      startTimestamp = _useContext.startTimestamp,
      endTimestamp = _useContext.endTimestamp;

  var throttledStartTimestamp = (0, _reactUse.useThrottle)(startTimestamp, FETCH_THROTTLE_INTERVAL);
  var throttledEndTimestamp = (0, _reactUse.useThrottle)(endTimestamp, FETCH_THROTTLE_INTERVAL);

  var _useLogEntryHighlight = (0, _log_entry_highlights.useLogEntryHighlights)(sourceId, sourceVersion, throttledStartTimestamp, throttledEndTimestamp, centerCursor, size, filterQuery, highlightTerms),
      logEntryHighlights = _useLogEntryHighlight.logEntryHighlights,
      logEntryHighlightsById = _useLogEntryHighlight.logEntryHighlightsById,
      loadLogEntryHighlightsRequest = _useLogEntryHighlight.loadLogEntryHighlightsRequest;

  var _useLogSummaryHighlig = (0, _log_summary_highlights.useLogSummaryHighlights)(sourceId, sourceVersion, throttledStartTimestamp, throttledEndTimestamp, filterQuery, highlightTerms),
      logSummaryHighlights = _useLogSummaryHighlig.logSummaryHighlights,
      loadLogSummaryHighlightsRequest = _useLogSummaryHighlig.loadLogSummaryHighlightsRequest;

  var _useNextAndPrevious = (0, _next_and_previous.useNextAndPrevious)({
    visibleMidpoint: visibleMidpoint,
    logEntryHighlights: logEntryHighlights,
    highlightTerms: highlightTerms,
    jumpToTargetPosition: jumpToTargetPosition
  }),
      currentHighlightKey = _useNextAndPrevious.currentHighlightKey,
      hasPreviousHighlight = _useNextAndPrevious.hasPreviousHighlight,
      hasNextHighlight = _useNextAndPrevious.hasNextHighlight,
      goToPreviousHighlight = _useNextAndPrevious.goToPreviousHighlight,
      goToNextHighlight = _useNextAndPrevious.goToNextHighlight;

  return {
    highlightTerms: highlightTerms,
    setHighlightTerms: setHighlightTerms,
    logEntryHighlights: logEntryHighlights,
    logEntryHighlightsById: logEntryHighlightsById,
    logSummaryHighlights: logSummaryHighlights,
    loadLogEntryHighlightsRequest: loadLogEntryHighlightsRequest,
    loadLogSummaryHighlightsRequest: loadLogSummaryHighlightsRequest,
    currentHighlightKey: currentHighlightKey,
    hasPreviousHighlight: hasPreviousHighlight,
    hasNextHighlight: hasNextHighlight,
    goToPreviousHighlight: goToPreviousHighlight,
    goToNextHighlight: goToNextHighlight
  };
};

exports.useLogHighlightsState = useLogHighlightsState;
var LogHighlightsState = (0, _constate.default)(useLogHighlightsState);
exports.LogHighlightsState = LogHighlightsState;