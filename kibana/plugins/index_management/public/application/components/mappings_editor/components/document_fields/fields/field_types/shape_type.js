"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapeType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../../lib");

var _edit_field = require("../edit_field");

var _field_parameters = require("../../field_parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  var _getFieldConfig = (0, _lib.getFieldConfig)(param),
      defaultValue = _getFieldConfig.defaultValue;

  switch (param) {
    // Switches that don't map to a boolean in the mappings
    case 'boost':
    case 'orientation':
      {
        return field[param] !== undefined && field[param] !== defaultValue;
      }

    default:
      // All "boolean" parameters
      return field[param] !== undefined ? field[param] : // If the field has a value set, use it
      defaultValue !== undefined // If the parameter definition has a "defaultValue" set, use it
      ? defaultValue : false;
    // Defaults to "false"
  }
};

var ShapeType = function ShapeType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IgnoreMalformedParameter, {
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.shapeType.ignoredMalformedFieldDescription', {
      defaultMessage: 'By default, documents that contain malformed GeoJSON or WKT shapes are not indexed. If enabled, these documents are indexed, but fields with malformed shapes are filtered out. Be careful: if too many documents are indexed this way, queries on the field become meaningless.'
    })
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.OrientationParameter, {
    defaultToggleValue: getDefaultToggleValue('orientation', field.source)
  }), _react.default.createElement(_field_parameters.IgnoreZValueParameter, null), _react.default.createElement(_field_parameters.CoerceShapeParameter, null)));
};

exports.ShapeType = ShapeType;