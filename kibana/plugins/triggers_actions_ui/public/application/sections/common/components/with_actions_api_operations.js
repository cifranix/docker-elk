"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withActionOperations = withActionOperations;

var _react = _interopRequireDefault(require("react"));

var _app_context = require("../../../app_context");

var _action_connector_api = require("../../../lib/action_connector_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function withActionOperations(WrappedComponent) {
  return function (props) {
    var _useAppDependencies = (0, _app_context.useAppDependencies)(),
        http = _useAppDependencies.http;

    return _react.default.createElement(WrappedComponent, _extends({}, props, {
      loadActionTypes:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", (0, _action_connector_api.loadActionTypes)({
                  http: http
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))
    }));
  };
}