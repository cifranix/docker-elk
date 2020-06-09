"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPageProviders = void 0;

var _react = _interopRequireWildcard(require("react"));

var _log_flyout = require("../../../containers/logs/log_flyout");

var _log_view_configuration = require("../../../containers/logs/log_view_configuration");

var _log_highlights = require("../../../containers/logs/log_highlights/log_highlights");

var _log_position = require("../../../containers/logs/log_position");

var _log_filter = require("../../../containers/logs/log_filter");

var _log_entries = require("../../../containers/logs/log_entries");

var _source = require("../../../containers/source");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogFilterStateProvider = function LogFilterStateProvider(_ref) {
  var children = _ref.children;

  var _useContext = (0, _react.useContext)(_source.Source.Context),
      createDerivedIndexPattern = _useContext.createDerivedIndexPattern;

  var derivedIndexPattern = createDerivedIndexPattern('logs');
  return _react.default.createElement(_log_filter.LogFilterState.Provider, {
    indexPattern: derivedIndexPattern
  }, _react.default.createElement(_log_filter.WithLogFilterUrlState, null), children);
};

var LogEntriesStateProvider = function LogEntriesStateProvider(_ref2) {
  var children = _ref2.children;

  var _useContext2 = (0, _react.useContext)(_source.Source.Context),
      sourceId = _useContext2.sourceId;

  var _useContext3 = (0, _react.useContext)(_log_position.LogPositionState.Context),
      startTimestamp = _useContext3.startTimestamp,
      endTimestamp = _useContext3.endTimestamp,
      timestampsLastUpdate = _useContext3.timestampsLastUpdate,
      targetPosition = _useContext3.targetPosition,
      pagesBeforeStart = _useContext3.pagesBeforeStart,
      pagesAfterEnd = _useContext3.pagesAfterEnd,
      isStreaming = _useContext3.isStreaming,
      jumpToTargetPosition = _useContext3.jumpToTargetPosition,
      isInitialized = _useContext3.isInitialized;

  var _useContext4 = (0, _react.useContext)(_log_filter.LogFilterState.Context),
      filterQuery = _useContext4.filterQuery; // Don't render anything if the date range is incorrect.


  if (!startTimestamp || !endTimestamp) {
    return null;
  }

  var entriesProps = {
    startTimestamp: startTimestamp,
    endTimestamp: endTimestamp,
    timestampsLastUpdate: timestampsLastUpdate,
    timeKey: targetPosition,
    pagesBeforeStart: pagesBeforeStart,
    pagesAfterEnd: pagesAfterEnd,
    filterQuery: filterQuery,
    sourceId: sourceId,
    isStreaming: isStreaming,
    jumpToTargetPosition: jumpToTargetPosition
  }; // Don't initialize the entries until the position has been fully intialized.
  // See `<WithLogPositionUrlState />`

  if (!isInitialized) {
    return null;
  }

  return _react.default.createElement(_log_entries.LogEntriesState.Provider, entriesProps, children);
};

var LogHighlightsStateProvider = function LogHighlightsStateProvider(_ref3) {
  var children = _ref3.children;

  var _useContext5 = (0, _react.useContext)(_source.Source.Context),
      sourceId = _useContext5.sourceId,
      version = _useContext5.version;

  var _useContext6 = (0, _react.useContext)(_log_entries.LogEntriesState.Context),
      _useContext7 = _slicedToArray(_useContext6, 1),
      _useContext7$ = _useContext7[0],
      topCursor = _useContext7$.topCursor,
      bottomCursor = _useContext7$.bottomCursor,
      centerCursor = _useContext7$.centerCursor,
      entries = _useContext7$.entries;

  var _useContext8 = (0, _react.useContext)(_log_filter.LogFilterState.Context),
      filterQuery = _useContext8.filterQuery;

  var highlightsProps = {
    sourceId: sourceId,
    sourceVersion: version,
    entriesStart: topCursor,
    entriesEnd: bottomCursor,
    centerCursor: centerCursor,
    size: entries.length,
    filterQuery: filterQuery
  };
  return _react.default.createElement(_log_highlights.LogHighlightsState.Provider, highlightsProps, children);
};

var LogsPageProviders = function LogsPageProviders(_ref4) {
  var children = _ref4.children;
  return _react.default.createElement(_log_view_configuration.LogViewConfiguration.Provider, null, _react.default.createElement(_log_flyout.LogFlyout.Provider, null, _react.default.createElement(_log_position.LogPositionState.Provider, null, _react.default.createElement(_log_position.WithLogPositionUrlState, null), _react.default.createElement(LogFilterStateProvider, null, _react.default.createElement(LogEntriesStateProvider, null, _react.default.createElement(LogHighlightsStateProvider, null, children))))));
};

exports.LogsPageProviders = LogsPageProviders;