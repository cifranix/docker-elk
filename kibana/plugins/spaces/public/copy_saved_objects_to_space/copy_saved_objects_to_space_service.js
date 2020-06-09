"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopySavedObjectsToSpaceService = void 0;

var _copy_saved_objects_to_space_action = require("./copy_saved_objects_to_space_action");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CopySavedObjectsToSpaceService =
/*#__PURE__*/
function () {
  function CopySavedObjectsToSpaceService() {
    _classCallCheck(this, CopySavedObjectsToSpaceService);
  }

  _createClass(CopySavedObjectsToSpaceService, [{
    key: "setup",
    value: function setup(_ref) {
      var spacesManager = _ref.spacesManager,
          managementSetup = _ref.managementSetup,
          notificationsSetup = _ref.notificationsSetup;
      var action = new _copy_saved_objects_to_space_action.CopyToSpaceSavedObjectsManagementAction(spacesManager, notificationsSetup);
      managementSetup.savedObjects.registry.register(action);
    }
  }]);

  return CopySavedObjectsToSpaceService;
}();

exports.CopySavedObjectsToSpaceService = CopySavedObjectsToSpaceService;