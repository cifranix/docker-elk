"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../observability/public");

var _page = require("./page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  min-width: 50vh;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ErrorPage = function ErrorPage(_ref) {
  var detailedMessage = _ref.detailedMessage,
      retry = _ref.retry,
      shortMessage = _ref.shortMessage;
  return _react2.default.createElement(_page.FlexPage, null, _react2.default.createElement(_eui.EuiPageBody, null, _react2.default.createElement(MinimumPageContent, {
    horizontalPosition: "center",
    verticalPosition: "center",
    panelPaddingSize: "none"
  }, _react2.default.createElement(_eui.EuiPageContentBody, null, _react2.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    iconType: "cross",
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.errorPage.errorOccurredTitle",
      defaultMessage: "An error occurred"
    })
  }, _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, shortMessage), retry ? _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    onClick: retry,
    iconType: "refresh"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.errorPage.tryAgainButtonLabel",
    defaultMessage: "Try again"
  }))) : null), detailedMessage ? _react2.default.createElement("div", null, detailedMessage) : null)))));
};

exports.ErrorPage = ErrorPage;
var MinimumPageContent = (0, _public.euiStyled)(_eui.EuiPageContent)(_templateObject());