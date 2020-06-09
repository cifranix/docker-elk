"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TermVectorParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TermVectorParameter = function TermVectorParameter(_ref) {
  var field = _ref.field,
      defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.termVectorFieldTitle', {
      defaultMessage: 'Set term vector'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.termVectorFieldDescription', {
      defaultMessage: 'Store term vectors for an analyzed field.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.termVectorDocLinkText', {
        defaultMessage: 'Term vector documentation'
      }),
      href: _documentation.documentationService.getTermVectorLink()
    },
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "term_vector"
  }, function (formData) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_shared_imports.UseField, {
      path: "term_vector",
      config: (0, _lib.getFieldConfig)('term_vector'),
      component: _shared_imports.Field,
      componentProps: {
        euiFieldProps: {
          options: _constants.PARAMETERS_OPTIONS.term_vector,
          fullWidth: true
        }
      }
    }), formData.term_vector === 'with_positions_offsets' && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiCallOut, {
      color: "warning"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.termVectorFieldWarningMessage', {
      defaultMessage: 'Setting "With positions and offsets" will double the size of a field’s index.'
    })))));
  }));
};

exports.TermVectorParameter = TermVectorParameter;