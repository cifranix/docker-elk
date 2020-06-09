"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityAuditLogger = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class SecurityAuditLogger {
  constructor(getAuditLogger) {
    this.getAuditLogger = getAuditLogger;
  }

  savedObjectsAuthorizationFailure(username, action, types, missing, args) {
    this.getAuditLogger().log('saved_objects_authorization_failure', `${username} unauthorized to ${action} ${types.join(',')}, missing ${missing.join(',')}`, {
      username,
      action,
      types,
      missing,
      args
    });
  }

  savedObjectsAuthorizationSuccess(username, action, types, args) {
    this.getAuditLogger().log('saved_objects_authorization_success', `${username} authorized to ${action} ${types.join(',')}`, {
      username,
      action,
      types,
      args
    });
  }

}

exports.SecurityAuditLogger = SecurityAuditLogger;