"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogPositionState = exports.useLogPositionState = void 0;

var _react = require("react");

var _constate = _interopRequireDefault(require("constate"));

var _reactUse = require("react-use");

var _datemath = require("../../../utils/datemath");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_DATE_RANGE = {
  startDateExpression: 'now-1d',
  endDateExpression: 'now'
};
var DESIRED_BUFFER_PAGES = 2;

var useVisibleMidpoint = function useVisibleMidpoint(middleKey, targetPosition) {
  // Of the two dependencies `middleKey` and `targetPosition`, return
  // whichever one was the most recently updated. This allows the UI controls
  // to display a newly-selected `targetPosition` before loading new data;
  // otherwise the previous `middleKey` would linger in the UI for the entirety
  // of the loading operation, which the user could perceive as unresponsiveness
  var _useState = (0, _react.useState)({
    middleKey: middleKey,
    targetPosition: targetPosition,
    currentValue: middleKey || targetPosition
  }),
      _useState2 = _slicedToArray(_useState, 2),
      store = _useState2[0],
      update = _useState2[1];

  (0, _react.useEffect)(function () {
    if (middleKey !== store.middleKey) {
      update({
        targetPosition: targetPosition,
        middleKey: middleKey,
        currentValue: middleKey
      });
    } else if (targetPosition !== store.targetPosition) {
      update({
        targetPosition: targetPosition,
        middleKey: middleKey,
        currentValue: targetPosition
      });
    }
  }, [middleKey, targetPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  return store.currentValue;
};

var useLogPositionState = function useLogPositionState() {
  // Flag to determine if `LogPositionState` has been fully initialized.
  //
  // When the page loads, there might be initial state in the URL. We want to
  // prevent the entries from showing until we have processed that initial
  // state. That prevents double fetching.
  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isInitialized = _useState4[0],
      setInitialized = _useState4[1];

  var initialize = (0, _react.useCallback)(function () {
    setInitialized(true);
  }, [setInitialized]);

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      targetPosition = _useState6[0],
      jumpToTargetPosition = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isStreaming = _useState8[0],
      setIsStreaming = _useState8[1];

  var _useState9 = (0, _react.useState)({
    endKey: null,
    middleKey: null,
    startKey: null,
    pagesBeforeStart: Infinity,
    pagesAfterEnd: Infinity
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      visiblePositions = _useState10[0],
      reportVisiblePositions = _useState10[1]; // We group the `startDate` and `endDate` values in the same object to be able
  // to set both at the same time, saving a re-render


  var _useSetState = (0, _reactUse.useSetState)(_objectSpread({}, DEFAULT_DATE_RANGE, {
    startTimestamp: (0, _datemath.datemathToEpochMillis)(DEFAULT_DATE_RANGE.startDateExpression),
    endTimestamp: (0, _datemath.datemathToEpochMillis)(DEFAULT_DATE_RANGE.endDateExpression, 'up'),
    timestampsLastUpdate: Date.now()
  })),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      dateRange = _useSetState2[0],
      setDateRange = _useSetState2[1];

  var startKey = visiblePositions.startKey,
      middleKey = visiblePositions.middleKey,
      endKey = visiblePositions.endKey,
      pagesBeforeStart = visiblePositions.pagesBeforeStart,
      pagesAfterEnd = visiblePositions.pagesAfterEnd;
  var visibleMidpoint = useVisibleMidpoint(middleKey, targetPosition);
  var visibleTimeInterval = (0, _react.useMemo)(function () {
    return startKey && endKey ? {
      start: startKey.time,
      end: endKey.time
    } : null;
  }, [startKey, endKey]); // Allow setting `startDate` and `endDate` separately, or together

  var updateDateRange = (0, _react.useCallback)(function (newDateRange) {
    // Prevent unnecessary re-renders
    if (!('startDateExpression' in newDateRange) && !('endDateExpression' in newDateRange)) {
      return;
    }

    var nextStartDateExpression = newDateRange.startDateExpression || dateRange.startDateExpression;
    var nextEndDateExpression = newDateRange.endDateExpression || dateRange.endDateExpression;

    if (!(0, _datemath.isValidDatemath)(nextStartDateExpression) || !(0, _datemath.isValidDatemath)(nextEndDateExpression)) {
      return;
    } // Dates are valid, so the function cannot return `null`


    var nextStartTimestamp = (0, _datemath.datemathToEpochMillis)(nextStartDateExpression);
    var nextEndTimestamp = (0, _datemath.datemathToEpochMillis)(nextEndDateExpression, 'up'); // Reset the target position if it doesn't fall within the new range.

    if (targetPosition && (nextStartTimestamp > targetPosition.time || nextEndTimestamp < targetPosition.time)) {
      jumpToTargetPosition(null);
    }

    setDateRange(_objectSpread({}, newDateRange, {
      startTimestamp: nextStartTimestamp,
      endTimestamp: nextEndTimestamp,
      timestampsLastUpdate: Date.now()
    }));
  }, [setDateRange, dateRange, targetPosition]); // `endTimestamp` update conditions

  (0, _react.useEffect)(function () {
    if (dateRange.endDateExpression !== 'now') {
      return;
    } // User is close to the bottom edge of the scroll.


    if (visiblePositions.pagesAfterEnd <= DESIRED_BUFFER_PAGES) {
      setDateRange({
        endTimestamp: (0, _datemath.datemathToEpochMillis)(dateRange.endDateExpression, 'up'),
        timestampsLastUpdate: Date.now()
      });
    }
  }, [dateRange.endDateExpression, visiblePositions, setDateRange]);

  var state = _objectSpread({
    isInitialized: isInitialized,
    targetPosition: targetPosition,
    isStreaming: isStreaming,
    firstVisiblePosition: startKey,
    pagesBeforeStart: pagesBeforeStart,
    pagesAfterEnd: pagesAfterEnd,
    visibleMidpoint: visibleMidpoint,
    visibleMidpointTime: visibleMidpoint ? visibleMidpoint.time : null,
    visibleTimeInterval: visibleTimeInterval
  }, dateRange);

  var callbacks = {
    initialize: initialize,
    jumpToTargetPosition: jumpToTargetPosition,
    jumpToTargetPositionTime: (0, _react.useCallback)(function (time) {
      return jumpToTargetPosition({
        tiebreaker: 0,
        time: time
      });
    }, [jumpToTargetPosition]),
    reportVisiblePositions: reportVisiblePositions,
    startLiveStreaming: (0, _react.useCallback)(function () {
      setIsStreaming(true);
      jumpToTargetPosition(null);
      updateDateRange({
        startDateExpression: 'now-1d',
        endDateExpression: 'now'
      });
    }, [setIsStreaming, updateDateRange]),
    stopLiveStreaming: (0, _react.useCallback)(function () {
      return setIsStreaming(false);
    }, [setIsStreaming]),
    updateDateRange: updateDateRange
  };
  return _objectSpread({}, state, {}, callbacks);
};

exports.useLogPositionState = useLogPositionState;
var LogPositionState = (0, _constate.default)(useLogPositionState);
exports.LogPositionState = LogPositionState;