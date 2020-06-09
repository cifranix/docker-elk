"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncryptedSavedObjectsAuditLogger = void 0;

var _crypto = require("../crypto");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Represents all audit events the plugin can log.
 */
class EncryptedSavedObjectsAuditLogger {
  constructor(getAuditLogger) {
    this.getAuditLogger = getAuditLogger;
  }

  encryptAttributeFailure(attributeName, descriptor) {
    this.getAuditLogger().log('encrypt_failure', `Failed to encrypt attribute "${attributeName}" for saved object "[${(0, _crypto.descriptorToArray)(descriptor)}]".`, { ...descriptor,
      attributeName
    });
  }

  decryptAttributeFailure(attributeName, descriptor) {
    this.getAuditLogger().log('decrypt_failure', `Failed to decrypt attribute "${attributeName}" for saved object "[${(0, _crypto.descriptorToArray)(descriptor)}]".`, { ...descriptor,
      attributeName
    });
  }

  encryptAttributesSuccess(attributesNames, descriptor) {
    this.getAuditLogger().log('encrypt_success', `Successfully encrypted attributes "[${attributesNames}]" for saved object "[${(0, _crypto.descriptorToArray)(descriptor)}]".`, { ...descriptor,
      attributesNames
    });
  }

  decryptAttributesSuccess(attributesNames, descriptor) {
    this.getAuditLogger().log('decrypt_success', `Successfully decrypted attributes "[${attributesNames}]" for saved object "[${(0, _crypto.descriptorToArray)(descriptor)}]".`, { ...descriptor,
      attributesNames
    });
  }

}

exports.EncryptedSavedObjectsAuditLogger = EncryptedSavedObjectsAuditLogger;