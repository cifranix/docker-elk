"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesPlugin = void 0;

var _spaces_manager = require("./spaces_manager");

var _nav_control = require("./nav_control");

var _create_feature_catalogue_entry = require("./create_feature_catalogue_entry");

var _copy_saved_objects_to_space = require("./copy_saved_objects_to_space");

var _advanced_settings = require("./advanced_settings");

var _management = require("./management");

var _space_selector = require("./space_selector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SpacesPlugin =
/*#__PURE__*/
function () {
  function SpacesPlugin() {
    _classCallCheck(this, SpacesPlugin);

    _defineProperty(this, "spacesManager", void 0);

    _defineProperty(this, "managementService", void 0);
  }

  _createClass(SpacesPlugin, [{
    key: "setup",
    value: function setup(core, plugins) {
      var _this = this;

      this.spacesManager = new _spaces_manager.SpacesManager(core.http);

      if (plugins.home) {
        plugins.home.featureCatalogue.register((0, _create_feature_catalogue_entry.createSpacesFeatureCatalogueEntry)());
      }

      if (plugins.management) {
        var _plugins$security;

        this.managementService = new _management.ManagementService();
        this.managementService.setup({
          management: plugins.management,
          getStartServices: core.getStartServices,
          spacesManager: this.spacesManager,
          securityLicense: (_plugins$security = plugins.security) === null || _plugins$security === void 0 ? void 0 : _plugins$security.license
        });
      }

      if (plugins.advancedSettings) {
        var advancedSettingsService = new _advanced_settings.AdvancedSettingsService();
        advancedSettingsService.setup({
          getActiveSpace: function getActiveSpace() {
            return _this.spacesManager.getActiveSpace();
          },
          componentRegistry: plugins.advancedSettings.component
        });
      }

      _space_selector.spaceSelectorApp.create({
        getStartServices: core.getStartServices,
        application: core.application,
        spacesManager: this.spacesManager
      });

      return {
        registerLegacyAPI: function registerLegacyAPI(legacyAPI) {
          var copySavedObjectsToSpaceService = new _copy_saved_objects_to_space.CopySavedObjectsToSpaceService();
          copySavedObjectsToSpaceService.setup({
            spacesManager: _this.spacesManager,
            managementSetup: {
              savedObjects: {
                registry: {
                  register: function register(action) {
                    return legacyAPI.registerSavedObjectsManagementAction(action);
                  },
                  has: function has() {
                    throw new Error('not available in legacy shim');
                  },
                  get: function get() {
                    throw new Error('not available in legacy shim');
                  }
                }
              }
            },
            notificationsSetup: core.notifications
          });
        }
      };
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      var _this2 = this;

      (0, _nav_control.initSpacesNavControl)(this.spacesManager, core);

      if (this.managementService) {
        this.managementService.start({
          capabilities: core.application.capabilities
        });
      }

      return {
        activeSpace$: this.spacesManager.onActiveSpaceChange$,
        getActiveSpace: function getActiveSpace() {
          return _this2.spacesManager.getActiveSpace();
        }
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.managementService) {
        this.managementService.stop();
        this.managementService = undefined;
      }
    }
  }]);

  return SpacesPlugin;
}();

exports.SpacesPlugin = SpacesPlugin;