"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesSavedObjectsClient = void 0;

var _namespace = require("../utils/namespace");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const coerceToArray = param => {
  if (Array.isArray(param)) {
    return param;
  }

  return [param];
};

const throwErrorIfNamespaceSpecified = options => {
  if (options.namespace) {
    throw new Error('Spaces currently determines the namespaces');
  }
};

class SpacesSavedObjectsClient {
  constructor(options) {
    _defineProperty(this, "client", void 0);

    _defineProperty(this, "spaceId", void 0);

    _defineProperty(this, "types", void 0);

    _defineProperty(this, "errors", void 0);

    const {
      baseClient,
      request,
      spacesService,
      types
    } = options;
    this.client = baseClient;
    this.spaceId = spacesService.getSpaceId(request);
    this.types = types;
    this.errors = baseClient.errors;
  }
  /**
   * Persists an object
   *
   * @param {string} type
   * @param {object} attributes
   * @param {object} [options={}]
   * @property {string} [options.id] - force id on creation, not recommended
   * @property {boolean} [options.overwrite=false]
   * @property {string} [options.namespace]
   * @returns {promise} - { id, type, version, attributes }
   */


  async create(type, attributes = {}, options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.create(type, attributes, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Creates multiple documents at once
   *
   * @param {array} objects - [{ type, id, attributes }]
   * @param {object} [options={}]
   * @property {boolean} [options.overwrite=false] - overwrites existing documents
   * @property {string} [options.namespace]
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes, error: { message } }]}
   */


  async bulkCreate(objects, options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.bulkCreate(objects, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Deletes an object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise}
   */


  async delete(type, id, options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.delete(type, id, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * @param {object} [options={}]
   * @property {(string|Array<string>)} [options.type]
   * @property {string} [options.search]
   * @property {string} [options.defaultSearchOperator]
   * @property {Array<string>} [options.searchFields] - see Elasticsearch Simple Query String
   *                                        Query field argument for more information
   * @property {integer} [options.page=1]
   * @property {integer} [options.perPage=20]
   * @property {string} [options.sortField]
   * @property {string} [options.sortOrder]
   * @property {Array<string>} [options.fields]
   * @property {string} [options.namespace]
   * @property {object} [options.hasReference] - { type, id }
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }], total, per_page, page }
   */


  async find(options) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.find({ ...options,
      type: (options.type ? coerceToArray(options.type) : this.types).filter(type => type !== 'space'),
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Returns an array of objects by id
   *
   * @param {array} objects - an array ids, or an array of objects containing id and optionally type
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }] }
   * @example
   *
   * bulkGet([
   *   { id: 'one', type: 'config' },
   *   { id: 'foo', type: 'index-pattern' }
   * ])
   */


  async bulkGet(objects = [], options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.bulkGet(objects, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Gets a single object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} [options.namespace]
   * @returns {promise} - { id, type, version, attributes }
   */


  async get(type, id, options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.get(type, id, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Updates an object
   *
   * @param {string} type
   * @param {string} id
   * @param {object} [options={}]
   * @property {string} options.version - ensures version matches that of persisted object
   * @property {string} [options.namespace]
   * @returns {promise}
   */


  async update(type, id, attributes, options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.update(type, id, attributes, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }
  /**
   * Updates an array of objects by id
   *
   * @param {array} objects - an array ids, or an array of objects containing id, type, attributes and optionally version, references and namespace
   * @returns {promise} - { saved_objects: [{ id, type, version, attributes }] }
   * @example
   *
   * bulkUpdate([
   *   { id: 'one', type: 'config', attributes: { title: 'My new title'}, version: 'd7rhfk47d=' },
   *   { id: 'foo', type: 'index-pattern', attributes: {} }
   * ])
   */


  async bulkUpdate(objects = [], options = {}) {
    throwErrorIfNamespaceSpecified(options);
    return await this.client.bulkUpdate(objects, { ...options,
      namespace: (0, _namespace.spaceIdToNamespace)(this.spaceId)
    });
  }

}

exports.SpacesSavedObjectsClient = SpacesSavedObjectsClient;