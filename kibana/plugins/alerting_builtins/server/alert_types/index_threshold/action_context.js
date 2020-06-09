"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMessages = addMessages;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function addMessages(alertInfo, baseContext, params) {
  const title = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.alertTypeContextSubjectTitle', {
    defaultMessage: 'alert {name} group {group} exceeded threshold',
    values: {
      name: alertInfo.name,
      group: baseContext.group
    }
  });

  const agg = params.aggField ? `${params.aggType}(${params.aggField})` : `${params.aggType}`;
  const humanFn = `${agg} ${params.thresholdComparator} ${params.threshold.join(',')}`;
  const window = `${params.timeWindowSize}${params.timeWindowUnit}`;

  const message = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.alertTypeContextMessageDescription', {
    defaultMessage: 'alert {name} group {group} value {value} exceeded threshold {function} over {window} on {date}',
    values: {
      name: alertInfo.name,
      group: baseContext.group,
      value: baseContext.value,
      function: humanFn,
      window,
      date: baseContext.date
    }
  });

  return { ...baseContext,
    title,
    message
  };
}