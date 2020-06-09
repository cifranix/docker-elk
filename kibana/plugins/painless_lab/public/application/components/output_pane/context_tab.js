"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextTab = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _constants = require("../../constants");

var _context = require("../../context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ContextTab = function ContextTab() {
  var _useAppContext = (0, _context.useAppContext)(),
      _useAppContext$store = _useAppContext.store,
      payload = _useAppContext$store.payload,
      validation = _useAppContext$store.validation,
      updatePayload = _useAppContext.updatePayload,
      links = _useAppContext.links;

  var context = payload.context,
      document = payload.document,
      index = payload.index,
      query = payload.query;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.painlessLab.contextFieldTooltipText', {
        defaultMessage: 'Different contexts provide different functions on the ctx object'
      })
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.painlessLab.contextFieldLabel",
      defaultMessage: "Execution context"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "questionInCircle",
      color: "subdued"
    }))),
    labelAppend: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(_eui.EuiLink, {
      href: links.painlessExecuteAPIContexts,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.painlessLab.contextFieldDocLinkText', {
      defaultMessage: 'Context docs'
    }))),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiSuperSelect, {
    options: _constants.painlessContextOptions,
    valueOfSelected: context,
    onChange: function onChange(nextContext) {
      return updatePayload({
        context: nextContext
      });
    },
    itemLayoutAlign: "top",
    hasDividers: true,
    fullWidth: true
  })), ['filter', 'score'].indexOf(context) !== -1 && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.painlessLab.indexFieldTooltipText', {
        defaultMessage: "Index mappings must be compatible with the sample document's fields"
      })
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.painlessLab.indexFieldLabel",
      defaultMessage: "Index name"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "questionInCircle",
      color: "subdued"
    }))),
    fullWidth: true,
    isInvalid: !validation.fields.index,
    error: validation.fields.index ? [] : [_i18n.i18n.translate('xpack.painlessLab.indexFieldMissingErrorMessage', {
      defaultMessage: 'Enter an index name'
    })]
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    value: index || '',
    onChange: function onChange(e) {
      var nextIndex = e.target.value;
      updatePayload({
        index: nextIndex
      });
    },
    isInvalid: !validation.fields.index
  })), 'score'.indexOf(context) !== -1 && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.painlessLab.queryFieldTooltipText', {
        defaultMessage: 'Use query to specify that that _score will be used to calculate score.'
      })
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.painlessLab.queryFieldLabel",
      defaultMessage: "Query"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "questionInCircle",
      color: "subdued"
    }))),
    labelAppend: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement(_eui.EuiLink, {
      href: links.esQueryDSL,
      target: "_blank"
    }, _i18n.i18n.translate('xpack.painlessLab.queryFieldDocLinkText', {
      defaultMessage: 'Query DSL docs'
    }))),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_public.CodeEditor, {
    languageId: "json",
    height: 150,
    value: query,
    onChange: function onChange(nextQuery) {
      return updatePayload({
        query: nextQuery
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
    }
  }))), ['filter', 'score'].indexOf(context) !== -1 && _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.painlessLab.documentFieldTooltipText', {
        defaultMessage: "Your script can access this document's fields"
      })
    }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.painlessLab.documentFieldLabel",
      defaultMessage: "Sample document (JSON)"
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      type: "questionInCircle",
      color: "subdued"
    }))),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "s"
  }, _react.default.createElement(_public.CodeEditor, {
    languageId: "json",
    height: 400,
    value: document,
    onChange: function onChange(nextDocument) {
      return updatePayload({
        document: nextDocument
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
    }
  }))));
};

exports.ContextTab = ContextTab;