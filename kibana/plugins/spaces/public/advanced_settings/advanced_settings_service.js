"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSettingsService = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdvancedSettingsService =
/*#__PURE__*/
function () {
  function AdvancedSettingsService() {
    _classCallCheck(this, AdvancedSettingsService);
  }

  _createClass(AdvancedSettingsService, [{
    key: "setup",
    value: function setup(_ref) {
      var getActiveSpace = _ref.getActiveSpace,
          componentRegistry = _ref.componentRegistry;

      var PageTitle = function PageTitle() {
        return _react.default.createElement(_components.AdvancedSettingsTitle, {
          getActiveSpace: getActiveSpace
        });
      };

      var SubTitle = function SubTitle() {
        return _react.default.createElement(_components.AdvancedSettingsSubtitle, {
          getActiveSpace: getActiveSpace
        });
      };

      componentRegistry.register(componentRegistry.componentType.PAGE_TITLE_COMPONENT, PageTitle, true);
      componentRegistry.register(componentRegistry.componentType.PAGE_SUBTITLE_COMPONENT, SubTitle, true);
    }
  }]);

  return AdvancedSettingsService;
}();

exports.AdvancedSettingsService = AdvancedSettingsService;