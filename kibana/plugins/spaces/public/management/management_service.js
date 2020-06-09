"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManagementService = void 0;

var _spaces_management_app = require("./spaces_management_app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ManagementService =
/*#__PURE__*/
function () {
  function ManagementService() {
    _classCallCheck(this, ManagementService);

    _defineProperty(this, "registeredSpacesManagementApp", void 0);
  }

  _createClass(ManagementService, [{
    key: "setup",
    value: function setup(_ref) {
      var getStartServices = _ref.getStartServices,
          management = _ref.management,
          spacesManager = _ref.spacesManager,
          securityLicense = _ref.securityLicense;
      var kibanaSection = management.sections.getSection('kibana');

      if (kibanaSection) {
        this.registeredSpacesManagementApp = kibanaSection.registerApp(_spaces_management_app.spacesManagementApp.create({
          getStartServices: getStartServices,
          spacesManager: spacesManager,
          securityLicense: securityLicense
        }));
      }
    }
  }, {
    key: "start",
    value: function start(_ref2) {
      var capabilities = _ref2.capabilities;

      if (!capabilities.spaces.manage) {
        this.disableSpacesApp();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.disableSpacesApp();
    }
  }, {
    key: "disableSpacesApp",
    value: function disableSpacesApp() {
      if (this.registeredSpacesManagementApp) {
        this.registeredSpacesManagementApp.disable();
      }
    }
  }]);

  return ManagementService;
}();

exports.ManagementService = ManagementService;