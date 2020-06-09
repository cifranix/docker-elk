"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoPointType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

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
    case 'null_value':
      {
        return field.null_value !== undefined;
      }

    default:
      return false;
  }
};

var GeoPointType = function GeoPointType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IgnoreMalformedParameter, {
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.geoPoint.ignoreMalformedFieldDescription', {
      defaultMessage: 'By default, documents that contain malformed geo-points are not indexed. If enabled, these documents are indexed, but fields with malformed geo-points are filtered out. Be careful: if too many documents are indexed this way, queries on the field become meaningless.'
    })
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.IgnoreZValueParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.geoPoint.nullValueFieldDescription', {
      defaultMessage: 'Replace explicit null values with a geo-point value so that it can be indexed and searched.'
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    component: _shared_imports.TextAreaField,
    config: (0, _lib.getFieldConfig)('null_value_geo_point')
  }))));
};

exports.GeoPointType = GeoPointType;