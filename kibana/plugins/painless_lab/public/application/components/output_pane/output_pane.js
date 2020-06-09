"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutputPane = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _output_tab = require("./output_tab");

var _parameters_tab = require("./parameters_tab");

var _context_tab = require("./context_tab");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OutputPane = function OutputPane(_ref) {
  var isLoading = _ref.isLoading,
      response = _ref.response;

  var outputTabLabel = _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isLoading ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }) : response && response.error ? _react.default.createElement(_eui.EuiIcon, {
    type: "alert",
    color: "danger"
  }) : _react.default.createElement(_eui.EuiIcon, {
    type: "check",
    color: "secondary"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _i18n.i18n.translate('xpack.painlessLab.outputTabLabel', {
    defaultMessage: 'Output'
  })));

  return _react.default.createElement(_eui.EuiPanel, {
    className: "painlessLabRightPane"
  }, _react.default.createElement(_eui.EuiTabbedContent, {
    className: "painlessLabRightPane__tabs",
    size: "s",
    tabs: [{
      id: 'output',
      // TODO: Currently this causes an Eui prop error because it is expecting string, but we give it React.ReactNode - should fix.
      name: outputTabLabel,
      content: _react.default.createElement(_output_tab.OutputTab, {
        response: response
      })
    }, {
      id: 'parameters',
      name: _i18n.i18n.translate('xpack.painlessLab.parametersTabLabel', {
        defaultMessage: 'Parameters'
      }),
      content: _react.default.createElement(_parameters_tab.ParametersTab, null)
    }, {
      id: 'context',
      name: _i18n.i18n.translate('xpack.painlessLab.contextTabLabel', {
        defaultMessage: 'Context'
      }),
      content: _react.default.createElement(_context_tab.ContextTab, null)
    }]
  }));
};

exports.OutputPane = OutputPane;