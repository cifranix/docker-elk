"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHttpError = formatHttpError;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function formatHttpError(error) {
  if (!error.response) {
    return _i18n.i18n.translate('xpack.graph.fatalError.unavailableServerErrorMessage', {
      defaultMessage: 'An HTTP request has failed to connect. ' + 'Please check if the Kibana server is running and that your browser has a working connection, ' + 'or contact your system administrator.'
    });
  }

  return _i18n.i18n.translate('xpack.graph.fatalError.errorStatusMessage', {
    defaultMessage: 'Error {errStatus} {errStatusText}: {errMessage}',
    values: {
      errStatus: error.body.status,
      errStatusText: error.body.statusText,
      errMessage: error.body.message
    }
  });
}