"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServerWithKibana = void 0;

var _constants = require("../../../legacy/plugins/uptime/common/constants");

var _kibana = require("./lib/compose/kibana");

var _uptime_server = require("./uptime_server");

var _saved_objects = require("./lib/saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initServerWithKibana = (server, plugins) => {
  const {
    features
  } = plugins;
  const libs = (0, _kibana.compose)(server);
  features.registerFeature({
    id: _constants.PLUGIN.ID,
    name: _constants.PLUGIN.NAME,
    order: 1000,
    navLinkId: _constants.PLUGIN.ID,
    icon: 'uptimeApp',
    app: ['uptime', 'kibana'],
    catalogue: ['uptime'],
    privileges: {
      all: {
        app: ['uptime', 'kibana'],
        catalogue: ['uptime'],
        api: ['uptime-read', 'uptime-write', 'actions-read', 'actions-all', 'alerting-read', 'alerting-all'],
        savedObject: {
          all: [_saved_objects.umDynamicSettings.name, 'alert', 'action', 'action_task_params'],
          read: []
        },
        ui: ['save', 'configureSettings', 'show', 'alerting:show', 'actions:show', 'alerting:save', 'actions:save', 'alerting:delete', 'actions:delete']
      },
      read: {
        app: ['uptime', 'kibana'],
        catalogue: ['uptime'],
        api: ['uptime-read', 'actions-read', 'actions-all', 'alerting-read', 'alerting-all'],
        savedObject: {
          all: ['alert', 'action', 'action_task_params'],
          read: [_saved_objects.umDynamicSettings.name]
        },
        ui: ['show', 'alerting:show', 'actions:show', 'alerting:save', 'actions:save', 'alerting:delete', 'actions:delete']
      }
    }
  });
  (0, _uptime_server.initUptimeServer)(server, libs, plugins);
};

exports.initServerWithKibana = initServerWithKibana;