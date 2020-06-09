"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogStatusbarItem = exports.LogStatusbar = void 0;

var _eui = require("@elastic/eui");

var _public = require("../../../../observability/public");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n  border-top: ", ";\n  max-height: 48px;\n  min-height: 48px;\n  background-color: ", ";\n  flex-direction: row;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogStatusbar = (0, _public.euiStyled)(_eui.EuiFlexGroup).attrs(function () {
  return {
    alignItems: 'center',
    gutterSize: 'none',
    justifyContent: 'flexEnd'
  };
})(_templateObject(), function (props) {
  return props.theme.eui.euiSizeS;
}, function (props) {
  return props.theme.eui.euiBorderThin;
}, function (props) {
  return props.theme.eui.euiColorEmptyShade;
});
exports.LogStatusbar = LogStatusbar;
var LogStatusbarItem = _eui.EuiFlexItem;
exports.LogStatusbarItem = LogStatusbarItem;