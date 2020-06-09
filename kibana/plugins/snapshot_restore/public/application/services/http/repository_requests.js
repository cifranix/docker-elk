"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteRepositories = exports.editRepository = exports.addRepository = exports.useLoadRepositoryTypes = exports.cleanupRepository = exports.verifyRepository = exports.useLoadRepository = exports.useLoadRepositories = exports.setUiMetricServiceRepository = void 0;

var _constants = require("../../../../common/constants");

var _constants2 = require("../../constants");

var _use_request = require("./use_request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Temporary hack to provide the uiMetricService instance to this file.
// TODO: Refactor and export an ApiService instance through the app dependencies context
var uiMetricService;

var setUiMetricServiceRepository = function setUiMetricServiceRepository(_uiMetricService) {
  uiMetricService = _uiMetricService;
}; // End hack


exports.setUiMetricServiceRepository = setUiMetricServiceRepository;

var useLoadRepositories = function useLoadRepositories() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "repositories"),
    method: 'get',
    initialData: []
  });
};

exports.useLoadRepositories = useLoadRepositories;

var useLoadRepository = function useLoadRepository(name) {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "repositories/").concat(encodeURIComponent(name)),
    method: 'get'
  });
};

exports.useLoadRepository = useLoadRepository;

var verifyRepository =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "repositories/").concat(encodeURIComponent(name), "/verify"),
              method: 'get'
            });

          case 2:
            result = _context.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_REPOSITORY_DETAIL_PANEL_VERIFY);
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyRepository(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyRepository = verifyRepository;

var cleanupRepository =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(name) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "repositories/").concat(encodeURIComponent(name), "/cleanup"),
              method: 'post',
              body: undefined
            });

          case 2:
            result = _context2.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_REPOSITORY_DETAIL_PANEL_CLEANUP);
            return _context2.abrupt("return", result);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function cleanupRepository(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.cleanupRepository = cleanupRepository;

var useLoadRepositoryTypes = function useLoadRepositoryTypes() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "repository_types"),
    method: 'get',
    initialData: []
  });
};

exports.useLoadRepositoryTypes = useLoadRepositoryTypes;

var addRepository =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(newRepository) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "repositories"),
              method: 'put',
              body: newRepository
            });

          case 2:
            result = _context3.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_REPOSITORY_CREATE);
            return _context3.abrupt("return", result);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addRepository(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addRepository = addRepository;

var editRepository =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(editedRepository) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "repositories/").concat(encodeURIComponent(editedRepository.name)),
              method: 'put',
              body: editedRepository
            });

          case 2:
            result = _context4.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_REPOSITORY_UPDATE);
            return _context4.abrupt("return", result);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function editRepository(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.editRepository = editRepository;

var deleteRepositories =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(names) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "repositories/").concat(names.map(function (name) {
                return encodeURIComponent(name);
              }).join(',')),
              method: 'delete'
            });

          case 2:
            result = _context5.sent;
            uiMetricService.trackUiMetric(names.length > 1 ? _constants2.UIM_REPOSITORY_DELETE_MANY : _constants2.UIM_REPOSITORY_DELETE);
            return _context5.abrupt("return", result);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteRepositories(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteRepositories = deleteRepositories;