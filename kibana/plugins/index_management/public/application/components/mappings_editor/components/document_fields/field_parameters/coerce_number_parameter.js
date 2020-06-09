"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoerceNumberParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CoerceNumberParameter = function CoerceNumberParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceFieldTitle', {
      defaultMessage: 'Coerce to number'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceDescription', {
      defaultMessage: 'Convert strings to numbers. If this field is an integer, fractions are truncated. If disabled, then documents with imperfectly formatted values are rejected.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.coerceDocLinkText', {
        defaultMessage: 'Coerce documentation'
      }),
      href: _documentation.documentationService.getCoerceLink()
    },
    formFieldPath: "coerce"
  });
};

exports.CoerceNumberParameter = CoerceNumberParameter;