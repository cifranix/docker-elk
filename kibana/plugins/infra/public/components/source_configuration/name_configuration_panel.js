"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NameConfigurationPanel = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NameConfigurationPanel = function NameConfigurationPanel(_ref) {
  var isLoading = _ref.isLoading,
      readOnly = _ref.readOnly,
      nameFieldProps = _ref.nameFieldProps;
  return _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s",
    "data-test-subj": "sourceConfigurationNameSectionTitle"
  }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.nameSectionTitle",
    defaultMessage: "Name"
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.nameLabel",
      defaultMessage: "Name"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.nameDescription",
      defaultMessage: "A descriptive name for the source configuration"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: nameFieldProps.error,
    fullWidth: true,
    isInvalid: nameFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.nameLabel",
      defaultMessage: "Name"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    "data-test-subj": "nameInput",
    fullWidth: true,
    disabled: isLoading,
    readOnly: readOnly,
    isLoading: isLoading
  }, nameFieldProps)))));
};

exports.NameConfigurationPanel = NameConfigurationPanel;