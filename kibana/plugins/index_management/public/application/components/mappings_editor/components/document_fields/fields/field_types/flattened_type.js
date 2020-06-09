"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlattenedType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../../services/documentation");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

var _constants = require("../../../../constants");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'boost':
    case 'similarity':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'null_value':
      {
        return field.null_value !== undefined && field.null_value !== '';
      }

    default:
      return false;
  }
};

var FlattenedType = _react.default.memo(function (_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    config: (0, _lib.getFieldConfig)('index_options_flattened'),
    indexOptions: _constants.PARAMETERS_OPTIONS.index_options_flattened
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.EagerGlobalOrdinalsParameter, null), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.depthLimitTitle', {
      defaultMessage: 'Customize depth limit'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.depthLimitDescription', {
      defaultMessage: 'The maximum allowed depth of the flattened object field, in terms of nested inner objects. Defaults to 20.'
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "depth_limit",
    config: (0, _lib.getFieldConfig)('depth_limit'),
    component: _shared_imports.Field
  })), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.leafLengthLimitFieldTitle', {
      defaultMessage: 'Set length limit'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.leafLengthLimitFieldDescription', {
      defaultMessage: 'Prevent leaf values from being indexed if they are beyond a certain length. This is useful for protecting against Lucene’s term character-length limit of 8,191 UTF-8 characters.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.flattened.ignoreAboveDocLinkText', {
        defaultMessage: 'Ignore above documentation'
      }),
      href: _documentation.documentationService.getIgnoreAboveLink()
    },
    defaultToggleValue: getDefaultToggleValue('ignore_above', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "ignore_above",
    config: (0, _lib.getFieldConfig)('ignore_above'),
    component: _shared_imports.Field
  })), _react.default.createElement(_field_parameters.SplitQueriesOnWhitespaceParameter, null), _react.default.createElement(_field_parameters.SimilarityParameter, {
    defaultToggleValue: getDefaultToggleValue('similarity', field.source)
  }), _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source)
  }), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
});

exports.FlattenedType = FlattenedType;