"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlexPage = exports.PageContent = exports.ColumnarPage = void 0;

var _eui = require("@elastic/eui");

var _public = require("../../../observability/public");

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  display: flex;\n  flex-direction: row;\n  background-color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 0 auto;\n  width: 100%\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ColumnarPage = _public.euiStyled.div(_templateObject());

exports.ColumnarPage = ColumnarPage;

var PageContent = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiColorEmptyShade;
});

exports.PageContent = PageContent;
var FlexPage = (0, _public.euiStyled)(_eui.EuiPage)(_templateObject3());
exports.FlexPage = FlexPage;