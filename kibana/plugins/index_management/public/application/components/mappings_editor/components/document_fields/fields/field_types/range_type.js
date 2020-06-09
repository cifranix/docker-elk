"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeType = void 0;

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

var _shared_imports = require("../../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
};

var RangeType = function RangeType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  }), _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "subType"
  }, function (formData) {
    return formData.subType === 'date_range' ? _react.default.createElement(_field_parameters.FormatParameter, {
      defaultValue: field.source.format,
      defaultToggleValue: getDefaultToggleValue('format', field.source)
    }) : null;
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "subType"
  }, function (formData) {
    return formData.subType === 'date_range' ? _react.default.createElement(_field_parameters.LocaleParameter, {
      defaultToggleValue: getDefaultToggleValue('locale', field.source)
    }) : null;
  }), _react.default.createElement(_field_parameters.CoerceNumberParameter, null), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.RangeType = RangeType;