"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedUiActionsPublicPlugin = void 0;

var _public = require("../../../../src/plugins/kibana_react/public");

var _public2 = require("../../../../src/plugins/embeddable/public");

var _custom_time_range_action = require("./custom_time_range_action");

var _custom_time_range_badge = require("./custom_time_range_badge");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdvancedUiActionsPublicPlugin =
/*#__PURE__*/
function () {
  function AdvancedUiActionsPublicPlugin(initializerContext) {
    _classCallCheck(this, AdvancedUiActionsPublicPlugin);
  }

  _createClass(AdvancedUiActionsPublicPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var uiActions = _ref.uiActions;
    }
  }, {
    key: "start",
    value: function start(core, _ref2) {
      var uiActions = _ref2.uiActions;
      var dateFormat = core.uiSettings.get('dateFormat');
      var commonlyUsedRanges = core.uiSettings.get('timepicker:quickRanges');

      var _createReactOverlays = (0, _public.createReactOverlays)(core),
          openModal = _createReactOverlays.openModal;

      var timeRangeAction = new _custom_time_range_action.CustomTimeRangeAction({
        openModal: openModal,
        dateFormat: dateFormat,
        commonlyUsedRanges: commonlyUsedRanges
      });
      uiActions.registerAction(timeRangeAction);
      uiActions.attachAction(_public2.CONTEXT_MENU_TRIGGER, timeRangeAction);
      var timeRangeBadge = new _custom_time_range_badge.CustomTimeRangeBadge({
        openModal: openModal,
        dateFormat: dateFormat,
        commonlyUsedRanges: commonlyUsedRanges
      });
      uiActions.registerAction(timeRangeBadge);
      uiActions.attachAction(_public2.PANEL_BADGE_TRIGGER, timeRangeBadge);
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return AdvancedUiActionsPublicPlugin;
}();

exports.AdvancedUiActionsPublicPlugin = AdvancedUiActionsPublicPlugin;