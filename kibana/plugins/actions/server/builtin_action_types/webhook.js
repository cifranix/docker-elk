"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;
exports.executor = executor;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _axios = _interopRequireDefault(require("axios"));

var _configSchema = require("@kbn/config-schema");

var _pipeable = require("fp-ts/lib/pipeable");

var _Option = require("fp-ts/lib/Option");

var _http_rersponse_retry_header = require("./lib/http_rersponse_retry_header");

var _nullable = require("./lib/nullable");

var _result_type = require("./lib/result_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// config definition
var WebhookMethods;

(function (WebhookMethods) {
  WebhookMethods["POST"] = "post";
  WebhookMethods["PUT"] = "put";
})(WebhookMethods || (WebhookMethods = {}));

const HeadersSchema = _configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.string());

const configSchemaProps = {
  url: _configSchema.schema.string(),
  method: _configSchema.schema.oneOf([_configSchema.schema.literal(WebhookMethods.POST), _configSchema.schema.literal(WebhookMethods.PUT)], {
    defaultValue: WebhookMethods.POST
  }),
  headers: (0, _nullable.nullableType)(HeadersSchema)
};

const ConfigSchema = _configSchema.schema.object(configSchemaProps);

const secretSchemaProps = {
  user: _configSchema.schema.nullable(_configSchema.schema.string()),
  password: _configSchema.schema.nullable(_configSchema.schema.string())
};

const SecretsSchema = _configSchema.schema.object(secretSchemaProps, {
  validate: secrets => {
    // user and password must be set together (or not at all)
    if (!secrets.password && !secrets.user) return;
    if (secrets.password && secrets.user) return;
    return _i18n.i18n.translate('xpack.actions.builtin.webhook.invalidUsernamePassword', {
      defaultMessage: 'both user and password must be specified'
    });
  }
}); // params definition


const ParamsSchema = _configSchema.schema.object({
  body: _configSchema.schema.maybe(_configSchema.schema.string())
}); // action type definition


function getActionType({
  logger,
  configurationUtilities
}) {
  return {
    id: '.webhook',
    minimumLicenseRequired: 'gold',
    name: _i18n.i18n.translate('xpack.actions.builtin.webhookTitle', {
      defaultMessage: 'Webhook'
    }),
    validate: {
      config: _configSchema.schema.object(configSchemaProps, {
        validate: (0, _lodash.curry)(validateActionTypeConfig)(configurationUtilities)
      }),
      secrets: SecretsSchema,
      params: ParamsSchema
    },
    executor: (0, _lodash.curry)(executor)({
      logger
    })
  };
}

function validateActionTypeConfig(configurationUtilities, configObject) {
  try {
    configurationUtilities.ensureWhitelistedUri(configObject.url);
  } catch (whitelistError) {
    return _i18n.i18n.translate('xpack.actions.builtin.webhook.webhookConfigurationError', {
      defaultMessage: 'error configuring webhook action: {message}',
      values: {
        message: whitelistError.message
      }
    });
  }
} // action executor


async function executor({
  logger
}, execOptions) {
  const actionId = execOptions.actionId;
  const {
    method,
    url,
    headers = {}
  } = execOptions.config;
  const {
    body: data
  } = execOptions.params;
  const secrets = execOptions.secrets;
  const basicAuth = (0, _lodash.isString)(secrets.user) && (0, _lodash.isString)(secrets.password) ? {
    auth: {
      username: secrets.user,
      password: secrets.password
    }
  } : {};
  const result = await (0, _result_type.promiseResult)(_axios.default.request({
    method,
    url,
    ...basicAuth,
    headers,
    data
  }));

  if ((0, _result_type.isOk)(result)) {
    const {
      value: {
        status,
        statusText
      }
    } = result;
    logger.debug(`response from webhook action "${actionId}": [HTTP ${status}] ${statusText}`);
    return successResult(actionId, data);
  } else {
    const {
      error
    } = result;

    if (error.response) {
      const {
        status,
        statusText,
        headers: responseHeaders
      } = error.response;
      const message = `[${status}] ${statusText}`;
      logger.warn(`error on ${actionId} webhook event: ${message}`); // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // special handling for 5xx

      if (status >= 500) {
        return retryResult(actionId, message);
      } // special handling for rate limiting


      if (status === 429) {
        return (0, _pipeable.pipe)((0, _http_rersponse_retry_header.getRetryAfterIntervalFromHeaders)(responseHeaders), (0, _Option.map)(retry => retryResultSeconds(actionId, message, retry)), (0, _Option.getOrElse)(() => retryResult(actionId, message)));
      }

      return errorResultInvalid(actionId, message);
    }

    logger.warn(`error on ${actionId} webhook action: unexpected error`);
    return errorResultUnexpectedError(actionId);
  }
} // Action Executor Result w/ internationalisation


function successResult(actionId, data) {
  return {
    status: 'ok',
    data,
    actionId
  };
}

function errorResultInvalid(actionId, serviceMessage) {
  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.webhook.invalidResponseErrorMessage', {
    defaultMessage: 'error calling webhook, invalid response'
  });

  return {
    status: 'error',
    message: errMessage,
    actionId,
    serviceMessage
  };
}

function errorResultUnexpectedError(actionId) {
  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.webhook.unreachableErrorMessage', {
    defaultMessage: 'error calling webhook, unexpected error'
  });

  return {
    status: 'error',
    message: errMessage,
    actionId
  };
}

function retryResult(actionId, serviceMessage) {
  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.webhook.invalidResponseRetryLaterErrorMessage', {
    defaultMessage: 'error calling webhook, retry later'
  });

  return {
    status: 'error',
    message: errMessage,
    retry: true,
    actionId,
    serviceMessage
  };
}

function retryResultSeconds(actionId, serviceMessage, retryAfter) {
  const retryEpoch = Date.now() + retryAfter * 1000;
  const retry = new Date(retryEpoch);
  const retryString = retry.toISOString();

  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.webhook.invalidResponseRetryDateErrorMessage', {
    defaultMessage: 'error calling webhook, retry at {retryString}',
    values: {
      retryString
    }
  });

  return {
    status: 'error',
    message: errMessage,
    retry,
    actionId,
    serviceMessage
  };
}