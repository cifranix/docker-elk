"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectsAdapter = exports.umDynamicSettings = exports.settingsObjectId = exports.settingsObjectType = void 0;

var _dynamic_settings = require("../../../../legacy/plugins/uptime/common/runtime_types/dynamic_settings");

var _server = require("../../../../../src/core/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const settingsObjectType = 'uptime-dynamic-settings';
exports.settingsObjectType = settingsObjectType;
const settingsObjectId = 'uptime-dynamic-settings-singleton';
exports.settingsObjectId = settingsObjectId;
const umDynamicSettings = {
  name: settingsObjectType,
  hidden: false,
  namespaceAgnostic: false,
  mappings: {
    properties: {
      heartbeatIndices: {
        type: 'keyword'
      }
    }
  }
};
exports.umDynamicSettings = umDynamicSettings;
const savedObjectsAdapter = {
  getUptimeDynamicSettings: async client => {
    try {
      const obj = await client.get(umDynamicSettings.name, settingsObjectId);
      return obj.attributes;
    } catch (getErr) {
      if (_server.SavedObjectsErrorHelpers.isNotFoundError(getErr)) {
        return _dynamic_settings.defaultDynamicSettings;
      }

      throw getErr;
    }
  },
  setUptimeDynamicSettings: async (client, settings) => {
    await client.create(umDynamicSettings.name, settings, {
      id: settingsObjectId,
      overwrite: true
    });
  }
};
exports.savedObjectsAdapter = savedObjectsAdapter;