"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimilarityParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../services/documentation");

var _edit_field = require("../fields/edit_field");

var _constants = require("../../../constants");

var _lib = require("../../../lib");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SimilarityParameter = function SimilarityParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.setSimilarityFieldTitle', {
      defaultMessage: 'Set similarity'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.setSimilarityFieldDescription', {
      defaultMessage: 'The scoring algorithm or similarity to use.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.similarityDocLinkText', {
        defaultMessage: 'Similarity documentation'
      }),
      href: _documentation.documentationService.getSimilarityLink()
    },
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "similarity",
    config: (0, _lib.getFieldConfig)('similarity'),
    component: _shared_imports.Field,
    componentProps: {
      euiFieldProps: {
        options: _constants.PARAMETERS_OPTIONS.similarity
      }
    }
  }));
};

exports.SimilarityParameter = SimilarityParameter;