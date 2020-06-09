"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityNavControlService = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _nav_control_component = require("./nav_control_component");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SecurityNavControlService =
/*#__PURE__*/
function () {
  function SecurityNavControlService() {
    _classCallCheck(this, SecurityNavControlService);

    _defineProperty(this, "securityLicense", void 0);

    _defineProperty(this, "authc", void 0);

    _defineProperty(this, "logoutUrl", void 0);

    _defineProperty(this, "navControlRegistered", void 0);

    _defineProperty(this, "securityFeaturesSubscription", void 0);
  }

  _createClass(SecurityNavControlService, [{
    key: "setup",
    value: function setup(_ref) {
      var securityLicense = _ref.securityLicense,
          authc = _ref.authc,
          logoutUrl = _ref.logoutUrl;
      this.securityLicense = securityLicense;
      this.authc = authc;
      this.logoutUrl = logoutUrl;
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var _this = this;

      var core = _ref2.core;
      this.securityFeaturesSubscription = this.securityLicense.features$.subscribe(function (_ref3) {
        var showLinks = _ref3.showLinks;
        var isAnonymousPath = core.http.anonymousPaths.isAnonymous(window.location.pathname);
        var shouldRegisterNavControl = !isAnonymousPath && showLinks && !_this.navControlRegistered;

        if (shouldRegisterNavControl) {
          _this.registerSecurityNavControl(core);
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.securityFeaturesSubscription) {
        this.securityFeaturesSubscription.unsubscribe();
        this.securityFeaturesSubscription = undefined;
      }

      this.navControlRegistered = false;
    }
  }, {
    key: "registerSecurityNavControl",
    value: function registerSecurityNavControl(core) {
      var _this2 = this;

      var currentUserPromise = this.authc.getCurrentUser();
      core.chrome.navControls.registerRight({
        order: 2000,
        mount: function mount(el) {
          var I18nContext = core.i18n.Context;
          var props = {
            user: currentUserPromise,
            editProfileUrl: core.http.basePath.prepend('/security/account'),
            logoutUrl: _this2.logoutUrl
          };

          _reactDom.default.render(_react.default.createElement(I18nContext, null, _react.default.createElement(_nav_control_component.SecurityNavControl, props)), el);

          return function () {
            return _reactDom.default.unmountComponentAtNode(el);
          };
        }
      });
      this.navControlRegistered = true;
    }
  }]);

  return SecurityNavControlService;
}();

exports.SecurityNavControlService = SecurityNavControlService;