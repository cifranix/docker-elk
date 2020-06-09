"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClusterClientAdapter = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ClusterClientAdapter {
  constructor(opts) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "clusterClient", void 0);

    this.logger = opts.logger;
    this.clusterClient = opts.clusterClient;
  }

  async indexDocument(doc) {
    await this.callEs('index', doc);
  }

  async doesIlmPolicyExist(policyName) {
    const request = {
      method: 'GET',
      path: `_ilm/policy/${policyName}`
    };

    try {
      await this.callEs('transport.request', request);
    } catch (err) {
      if (err.statusCode === 404) return false;
      throw new Error(`error checking existance of ilm policy: ${err.message}`);
    }

    return true;
  }

  async createIlmPolicy(policyName, policy) {
    const request = {
      method: 'PUT',
      path: `_ilm/policy/${policyName}`,
      body: policy
    };

    try {
      await this.callEs('transport.request', request);
    } catch (err) {
      throw new Error(`error creating ilm policy: ${err.message}`);
    }
  }

  async doesIndexTemplateExist(name) {
    let result;

    try {
      result = await this.callEs('indices.existsTemplate', {
        name
      });
    } catch (err) {
      throw new Error(`error checking existance of index template: ${err.message}`);
    }

    return result;
  }

  async createIndexTemplate(name, template) {
    const addTemplateParams = {
      name,
      create: true,
      body: template
    };

    try {
      await this.callEs('indices.putTemplate', addTemplateParams);
    } catch (err) {
      // The error message doesn't have a type attribute we can look to guarantee it's due
      // to the template already existing (only long message) so we'll check ourselves to see
      // if the template now exists. This scenario would happen if you startup multiple Kibana
      // instances at the same time.
      const existsNow = await this.doesIndexTemplateExist(name);

      if (!existsNow) {
        throw new Error(`error creating index template: ${err.message}`);
      }
    }
  }

  async doesAliasExist(name) {
    let result;

    try {
      result = await this.callEs('indices.existsAlias', {
        name
      });
    } catch (err) {
      throw new Error(`error checking existance of initial index: ${err.message}`);
    }

    return result;
  }

  async createIndex(name, body = {}) {
    try {
      await this.callEs('indices.create', {
        index: name,
        body
      });
    } catch (err) {
      var _err$body, _err$body$error;

      if (((_err$body = err.body) === null || _err$body === void 0 ? void 0 : (_err$body$error = _err$body.error) === null || _err$body$error === void 0 ? void 0 : _err$body$error.type) !== 'resource_already_exists_exception') {
        throw new Error(`error creating initial index: ${err.message}`);
      }
    }
  }

  async callEs(operation, body) {
    try {
      this.debug(`callEs(${operation}) calls:`, body);
      const result = await this.clusterClient.callAsInternalUser(operation, body);
      this.debug(`callEs(${operation}) result:`, result);
      return result;
    } catch (err) {
      this.debug(`callEs(${operation}) error:`, {
        message: err.message,
        statusCode: err.statusCode
      });
      throw err;
    }
  }

  debug(message, object) {
    const objectString = object == null ? '' : JSON.stringify(object);
    this.logger.debug(`esContext: ${message} ${objectString}`);
  }

}

exports.ClusterClientAdapter = ClusterClientAdapter;