"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateExpression = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var validateExpression = function validateExpression(alertParams) {
  var index = alertParams.index,
      timeField = alertParams.timeField,
      aggType = alertParams.aggType,
      aggField = alertParams.aggField,
      groupBy = alertParams.groupBy,
      termSize = alertParams.termSize,
      termField = alertParams.termField,
      threshold = alertParams.threshold,
      timeWindowSize = alertParams.timeWindowSize,
      thresholdComparator = alertParams.thresholdComparator;
  var validationResult = {
    errors: {}
  };
  var errors = {
    aggField: new Array(),
    termSize: new Array(),
    termField: new Array(),
    timeWindowSize: new Array(),
    threshold0: new Array(),
    threshold1: new Array(),
    index: new Array(),
    timeField: new Array()
  };
  validationResult.errors = errors;

  if (!index || index.length === 0) {
    errors.index.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredIndexText', {
      defaultMessage: 'Index is required.'
    }));
  }

  if (!timeField) {
    errors.timeField.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredTimeFieldText', {
      defaultMessage: 'Time field is required.'
    }));
  }

  if (aggType && _constants.builtInAggregationTypes[aggType].fieldRequired && !aggField) {
    errors.aggField.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredAggFieldText', {
      defaultMessage: 'Aggregation field is required.'
    }));
  }

  if (groupBy && _constants.builtInGroupByTypes[groupBy] && _constants.builtInGroupByTypes[groupBy].sizeRequired && !termSize) {
    errors.termSize.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredTermSizedText', {
      defaultMessage: 'Term size is required.'
    }));
  }

  if (groupBy && _constants.builtInGroupByTypes[groupBy].validNormalizedTypes && _constants.builtInGroupByTypes[groupBy].validNormalizedTypes.length > 0 && !termField) {
    errors.termField.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredtTermFieldText', {
      defaultMessage: 'Term field is required.'
    }));
  }

  if (!timeWindowSize) {
    errors.timeWindowSize.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredTimeWindowSizeText', {
      defaultMessage: 'Time window size is required.'
    }));
  }

  if (!threshold || threshold.length === 0 || threshold[0] === undefined) {
    errors.threshold0.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredThreshold0Text', {
      defaultMessage: 'Threshold0 is required.'
    }));
  }

  if (thresholdComparator && _constants.builtInComparators[thresholdComparator].requiredValues > 1 && (!threshold || threshold[1] === undefined || threshold && threshold.length < _constants.builtInComparators[thresholdComparator].requiredValues)) {
    errors.threshold1.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.requiredThreshold1Text', {
      defaultMessage: 'Threshold1 is required.'
    }));
  }

  if (threshold && threshold.length === 2 && threshold[0] > threshold[1]) {
    errors.threshold1.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAlert.error.greaterThenThreshold0Text', {
      defaultMessage: 'Threshold1 should be > Threshold0.'
    }));
  }

  return validationResult;
};

exports.validateExpression = validateExpression;