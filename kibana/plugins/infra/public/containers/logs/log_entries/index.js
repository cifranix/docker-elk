"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntriesState = exports.useLogEntriesState = exports.logEntriesInitialState = exports.logEntriesInitialCallbacks = void 0;

var _react = require("react");

var _constate = _interopRequireDefault(require("constate"));

var _lodash = require("lodash");

var _time = require("../../../../common/time");

var _fetch_log_entries = require("./api/fetch_log_entries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DESIRED_BUFFER_PAGES = 2;
var LIVE_STREAM_INTERVAL = 5000;
var Action;

(function (Action) {
  Action[Action["FetchingNewEntries"] = 0] = "FetchingNewEntries";
  Action[Action["FetchingMoreEntries"] = 1] = "FetchingMoreEntries";
  Action[Action["ReceiveNewEntries"] = 2] = "ReceiveNewEntries";
  Action[Action["ReceiveEntriesBefore"] = 3] = "ReceiveEntriesBefore";
  Action[Action["ReceiveEntriesAfter"] = 4] = "ReceiveEntriesAfter";
  Action[Action["ErrorOnNewEntries"] = 5] = "ErrorOnNewEntries";
  Action[Action["ErrorOnMoreEntries"] = 6] = "ErrorOnMoreEntries";
  Action[Action["ExpandRange"] = 7] = "ExpandRange";
})(Action || (Action = {}));

var logEntriesInitialCallbacks = {
  fetchNewerEntries: function () {
    var _fetchNewerEntries = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function fetchNewerEntries() {
      return _fetchNewerEntries.apply(this, arguments);
    }

    return fetchNewerEntries;
  }()
};
exports.logEntriesInitialCallbacks = logEntriesInitialCallbacks;
var logEntriesInitialState = {
  entries: [],
  topCursor: null,
  bottomCursor: null,
  centerCursor: null,
  isReloading: true,
  isLoadingMore: false,
  lastLoadedTime: null,
  hasMoreBeforeStart: false,
  hasMoreAfterEnd: false
};
exports.logEntriesInitialState = logEntriesInitialState;

var cleanDuplicateItems = function cleanDuplicateItems(entriesA, entriesB) {
  var ids = new Set(entriesB.map(function (item) {
    return item.id;
  }));
  return entriesA.filter(function (item) {
    return !ids.has(item.id);
  });
};

var shouldFetchNewEntries = function shouldFetchNewEntries(_ref) {
  var prevParams = _ref.prevParams,
      timeKey = _ref.timeKey,
      filterQuery = _ref.filterQuery,
      topCursor = _ref.topCursor,
      bottomCursor = _ref.bottomCursor,
      startTimestamp = _ref.startTimestamp,
      endTimestamp = _ref.endTimestamp;
  var shouldLoadWithNewDates = prevParams ? startTimestamp !== prevParams.startTimestamp && startTimestamp > prevParams.startTimestamp || endTimestamp !== prevParams.endTimestamp && endTimestamp < prevParams.endTimestamp : true;
  var shouldLoadWithNewFilter = prevParams ? filterQuery !== prevParams.filterQuery : true;
  var shouldLoadAroundNewPosition = timeKey && (!topCursor || !bottomCursor || !(0, _time.timeKeyIsBetween)(topCursor, bottomCursor, timeKey));
  return shouldLoadWithNewDates || shouldLoadWithNewFilter || shouldLoadAroundNewPosition;
};

var ShouldFetchMoreEntries;

(function (ShouldFetchMoreEntries) {
  ShouldFetchMoreEntries[ShouldFetchMoreEntries["Before"] = 0] = "Before";
  ShouldFetchMoreEntries[ShouldFetchMoreEntries["After"] = 1] = "After";
})(ShouldFetchMoreEntries || (ShouldFetchMoreEntries = {}));

var shouldFetchMoreEntries = function shouldFetchMoreEntries(_ref2, _ref3) {
  var pagesAfterEnd = _ref2.pagesAfterEnd,
      pagesBeforeStart = _ref2.pagesBeforeStart;
  var hasMoreBeforeStart = _ref3.hasMoreBeforeStart,
      hasMoreAfterEnd = _ref3.hasMoreAfterEnd;
  if (pagesBeforeStart === null || pagesAfterEnd === null) return false;
  if (pagesBeforeStart < DESIRED_BUFFER_PAGES && hasMoreBeforeStart) return ShouldFetchMoreEntries.Before;
  if (pagesAfterEnd < DESIRED_BUFFER_PAGES && hasMoreAfterEnd) return ShouldFetchMoreEntries.After;
  return false;
};

var useFetchEntriesEffect = function useFetchEntriesEffect(state, dispatch, props) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      prevParams = _useState2[0],
      cachePrevParams = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      startedStreaming = _useState4[0],
      setStartedStreaming = _useState4[1];

  var runFetchNewEntriesRequest =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var overrides,
          commonFetchArgs,
          fetchArgs,
          _ref5,
          payload,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              overrides = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};

              if (!(!props.startTimestamp || !props.endTimestamp)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              dispatch({
                type: Action.FetchingNewEntries
              });
              _context2.prev = 4;
              commonFetchArgs = {
                sourceId: overrides.sourceId || props.sourceId,
                startTimestamp: overrides.startTimestamp || props.startTimestamp,
                endTimestamp: overrides.endTimestamp || props.endTimestamp,
                query: overrides.filterQuery || props.filterQuery
              };
              fetchArgs = props.timeKey ? _objectSpread({}, commonFetchArgs, {
                center: props.timeKey
              }) : _objectSpread({}, commonFetchArgs, {
                before: 'last'
              });
              _context2.next = 9;
              return (0, _fetch_log_entries.fetchLogEntries)(fetchArgs);

            case 9:
              _ref5 = _context2.sent;
              payload = _ref5.data;
              dispatch({
                type: Action.ReceiveNewEntries,
                payload: payload
              }); // Move position to the bottom if it's the first load.
              // Do it in the next tick to allow the `dispatch` to fire

              if (!props.timeKey && payload.bottomCursor) {
                setTimeout(function () {
                  props.jumpToTargetPosition(payload.bottomCursor);
                });
              } else if (props.timeKey && payload.topCursor && payload.bottomCursor && !(0, _time.timeKeyIsBetween)(payload.topCursor, payload.bottomCursor, props.timeKey)) {
                props.jumpToTargetPosition(payload.topCursor);
              }

              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](4);
              dispatch({
                type: Action.ErrorOnNewEntries
              });

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 15]]);
    }));

    return function runFetchNewEntriesRequest() {
      return _ref4.apply(this, arguments);
    };
  }();

  var runFetchMoreEntriesRequest =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(direction) {
      var getEntriesBefore, commonFetchArgs, fetchArgs, _ref7, payload;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!props.startTimestamp || !props.endTimestamp)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              getEntriesBefore = direction === ShouldFetchMoreEntries.Before; // Control that cursors are correct

              if (!(getEntriesBefore && !state.topCursor || !state.bottomCursor)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return");

            case 5:
              dispatch({
                type: Action.FetchingMoreEntries
              });
              _context3.prev = 6;
              commonFetchArgs = {
                sourceId: props.sourceId,
                startTimestamp: props.startTimestamp,
                endTimestamp: props.endTimestamp,
                query: props.filterQuery
              };
              fetchArgs = getEntriesBefore ? _objectSpread({}, commonFetchArgs, {
                before: state.topCursor // We already check for nullity above

              }) : _objectSpread({}, commonFetchArgs, {
                after: state.bottomCursor
              });
              _context3.next = 11;
              return (0, _fetch_log_entries.fetchLogEntries)(fetchArgs);

            case 11:
              _ref7 = _context3.sent;
              payload = _ref7.data;
              dispatch({
                type: getEntriesBefore ? Action.ReceiveEntriesBefore : Action.ReceiveEntriesAfter,
                payload: payload
              });
              return _context3.abrupt("return", payload.bottomCursor);

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](6);
              dispatch({
                type: Action.ErrorOnMoreEntries
              });

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[6, 17]]);
    }));

    return function runFetchMoreEntriesRequest(_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  var fetchNewEntriesEffectDependencies = Object.values((0, _lodash.pick)(props, ['sourceId', 'filterQuery', 'timeKey', 'startTimestamp', 'endTimestamp']));

  var fetchNewEntriesEffect = function fetchNewEntriesEffect() {
    if (props.isStreaming && prevParams) return;

    if (shouldFetchNewEntries(_objectSpread({}, props, {}, state, {
      prevParams: prevParams
    }))) {
      runFetchNewEntriesRequest();
    }

    cachePrevParams(props);
  };

  var fetchMoreEntriesEffectDependencies = [].concat(_toConsumableArray(Object.values((0, _lodash.pick)(props, ['pagesAfterEnd', 'pagesBeforeStart']))), [Object.values((0, _lodash.pick)(state, ['hasMoreBeforeStart', 'hasMoreAfterEnd']))]);

  var fetchMoreEntriesEffect = function fetchMoreEntriesEffect() {
    if (state.isLoadingMore || props.isStreaming) return;
    var direction = shouldFetchMoreEntries(props, state);

    switch (direction) {
      case ShouldFetchMoreEntries.Before:
      case ShouldFetchMoreEntries.After:
        runFetchMoreEntriesRequest(direction);
        break;

      default:
        break;
    }
  };

  var fetchNewerEntries = (0, _react.useCallback)((0, _lodash.throttle)(function () {
    return runFetchMoreEntriesRequest(ShouldFetchMoreEntries.After);
  }, 500), [props, state.bottomCursor]);
  var streamEntriesEffectDependencies = [props.isStreaming, state.isLoadingMore, state.isReloading];

  var streamEntriesEffect = function streamEntriesEffect() {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var endTimestamp, newEntriesEnd;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(props.isStreaming && !state.isLoadingMore && !state.isReloading)) {
                _context4.next = 18;
                break;
              }

              if (!startedStreaming) {
                _context4.next = 6;
                break;
              }

              _context4.next = 4;
              return new Promise(function (res) {
                return setTimeout(res, LIVE_STREAM_INTERVAL);
              });

            case 4:
              _context4.next = 12;
              break;

            case 6:
              endTimestamp = Date.now();
              props.jumpToTargetPosition({
                tiebreaker: 0,
                time: endTimestamp
              });
              setStartedStreaming(true);

              if (!state.hasMoreAfterEnd) {
                _context4.next = 12;
                break;
              }

              runFetchNewEntriesRequest({
                endTimestamp: endTimestamp
              });
              return _context4.abrupt("return");

            case 12:
              _context4.next = 14;
              return runFetchMoreEntriesRequest(ShouldFetchMoreEntries.After);

            case 14:
              newEntriesEnd = _context4.sent;

              if (newEntriesEnd) {
                props.jumpToTargetPosition(newEntriesEnd);
              }

              _context4.next = 19;
              break;

            case 18:
              if (!props.isStreaming) {
                setStartedStreaming(false);
              }

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  };

  var expandRangeEffect = function expandRangeEffect() {
    if (!prevParams || !prevParams.startTimestamp || !prevParams.endTimestamp) {
      return;
    }

    if (props.timestampsLastUpdate === prevParams.timestampsLastUpdate) {
      return;
    }

    var shouldExpand = {
      before: props.startTimestamp < prevParams.startTimestamp,
      after: props.endTimestamp > prevParams.endTimestamp
    };
    dispatch({
      type: Action.ExpandRange,
      payload: shouldExpand
    });
  };

  var expandRangeEffectDependencies = [prevParams === null || prevParams === void 0 ? void 0 : prevParams.startTimestamp, prevParams === null || prevParams === void 0 ? void 0 : prevParams.endTimestamp, props.startTimestamp, props.endTimestamp, props.timestampsLastUpdate];
  (0, _react.useEffect)(fetchNewEntriesEffect, fetchNewEntriesEffectDependencies);
  (0, _react.useEffect)(fetchMoreEntriesEffect, fetchMoreEntriesEffectDependencies);
  (0, _react.useEffect)(streamEntriesEffect, streamEntriesEffectDependencies);
  (0, _react.useEffect)(expandRangeEffect, expandRangeEffectDependencies);
  return {
    fetchNewerEntries: fetchNewerEntries,
    checkForNewEntries: runFetchNewEntriesRequest
  };
};

