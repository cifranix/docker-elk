"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaledFloatTypeRequiredParameters = void 0;

var _react = _interopRequireDefault(require("react"));

var _shared_imports = require("../../../../../shared_imports");

var _lib = require("../../../../../lib");

var _constants = require("../../../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ScaledFloatTypeRequiredParameters = function ScaledFloatTypeRequiredParameters() {
  return _react.default.createElement(_shared_imports.FormRow, {
    title: _react.default.createElement("h3", null, _constants.PARAMETERS_DEFINITION.scaling_factor.title),
    description: _constants.PARAMETERS_DEFINITION.scaling_factor.description
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "scaling_factor",
    config: (0, _lib.getFieldConfig)('scaling_factor'),
    component: _shared_imports.Field
  }));
};

exports.ScaledFloatTypeRequiredParameters = ScaledFloatTypeRequiredParameters;