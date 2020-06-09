"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOutlierScoreFieldName = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OUTLIER_SCORE = 'outlier_score';

var getOutlierScoreFieldName = function getOutlierScoreFieldName(jobConfig) {
  return "".concat(jobConfig.dest.results_field, ".").concat(OUTLIER_SCORE);
};

exports.getOutlierScoreFieldName = getOutlierScoreFieldName;