var useLogEntriesState = function useLogEntriesState(props) {
  var _useReducer = (0, _react.useReducer)(logEntriesStateReducer, logEntriesInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useFetchEntriesEffec = useFetchEntriesEffect(state, dispatch, props),
      fetchNewerEntries = _useFetchEntriesEffec.fetchNewerEntries,
      checkForNewEntries = _useFetchEntriesEffec.checkForNewEntries;

  var callbacks = {
    fetchNewerEntries: fetchNewerEntries,
    checkForNewEntries: checkForNewEntries
  };
  return [state, callbacks];
};

exports.useLogEntriesState = useLogEntriesState;

var logEntriesStateReducer = function logEntriesStateReducer(prevState, action) {
  switch (action.type) {
    case Action.ReceiveNewEntries:
      return _objectSpread({}, prevState, {}, action.payload, {
        centerCursor: getCenterCursor(action.payload.entries),
        lastLoadedTime: new Date(),
        isReloading: false,
        // Be optimistic. If any of the before/after requests comes empty, set
        // the corresponding flag to `false`
        hasMoreBeforeStart: true,
        hasMoreAfterEnd: true
      });

    case Action.ReceiveEntriesBefore:
      {
        var newEntries = action.payload.entries;
        var prevEntries = cleanDuplicateItems(prevState.entries, newEntries);
        var entries = [].concat(_toConsumableArray(newEntries), _toConsumableArray(prevEntries));
        var update = {
          entries: entries,
          isLoadingMore: false,
          hasMoreBeforeStart: newEntries.length > 0,
          // Keep the previous cursor if request comes empty, to easily extend the range.
          topCursor: newEntries.length > 0 ? action.payload.topCursor : prevState.topCursor,
          centerCursor: getCenterCursor(entries),
          lastLoadedTime: new Date()
        };
        return _objectSpread({}, prevState, {}, update);
      }

    case Action.ReceiveEntriesAfter:
      {
        var _newEntries = action.payload.entries;

        var _prevEntries = cleanDuplicateItems(prevState.entries, _newEntries);

        var _entries = [].concat(_toConsumableArray(_prevEntries), _toConsumableArray(_newEntries));

        var _update = {
          entries: _entries,
          isLoadingMore: false,
          hasMoreAfterEnd: _newEntries.length > 0,
          // Keep the previous cursor if request comes empty, to easily extend the range.
          bottomCursor: _newEntries.length > 0 ? action.payload.bottomCursor : prevState.bottomCursor,
          centerCursor: getCenterCursor(_entries),
          lastLoadedTime: new Date()
        };
        return _objectSpread({}, prevState, {}, _update);
      }

    case Action.FetchingNewEntries:
      return _objectSpread({}, prevState, {
        isReloading: true,
        entries: [],
        topCursor: null,
        bottomCursor: null,
        centerCursor: null,
        hasMoreBeforeStart: true,
        hasMoreAfterEnd: true
      });

    case Action.FetchingMoreEntries:
      return _objectSpread({}, prevState, {
        isLoadingMore: true
      });

    case Action.ErrorOnNewEntries:
      return _objectSpread({}, prevState, {
        isReloading: false
      });

    case Action.ErrorOnMoreEntries:
      return _objectSpread({}, prevState, {
        isLoadingMore: false
      });

    case Action.ExpandRange:
      {
        var hasMoreBeforeStart = action.payload.before ? true : prevState.hasMoreBeforeStart;
        var hasMoreAfterEnd = action.payload.after ? true : prevState.hasMoreAfterEnd;
        return _objectSpread({}, prevState, {
          hasMoreBeforeStart: hasMoreBeforeStart,
          hasMoreAfterEnd: hasMoreAfterEnd
        });
      }

    default:
      throw new Error();
  }
};

function getCenterCursor(entries) {
  return entries.length > 0 ? entries[Math.floor(entries.length / 2)].cursor : null;
}

var LogEntriesState = (0, _constate.default)(useLogEntriesState);
exports.LogEntriesState = LogEntriesState;