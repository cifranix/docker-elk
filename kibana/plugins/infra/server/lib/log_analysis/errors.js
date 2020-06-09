"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnknownCategoryError = exports.InsufficientLogAnalysisMlJobConfigurationError = exports.NoLogAnalysisMlJobError = exports.NoLogAnalysisResultsIndexError = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable max-classes-per-file */
class NoLogAnalysisResultsIndexError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

exports.NoLogAnalysisResultsIndexError = NoLogAnalysisResultsIndexError;

class NoLogAnalysisMlJobError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

exports.NoLogAnalysisMlJobError = NoLogAnalysisMlJobError;

class InsufficientLogAnalysisMlJobConfigurationError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

exports.InsufficientLogAnalysisMlJobConfigurationError = InsufficientLogAnalysisMlJobConfigurationError;

class UnknownCategoryError extends Error {
  constructor(categoryId) {
    super(`Unknown ml category ${categoryId}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }

}

exports.UnknownCategoryError = UnknownCategoryError;