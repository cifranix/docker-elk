"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParametersFormForType = void 0;

var _alias_type = require("./alias_type");

var _token_count_type = require("./token_count_type");

var _scaled_float_type = require("./scaled_float_type");

var _dense_vector_type = require("./dense_vector_type");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var typeToParametersFormMap = {
  alias: _alias_type.AliasTypeRequiredParameters,
  token_count: _token_count_type.TokenCountTypeRequiredParameters,
  scaled_float: _scaled_float_type.ScaledFloatTypeRequiredParameters,
  dense_vector: _dense_vector_type.DenseVectorRequiredParameters
};

var getParametersFormForType = function getParametersFormForType(type, subType) {
  return typeToParametersFormMap[subType] || typeToParametersFormMap[type];
};

exports.getParametersFormForType = getParametersFormForType;