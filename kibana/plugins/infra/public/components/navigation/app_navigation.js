"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppNavigation = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border-bottom: ", ";\n  padding: ", ";\n  .euiTabs {\n    padding-left: 3px;\n    margin-left: -3px;\n  };\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AppNavigation = function AppNavigation(_ref) {
  var label = _ref['aria-label'],
      children = _ref.children;
  return _react.default.createElement(Nav, {
    "aria-label": label
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, children)));
};

exports.AppNavigation = AppNavigation;

var Nav = _public.euiStyled.nav(_templateObject(), function (props) {
  return props.theme.eui.euiColorEmptyShade;
}, function (props) {
  return props.theme.eui.euiBorderThin;
}, function (props) {
  return "".concat(props.theme.eui.euiSize, " ").concat(props.theme.eui.euiSizeL, " ").concat(props.theme.eui.euiSize, " ").concat(props.theme.eui.euiSizeL);
});