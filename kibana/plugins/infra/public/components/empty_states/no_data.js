"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoData = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NoData = function NoData(_ref) {
  var titleText = _ref.titleText,
      bodyText = _ref.bodyText,
      refetchText = _ref.refetchText,
      onRefetch = _ref.onRefetch,
      testString = _ref.testString;
  return _react.default.createElement(CenteredEmptyPrompt, {
    title: _react.default.createElement("h2", null, titleText),
    titleSize: "m",
    body: _react.default.createElement("p", null, bodyText),
    actions: _react.default.createElement(_eui.EuiButton, {
      iconType: "refresh",
      color: "primary",
      fill: true,
      onClick: onRefetch
    }, refetchText),
    "data-test-subj": testString
  });
};

exports.NoData = NoData;
var CenteredEmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());