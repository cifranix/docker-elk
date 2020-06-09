"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResultsServiceProvider = getResultsServiceProvider;

var _results_service = require("../../models/results_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getResultsServiceProvider(isFullLicense) {
  return {
    resultsServiceProvider(callAsCurrentUser) {
      isFullLicense();
      return (0, _results_service.resultsServiceProvider)(callAsCurrentUser);
    }

  };
}