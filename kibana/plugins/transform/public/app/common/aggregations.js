"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAggName = isAggName;

var _validators = require("../../../../ml/common/util/validators");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isAggName(arg) {
  // allow all characters except `[]>` and must not start or end with a space.
  var validatorFn = (0, _validators.composeValidators)((0, _validators.patternValidator)(/^[^\s]/), (0, _validators.patternValidator)(/[^\s]$/), (0, _validators.patternValidator)(/^[^\[\]>]+$/));
  return validatorFn(arg) === null;
}