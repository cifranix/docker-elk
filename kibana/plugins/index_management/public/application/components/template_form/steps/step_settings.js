"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _documentation = require("../../../services/documentation");

var _use_json_step = require("./use_json_step");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StepSettings = function StepSettings(_ref) {
  var template = _ref.template,
      setDataGetter = _ref.setDataGetter,
      onStepValidityChange = _ref.onStepValidityChange;

  var _useJsonStep = (0, _use_json_step.useJsonStep)({
    prop: 'settings',
    defaultValue: template.settings,
    setDataGetter: setDataGetter,
    onStepValidityChange: onStepValidityChange
  }),
      content = _useJsonStep.content,
      setContent = _useJsonStep.setContent,
      error = _useJsonStep.error;

  return _react.default.createElement("div", {
    "data-test-subj": "stepSettings"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "stepTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepSettings.stepTitle",
    defaultMessage: "Index settings (optional)"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepSettings.settingsDescription",
    defaultMessage: "Define the behavior of your indices."
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationService.getSettingsDocumentationLink(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepSettings.docsButtonLabel",
    defaultMessage: "Index settings docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepSettings.fieldIndexSettingsLabel",
      defaultMessage: "Index settings"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepSettings.settingsEditorHelpText",
      defaultMessage: "Use JSON format: {code}",
      values: {
        code: _react.default.createElement(_eui.EuiCode, null, JSON.stringify({
          number_of_replicas: 1
        }))
      }
    }),
    isInvalid: Boolean(error),
    error: error,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    height: "500px",
    setOptions: {
      showLineNumbers: false,
      tabSize: 2
    },
    editorProps: {
      $blockScrolling: Infinity
    },
    showGutter: false,
    minLines: 6,
    "aria-label": _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepSettings.fieldIndexSettingsAriaLabel', {
      defaultMessage: 'Index settings editor'
    }),
    value: content,
    onChange: function onChange(updated) {
      return setContent(updated);
    },
    "data-test-subj": "settingsEditor"
  })));
};

exports.StepSettings = StepSettings;