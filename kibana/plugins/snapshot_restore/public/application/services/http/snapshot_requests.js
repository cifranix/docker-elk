"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteSnapshots = exports.useLoadSnapshot = exports.useLoadSnapshots = exports.setUiMetricServiceSnapshot = void 0;

var _constants = require("../../../../common/constants");

var _constants2 = require("../../constants");

var _use_request = require("./use_request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Temporary hack to provide the uiMetricService instance to this file.
// TODO: Refactor and export an ApiService instance through the app dependencies context
var uiMetricService;

var setUiMetricServiceSnapshot = function setUiMetricServiceSnapshot(_uiMetricService) {
  uiMetricService = _uiMetricService;
}; // End hack


exports.setUiMetricServiceSnapshot = setUiMetricServiceSnapshot;

var useLoadSnapshots = function useLoadSnapshots() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "snapshots"),
    method: 'get',
    initialData: []
  });
};

exports.useLoadSnapshots = useLoadSnapshots;

var useLoadSnapshot = function useLoadSnapshot(repositoryName, snapshotId) {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "snapshots/").concat(encodeURIComponent(repositoryName), "/").concat(encodeURIComponent(snapshotId)),
    method: 'get'
  });
};

exports.useLoadSnapshot = useLoadSnapshot;

var deleteSnapshots =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(snapshotIds) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "snapshots/").concat(snapshotIds.map(function (_ref2) {
                var snapshot = _ref2.snapshot,
                    repository = _ref2.repository;
                return encodeURIComponent("".concat(repository, "/").concat(snapshot));
              }).join(',')),
              method: 'delete'
            });

          case 2:
            result = _context.sent;
            uiMetricService.trackUiMetric(snapshotIds.length > 1 ? _constants2.UIM_SNAPSHOT_DELETE_MANY : _constants2.UIM_SNAPSHOT_DELETE);
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteSnapshots(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteSnapshots = deleteSnapshots;