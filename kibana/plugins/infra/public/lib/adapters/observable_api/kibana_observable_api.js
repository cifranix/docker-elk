"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraKibanaObservableApiAdapter = void 0;

var _ajax = require("rxjs/ajax");

var _operators = require("rxjs/operators");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InfraKibanaObservableApiAdapter = function InfraKibanaObservableApiAdapter(_ref) {
  var _this = this;

  var basePath = _ref.basePath;

  _classCallCheck(this, InfraKibanaObservableApiAdapter);

  _defineProperty(this, "basePath", void 0);

  _defineProperty(this, "defaultHeaders", void 0);

  _defineProperty(this, "post", function (_ref2) {
    var url = _ref2.url,
        body = _ref2.body;
    return (0, _ajax.ajax)({
      body: body ? JSON.stringify(body) : undefined,
      headers: _objectSpread({}, _this.defaultHeaders, {
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      responseType: 'json',
      timeout: 30000,
      url: "".concat(_this.basePath, "/api/").concat(url),
      withCredentials: true
    }).pipe((0, _operators.map)(function (_ref3) {
      var response = _ref3.response,
          status = _ref3.status;
      return {
        response: response,
        status: status
      };
    }));
  });

  this.basePath = basePath;
  this.defaultHeaders = {
    'kbn-xsrf': true
  };
};

exports.InfraKibanaObservableApiAdapter = InfraKibanaObservableApiAdapter;