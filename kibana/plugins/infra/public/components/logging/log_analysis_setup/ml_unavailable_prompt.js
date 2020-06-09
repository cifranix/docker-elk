"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlUnavailablePrompt = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

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

var MlUnavailablePrompt = function MlUnavailablePrompt() {
  return _react2.default.createElement(EmptyPrompt, {
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logs.analysis.mlUnavailableTitle",
      defaultMessage: "This feature requires Machine Learning"
    })),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logs.analysis.mlUnavailableBody",
      defaultMessage: "Check the {machineLearningAppLink} for more information.",
      values: {
        machineLearningAppLink: _react2.default.createElement(_eui.EuiLink, {
          href: "ml",
          target: "_blank"
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.infra.logs.analysisPage.unavailable.mlAppLink",
          defaultMessage: "Machine Learning app"
        }))
      }
    })),
    actions: _react2.default.createElement(_eui.EuiButton, {
      target: "_blank",
      href: "ml",
      color: "primary",
      fill: true
    }, _i18n.i18n.translate('xpack.infra.logs.analysis.mlAppButton', {
      defaultMessage: 'Open Machine Learning'
    }))
  });
};

exports.MlUnavailablePrompt = MlUnavailablePrompt;
var EmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());