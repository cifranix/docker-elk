"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileFormattingRules = compileFormattingRules;

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compileFormattingRules(rules) {
  const compiledRules = rules.map(compileRule);
  return {
    requiredFields: Array.from(new Set(compiledRules.reduce((combinedRequiredFields, {
      requiredFields
    }) => [...combinedRequiredFields, ...requiredFields], []))),

    format(fields, highlights) {
      for (const compiledRule of compiledRules) {
        if (compiledRule.fulfillsCondition(fields)) {
          return compiledRule.format(fields, highlights);
        }
      }

      return [];
    },

    fulfillsCondition() {
      return true;
    }

  };
}

const compileRule = rule => {
  const {
    conditionFields,
    fulfillsCondition
  } = compileCondition(rule.when);
  const {
    formattingFields,
    format
  } = compileFormattingInstructions(rule.format);
  return {
    requiredFields: [...conditionFields, ...formattingFields],
    fulfillsCondition,
    format
  };
};

const compileCondition = condition => [compileExistsCondition, compileFieldValueCondition].reduce((compiledCondition, compile) => compile(condition) || compiledCondition, catchAllCondition);

const catchAllCondition = {
  conditionFields: [],
  fulfillsCondition: () => false
};

const compileExistsCondition = condition => 'exists' in condition ? {
  conditionFields: condition.exists,
  fulfillsCondition: fields => condition.exists.every(fieldName => fieldName in fields)
} : null;

const compileFieldValueCondition = condition => 'values' in condition ? {
  conditionFields: Object.keys(condition.values),
  fulfillsCondition: fields => Object.entries(condition.values).every(([fieldName, expectedValue]) => fields[fieldName] === expectedValue)
} : null;

const compileFormattingInstructions = formattingInstructions => formattingInstructions.reduce((combinedFormattingInstructions, formattingInstruction) => {
  const compiledFormattingInstruction = compileFormattingInstruction(formattingInstruction);
  return {
    formattingFields: [...combinedFormattingInstructions.formattingFields, ...compiledFormattingInstruction.formattingFields],
    format: (fields, highlights) => [...combinedFormattingInstructions.format(fields, highlights), ...compiledFormattingInstruction.format(fields, highlights)]
  };
}, {
  formattingFields: [],
  format: () => []
});

const compileFormattingInstruction = formattingInstruction => [compileFieldReferenceFormattingInstruction, compileConstantFormattingInstruction].reduce((compiledFormattingInstruction, compile) => compile(formattingInstruction) || compiledFormattingInstruction, catchAllFormattingInstruction);

const catchAllFormattingInstruction = {
  formattingFields: [],
  format: () => [{
    constant: 'invalid format'
  }]
};

const compileFieldReferenceFormattingInstruction = formattingInstruction => 'field' in formattingInstruction ? {
  formattingFields: [formattingInstruction.field],
  format: (fields, highlights) => {
    const value = fields[formattingInstruction.field];
    const highlightedValues = highlights[formattingInstruction.field];
    return [{
      field: formattingInstruction.field,
      value: typeof value === 'object' ? (0, _jsonStableStringify.default)(value) : `${value}`,
      highlights: highlightedValues || []
    }];
  }
} : null;

const compileConstantFormattingInstruction = formattingInstruction => 'constant' in formattingInstruction ? {
  formattingFields: [],
  format: () => [{
    constant: formattingInstruction.constant
  }]
} : null;