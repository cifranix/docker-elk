"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexParameter = void 0;

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
var IndexParameter = function IndexParameter(_ref) {
  var _ref$indexOptions = _ref.indexOptions,
      indexOptions = _ref$indexOptions === void 0 ? _constants.PARAMETERS_OPTIONS.index_options : _ref$indexOptions,
      _ref$hasIndexOptions = _ref.hasIndexOptions,
      hasIndexOptions = _ref$hasIndexOptions === void 0 ? true : _ref$hasIndexOptions,
      _ref$config = _ref.config,
      config = _ref$config === void 0 ? (0, _lib.getFieldConfig)('index_options') : _ref$config;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.searchableFieldTitle', {
      defaultMessage: 'Searchable'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.searchableFieldDescription', {
      defaultMessage: 'Allow the field to be searched.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexDocLinkText', {
        defaultMessage: 'Searchable documentation'
      }),
      href: _documentation.documentationService.getIndexLink()
    },
    formFieldPath: "index"
  }, hasIndexOptions ? _react.default.createElement(_shared_imports.UseField, {
    path: "index_options",
    config: config,
    component: _shared_imports.Field,
    componentProps: {
      euiFieldProps: {
        options: indexOptions
      }
    }
  }) : undefined);
};

exports.IndexParameter = IndexParameter;