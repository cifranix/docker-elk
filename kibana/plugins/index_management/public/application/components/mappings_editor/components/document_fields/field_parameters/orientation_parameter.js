"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrientationParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OrientationParameter = function OrientationParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.geoShapeType.orientationFieldTitle', {
      defaultMessage: 'Set orientation'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.geoShapeType.orientationFieldDescription', {
      defaultMessage: 'Interpret the vertex order for polygons and multipolygons as either clockwise or counterclockwise (default).'
    }),
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "orientation",
    config: (0, _lib.getFieldConfig)('orientation'),
    component: _shared_imports.Field,
    componentProps: {
      euiFieldProps: {
        options: _constants.PARAMETERS_OPTIONS.orientation,
        style: {
          minWidth: 300
        }
      }
    }
  }));
};

exports.OrientationParameter = OrientationParameter;