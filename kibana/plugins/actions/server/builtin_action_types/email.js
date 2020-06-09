"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _configSchema = require("@kbn/config-schema");

var _wellKnown = _interopRequireDefault(require("nodemailer/lib/well-known"));

var _send_email = require("./lib/send_email");

var _schemas = require("./lib/schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ConfigSchemaProps = {
  service: _configSchema.schema.nullable(_configSchema.schema.string()),
  host: _configSchema.schema.nullable(_configSchema.schema.string()),
  port: _configSchema.schema.nullable((0, _schemas.portSchema)()),
  secure: _configSchema.schema.nullable(_configSchema.schema.boolean()),
  from: _configSchema.schema.string()
};

const ConfigSchema = _configSchema.schema.object(ConfigSchemaProps);

function validateConfig(configurationUtilities, configObject) {
  // avoids circular reference ...
  const config = configObject; // Make sure service is set, or if not, both host/port must be set.
  // If service is set, host/port are ignored, when the email is sent.
  // Note, not currently making these message translated, as will be
  // emitted alongside messages from @kbn/config-schema, which does not
  // translate messages.

  if (config.service === _send_email.JSON_TRANSPORT_SERVICE) {
    return;
  } else if (config.service == null) {
    if (config.host == null && config.port == null) {
      return 'either [service] or [host]/[port] is required';
    }

    if (config.host == null) {
      return '[host] is required if [service] is not provided';
    }

    if (config.port == null) {
      return '[port] is required if [service] is not provided';
    }

    if (!configurationUtilities.isWhitelistedHostname(config.host)) {
      return `[host] value '${config.host}' is not in the whitelistedHosts configuration`;
    }
  } else {
    const host = getServiceNameHost(config.service);

    if (host == null) {
      return `[service] value '${config.service}' is not valid`;
    }

    if (!configurationUtilities.isWhitelistedHostname(host)) {
      return `[service] value '${config.service}' resolves to host '${host}' which is not in the whitelistedHosts configuration`;
    }
  }
} // secrets definition


const SecretsSchema = _configSchema.schema.object({
  user: _configSchema.schema.nullable(_configSchema.schema.string()),
  password: _configSchema.schema.nullable(_configSchema.schema.string())
}); // params definition


const ParamsSchema = _configSchema.schema.object({
  to: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: []
  }),
  cc: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: []
  }),
  bcc: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
    defaultValue: []
  }),
  subject: _configSchema.schema.string(),
  message: _configSchema.schema.string()
}, {
  validate: validateParams
});

function validateParams(paramsObject) {
  // avoids circular reference ...
  const params = paramsObject;
  const {
    to,
    cc,
    bcc
  } = params;
  const addrs = to.length + cc.length + bcc.length;

  if (addrs === 0) {
    return 'no [to], [cc], or [bcc] entries';
  }
}

// action type definition
function getActionType(params) {
  const {
    logger,
    configurationUtilities
  } = params;
  return {
    id: '.email',
    minimumLicenseRequired: 'gold',
    name: _i18n.i18n.translate('xpack.actions.builtin.emailTitle', {
      defaultMessage: 'Email'
    }),
    validate: {
      config: _configSchema.schema.object(ConfigSchemaProps, {
        validate: (0, _lodash.curry)(validateConfig)(configurationUtilities)
      }),
      secrets: SecretsSchema,
      params: ParamsSchema
    },
    executor: (0, _lodash.curry)(executor)({
      logger
    })
  };
} // action executor


async function executor({
  logger
}, execOptions) {
  const actionId = execOptions.actionId;
  const config = execOptions.config;
  const secrets = execOptions.secrets;
  const params = execOptions.params;
  const transport = {};

  if (secrets.user != null) {
    transport.user = secrets.user;
  }

  if (secrets.password != null) {
    transport.password = secrets.password;
  }

  if (config.service !== null) {
    transport.service = config.service;
  } else {
    // already validated service or host/port is not null ...
    transport.host = config.host;
    transport.port = config.port;
    transport.secure = getSecureValue(config.secure, config.port);
  }

  const sendEmailOptions = {
    transport,
    routing: {
      from: config.from,
      to: params.to,
      cc: params.cc,
      bcc: params.bcc
    },
    content: {
      subject: params.subject,
      message: params.message
    }
  };
  let result;

  try {
    result = await (0, _send_email.sendEmail)(logger, sendEmailOptions);
  } catch (err) {
    const message = _i18n.i18n.translate('xpack.actions.builtin.email.errorSendingErrorMessage', {
      defaultMessage: 'error sending email'
    });

    return {
      status: 'error',
      actionId,
      message,
      serviceMessage: err.message
    };
  }

  return {
    status: 'ok',
    data: result,
    actionId
  };
} // utilities


function getServiceNameHost(service) {
  const serviceEntry = (0, _wellKnown.default)(service);
  if (serviceEntry === false) return null; // in theory this won't happen, but it's JS, so just to be safe ...

  if (serviceEntry == null) return null;
  return serviceEntry.host || null;
} // Returns the secure value - whether to use TLS or not.
// Respect value if not null | undefined.
// Otherwise, if the port is 465, return true, otherwise return false.
// Based on data here:
// - https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json


function getSecureValue(secure, port) {
  if (secure != null) return secure;
  if (port === 465) return true;
  return false;
}