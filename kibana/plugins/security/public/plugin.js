"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/home/public");

var _session = require("./session");

var _licensing = require("../common/licensing");

var _nav_control = require("./nav_control");

var _authentication = require("./authentication");

var _management = require("./management");

var _account_management = require("./account_management");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SecurityPlugin =
/*#__PURE__*/
function () {
  function SecurityPlugin(initializerContext) {
    _classCallCheck(this, SecurityPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "sessionTimeout", void 0);

    _defineProperty(this, "authenticationService", new _authentication.AuthenticationService());

    _defineProperty(this, "navControlService", new _nav_control.SecurityNavControlService());

    _defineProperty(this, "securityLicenseService", new _licensing.SecurityLicenseService());

    _defineProperty(this, "managementService", new _management.ManagementService());

    _defineProperty(this, "authc", void 0);

    _defineProperty(this, "config", void 0);

    this.config = this.initializerContext.config.get();
  }

  _createClass(SecurityPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var home = _ref.home,
          licensing = _ref.licensing,
          management = _ref.management;
      var http = core.http,
          notifications = core.notifications;
      var anonymousPaths = http.anonymousPaths;
      var logoutUrl = "".concat(core.http.basePath.serverBasePath, "/logout");
      var tenant = core.http.basePath.serverBasePath;
      var sessionExpired = new _session.SessionExpired(logoutUrl, tenant);
      http.intercept(new _session.UnauthorizedResponseHttpInterceptor(sessionExpired, anonymousPaths));
      this.sessionTimeout = new _session.SessionTimeout(notifications, sessionExpired, http, tenant);
      http.intercept(new _session.SessionTimeoutHttpInterceptor(this.sessionTimeout, anonymousPaths));

      var _this$securityLicense = this.securityLicenseService.setup({
        license$: licensing.license$
      }),
          license = _this$securityLicense.license;

      this.authc = this.authenticationService.setup({
        application: core.application,
        config: this.config,
        getStartServices: core.getStartServices,
        http: core.http
      });
      this.navControlService.setup({
        securityLicense: license,
        authc: this.authc,
        logoutUrl: logoutUrl
      });

      _account_management.accountManagementApp.create({
        authc: this.authc,
        application: core.application,
        getStartServices: core.getStartServices
      });

      if (management) {
        this.managementService.setup({
          license: license,
          management: management,
          authc: this.authc,
          fatalErrors: core.fatalErrors,
          getStartServices: core.getStartServices
        });
      }

      if (management && home) {
        home.featureCatalogue.register({
          id: 'security',
          title: _i18n.i18n.translate('xpack.security.registerFeature.securitySettingsTitle', {
            defaultMessage: 'Security Settings'
          }),
          description: _i18n.i18n.translate('xpack.security.registerFeature.securitySettingsDescription', {
            defaultMessage: 'Protect your data and easily manage who has access to what with users and roles.'
          }),
          icon: 'securityApp',
          path: '/app/kibana#/management/security/users',
          showOnHomePage: true,
          category: _public.FeatureCatalogueCategory.ADMIN
        });
      }

      return {
        authc: this.authc,
        sessionTimeout: this.sessionTimeout,
        license: license,
        __legacyCompat: {
          logoutUrl: logoutUrl,
          tenant: tenant
        }
      };
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var management = _ref2.management;
      this.sessionTimeout.start();
      this.navControlService.start({
        core: core
      });

      if (management) {
        this.managementService.start({
          management: management
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.sessionTimeout.stop();
      this.navControlService.stop();
      this.securityLicenseService.stop();
      this.managementService.stop();
    }
  }]);

  return SecurityPlugin;
}();

exports.SecurityPlugin = SecurityPlugin;