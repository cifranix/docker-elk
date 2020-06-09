"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsConfigurationPanel = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FieldsConfigurationPanel = function FieldsConfigurationPanel(_ref) {
  var containerFieldProps = _ref.containerFieldProps,
      hostFieldProps = _ref.hostFieldProps,
      isLoading = _ref.isLoading,
      readOnly = _ref.readOnly,
      podFieldProps = _ref.podFieldProps,
      tiebreakerFieldProps = _ref.tiebreakerFieldProps,
      timestampFieldProps = _ref.timestampFieldProps,
      displaySettings = _ref.displaySettings;
  var isHostValueDefault = hostFieldProps.value === 'host.name';
  var isContainerValueDefault = containerFieldProps.value === 'container.id';
  var isPodValueDefault = podFieldProps.value === 'kubernetes.pod.uid';
  var isTimestampValueDefault = timestampFieldProps.value === '@timestamp';
  var isTiebreakerValueDefault = tiebreakerFieldProps.value === '_doc';
  return _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.fieldsSectionTitle",
    defaultMessage: "Fields"
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.infra.sourceConfiguration.deprecationNotice', {
      defaultMessage: 'Deprecation Notice'
    }),
    color: "warning",
    iconType: "help"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.deprecationMessage",
    defaultMessage: "Configuring these fields have been deprecated and will be removed in 8.0.0. This application is designed to work with {ecsLink}, you should adjust your indexing to use the {documentationLink}.",
    values: {
      documentationLink: _react2.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/guide/en/infrastructure/guide/7.4/infrastructure-metrics.html",
        target: "BLANK"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.sourceConfiguration.documentedFields",
        defaultMessage: "documented fields"
      })),
      ecsLink: _react2.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/guide/en/ecs/current/index.html",
        target: "BLANK"
      }, "ECS")
    }
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.timestampFieldLabel",
      defaultMessage: "Timestamp"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.timestampFieldDescription",
      defaultMessage: "Timestamp used to sort log entries"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: timestampFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.timestampFieldRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "@timestamp")
      }
    }),
    isInvalid: timestampFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.timestampFieldLabel",
      defaultMessage: "Timestamp"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    fullWidth: true,
    disabled: isLoading || isTimestampValueDefault,
    readOnly: readOnly,
    isLoading: isLoading
  }, timestampFieldProps)))), displaySettings === 'logs' && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.tiebreakerFieldLabel",
      defaultMessage: "Tiebreaker"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.tiebreakerFieldDescription",
      defaultMessage: "Field used to break ties between two entries with the same timestamp"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: tiebreakerFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.tiebreakerFieldRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "_doc")
      }
    }),
    isInvalid: tiebreakerFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.tiebreakerFieldLabel",
      defaultMessage: "Tiebreaker"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    fullWidth: true,
    disabled: isLoading || isTiebreakerValueDefault,
    readOnly: readOnly,
    isLoading: isLoading
  }, tiebreakerFieldProps))))), displaySettings === 'metrics' && _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.containerFieldLabel",
      defaultMessage: "Container ID"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.containerFieldDescription",
      defaultMessage: "Field used to identify Docker containers"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: containerFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.containerFieldRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "container.id")
      }
    }),
    isInvalid: containerFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.containerFieldLabel",
      defaultMessage: "Container ID"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    fullWidth: true,
    disabled: isLoading || isContainerValueDefault,
    readOnly: readOnly,
    isLoading: isLoading
  }, containerFieldProps)))), _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.hostNameFieldLabel",
      defaultMessage: "Host name"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.hostNameFieldDescription",
      defaultMessage: "Field used to identify hosts"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: hostFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.hostFieldDescription",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "host.name")
      }
    }),
    isInvalid: hostFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.hostFieldLabel",
      defaultMessage: "Host name"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    fullWidth: true,
    disabled: isLoading || isHostValueDefault,
    readOnly: readOnly,
    isLoading: isLoading
  }, hostFieldProps)))), _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h4", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.podFieldLabel",
      defaultMessage: "Pod ID"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.podFieldDescription",
      defaultMessage: "Field used to identify Kubernetes pods"
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: podFieldProps.error,
    fullWidth: true,
    helpText: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.podFieldRecommendedValue",
      defaultMessage: "The recommended value is {defaultValue}",
      values: {
        defaultValue: _react2.default.createElement(_eui.EuiCode, null, "kubernetes.pod.uid")
      }
    }),
    isInvalid: podFieldProps.isInvalid,
    label: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.podFieldLabel",
      defaultMessage: "Pod ID"
    })
  }, _react2.default.createElement(_eui.EuiFieldText, _extends({
    fullWidth: true,
    disabled: isLoading || isPodValueDefault,
    readOnly: readOnly,
    isLoading: isLoading
  }, podFieldProps))))));
};

exports.FieldsConfigurationPanel = FieldsConfigurationPanel;