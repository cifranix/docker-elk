"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensingMock = void 0;

var _rxjs = require("rxjs");

var _licensing = require("../common/licensing.mock");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createSetupMock = function createSetupMock() {
  var license = _licensing.licenseMock.createLicense();

  var mock = {
    license$: new _rxjs.BehaviorSubject(license),
    refresh: jest.fn()
  };
  mock.refresh.mockResolvedValue(license);
  return mock;
};

var licensingMock = _objectSpread({
  createSetup: createSetupMock
}, _licensing.licenseMock);

exports.licensingMock = licensingMock;