"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _url = require("url");

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _configSchema = require("@kbn/config-schema");

var _webhook = require("@slack/webhook");

var _pipeable = require("fp-ts/lib/pipeable");

var _Option = require("fp-ts/lib/Option");

var _http_rersponse_retry_header = require("./lib/http_rersponse_retry_header");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const secretsSchemaProps = {
  webhookUrl: _configSchema.schema.string()
};

const SecretsSchema = _configSchema.schema.object(secretsSchemaProps); // params definition


const ParamsSchema = _configSchema.schema.object({
  message: _configSchema.schema.string({
    minLength: 1
  })
}); // action type definition
// customizing executor is only used for tests


function getActionType({
  configurationUtilities,
  executor = slackExecutor
}) {
  return {
    id: '.slack',
    minimumLicenseRequired: 'gold',
    name: _i18n.i18n.translate('xpack.actions.builtin.slackTitle', {
      defaultMessage: 'Slack'
    }),
    validate: {
      secrets: _configSchema.schema.object(secretsSchemaProps, {
        validate: (0, _lodash.curry)(valdiateActionTypeConfig)(configurationUtilities)
      }),
      params: ParamsSchema
    },
    executor
  };
}

function valdiateActionTypeConfig(configurationUtilities, secretsObject) {
  let url;

  try {
    url = new _url.URL(secretsObject.webhookUrl);
  } catch (err) {
    return _i18n.i18n.translate('xpack.actions.builtin.slack.slackConfigurationErrorNoHostname', {
      defaultMessage: 'error configuring slack action: unable to parse host name from webhookUrl'
    });
  }

  try {
    configurationUtilities.ensureWhitelistedHostname(url.hostname);
  } catch (whitelistError) {
    return _i18n.i18n.translate('xpack.actions.builtin.slack.slackConfigurationError', {
      defaultMessage: 'error configuring slack action: {message}',
      values: {
        message: whitelistError.message
      }
    });
  }
} // action executor


async function slackExecutor(execOptions) {
  const actionId = execOptions.actionId;
  const secrets = execOptions.secrets;
  const params = execOptions.params;
  let result;
  const {
    webhookUrl
  } = secrets;
  const {
    message
  } = params;

  try {
    const webhook = new _webhook.IncomingWebhook(webhookUrl);
    result = await webhook.send(message);
  } catch (err) {
    if (err.original == null || err.original.response == null) {
      return serviceErrorResult(actionId, err.message);
    }

    const {
      status,
      statusText,
      headers
    } = err.original.response; // special handling for 5xx

    if (status >= 500) {
      return retryResult(actionId, err.message);
    } // special handling for rate limiting


    if (status === 429) {
      return (0, _pipeable.pipe)((0, _http_rersponse_retry_header.getRetryAfterIntervalFromHeaders)(headers), (0, _Option.map)(retry => retryResultSeconds(actionId, err.message, retry)), (0, _Option.getOrElse)(() => retryResult(actionId, err.message)));
    }

    const errMessage = _i18n.i18n.translate('xpack.actions.builtin.slack.unexpectedHttpResponseErrorMessage', {
      defaultMessage: 'unexpected http response from slack: {httpStatus} {httpStatusText}',
      values: {
        httpStatus: status,
        httpStatusText: statusText
      }
    });

    return errorResult(actionId, errMessage);
  }

  if (result == null) {
    const errMessage = _i18n.i18n.translate('xpack.actions.builtin.slack.unexpectedNullResponseErrorMessage', {
      defaultMessage: 'unexpected null response from slack'
    });

    return errorResult(actionId, errMessage);
  }

  if (result.text !== 'ok') {
    return serviceErrorResult(actionId, result.text);
  }

  return successResult(actionId, result);
}

function successResult(actionId, data) {
  return {
    status: 'ok',
    data,
    actionId
  };
}

function errorResult(actionId, message) {
  return {
    status: 'error',
    message,
    actionId
  };
}

function serviceErrorResult(actionId, serviceMessage) {
  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.slack.errorPostingErrorMessage', {
    defaultMessage: 'error posting slack message'
  });

  return {
    status: 'error',
    message: errMessage,
    actionId,
    serviceMessage
  };
}

function retryResult(actionId, message) {
  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.slack.errorPostingRetryLaterErrorMessage', {
    defaultMessage: 'error posting a slack message, retry later'
  });

  return {
    status: 'error',
    message: errMessage,
    retry: true,
    actionId
  };
}

function retryResultSeconds(actionId, message, retryAfter) {
  const retryEpoch = Date.now() + retryAfter * 1000;
  const retry = new Date(retryEpoch);
  const retryString = retry.toISOString();

  const errMessage = _i18n.i18n.translate('xpack.actions.builtin.slack.errorPostingRetryDateErrorMessage', {
    defaultMessage: 'error posting a slack message, retry at {retryString}',
    values: {
      retryString
    }
  });

  return {
    status: 'error',
    message: errMessage,
    retry,
    actionId,
    serviceMessage: message
  };
}