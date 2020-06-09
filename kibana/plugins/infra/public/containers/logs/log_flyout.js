"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithFlyoutOptionsUrlState = exports.LogFlyout = exports.useLogFlyout = exports.FlyoutVisibility = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _url_state = require("../../utils/url_state");

var _use_tracked_promise = require("../../utils/use_tracked_promise");

var _source = require("../source");

var _fetch_log_entries_item = require("./log_entries/api/fetch_log_entries_item");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FlyoutVisibility;
exports.FlyoutVisibility = FlyoutVisibility;

(function (FlyoutVisibility) {
  FlyoutVisibility["hidden"] = "hidden";
  FlyoutVisibility["visible"] = "visible";
})(FlyoutVisibility || (exports.FlyoutVisibility = FlyoutVisibility = {}));

var useLogFlyout = function useLogFlyout() {
  var _useContext = (0, _react.useContext)(_source.Source.Context),
      sourceId = _useContext.sourceId;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      flyoutVisible = _useState2[0],
      setFlyoutVisibility = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      flyoutId = _useState4[0],
      setFlyoutId = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      flyoutItem = _useState6[0],
      setFlyoutItem = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      surroundingLogsId = _useState8[0],
      setSurroundingLogsId = _useState8[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'creation',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (flyoutId) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return (0, _fetch_log_entries_item.fetchLogEntriesItem)({
                  sourceId: sourceId,
                  id: flyoutId
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(response) {
      if (response) {
        var data = response.data;
        setFlyoutItem(data || null);
      }
    }
  }, [sourceId, flyoutId]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      loadFlyoutItemRequest = _useTrackedPromise2[0],
      loadFlyoutItem = _useTrackedPromise2[1];

  var isLoading = (0, _react.useMemo)(function () {
    return loadFlyoutItemRequest.state === 'pending';
  }, [loadFlyoutItemRequest.state]);
  (0, _react.useEffect)(function () {
    if (flyoutId) {
      loadFlyoutItem();
    }
  }, [loadFlyoutItem, flyoutId]);
  return {
    flyoutVisible: flyoutVisible,
    setFlyoutVisibility: setFlyoutVisibility,
    flyoutId: flyoutId,
    setFlyoutId: setFlyoutId,
    surroundingLogsId: surroundingLogsId,
    setSurroundingLogsId: setSurroundingLogsId,
    isLoading: isLoading,
    flyoutItem: flyoutItem
  };
};

exports.useLogFlyout = useLogFlyout;
var LogFlyout = (0, _constate.default)(useLogFlyout);
exports.LogFlyout = LogFlyout;

var WithFlyoutOptionsUrlState = function WithFlyoutOptionsUrlState() {
  var _useContext2 = (0, _react.useContext)(LogFlyout.Context),
      flyoutVisible = _useContext2.flyoutVisible,
      setFlyoutVisibility = _useContext2.setFlyoutVisibility,
      flyoutId = _useContext2.flyoutId,
      setFlyoutId = _useContext2.setFlyoutId,
      surroundingLogsId = _useContext2.surroundingLogsId,
      setSurroundingLogsId = _useContext2.setSurroundingLogsId;

  return _react.default.createElement(_url_state.UrlStateContainer, {
    urlState: {
      flyoutVisibility: flyoutVisible ? FlyoutVisibility.visible : FlyoutVisibility.hidden,
      flyoutId: flyoutId,
      surroundingLogsId: surroundingLogsId
    },
    urlStateKey: "flyoutOptions",
    mapToUrlState: mapToUrlState,
    onChange: function onChange(newUrlState) {
      if (newUrlState && newUrlState.flyoutId) {
        setFlyoutId(newUrlState.flyoutId);
      }

      if (newUrlState && newUrlState.surroundingLogsId) {
        setSurroundingLogsId(newUrlState.surroundingLogsId);
      }

      if (newUrlState && newUrlState.flyoutVisibility === FlyoutVisibility.visible) {
        setFlyoutVisibility(true);
      }

      if (newUrlState && newUrlState.flyoutVisibility === FlyoutVisibility.hidden) {
        setFlyoutVisibility(false);
      }
    },
    onInitialize: function onInitialize(initialUrlState) {
      if (initialUrlState && initialUrlState.flyoutId) {
        setFlyoutId(initialUrlState.flyoutId);
      }

      if (initialUrlState && initialUrlState.surroundingLogsId) {
        setSurroundingLogsId(initialUrlState.surroundingLogsId);
      }

      if (initialUrlState && initialUrlState.flyoutVisibility === FlyoutVisibility.visible) {
        setFlyoutVisibility(true);
      }

      if (initialUrlState && initialUrlState.flyoutVisibility === FlyoutVisibility.hidden) {
        setFlyoutVisibility(false);
      }
    }
  });
};

exports.WithFlyoutOptionsUrlState = WithFlyoutOptionsUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    flyoutId: mapToFlyoutIdState(value.flyoutId),
    flyoutVisibility: mapToFlyoutVisibilityState(value.flyoutVisibility),
    surroundingLogsId: mapToSurroundingLogsIdState(value.surroundingLogsId)
  } : undefined;
};

var mapToFlyoutIdState = function mapToFlyoutIdState(subject) {
  return subject && (0, _lodash.isString)(subject) ? subject : undefined;
};

var mapToSurroundingLogsIdState = function mapToSurroundingLogsIdState(subject) {
  return subject && (0, _lodash.isString)(subject) ? subject : undefined;
};

var mapToFlyoutVisibilityState = function mapToFlyoutVisibilityState(subject) {
  if (subject) {
    if (subject === 'visible') {
      return FlyoutVisibility.visible;
    }

    if (subject === 'hidden') {
      return FlyoutVisibility.hidden;
    }
  }
};