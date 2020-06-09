"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRuleGroup = isRuleGroup;

var _model = require("../../model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isRuleGroup(rule) {
  return !(rule instanceof _model.FieldRule);
}