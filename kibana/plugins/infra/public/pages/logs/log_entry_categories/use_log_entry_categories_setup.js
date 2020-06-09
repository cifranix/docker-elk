"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryCategoriesSetup = void 0;

var _log_analysis = require("../../../containers/logs/log_analysis");

var _use_log_entry_categories_module = require("./use_log_entry_categories_module");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useLogEntryCategoriesSetup = function useLogEntryCategoriesSetup() {
  var _useLogEntryCategorie = (0, _use_log_entry_categories_module.useLogEntryCategoriesModuleContext)(),
      cleanUpAndSetUpModule = _useLogEntryCategorie.cleanUpAndSetUpModule,
      lastSetupErrorMessages = _useLogEntryCategorie.lastSetupErrorMessages,
      moduleDescriptor = _useLogEntryCategorie.moduleDescriptor,
      setUpModule = _useLogEntryCategorie.setUpModule,
      setupStatus = _useLogEntryCategorie.setupStatus,
      sourceConfiguration = _useLogEntryCategorie.sourceConfiguration,
      viewResults = _useLogEntryCategorie.viewResults;

  var _useAnalysisSetupStat = (0, _log_analysis.useAnalysisSetupState)({
    cleanUpAndSetUpModule: cleanUpAndSetUpModule,
    moduleDescriptor: moduleDescriptor,
    setUpModule: setUpModule,
    sourceConfiguration: sourceConfiguration
  }),
      cleanUpAndSetUp = _useAnalysisSetupStat.cleanUpAndSetUp,
      endTime = _useAnalysisSetupStat.endTime,
      isValidating = _useAnalysisSetupStat.isValidating,
      setEndTime = _useAnalysisSetupStat.setEndTime,
      setStartTime = _useAnalysisSetupStat.setStartTime,
      setValidatedIndices = _useAnalysisSetupStat.setValidatedIndices,
      setUp = _useAnalysisSetupStat.setUp,
      startTime = _useAnalysisSetupStat.startTime,
      validatedIndices = _useAnalysisSetupStat.validatedIndices,
      validationErrors = _useAnalysisSetupStat.validationErrors;

  return {
    cleanUpAndSetUp: cleanUpAndSetUp,
    endTime: endTime,
    isValidating: isValidating,
    lastSetupErrorMessages: lastSetupErrorMessages,
    setEndTime: setEndTime,
    setStartTime: setStartTime,
    setValidatedIndices: setValidatedIndices,
    setUp: setUp,
    setupStatus: setupStatus,
    startTime: startTime,
    validatedIndices: validatedIndices,
    validationErrors: validationErrors,
    viewResults: viewResults
  };
};

exports.useLogEntryCategoriesSetup = useLogEntryCategoriesSetup;