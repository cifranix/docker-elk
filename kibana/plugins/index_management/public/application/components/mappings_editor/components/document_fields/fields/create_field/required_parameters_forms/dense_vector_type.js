"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DenseVectorRequiredParameters = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../../../shared_imports");

var _lib = require("../../../../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DenseVectorRequiredParameters = function DenseVectorRequiredParameters() {
  var _getFieldConfig = (0, _lib.getFieldConfig)('dims'),
      label = _getFieldConfig.label;

  return _react.default.createElement(_shared_imports.FormRow, {
    title: _react.default.createElement("h3", null, label),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.denseVector.dimsFieldDescription', {
      defaultMessage: 'Each document’s dense vector is encoded as a binary doc value. Its size in bytes is equal to 4 * dimensions + 4.'
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "dims",
    config: (0, _lib.getFieldConfig)('dims'),
    component: _shared_imports.Field
  }));
};

exports.DenseVectorRequiredParameters = DenseVectorRequiredParameters;