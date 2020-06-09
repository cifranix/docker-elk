"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutContent = void 0;

var _eui = require("@elastic/eui");

var _public = require("../../../../../observability/public");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LayoutContent = (0, _public.euiStyled)(_eui.EuiPageContent)(_templateObject());
exports.LayoutContent = LayoutContent;