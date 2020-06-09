"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;

var _eui = require("@elastic/eui");

var _public = require("../../../../../observability/public");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-radius: 0;\n  padding: ", " ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Toolbar = (0, _public.euiStyled)(_eui.EuiPanel).attrs(function () {
  return {
    grow: false,
    paddingSize: 'none'
  };
})(_templateObject(), function (props) {
  return props.theme.eui.euiSizeS;
}, function (props) {
  return props.theme.eui.euiSizeL;
});
exports.Toolbar = Toolbar;