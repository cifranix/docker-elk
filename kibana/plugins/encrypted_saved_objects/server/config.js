"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfig$ = createConfig$;
exports.ConfigSchema = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _operators = require("rxjs/operators");

var _configSchema = require("@kbn/config-schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ConfigSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  encryptionKey: _configSchema.schema.conditional(_configSchema.schema.contextRef('dist'), true, _configSchema.schema.maybe(_configSchema.schema.string({
    minLength: 32
  })), _configSchema.schema.string({
    minLength: 32,
    defaultValue: 'a'.repeat(32)
  }))
});

exports.ConfigSchema = ConfigSchema;

function createConfig$(context) {
  return context.config.create().pipe((0, _operators.map)(config => {
    const logger = context.logger.get('config');
    let encryptionKey = config.encryptionKey;
    const usingEphemeralEncryptionKey = encryptionKey === undefined;

    if (encryptionKey === undefined) {
      logger.warn('Generating a random key for xpack.encryptedSavedObjects.encryptionKey. ' + 'To be able to decrypt encrypted saved objects attributes after restart, ' + 'please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml');
      encryptionKey = _crypto.default.randomBytes(16).toString('hex');
    }

    return {
      config: { ...config,
        encryptionKey
      },
      usingEphemeralEncryptionKey
    };
  }));
}