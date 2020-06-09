"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogAnalysisSetupStatusUnknownPrompt = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogAnalysisSetupStatusUnknownPrompt = function LogAnalysisSetupStatusUnknownPrompt(_ref) {
  var retry = _ref.retry;
  return _react.default.createElement(EmptyPrompt, {
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.logs.analysis.setupStatusUnknownTitle",
      defaultMessage: "We couldn't determine the status of your ML jobs."
    })),
    actions: _react.default.createElement(_eui.EuiButton, {
      onClick: function onClick() {
        return retry();
      },
      color: "primary",
      fill: true
    }, _i18n.i18n.translate('xpack.infra.logs.analysis.setupStatusTryAgainButton', {
      defaultMessage: 'Try again'
    }))
  });
};

exports.LogAnalysisSetupStatusUnknownPrompt = LogAnalysisSetupStatusUnknownPrompt;
var EmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());