"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestTimeout = isRequestTimeout;
exports.fillResultsWithTimeouts = fillResultsWithTimeouts;
exports.wrapError = wrapError;

var _boom = require("boom");

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const REQUEST_TIMEOUT = 'RequestTimeout';

function isRequestTimeout(error) {
  return error.displayName === REQUEST_TIMEOUT;
}

// populate a results object with timeout errors for the ids which haven't already been set
function fillResultsWithTimeouts({
  results,
  id,
  items,
  action
}) {
  const extra = items.length - Object.keys(results).length > 1 ? _i18n.i18n.translate('xpack.transform.models.transformService.allOtherRequestsCancelledDescription', {
    defaultMessage: 'All other requests cancelled.'
  }) : '';
  const error = {
    response: {
      error: {
        root_cause: [{
          reason: _i18n.i18n.translate('xpack.transform.models.transformService.requestToActionTimedOutErrorMessage', {
            defaultMessage: `Request to {action} '{id}' timed out. {extra}`,
            values: {
              id,
              action,
              extra
            }
          })
        }]
      }
    }
  };
  const newResults = {};
  return items.reduce((accumResults, currentVal) => {
    if (results[currentVal.id] === undefined) {
      accumResults[currentVal.id] = {
        success: false,
        error
      };
    } else {
      accumResults[currentVal.id] = results[currentVal.id];
    }

    return accumResults;
  }, newResults);
}

function wrapError(error) {
  const boom = (0, _boom.isBoom)(error) ? error : (0, _boom.boomify)(error, {
    statusCode: error.status
  });
  return {
    body: boom,
    headers: boom.output.headers,
    statusCode: boom.output.statusCode
  };
}