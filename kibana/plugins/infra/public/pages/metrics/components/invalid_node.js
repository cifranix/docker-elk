"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidNodeError = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../../observability/public");

var _source_configuration = require("../../../components/source_configuration");

var _use_link_props = require("../../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InvalidNodeError = function InvalidNodeError(_ref) {
  var nodeName = _ref.nodeName;
  var tutorialLinkProps = (0, _use_link_props.useLinkProps)({
    app: 'kibana',
    hash: '/home/tutorial_directory/metrics'
  });
  return _react2.default.createElement(CenteredEmptyPrompt, {
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.metrics.invalidNodeErrorTitle",
      defaultMessage: "Looks like {nodeName} isn't collecting any metrics data",
      values: {
        nodeName: nodeName
      }
    })),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.metrics.invalidNodeErrorDescription",
      defaultMessage: "Double check your configuration"
    })),
    actions: _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiButton, _extends({}, tutorialLinkProps, {
      color: "primary",
      fill: true
    }), _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.homePage.noMetricsIndicesInstructionsActionLabel",
      defaultMessage: "View setup instructions"
    }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_source_configuration.ViewSourceConfigurationButton, {
      app: "metrics",
      "data-test-subj": "configureSourceButton"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.configureSourceActionLabel",
      defaultMessage: "Change source configuration"
    }))))
  });
};

exports.InvalidNodeError = InvalidNodeError;
var CenteredEmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());