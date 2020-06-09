"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndicesConfigurationPanel = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var IndicesConfigurationPanel = function IndicesConfigurationPanel(_ref) {
  var isLoading = _ref.isLoading,
      readOnly = _ref.readOnly,
      logAliasFieldProps = _ref.logAliasFieldProps,
      metricAliasFieldProps = _ref.metricAliasFieldProps,
      displaySettings = _ref.displaySettings;
  return _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.indicesSectionTitle",
    defaultMessage: "Indices"
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), displaySettings === 'metrics' && _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.metricIndicesTitle",
      defaultMessage: "Metric indices"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.metricIndicesDescription",
      defaultMessage: "Index pattern for matching indices that contain Metricbeat data"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: metricAliasFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.metricIndicesRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "metricbeat-*")
      }
    }),
    isInvalid: metricAliasFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.metricIndicesLabel",
      defaultMessage: "Metric indices"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    "data-test-subj": "metricIndicesInput",
    fullWidth: true,
    disabled: isLoading,
    readOnly: readOnly,
    isLoading: isLoading
  }, metricAliasFieldProps)))), displaySettings === 'logs' && _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.logIndicesTitle",
      defaultMessage: "Log indices"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.logIndicesDescription",
      defaultMessage: "Index pattern for matching indices that contain log data"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: logAliasFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.logIndicesRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "filebeat-*")
      }
    }),
    isInvalid: logAliasFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.logIndicesLabel",
      defaultMessage: "Log indices"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    "data-test-subj": "logIndicesInput",
    fullWidth: true,
    disabled: isLoading,
    isLoading: isLoading,
    readOnly: readOnly
  }, logAliasFieldProps)))));
};

exports.IndicesConfigurationPanel = IndicesConfigurationPanel;