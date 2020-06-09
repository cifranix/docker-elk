"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingResultsPrivilegesPrompt = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../../observability/public");

var _user_management_link = require("./user_management_link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MissingResultsPrivilegesPrompt = function MissingResultsPrivilegesPrompt() {
  return _react2.default.createElement(EmptyPrompt, {
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logs.analysis.missingMlResultsPrivilegesTitle",
      defaultMessage: "Additional Machine Learning privileges required"
    })),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logs.analysis.missingMlResultsPrivilegesBody",
      defaultMessage: "This feature makes use of Machine Learning jobs, which require at least the {machineLearningUserRole} role in order to access their status and results.",
      values: {
        machineLearningUserRole: _react2.default.createElement(_eui.EuiCode, null, "machine_learning_user")
      }
    })),
    actions: _react2.default.createElement(_user_management_link.UserManagementLink, null)
  });
};

exports.MissingResultsPrivilegesPrompt = MissingResultsPrivilegesPrompt;
var EmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());