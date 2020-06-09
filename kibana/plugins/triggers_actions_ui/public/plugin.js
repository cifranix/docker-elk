"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _i18n = require("@kbn/i18n");

var _builtin_action_types = require("./application/components/builtin_action_types");

var _builtin_alert_types = require("./application/components/builtin_alert_types");

var _capabilities = require("./application/lib/capabilities");

var _type_registry = require("./application/type_registry");

var _boot = require("./application/boot");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(initializerContext) {
    _classCallCheck(this, Plugin);

    _defineProperty(this, "actionTypeRegistry", void 0);

    _defineProperty(this, "alertTypeRegistry", void 0);

    var actionTypeRegistry = new _type_registry.TypeRegistry();
    this.actionTypeRegistry = actionTypeRegistry;
    var alertTypeRegistry = new _type_registry.TypeRegistry();
    this.alertTypeRegistry = alertTypeRegistry;
  }

  _createClass(Plugin, [{
    key: "setup",
    value: function setup() {
      (0, _builtin_action_types.registerBuiltInActionTypes)({
        actionTypeRegistry: this.actionTypeRegistry
      });
      (0, _builtin_alert_types.registerBuiltInAlertTypes)({
        alertTypeRegistry: this.alertTypeRegistry
      });
      return {
        actionTypeRegistry: this.actionTypeRegistry,
        alertTypeRegistry: this.alertTypeRegistry
      };
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var _this = this;

      var capabilities = core.application.capabilities;
      var canShowActions = (0, _capabilities.hasShowActionsCapability)(capabilities);
      var canShowAlerts = (0, _capabilities.hasShowAlertsCapability)(capabilities); // Don't register routes when user doesn't have access to the application

      if (canShowActions || canShowAlerts) {
        plugins.management.sections.getSection('kibana').registerApp({
          id: 'triggersActions',
          title: _i18n.i18n.translate('xpack.triggersActionsUI.managementSection.displayName', {
            defaultMessage: 'Alerts and Actions'
          }),
          order: 7,
          mount: function mount(params) {
            (0, _boot.boot)({
              dataPlugin: plugins.data,
              charts: plugins.charts,
              alerting: plugins.alerting,
              element: params.element,
              toastNotifications: core.notifications.toasts,
              http: core.http,
              uiSettings: core.uiSettings,
              docLinks: core.docLinks,
              chrome: core.chrome,
              savedObjects: core.savedObjects.client,
              I18nContext: core.i18n.Context,
              capabilities: core.application.capabilities,
              navigateToApp: core.application.navigateToApp,
              setBreadcrumbs: params.setBreadcrumbs,
              actionTypeRegistry: _this.actionTypeRegistry,
              alertTypeRegistry: _this.alertTypeRegistry
            });
            return function () {};
          }
        });
      }

      return {
        actionTypeRegistry: this.actionTypeRegistry,
        alertTypeRegistry: this.alertTypeRegistry
      };
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return Plugin;
}();

exports.Plugin = Plugin;