"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepAliases = void 0;

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
var StepAliases = function StepAliases(_ref) {
  var template = _ref.template,
      setDataGetter = _ref.setDataGetter,
      onStepValidityChange = _ref.onStepValidityChange;

  var _useJsonStep = (0, _use_json_step.useJsonStep)({
    prop: 'aliases',
    defaultValue: template.aliases,
    setDataGetter: setDataGetter,
    onStepValidityChange: onStepValidityChange
  }),
      content = _useJsonStep.content,
      setContent = _useJsonStep.setContent,
      error = _useJsonStep.error;

  return _react.default.createElement("div", {
    "data-test-subj": "stepAliases"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "stepTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepAliases.stepTitle",
    defaultMessage: "Aliases (optional)"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepAliases.aliasesDescription",
    defaultMessage: "Set up aliases to associate with your indices."
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: _documentation.documentationService.getTemplatesDocumentationLink(),
    target: "_blank",
    iconType: "help"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateForm.stepAliases.docsButtonLabel",
    defaultMessage: "Index Templates docs"
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepAliases.fieldAliasesLabel",
      defaultMessage: "Aliases"
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateForm.stepAliases.aliasesEditorHelpText",
      defaultMessage: "Use JSON format: {code}",
      values: {
        code: _react.default.createElement(_eui.EuiCode, null, JSON.stringify({
          my_alias: {}
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
    "aria-label": _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepAliases.fieldAliasesAriaLabel', {
      defaultMessage: 'Aliases code editor'
    }),
    value: content,
    onChange: function onChange(updated) {
      setContent(updated);
    },
    "data-test-subj": "aliasesEditor"
  })));
};

exports.StepAliases = StepAliases;