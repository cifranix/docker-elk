"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddRuleButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AddRuleButton = function AddRuleButton(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isMenuOpen = _useState2[0],
      setIsMenuOpen = _useState2[1];

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircle",
    "data-test-subj": "roleMappingsAddRuleButton",
    onClick: function onClick() {
      setIsMenuOpen(!isMenuOpen);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.addRuleButton",
    defaultMessage: "Add"
  }));

  var options = [_react.default.createElement(_eui.EuiContextMenuItem, {
    id: "addRuleOption",
    key: "rule",
    name: "Add rule",
    icon: "user",
    onClick: function onClick() {
      setIsMenuOpen(false);
      props.onClick(new _model.FieldRule('username', '*'));
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.addRuleOption",
    defaultMessage: "Add rule"
  })), _react.default.createElement(_eui.EuiContextMenuItem, {
    id: "addRuleGroupOption",
    key: "ruleGroup",
    name: "Add rule group",
    icon: "list",
    onClick: function onClick() {
      setIsMenuOpen(false);
      props.onClick(new _model.AllRule([new _model.FieldRule('username', '*')]));
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.addRuleGroupOption",
    defaultMessage: "Add rule group"
  }))];
  return _react.default.createElement(_eui.EuiPopover, {
    id: "addRuleContextMenu",
    "data-test-subj": "addRuleContextMenu",
    button: button,
    isOpen: isMenuOpen,
    closePopover: function closePopover() {
      return setIsMenuOpen(false);
    },
    panelPaddingSize: "none",
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    title: "Add rule",
    items: options
  }));
};

exports.AddRuleButton = AddRuleButton;