"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMenu = exports.ActionMenuDivider = exports.SectionLink = exports.Section = exports.SectionSpacer = exports.SectionLinks = exports.SectionSubtitle = exports.SectionTitle = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SectionTitle = function SectionTitle(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: 's',
    grow: false
  }, _react.default.createElement("h5", null, props.children)), _react.default.createElement(_eui.EuiSpacer, {
    size: 's'
  }));
};

exports.SectionTitle = SectionTitle;

var SectionSubtitle = function SectionSubtitle(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: 'xs',
    color: 'subdued',
    grow: false
  }, _react.default.createElement("small", null, props.children)), _react.default.createElement(_eui.EuiSpacer, {
    size: 's'
  }));
};

exports.SectionSubtitle = SectionSubtitle;

var SectionLinks = function SectionLinks(props) {
  return _react.default.createElement(_eui.EuiListGroup, {
    flush: true,
    bordered: false
  }, props.children);
};

exports.SectionLinks = SectionLinks;

var SectionSpacer = function SectionSpacer() {
  return _react.default.createElement(_eui.EuiSpacer, {
    size: 'l'
  });
};

exports.SectionSpacer = SectionSpacer;

var Section = _styledComponents.default.div.withConfig({
  displayName: "Section",
  componentId: "eqaq4f-0"
})(["margin-bottom:24px;&:last-of-type{margin-bottom:0;}"]);

exports.Section = Section;

var SectionLink = function SectionLink(props) {
  return _react.default.createElement(_eui.EuiListGroupItem, _extends({
    style: {
      padding: 0
    },
    size: 's'
  }, props));
};

exports.SectionLink = SectionLink;

var ActionMenuDivider = function ActionMenuDivider(props) {
  return _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: 's'
  });
};

exports.ActionMenuDivider = ActionMenuDivider;

var ActionMenu = function ActionMenu(props) {
  return _react.default.createElement(_eui.EuiPopover, _extends({}, props, {
    ownFocus: true
  }));
};

exports.ActionMenu = ActionMenu;