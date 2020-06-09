"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryCategoryExamples = void 0;

var _react = require("react");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _get_log_entry_category_examples = require("./service_calls/get_log_entry_category_examples");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogEntryCategoryExamples = function useLogEntryCategoryExamples(_ref) {
  var categoryId = _ref.categoryId,
      endTime = _ref.endTime,
      exampleCount = _ref.exampleCount,
      sourceId = _ref.sourceId,
      startTime = _ref.startTime;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      logEntryCategoryExamples = _useState2[0],
      setLogEntryCategoryExamples = _useState2[1];

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
                _context.next = 2;
                return (0, _get_log_entry_category_examples.callGetLogEntryCategoryExamplesAPI)(sourceId, startTime, endTime, categoryId, exampleCount);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
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
    onResolve: function onResolve(_ref2) {
      var examples = _ref2.data.examples;
      setLogEntryCategoryExamples(examples);
    }
  }, [categoryId, endTime, exampleCount, sourceId, startTime]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      getLogEntryCategoryExamplesRequest = _useTrackedPromise2[0],
      getLogEntryCategoryExamples = _useTrackedPromise2[1];

  var isLoadingLogEntryCategoryExamples = (0, _react.useMemo)(function () {
    return getLogEntryCategoryExamplesRequest.state === 'pending';
  }, [getLogEntryCategoryExamplesRequest.state]);
  var hasFailedLoadingLogEntryCategoryExamples = (0, _react.useMemo)(function () {
    return getLogEntryCategoryExamplesRequest.state === 'rejected';
  }, [getLogEntryCategoryExamplesRequest.state]);
  return {
    getLogEntryCategoryExamples: getLogEntryCategoryExamples,
    hasFailedLoadingLogEntryCategoryExamples: hasFailedLoadingLogEntryCategoryExamples,
    isLoadingLogEntryCategoryExamples: isLoadingLogEntryCategoryExamples,
    logEntryCategoryExamples: logEntryCategoryExamples
  };
};

exports.useLogEntryCategoryExamples = useLogEntryCategoryExamples;