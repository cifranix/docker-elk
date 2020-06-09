"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoostParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../lib");

var _shared_imports = require("../../../shared_imports");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BoostParameter = function BoostParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.boostFieldTitle', {
      defaultMessage: 'Set boost level'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.boostFieldDescription', {
      defaultMessage: 'Boost this field at query time so it counts more toward the relevance score.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.boostDocLinkText', {
        defaultMessage: 'Boost documentation'
      }),
      href: _documentation.documentationService.getBoostLink()
    },
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "boost",
    config: (0, _lib.getFieldConfig)('boost'),
    component: _shared_imports.RangeField,
    componentProps: {
      euiFieldProps: {
        min: 1,
        max: 20,
        showInput: true,
        fullWidth: true
      }
    }
  }));
};

exports.BoostParameter = BoostParameter;