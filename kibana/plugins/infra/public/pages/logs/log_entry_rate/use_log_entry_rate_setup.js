"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryRateSetup = void 0;

var _log_analysis = require("../../../containers/logs/log_analysis");

var _use_log_entry_rate_module = require("./use_log_entry_rate_module");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useLogEntryRateSetup = function useLogEntryRateSetup() {
  var _useLogEntryRateModul = (0, _use_log_entry_rate_module.useLogEntryRateModuleContext)(),
      cleanUpAndSetUpModule = _useLogEntryRateModul.cleanUpAndSetUpModule,
      lastSetupErrorMessages = _useLogEntryRateModul.lastSetupErrorMessages,
      moduleDescriptor = _useLogEntryRateModul.moduleDescriptor,
      setUpModule = _useLogEntryRateModul.setUpModule,
      setupStatus = _useLogEntryRateModul.setupStatus,
      sourceConfiguration = _useLogEntryRateModul.sourceConfiguration,
      viewResults = _useLogEntryRateModul.viewResults;

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

exports.useLogEntryRateSetup = useLogEntryRateSetup;