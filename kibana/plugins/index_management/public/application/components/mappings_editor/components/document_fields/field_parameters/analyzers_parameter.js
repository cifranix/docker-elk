"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyzersParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _edit_field = require("../fields/edit_field");

var _analyzer_parameter = require("./analyzer_parameter");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnalyzersParameter = function AnalyzersParameter(_ref) {
  var field = _ref.field,
      _ref$withSearchQuoteA = _ref.withSearchQuoteAnalyzer,
      withSearchQuoteAnalyzer = _ref$withSearchQuoteA === void 0 ? false : _ref$withSearchQuoteA;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzersSectionTitle', {
      defaultMessage: 'Analyzers'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzersDocLinkText', {
        defaultMessage: 'Analyzers documentation'
      }),
      href: _documentation.documentationService.getAnalyzerLink()
    },
    withToggle: false
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "useSameAnalyzerForSearch"
  }, function (_ref2) {
    var useSameAnalyzerForSearch = _ref2.useSameAnalyzerForSearch;
    var label = useSameAnalyzerForSearch ? _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexSearchAnalyzerFieldLabel', {
      defaultMessage: 'Index and search analyzer'
    }) : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexAnalyzerFieldLabel', {
      defaultMessage: 'Index analyzer'
    });
    return _react.default.createElement(_analyzer_parameter.AnalyzerParameter, {
      path: "analyzer",
      label: label,
      defaultValue: field.source.analyzer
    });
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_shared_imports.UseField, {
    path: "useSameAnalyzerForSearch",
    component: _shared_imports.CheckBoxField,
    config: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzers.useSameAnalyzerIndexAnSearch', {
        defaultMessage: 'Use the same analyzers for index and searching'
      }),
      defaultValue: true
    }
  }), _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "useSameAnalyzerForSearch"
  }, function (_ref3) {
    var useSameAnalyzerForSearch = _ref3.useSameAnalyzerForSearch;
    return useSameAnalyzerForSearch ? null : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_analyzer_parameter.AnalyzerParameter, {
      path: "search_analyzer",
      defaultValue: field.source.search_analyzer,
      config: (0, _lib.getFieldConfig)('search_analyzer')
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }), withSearchQuoteAnalyzer && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_analyzer_parameter.AnalyzerParameter, {
    path: "search_quote_analyzer",
    defaultValue: field.source.search_quote_analyzer,
    config: (0, _lib.getFieldConfig)('search_quote_analyzer')
  })));
};

exports.AnalyzersParameter = AnalyzersParameter;