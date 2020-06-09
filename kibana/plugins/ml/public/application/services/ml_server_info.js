"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMlServerInfo = loadMlServerInfo;
exports.getNewJobDefaults = getNewJobDefaults;
exports.getNewJobLimits = getNewJobLimits;
exports.getCloudId = getCloudId;
exports.isCloud = isCloud;
exports.getCloudDeploymentId = getCloudDeploymentId;

var _ml_api_service = require("./ml_api_service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var defaults = {
  anomaly_detectors: {},
  datafeeds: {}
};
var limits = {};
var cloudInfo = {
  cloudId: null,
  isCloud: false
};

function loadMlServerInfo() {
  return _loadMlServerInfo.apply(this, arguments);
}

function _loadMlServerInfo() {
  _loadMlServerInfo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _ml_api_service.ml.mlInfo();

          case 3:
            resp = _context.sent;
            defaults = resp.defaults;
            limits = resp.limits;
            cloudInfo.cloudId = resp.cloudId || null;
            cloudInfo.isCloud = resp.cloudId !== undefined;
            return _context.abrupt("return", {
              defaults: defaults,
              limits: limits,
              cloudId: cloudInfo
            });

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              defaults: defaults,
              limits: limits,
              cloudId: cloudInfo
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _loadMlServerInfo.apply(this, arguments);
}

function getNewJobDefaults() {
  return defaults;
}

function getNewJobLimits() {
  return limits;
}

function getCloudId() {
  return cloudInfo.cloudId;
}

function isCloud() {
  return cloudInfo.isCloud;
}

function getCloudDeploymentId() {
  if (cloudInfo.cloudId === null) {
    return null;
  }

  var tempCloudId = cloudInfo.cloudId.replace(/^.+:/, '');

  try {
    var matches = atob(tempCloudId).match(/^.+\$(.+)(?=\$)/);
    return matches !== null && matches.length === 2 ? matches[1] : null;
  } catch (error) {
    return null;
  }
}