"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultipleMappingsWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MultipleMappingsWarning = function MultipleMappingsWarning() {
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.mappingTypesDetectedCallOutTitle', {
      defaultMessage: 'Multiple mapping types detected'
    }),
    iconType: "alert",
    color: "warning",
    "data-test-subj": "mappingTypesDetectedCallout"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.mappingsEditor.mappingTypesDetectedCallOutDescription",
    defaultMessage: "The mappings for this template uses multiple types, which are not supported. {docsLink}",
    values: {
      docsLink: _react.default.createElement(_eui.EuiLink, {
        href: _documentation.documentationService.getAlternativeToMappingTypesLink(),
        target: "_blank"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.mappingTypesDetectedCallOutDocumentationLink', {
        defaultMessage: 'Consider these alternatives to mapping types.'
      }))
    }
  })));
};

exports.MultipleMappingsWarning = MultipleMappingsWarning;