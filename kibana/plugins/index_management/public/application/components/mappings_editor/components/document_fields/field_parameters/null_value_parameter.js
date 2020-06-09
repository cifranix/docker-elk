"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NullValueParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../services/documentation");

var _lib = require("../../../lib");

var _shared_imports = require("../../../shared_imports");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NullValueParameter = function NullValueParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue,
      description = _ref.description,
      children = _ref.children;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nullValueFieldTitle', {
      defaultMessage: 'Set null value'
    }),
    description: description ? description : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nullValueFieldDescription', {
      defaultMessage: 'Replace explicit null values with the specified value so that it can be indexed and searched.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nullValueDocLinkText', {
        defaultMessage: 'Null value documentation'
      }),
      href: _documentation.documentationService.getNullValueLink()
    },
    defaultToggleValue: defaultToggleValue
  }, children ? children : _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    config: (0, _lib.getFieldConfig)('null_value'),
    component: _shared_imports.Field
  }));
};

exports.NullValueParameter = NullValueParameter;