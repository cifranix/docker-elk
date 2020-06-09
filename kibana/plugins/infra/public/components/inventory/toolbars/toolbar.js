"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _toolbars = require("../../../../common/inventory_models/toolbars");

var _toolbar_wrapper = require("./toolbar_wrapper");

var _with_waffle_view_state = require("../../../containers/waffle/with_waffle_view_state");

var _toolbar_control = require("../../saved_views/toolbar_control");

var _inventory_view = require("../../../../common/saved_objects/inventory_view");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var wrapToolbarItems = function wrapToolbarItems(ToolbarItems, accounts, regions) {
  return _react.default.createElement(_toolbar_wrapper.ToolbarWrapper, null, function (props) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ToolbarItems, _extends({}, props, {
      accounts: accounts,
      regions: regions
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_with_waffle_view_state.WithWaffleViewState, {
      indexPattern: props.createDerivedIndexPattern('metrics')
    }, function (_ref) {
      var defaultViewState = _ref.defaultViewState,
          viewState = _ref.viewState,
          onViewChange = _ref.onViewChange;
      return _react.default.createElement(_toolbar_control.SavedViewsToolbarControls, {
        defaultViewState: defaultViewState,
        viewState: viewState,
        onViewChange: onViewChange,
        viewType: _inventory_view.inventoryViewSavedObjectType
      });
    })));
  });
};

var Toolbar = function Toolbar(_ref2) {
  var nodeType = _ref2.nodeType,
      accounts = _ref2.accounts,
      regions = _ref2.regions;
  var ToolbarItems = (0, _toolbars.findToolbar)(nodeType);
  return wrapToolbarItems(ToolbarItems, accounts, regions);
};

exports.Toolbar = Toolbar;