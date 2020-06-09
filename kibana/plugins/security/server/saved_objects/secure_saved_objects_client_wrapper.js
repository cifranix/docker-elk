"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecureSavedObjectsClientWrapper = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class SecureSavedObjectsClientWrapper {
  constructor({
    actions,
    auditLogger,
    baseClient,
    checkSavedObjectsPrivilegesAsCurrentUser,
    errors
  }) {
    _defineProperty(this, "actions", void 0);

    _defineProperty(this, "auditLogger", void 0);

    _defineProperty(this, "baseClient", void 0);

    _defineProperty(this, "checkSavedObjectsPrivilegesAsCurrentUser", void 0);

    _defineProperty(this, "errors", void 0);

    this.errors = errors;
    this.actions = actions;
    this.auditLogger = auditLogger;
    this.baseClient = baseClient;
    this.checkSavedObjectsPrivilegesAsCurrentUser = checkSavedObjectsPrivilegesAsCurrentUser;
  }

  async create(type, attributes = {}, options = {}) {
    await this.ensureAuthorized(type, 'create', options.namespace, {
      type,
      attributes,
      options
    });
    return await this.baseClient.create(type, attributes, options);
  }

  async bulkCreate(objects, options = {}) {
    await this.ensureAuthorized(this.getUniqueObjectTypes(objects), 'bulk_create', options.namespace, {
      objects,
      options
    });
    return await this.baseClient.bulkCreate(objects, options);
  }

  async delete(type, id, options = {}) {
    await this.ensureAuthorized(type, 'delete', options.namespace, {
      type,
      id,
      options
    });
    return await this.baseClient.delete(type, id, options);
  }

  async find(options) {
    await this.ensureAuthorized(options.type, 'find', options.namespace, {
      options
    });
    return this.baseClient.find(options);
  }

  async bulkGet(objects = [], options = {}) {
    await this.ensureAuthorized(this.getUniqueObjectTypes(objects), 'bulk_get', options.namespace, {
      objects,
      options
    });
    return await this.baseClient.bulkGet(objects, options);
  }

  async get(type, id, options = {}) {
    await this.ensureAuthorized(type, 'get', options.namespace, {
      type,
      id,
      options
    });
    return await this.baseClient.get(type, id, options);
  }

  async update(type, id, attributes, options = {}) {
    await this.ensureAuthorized(type, 'update', options.namespace, {
      type,
      id,
      attributes,
      options
    });
    return await this.baseClient.update(type, id, attributes, options);
  }

  async bulkUpdate(objects = [], options = {}) {
    await this.ensureAuthorized(this.getUniqueObjectTypes(objects), 'bulk_update', options && options.namespace, {
      objects,
      options
    });
    return await this.baseClient.bulkUpdate(objects, options);
  }

  async checkPrivileges(actions, namespace) {
    try {
      return await this.checkSavedObjectsPrivilegesAsCurrentUser(actions, namespace);
    } catch (error) {
      throw this.errors.decorateGeneralError(error, error.body && error.body.reason);
    }
  }

  async ensureAuthorized(typeOrTypes, action, namespace, args) {
    const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
    const actionsToTypesMap = new Map(types.map(type => [this.actions.savedObject.get(type, action), type]));
    const actions = Array.from(actionsToTypesMap.keys());
    const {
      hasAllRequested,
      username,
      privileges
    } = await this.checkPrivileges(actions, namespace);

    if (hasAllRequested) {
      this.auditLogger.savedObjectsAuthorizationSuccess(username, action, types, args);
    } else {
      const missingPrivileges = this.getMissingPrivileges(privileges);
      this.auditLogger.savedObjectsAuthorizationFailure(username, action, types, missingPrivileges, args);
      const msg = `Unable to ${action} ${missingPrivileges.map(privilege => actionsToTypesMap.get(privilege)).sort().join(',')}`;
      throw this.errors.decorateForbiddenError(new Error(msg));
    }
  }

  getMissingPrivileges(privileges) {
    return Object.keys(privileges).filter(privilege => !privileges[privilege]);
  }

  getUniqueObjectTypes(objects) {
    return [...new Set(objects.map(o => o.type))];
  }

}

exports.SecureSavedObjectsClientWrapper = SecureSavedObjectsClientWrapper;