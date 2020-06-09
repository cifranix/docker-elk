"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLogSummaryHighlights = void 0;

var _Either = require("fp-ts/lib/Either");

var _pipeable = require("fp-ts/lib/pipeable");

var _function = require("fp-ts/lib/function");

var _legacy_singletons = require("../../../../legacy_singletons");

var _runtime_types = require("../../../../../common/runtime_types");

var _http_api = require("../../../../../common/http_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetchLogSummaryHighlights =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(requestArgs) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _legacy_singletons.npStart.http.fetch(_http_api.LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH, {
              method: 'POST',
              body: JSON.stringify(_http_api.logEntriesSummaryHighlightsRequestRT.encode(requestArgs))
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", (0, _pipeable.pipe)(_http_api.logEntriesSummaryHighlightsResponseRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchLogSummaryHighlights(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchLogSummaryHighlights = fetchLogSummaryHighlights;