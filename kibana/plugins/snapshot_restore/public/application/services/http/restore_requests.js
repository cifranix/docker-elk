"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLoadRestores = exports.executeRestore = exports.setUiMetricServiceRestore = void 0;

var _constants = require("../../../../common/constants");

var _constants2 = require("../../constants");

var _use_request = require("./use_request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Temporary hack to provide the uiMetricService instance to this file.
// TODO: Refactor and export an ApiService instance through the app dependencies context
var uiMetricService;

var setUiMetricServiceRestore = function setUiMetricServiceRestore(_uiMetricService) {
  uiMetricService = _uiMetricService;
}; // End hack


exports.setUiMetricServiceRestore = setUiMetricServiceRestore;

var executeRestore =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(repository, snapshot, restoreSettings) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "restore/").concat(encodeURIComponent(repository), "/").concat(encodeURIComponent(snapshot)),
              method: 'post',
              body: restoreSettings
            });

          case 2:
            result = _context.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_RESTORE_CREATE);
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function executeRestore(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.executeRestore = executeRestore;

var useLoadRestores = function useLoadRestores(pollIntervalMs) {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "restores"),
    method: 'get',
    initialData: [],
    pollIntervalMs: pollIntervalMs
  });
};

exports.useLoadRestores = useLoadRestores;