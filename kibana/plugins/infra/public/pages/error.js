"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorPageBody = exports.Error = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../observability/public");

var _header = require("../components/header");

var _page = require("../components/page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  overflow: auto;\n  background-color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DetailPageContent = (0, _public.euiStyled)(_page.PageContent)(_templateObject(), function (props) {
  return props.theme.eui.euiColorLightestShade;
});

var Error = function Error(_ref) {
  var message = _ref.message;
  return _react2.default.createElement(_page.ColumnarPage, null, _react2.default.createElement(_header.Header, null), _react2.default.createElement(DetailPageContent, null, _react2.default.createElement(ErrorPageBody, {
    message: message
  })));
};

exports.Error = Error;

var ErrorPageBody = function ErrorPageBody(_ref2) {
  var message = _ref2.message;
  return _react2.default.createElement(_eui.EuiPage, {
    style: {
      flex: '1 0 auto'
    }
  }, _react2.default.createElement(_eui.EuiPageBody, null, _react2.default.createElement(_eui.EuiPageHeader, null, _react2.default.createElement(_eui.EuiPageHeaderSection, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react2.default.createElement("h1", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.errorPage.unexpectedErrorTitle",
    defaultMessage: "Oops!"
  }))))), _react2.default.createElement(_eui.EuiPageContent, null, _react2.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    title: message,
    iconType: 'alert'
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.errorPage.tryAgainDescription ",
    defaultMessage: "Please click the back button and try again."
  }))))));
};

exports.ErrorPageBody = ErrorPageBody;