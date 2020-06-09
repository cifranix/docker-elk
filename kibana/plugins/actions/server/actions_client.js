"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsClient = void 0;

var _lib = require("./lib");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ActionsClient {
  constructor({
    actionTypeRegistry,
    defaultKibanaIndex,
    scopedClusterClient,
    savedObjectsClient
  }) {
    _defineProperty(this, "defaultKibanaIndex", void 0);

    _defineProperty(this, "scopedClusterClient", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "actionTypeRegistry", void 0);

    this.actionTypeRegistry = actionTypeRegistry;
    this.savedObjectsClient = savedObjectsClient;
    this.scopedClusterClient = scopedClusterClient;
    this.defaultKibanaIndex = defaultKibanaIndex;
  }
  /**
   * Create an action
   */


  async create({
    action
  }) {
    const {
      actionTypeId,
      name,
      config,
      secrets
    } = action;
    const actionType = this.actionTypeRegistry.get(actionTypeId);
    const validatedActionTypeConfig = (0, _lib.validateConfig)(actionType, config);
    const validatedActionTypeSecrets = (0, _lib.validateSecrets)(actionType, secrets);
    this.actionTypeRegistry.ensureActionTypeEnabled(actionTypeId);
    const result = await this.savedObjectsClient.create('action', {
      actionTypeId,
      name,
      config: validatedActionTypeConfig,
      secrets: validatedActionTypeSecrets
    });
    return {
      id: result.id,
      actionTypeId: result.attributes.actionTypeId,
      name: result.attributes.name,
      config: result.attributes.config
    };
  }
  /**
   * Update action
   */


  async update({
    id,
    action
  }) {
    const existingObject = await this.savedObjectsClient.get('action', id);
    const {
      actionTypeId
    } = existingObject.attributes;
    const {
      name,
      config,
      secrets
    } = action;
    const actionType = this.actionTypeRegistry.get(actionTypeId);
    const validatedActionTypeConfig = (0, _lib.validateConfig)(actionType, config);
    const validatedActionTypeSecrets = (0, _lib.validateSecrets)(actionType, secrets);
    this.actionTypeRegistry.ensureActionTypeEnabled(actionTypeId);
    const result = await this.savedObjectsClient.update('action', id, {
      actionTypeId,
      name,
      config: validatedActionTypeConfig,
      secrets: validatedActionTypeSecrets
    });
    return {
      id,
      actionTypeId: result.attributes.actionTypeId,
      name: result.attributes.name,
      config: result.attributes.config
    };
  }
  /**
   * Get an action
   */


  async get({
    id
  }) {
    const result = await this.savedObjectsClient.get('action', id);
    return {
      id,
      actionTypeId: result.attributes.actionTypeId,
      name: result.attributes.name,
      config: result.attributes.config
    };
  }
  /**
   * Find actions
   */


  async find({
    options = {}
  }) {
    const findResult = await this.savedObjectsClient.find({ ...options,
      type: 'action'
    });
    const data = await injectExtraFindData(this.defaultKibanaIndex, this.scopedClusterClient, findResult.saved_objects.map(actionFromSavedObject));
    return {
      page: findResult.page,
      perPage: findResult.per_page,
      total: findResult.total,
      data
    };
  }
  /**
   * Delete action
   */


  async delete({
    id
  }) {
    return await this.savedObjectsClient.delete('action', id);
  }

}

exports.ActionsClient = ActionsClient;

function actionFromSavedObject(savedObject) {
  return {
    id: savedObject.id,
    ...savedObject.attributes
  };
}

async function injectExtraFindData(defaultKibanaIndex, scopedClusterClient, actionResults) {
  const aggs = {};

  for (const actionResult of actionResults) {
    aggs[actionResult.id] = {
      filter: {
        bool: {
          must: {
            nested: {
              path: 'references',
              query: {
                bool: {
                  filter: {
                    bool: {
                      must: [{
                        term: {
                          'references.id': actionResult.id
                        }
                      }, {
                        term: {
                          'references.type': 'action'
                        }
                      }]
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  const aggregationResult = await scopedClusterClient.callAsInternalUser('search', {
    index: defaultKibanaIndex,
    body: {
      aggs,
      size: 0,
      query: {
        match_all: {}
      }
    }
  });
  return actionResults.map(actionResult => ({ ...actionResult,
    referencedByCount: aggregationResult.aggregations[actionResult.id].doc_count
  }));
}