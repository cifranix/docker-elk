"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialPayload = void 0;

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialPayload = {
  context: _constants.painlessContextOptions[0].value,
  code: _constants.exampleScript,
  parameters: "{\n  \"string_parameter\": \"string value\",\n  \"number_parameter\": 1.5,\n  \"boolean_parameter\": true\n}",
  index: 'my-index',
  document: "{\n  \"my_field\": \"field_value\"\n}",
  query: ''
};
exports.initialPayload = initialPayload;