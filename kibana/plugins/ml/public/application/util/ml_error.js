"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLRequestFailure = void 0;

var _public = require("../../../../../../src/plugins/kibana_utils/public");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MLRequestFailure =
/*#__PURE__*/
function (_KbnError) {
  _inherits(MLRequestFailure, _KbnError);

  // takes an Error object and and optional response object
  // if error is falsy (null) the response object will be used
  // notify will show the full expandable stack trace of the response if a response object is used and no error is passed in.
  function MLRequestFailure(error, resp) {
    var _this;

    _classCallCheck(this, MLRequestFailure);

    error = error || {};
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MLRequestFailure).call(this, error.message || JSON.stringify(resp)));

    _defineProperty(_assertThisInitialized(_this), "origError", void 0);

    _defineProperty(_assertThisInitialized(_this), "resp", void 0);

    _this.origError = error;
    _this.resp = typeof resp === 'string' ? JSON.parse(resp) : resp;
    return _this;
  }

  return MLRequestFailure;
}(_public.KbnError);

exports.MLRequestFailure = MLRequestFailure;