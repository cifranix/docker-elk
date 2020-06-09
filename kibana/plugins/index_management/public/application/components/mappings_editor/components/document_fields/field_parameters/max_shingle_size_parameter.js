"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxShingleSizeParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../lib");

var _edit_field = require("../fields/edit_field");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MaxShingleSizeParameter = function MaxShingleSizeParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.maxShingleSizeFieldTitle', {
      defaultMessage: 'Set max shingle size'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.maxShingleSizeFieldDescription', {
      defaultMessage: 'The default is three shingle subfields. More subfields enable more specific queries, but increase index size.'
    }),
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "max_shingle_size",
    component: _shared_imports.Field,
    config: (0, _lib.getFieldConfig)('max_shingle_size'),
    componentProps: {
      euiFieldProps: {
        options: [{
          value: 2,
          text: '2'
        }, {
          value: 3,
          text: '3'
        }, {
          value: 4,
          text: '4'
        }]
      }
    }
  }));
};

exports.MaxShingleSizeParameter = MaxShingleSizeParameter;