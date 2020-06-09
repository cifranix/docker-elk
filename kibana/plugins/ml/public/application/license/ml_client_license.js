"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlClientLicense = void 0;

var _license = require("../../../common/license");

var _expired_warning = require("./expired_warning");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MlClientLicense =
/*#__PURE__*/
function (_MlLicense) {
  _inherits(MlClientLicense, _MlLicense);

  function MlClientLicense() {
    _classCallCheck(this, MlClientLicense);

    return _possibleConstructorReturn(this, _getPrototypeOf(MlClientLicense).apply(this, arguments));
  }

  _createClass(MlClientLicense, [{
    key: "fullLicenseResolver",
    value: function fullLicenseResolver() {
      if (this.isMlEnabled() === false || this.isMinimumLicense() === false) {
        // ML is not enabled or the license isn't at least basic
        return redirectToKibana();
      }

      if (this.isFullLicense() === false) {
        // ML is enabled, but only with a basic or gold license
        return redirectToBasic();
      } // ML is enabled


      if (this.hasLicenseExpired()) {
        (0, _expired_warning.showExpiredLicenseWarning)();
      }

      return Promise.resolve();
    }
  }, {
    key: "basicLicenseResolver",
    value: function basicLicenseResolver() {
      if (this.isMlEnabled() === false || this.isMinimumLicense() === false) {
        // ML is not enabled or the license isn't at least basic
        return redirectToKibana();
      } // ML is enabled


      if (this.hasLicenseExpired()) {
        (0, _expired_warning.showExpiredLicenseWarning)();
      }

      return Promise.resolve();
    }
  }]);

  return MlClientLicense;
}(_license.MlLicense);

exports.MlClientLicense = MlClientLicense;

function redirectToKibana() {
  window.location.href = '/';
  return Promise.reject();
}

function redirectToBasic() {
  window.location.href = '#/datavisualizer';
  return Promise.reject();
}