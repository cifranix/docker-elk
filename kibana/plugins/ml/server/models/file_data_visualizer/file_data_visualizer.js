"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDataVisualizerProvider = fileDataVisualizerProvider;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function fileDataVisualizerProvider(callAsCurrentUser) {
  async function analyzeFile(data, overrides) {
    let results = [];

    try {
      results = await callAsCurrentUser('ml.fileStructure', {
        body: data,
        ...overrides
      });
    } catch (error) {
      const err = error.message !== undefined ? error.message : error;
      throw _boom.default.badRequest(err);
    }

    const {
      hasOverrides,
      reducedOverrides
    } = formatOverrides(overrides);
    return { ...(hasOverrides && {
        overrides: reducedOverrides
      }),
      results
    };
  }

  return {
    analyzeFile
  };
}

function formatOverrides(overrides) {
  let hasOverrides = false;
  const reducedOverrides = Object.keys(overrides).reduce((acc, overrideKey) => {
    const overrideValue = overrides[overrideKey];

    if (overrideValue !== '') {
      if (overrideKey === 'column_names') {
        acc.column_names = overrideValue.split(',');
      } else if (overrideKey === 'has_header_row') {
        acc.has_header_row = overrideValue === 'true';
      } else if (overrideKey === 'should_trim_fields') {
        acc.should_trim_fields = overrideValue === 'true';
      } else {
        acc[overrideKey] = overrideValue;
      }

      hasOverrides = true;
    }

    return acc;
  }, {});
  return {
    reducedOverrides,
    hasOverrides
  };
}