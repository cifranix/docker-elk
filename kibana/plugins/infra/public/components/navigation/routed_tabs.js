"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutedTabs = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _public = require("../../../../observability/public");

var _use_link_props = require("../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .euiLink {\n    color: inherit !important;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var noop = function noop() {};

var RoutedTabs = function RoutedTabs(_ref) {
  var tabs = _ref.tabs;
  return _react.default.createElement(_eui.EuiTabs, {
    display: "condensed"
  }, tabs.map(function (tab) {
    return _react.default.createElement(Tab, _extends({
      key: "".concat(tab.pathname, "-").concat(tab.title)
    }, tab));
  }));
};

exports.RoutedTabs = RoutedTabs;

var Tab = function Tab(_ref2) {
  var title = _ref2.title,
      pathname = _ref2.pathname,
      app = _ref2.app;
  var linkProps = (0, _use_link_props.useLinkProps)({
    app: app,
    pathname: pathname
  });
  return _react.default.createElement(_reactRouterDom.Route, {
    path: pathname,
    children: function children(_ref3) {
      var match = _ref3.match,
          history = _ref3.history;
      return _react.default.createElement(TabContainer, {
        className: "euiTab"
      }, _react.default.createElement(_eui.EuiLink, _extends({}, linkProps, {
        "data-test-subj": "infrastructureNavLink_".concat(pathname)
      }), _react.default.createElement(_eui.EuiTab, {
        onClick: noop,
        isSelected: match !== null
      }, title)));
    }
  });
};

var TabContainer = _public.euiStyled.div(_templateObject());