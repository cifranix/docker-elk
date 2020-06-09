"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOC_COUNT = exports.MLCATEGORY = exports.ML_JOB_FIELD_TYPES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let ML_JOB_FIELD_TYPES;
exports.ML_JOB_FIELD_TYPES = ML_JOB_FIELD_TYPES;

(function (ML_JOB_FIELD_TYPES) {
  ML_JOB_FIELD_TYPES["BOOLEAN"] = "boolean";
  ML_JOB_FIELD_TYPES["DATE"] = "date";
  ML_JOB_FIELD_TYPES["GEO_POINT"] = "geo_point";
  ML_JOB_FIELD_TYPES["IP"] = "ip";
  ML_JOB_FIELD_TYPES["KEYWORD"] = "keyword";
  ML_JOB_FIELD_TYPES["NUMBER"] = "number";
  ML_JOB_FIELD_TYPES["TEXT"] = "text";
  ML_JOB_FIELD_TYPES["UNKNOWN"] = "unknown";
})(ML_JOB_FIELD_TYPES || (exports.ML_JOB_FIELD_TYPES = ML_JOB_FIELD_TYPES = {}));

const MLCATEGORY = 'mlcategory';
exports.MLCATEGORY = MLCATEGORY;
const DOC_COUNT = 'doc_count';
exports.DOC_COUNT = DOC_COUNT;