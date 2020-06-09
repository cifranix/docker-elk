"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogAnalysisSetupPageContent = exports.LogAnalysisSetupPageHeader = exports.LogAnalysisSetupPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 768px !important;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var LogAnalysisSetupPage = function LogAnalysisSetupPage(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.createElement(LogEntryRateSetupPage, null, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(LogEntryRateSetupPageContent, _extends({
    verticalPosition: "center",
    horizontalPosition: "center"
  }, rest), children)));
};

exports.LogAnalysisSetupPage = LogAnalysisSetupPage;

var LogAnalysisSetupPageHeader = function LogAnalysisSetupPageHeader(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h3", null, children))));
};

exports.LogAnalysisSetupPageHeader = LogAnalysisSetupPageHeader;
var LogAnalysisSetupPageContent = _eui.EuiPageContentBody; // !important due to https://github.com/elastic/eui/issues/2232

exports.LogAnalysisSetupPageContent = LogAnalysisSetupPageContent;
var LogEntryRateSetupPageContent = (0, _public.euiStyled)(_eui.EuiPageContent)(_templateObject());
var LogEntryRateSetupPage = (0, _public.euiStyled)(_eui.EuiPage)(_templateObject2());