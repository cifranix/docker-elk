"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParametersTab = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _context = require("../../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ParametersTab = function ParametersTab() {
  var _useAppContext = (0, _context.useAppContext)(),
      payload = _useAppContext.store.payload,
      updatePayload = _useAppContext.updatePayload,
      links = _useAppContext.links;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.painlessLab.parametersFieldTooltipText', {
        defaultMessage: 'These variables are assigned to the "params" object in your script'
      })
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.painlessLab.parametersFieldLabel",
      defaultMessage: "Parameters (JSON)"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "questionInCircle",
      color: "subdued"
    }))),
    fullWidth: true,
    labelAppend: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(_eui.EuiLink, {
      href: links.modulesScriptingPreferParams,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.painlessLab.parametersFieldDocLinkText', {
      defaultMessage: 'Parameters docs'
    })))
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_public.CodeEditor, {
    languageId: "json",
    height: 600,
    value: payload.parameters,
    onChange: function onChange(nextParams) {
      return updatePayload({
        parameters: nextParams
      });
    },
    options: {
      fontSize: 12,
      minimap: {
        enabled: false
      },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      wrappingIndent: 'indent',
      automaticLayout: true
    },
    editorDidMount: function editorDidMount(editor) {
      // Updating tab size for the editor
      var model = editor.getModel();

      if (model) {
        model.updateOptions({
          tabSize: 2
        });
      }
    }
  }))));
};

exports.ParametersTab = ParametersTab;