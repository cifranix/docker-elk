"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkMlNodesAvailable = checkMlNodesAvailable;
exports.getMlNodeCount = getMlNodeCount;
exports.mlNodesAvailable = mlNodesAvailable;
exports.permissionToViewMlNodeCount = permissionToViewMlNodeCount;

var _ml_api_service = require("../services/ml_api_service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mlNodeCount = 0;
var userHasPermissionToViewMlNodeCount = false;

function checkMlNodesAvailable() {
  return _checkMlNodesAvailable.apply(this, arguments);
}

function _checkMlNodesAvailable() {
  _checkMlNodesAvailable = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var nodes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getMlNodeCount();

          case 3:
            nodes = _context.sent;

            if (!(nodes.count !== undefined && nodes.count > 0)) {
              _context.next = 8;
              break;
            }

            Promise.resolve();
            _context.next = 9;
            break;

          case 8:
            throw Error('Cannot load count of ML nodes');

          case 9:
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            // eslint-disable-next-line no-console
            console.error(_context.t0);
            window.location.href = '#/jobs';
            Promise.reject();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _checkMlNodesAvailable.apply(this, arguments);
}

function getMlNodeCount() {
  return _getMlNodeCount.apply(this, arguments);
}

function _getMlNodeCount() {
  _getMlNodeCount = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var nodes;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _ml_api_service.ml.mlNodeCount();

          case 3:
            nodes = _context2.sent;
            mlNodeCount = nodes.count;
            userHasPermissionToViewMlNodeCount = true;
            return _context2.abrupt("return", Promise.resolve(nodes));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            mlNodeCount = 0;

            if (_context2.t0.statusCode === 403) {
              userHasPermissionToViewMlNodeCount = false;
            }

            return _context2.abrupt("return", Promise.resolve({
              count: 0
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _getMlNodeCount.apply(this, arguments);
}

function mlNodesAvailable() {
  return mlNodeCount !== 0;
}

function permissionToViewMlNodeCount() {
  return userHasPermissionToViewMlNodeCount;
}