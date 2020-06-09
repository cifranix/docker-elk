"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReindexPollingService = void 0;

var _rxjs = require("rxjs");

var _types = require("../../../../../../../common/types");

var _types2 = require("../../../../types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var POLL_INTERVAL = 1000;

/**
 * Service used by the frontend to start reindexing and get updates on the state of a reindex
 * operation. Exposes an Observable that can be used to subscribe to state updates.
 */
var ReindexPollingService = function ReindexPollingService(indexName, http) {
  var _this = this;

  _classCallCheck(this, ReindexPollingService);

  this.indexName = indexName;
  this.http = http;

  _defineProperty(this, "status$", void 0);

  _defineProperty(this, "pollTimeout", void 0);

  _defineProperty(this, "updateStatus",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Prevent two loops from being started.
            _this.stopPolling();

            _context.prev = 1;
            _context.next = 4;
            return _this.http.get("/api/upgrade_assistant/reindex/".concat(_this.indexName));

          case 4:
            data = _context.sent;

            _this.updateWithResponse(data); // Only keep polling if it exists and is in progress.


            if (data.reindexOp && data.reindexOp.status === _types.ReindexStatus.inProgress) {
              _this.pollTimeout = setTimeout(_this.updateStatus, POLL_INTERVAL);
            }

            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

            _this.status$.next(_objectSpread({}, _this.status$.value, {
              status: _types.ReindexStatus.failed
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  })));

  _defineProperty(this, "stopPolling", function () {
    if (_this.pollTimeout) {
      clearTimeout(_this.pollTimeout);
    }
  });

  _defineProperty(this, "startReindex",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var currentValue, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            // Optimistically assume it will start, reset other state.
            currentValue = _this.status$.value;

            _this.status$.next(_objectSpread({}, currentValue, {
              // Only reset last completed step if we aren't currently paused
              lastCompletedStep: currentValue.status === _types.ReindexStatus.paused ? currentValue.lastCompletedStep : undefined,
              status: _types.ReindexStatus.inProgress,
              reindexTaskPercComplete: null,
              errorMessage: null,
              cancelLoadingState: undefined
            }));

            _context2.next = 5;
            return _this.http.post("/api/upgrade_assistant/reindex/".concat(_this.indexName));

          case 5:
            data = _context2.sent;

            _this.updateWithResponse({
              reindexOp: data
            });

            _this.updateStatus();

            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);

            _this.status$.next(_objectSpread({}, _this.status$.value, {
              status: _types.ReindexStatus.failed
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  })));

  _defineProperty(this, "cancelReindex",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            _this.status$.next(_objectSpread({}, _this.status$.value, {
              cancelLoadingState: _types2.LoadingState.Loading
            }));

            _context3.next = 4;
            return _this.http.post("/api/upgrade_assistant/reindex/".concat(_this.indexName, "/cancel"));

          case 4:
            _context3.next = 9;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

            _this.status$.next(_objectSpread({}, _this.status$.value, {
              cancelLoadingState: _types2.LoadingState.Error
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  })));

  _defineProperty(this, "updateWithResponse", function (_ref4) {
    var reindexOp = _ref4.reindexOp,
        warnings = _ref4.warnings,
        hasRequiredPrivileges = _ref4.hasRequiredPrivileges,
        indexGroup = _ref4.indexGroup;
    var currentValue = _this.status$.value; // Next value should always include the entire state, not just what changes.
    // We make a shallow copy as a starting new state.

    var nextValue = _objectSpread({}, currentValue, {
      // If we're getting any updates, set to success.
      loadingState: _types2.LoadingState.Success
    });

    if (warnings) {
      nextValue.reindexWarnings = warnings;
    }

    if (hasRequiredPrivileges !== undefined) {
      nextValue.hasRequiredPrivileges = hasRequiredPrivileges;
    }

    if (indexGroup) {
      nextValue.indexGroup = indexGroup;
    }

    if (reindexOp) {
      // Prevent the UI flickering back to inProgres after cancelling.
      nextValue.lastCompletedStep = reindexOp.lastCompletedStep;
      nextValue.status = reindexOp.status;
      nextValue.reindexTaskPercComplete = reindexOp.reindexTaskPercComplete;
      nextValue.errorMessage = reindexOp.errorMessage;

      if (reindexOp.status === _types.ReindexStatus.cancelled) {
        nextValue.cancelLoadingState = _types2.LoadingState.Success;
      }
    }

    _this.status$.next(nextValue);
  });

  this.status$ = new _rxjs.BehaviorSubject({
    loadingState: _types2.LoadingState.Loading,
    errorMessage: null,
    reindexTaskPercComplete: null
  });
};

exports.ReindexPollingService = ReindexPollingService;