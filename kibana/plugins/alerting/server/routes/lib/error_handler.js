"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDisabledApiKeysError = handleDisabledApiKeysError;
exports.isApiKeyDisabledError = isApiKeyDisabledError;
exports.isSecurityPluginDisabledError = isSecurityPluginDisabledError;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function handleDisabledApiKeysError(handler) {
  return async (context, request, response) => {
    try {
      return await handler(context, request, response);
    } catch (e) {
      if (isApiKeyDisabledError(e)) {
        return response.badRequest({
          body: new Error(_i18n.i18n.translate('xpack.alerting.api.error.disabledApiKeys', {
            defaultMessage: 'Alerting relies upon API keys which appear to be disabled'
          }))
        });
      }

      throw e;
    }
  };
}

function isApiKeyDisabledError(e) {
  var _ref, _e$message;

  return (_ref = e === null || e === void 0 ? void 0 : (_e$message = e.message) === null || _e$message === void 0 ? void 0 : _e$message.includes('api keys are not enabled')) !== null && _ref !== void 0 ? _ref : false;
}

function isSecurityPluginDisabledError(e) {
  var _ref2, _e$message2;

  return (_ref2 = e === null || e === void 0 ? void 0 : (_e$message2 = e.message) === null || _e$message2 === void 0 ? void 0 : _e$message2.includes('no handler found')) !== null && _ref2 !== void 0 ? _ref2 : false;
}