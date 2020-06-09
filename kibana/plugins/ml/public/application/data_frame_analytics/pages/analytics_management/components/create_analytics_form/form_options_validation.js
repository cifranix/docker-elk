"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldAddAsDepVarOption = exports.OMIT_FIELDS = void 0;

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _fields = require("../../../../../../../common/types/fields");

var _analytics = require("../../../../common/analytics");

var _fields2 = require("../../../../common/fields");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CATEGORICAL_TYPES = new Set(['ip', 'keyword']); // List of system fields we want to ignore for the numeric field check.

var OMIT_FIELDS = ['_source', '_type', '_index', '_id', '_version', '_score']; // Regression supports numeric fields. Classification supports categorical, numeric, and boolean.

exports.OMIT_FIELDS = OMIT_FIELDS;

var shouldAddAsDepVarOption = function shouldAddAsDepVarOption(field, jobType) {
  if (field.id === _fields.EVENT_RATE_FIELD_ID) return false;

  var isBasicNumerical = _fields2.BASIC_NUMERICAL_TYPES.has(field.type);

  var isSupportedByClassification = isBasicNumerical || CATEGORICAL_TYPES.has(field.type) || field.type === _public.ES_FIELD_TYPES.BOOLEAN;

  if (jobType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION) {
    return isBasicNumerical || _fields2.EXTENDED_NUMERICAL_TYPES.has(field.type);
  }

  if (jobType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION) return isSupportedByClassification;
};

exports.shouldAddAsDepVarOption = shouldAddAsDepVarOption;