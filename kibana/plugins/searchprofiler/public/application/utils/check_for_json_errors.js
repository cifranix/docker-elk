"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForParseErrors = checkForParseErrors;

var _lib = require("../../../../../../src/plugins/es_ui_shared/console_lang/lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function checkForParseErrors(json) {
  var sanitizedJson = (0, _lib.collapseLiteralStrings)(json);

  try {
    var parsedJson = JSON.parse(sanitizedJson);
    return {
      parsed: parsedJson,
      error: null
    };
  } catch (error) {
    return {
      error: error,
      parsed: null
    };
  }
}