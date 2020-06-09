"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogSummaryHighlights = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _fetch_log_summary_highlights = require("./api/fetch_log_summary_highlights");

var _bucket_size = require("../log_summary/bucket_size");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogSummaryHighlights = function useLogSummaryHighlights(sourceId, sourceVersion, startTimestamp, endTimestamp, filterQuery, highlightTerms) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      logSummaryHighlights = _useState2[0],
      setLogSummaryHighlights = _useState2[1];

  var bucketSize = (0, _bucket_size.useBucketSize)(startTimestamp, endTimestamp);

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
                if (!(!startTimestamp || !endTimestamp || !bucketSize || !highlightTerms.length)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Skipping request: Insufficient parameters');

              case 2:
                _context.next = 4;
                return (0, _fetch_log_summary_highlights.fetchLogSummaryHighlights)({
                  sourceId: sourceId,
                  startTimestamp: startTimestamp,
                  endTimestamp: endTimestamp,
                  bucketSize: bucketSize,
                  query: filterQuery,
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
      setLogSummaryHighlights(response.data);
    }
  }, [sourceId, startTimestamp, endTimestamp, bucketSize, filterQuery, highlightTerms]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      loadLogSummaryHighlightsRequest = _useTrackedPromise2[0],
      loadLogSummaryHighlights = _useTrackedPromise2[1];

  var debouncedLoadSummaryHighlights = (0, _react.useMemo)(function () {
    return (0, _lodash.debounce)(loadLogSummaryHighlights, 275);
  }, [loadLogSummaryHighlights]);
  (0, _react.useEffect)(function () {
    setLogSummaryHighlights([]);
  }, [highlightTerms]);
  (0, _react.useEffect)(function () {
    if (highlightTerms.filter(function (highlightTerm) {
      return highlightTerm.length > 0;
    }).length && startTimestamp && endTimestamp) {
      debouncedLoadSummaryHighlights();
    } else {
      setLogSummaryHighlights([]);
    }
  }, [bucketSize, debouncedLoadSummaryHighlights, filterQuery, highlightTerms, sourceVersion, startTimestamp, endTimestamp]);
  return {
    logSummaryHighlights: logSummaryHighlights,
    loadLogSummaryHighlightsRequest: loadLogSummaryHighlightsRequest
  };
};

exports.useLogSummaryHighlights = useLogSummaryHighlights;