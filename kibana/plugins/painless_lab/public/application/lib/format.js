"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatRequestPayload = formatRequestPayload;
exports.formatJson = formatJson;
exports.formatResponse = formatResponse;
exports.formatExecutionError = formatExecutionError;

var _types = require("../types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function prettifyPayload() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var indentationLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var indentation = new Array(indentationLevel + 1).join(' ');
  return payload.replace(/\n/g, "\n".concat(indentation));
}
/**
 * Values should be preserved as strings so that floating point precision,
 * e.g. 1.0, is preserved instead of being coerced to an integer, e.g. 1.
 */


function formatRequestPayload(_ref) {
  var code = _ref.code,
      context = _ref.context,
      parameters = _ref.parameters,
      index = _ref.index,
      document = _ref.document,
      query = _ref.query;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _types.PayloadFormat.UGLY;
  var isAdvancedContext = context === 'filter' || context === 'score';
  var formattedCode;
  var formattedParameters;
  var formattedContext;
  var formattedIndex;
  var formattedDocument;
  var formattedQuery;

  if (format === _types.PayloadFormat.UGLY) {
    formattedCode = JSON.stringify(code);
    formattedParameters = parameters;
    formattedContext = context;
    formattedIndex = index;
    formattedDocument = document;
    formattedQuery = query;
  } else {
    // Triple quote the code because it's multiline.
    formattedCode = "\"\"\"".concat(prettifyPayload(code, 4), "\"\"\"");
    formattedParameters = prettifyPayload(parameters, 4);
    formattedContext = prettifyPayload(context, 6);
    formattedIndex = prettifyPayload(index);
    formattedDocument = prettifyPayload(document, 4);
    formattedQuery = prettifyPayload(query, 4);
  }

  var requestPayload = "{\n  \"script\": {\n    \"source\": ".concat(formattedCode).concat(parameters ? ",\n    \"params\": ".concat(formattedParameters) : "", "\n  }").concat(isAdvancedContext ? ",\n  \"context\": \"".concat(formattedContext, "\",\n  \"context_setup\": {\n    \"index\": \"").concat(formattedIndex, "\",\n    \"document\": ").concat(formattedDocument).concat(query && context === 'score' ? ",\n    \"query\": ".concat(formattedQuery) : '', "\n  }") : "", "\n}");
  return requestPayload;
}
/**
 * Stringify a given object to JSON in a formatted way
 */


function formatJson(json) {
  try {
    return JSON.stringify(json, null, 2);
  } catch (e) {
    return "Invalid JSON ".concat(String(json));
  }
}

function formatResponse(response) {
  if (!response) {
    return '';
  }

  if (typeof response.result === 'string') {
    return response.result.replace(/\\n/g, '\n');
  } else if (response.error) {
    return formatExecutionError(response.error);
  }

  return formatJson(response);
}

function formatExecutionError(executionErrorOrError) {
  if (executionErrorOrError instanceof Error) {
    return executionErrorOrError.message;
  }

  if (executionErrorOrError.script_stack && executionErrorOrError.caused_by && executionErrorOrError.position) {
    return "Unhandled Exception ".concat(executionErrorOrError.caused_by.type, "\n\n").concat(executionErrorOrError.caused_by.reason, "\n\nStack:\n").concat(formatJson(executionErrorOrError.script_stack), "\n");
  }

  return formatJson(executionErrorOrError);
}