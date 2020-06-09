"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesAuditLogger = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class SpacesAuditLogger {
  constructor(auditLogger) {
    _defineProperty(this, "auditLogger", void 0);

    this.auditLogger = auditLogger;
  }

  spacesAuthorizationFailure(username, action, spaceIds) {
    this.auditLogger.log('spaces_authorization_failure', `${username} unauthorized to ${action}${spaceIds ? ' ' + spaceIds.join(',') : ''} spaces`, {
      username,
      action,
      spaceIds
    });
  }

  spacesAuthorizationSuccess(username, action, spaceIds) {
    this.auditLogger.log('spaces_authorization_success', `${username} authorized to ${action}${spaceIds ? ' ' + spaceIds.join(',') : ''} spaces`, {
      username,
      action,
      spaceIds
    });
  }

}

exports.SpacesAuditLogger = SpacesAuditLogger;