"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeRetention = exports.updateRetentionSchedule = exports.useLoadRetentionSettings = exports.editPolicy = exports.addPolicy = exports.deletePolicies = exports.executePolicy = exports.useLoadIndices = exports.useLoadPolicy = exports.useLoadPolicies = exports.setUiMetricServicePolicy = void 0;

var _constants = require("../../../../common/constants");

var _constants2 = require("../../constants");

var _use_request = require("./use_request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Temporary hack to provide the uiMetricService instance to this file.
// TODO: Refactor and export an ApiService instance through the app dependencies context
var uiMetricService;

var setUiMetricServicePolicy = function setUiMetricServicePolicy(_uiMetricService) {
  uiMetricService = _uiMetricService;
}; // End hack


exports.setUiMetricServicePolicy = setUiMetricServicePolicy;

var useLoadPolicies = function useLoadPolicies() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "policies"),
    method: 'get'
  });
};

exports.useLoadPolicies = useLoadPolicies;

var useLoadPolicy = function useLoadPolicy(name) {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "policy/").concat(encodeURIComponent(name)),
    method: 'get'
  });
};

exports.useLoadPolicy = useLoadPolicy;

var useLoadIndices = function useLoadIndices() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "policies/indices"),
    method: 'get'
  });
};

exports.useLoadIndices = useLoadIndices;

var executePolicy =
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
            result = (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "policy/").concat(encodeURIComponent(name), "/run"),
              method: 'post'
            });
            uiMetricService.trackUiMetric(_constants2.UIM_POLICY_EXECUTE);
            return _context.abrupt("return", result);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function executePolicy(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.executePolicy = executePolicy;

var deletePolicies =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(names) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "policies/").concat(names.map(function (name) {
                return encodeURIComponent(name);
              }).join(',')),
              method: 'delete'
            });
            uiMetricService.trackUiMetric(names.length > 1 ? _constants2.UIM_POLICY_DELETE_MANY : _constants2.UIM_POLICY_DELETE);
            return _context2.abrupt("return", result);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deletePolicies(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deletePolicies = deletePolicies;

var addPolicy =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(newPolicy) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "policies"),
              method: 'post',
              body: newPolicy
            });
            uiMetricService.trackUiMetric(_constants2.UIM_POLICY_CREATE);
            return _context3.abrupt("return", result);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addPolicy(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addPolicy = addPolicy;

var editPolicy =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(editedPolicy) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "policies/").concat(encodeURIComponent(editedPolicy.name)),
              method: 'put',
              body: editedPolicy
            });

          case 2:
            result = _context4.sent;
            uiMetricService.trackUiMetric(_constants2.UIM_POLICY_UPDATE);
            return _context4.abrupt("return", result);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function editPolicy(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.editPolicy = editPolicy;

var useLoadRetentionSettings = function useLoadRetentionSettings() {
  return (0, _use_request.useRequest)({
    path: "".concat(_constants.API_BASE_PATH, "policies/retention_settings"),
    method: 'get'
  });
};

exports.useLoadRetentionSettings = useLoadRetentionSettings;

var updateRetentionSchedule = function updateRetentionSchedule(retentionSchedule) {
  var result = (0, _use_request.sendRequest)({
    path: "".concat(_constants.API_BASE_PATH, "policies/retention_settings"),
    method: 'put',
    body: {
      retentionSchedule: retentionSchedule
    }
  });
  uiMetricService.trackUiMetric(_constants2.UIM_RETENTION_SETTINGS_UPDATE);
  return result;
};

exports.updateRetentionSchedule = updateRetentionSchedule;

var executeRetention =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            result = (0, _use_request.sendRequest)({
              path: "".concat(_constants.API_BASE_PATH, "policies/retention"),
              method: 'post'
            });
            uiMetricService.trackUiMetric(_constants2.UIM_RETENTION_EXECUTE);
            return _context5.abrupt("return", result);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function executeRetention() {
    return _ref5.apply(this, arguments);
  };
}();

exports.executeRetention = executeRetention;