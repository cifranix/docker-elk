"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryHighlights = void 0;

var _react = require("react");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _fetch_log_entries_highlights = require("./api/fetch_log_entries_highlights");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogEntryHighlights = function useLogEntryHighlights(sourceId, sourceVersion, startTimestamp, endTimestamp, centerPoint, size, filterQuery, highlightTerms) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      logEntryHighlights = _useState2[0],
      setLogEntryHighlights = _useState2[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'resolution',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!startTimestamp || !endTimestamp || !centerPoint || !highlightTerms.length)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Skipping request: Insufficient parameters');

              case 2:
                _context.next = 4;
                return (0, _fetch_log_entries_highlights.fetchLogEntriesHighlights)({
                  sourceId: sourceId,
                  startTimestamp: startTimestamp,
                  endTimestamp: endTimestamp,
                  center: centerPoint,
                  size: size,
                  query: filterQuery || undefined,
                  highlightTerms: highlightTerms
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
      setLogEntryHighlights(response.data);
    }
  }, [sourceId, startTimestamp, endTimestamp, centerPoint, size, filterQuery, highlightTerms]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      loadLogEntryHighlightsRequest = _useTrackedPromise2[0],
      loadLogEntryHighlights = _useTrackedPromise2[1];

  (0, _react.useEffect)(function () {
    setLogEntryHighlights([]);
  }, [highlightTerms]);
  (0, _react.useEffect)(function () {
    if (highlightTerms.filter(function (highlightTerm) {
      return highlightTerm.length > 0;
    }).length && startTimestamp && endTimestamp) {
      loadLogEntryHighlights();
    } else {
      setLogEntryHighlights([]);
    }
  }, [endTimestamp, filterQuery, highlightTerms, loadLogEntryHighlights, sourceVersion, startTimestamp]);
  var logEntryHighlightsById = (0, _react.useMemo)(function () {
    return logEntryHighlights.reduce(function (accumulatedLogEntryHighlightsById, highlightData) {
      return highlightData.entries.reduce(function (singleHighlightLogEntriesById, entry) {
        var highlightsForId = singleHighlightLogEntriesById[entry.id] || [];
        return _objectSpread({}, singleHighlightLogEntriesById, _defineProperty({}, entry.id, [].concat(_toConsumableArray(highlightsForId), [entry])));
      }, accumulatedLogEntryHighlightsById);
    }, {});
  }, [logEntryHighlights]);
  return {
    logEntryHighlights: logEntryHighlights,
    logEntryHighlightsById: logEntryHighlightsById,
    loadLogEntryHighlightsRequest: loadLogEntryHighlightsRequest
  };
};

exports.useLogEntryHighlights = useLogEntryHighlights;