"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  plugin: true,
  Plugin: true,
  AlertsContextProvider: true,
  ActionsConnectorsContextProvider: true,
  AlertAdd: true,
  ActionForm: true,
  ConnectorAddFlyout: true,
  ConnectorEditFlyout: true,
  AlertAction: true,
  Alert: true,
  AlertTypeModel: true,
  ActionType: true,
  ActionTypeRegistryContract: true,
  loadActionTypes: true,
  TIME_UNITS: true,
  getTimeUnitLabel: true,
  ForLastExpression: true
};
exports.plugin = plugin;
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function get() {
    return _plugin.Plugin;
  }
});
Object.defineProperty(exports, "AlertsContextProvider", {
  enumerable: true,
  get: function get() {
    return _alerts_context.AlertsContextProvider;
  }
});
Object.defineProperty(exports, "ActionsConnectorsContextProvider", {
  enumerable: true,
  get: function get() {
    return _actions_connectors_context.ActionsConnectorsContextProvider;
  }
});
Object.defineProperty(exports, "AlertAdd", {
  enumerable: true,
  get: function get() {
    return _alert_form.AlertAdd;
  }
});
Object.defineProperty(exports, "ActionForm", {
  enumerable: true,
  get: function get() {
    return _action_connector_form.ActionForm;
  }
});
Object.defineProperty(exports, "ConnectorAddFlyout", {
  enumerable: true,
  get: function get() {
    return _action_connector_form.ConnectorAddFlyout;
  }
});
Object.defineProperty(exports, "ConnectorEditFlyout", {
  enumerable: true,
  get: function get() {
    return _action_connector_form.ConnectorEditFlyout;
  }
});
Object.defineProperty(exports, "AlertAction", {
  enumerable: true,
  get: function get() {
    return _types.AlertAction;
  }
});
Object.defineProperty(exports, "Alert", {
  enumerable: true,
  get: function get() {
    return _types.Alert;
  }
});
Object.defineProperty(exports, "AlertTypeModel", {
  enumerable: true,
  get: function get() {
    return _types.AlertTypeModel;
  }
});
Object.defineProperty(exports, "ActionType", {
  enumerable: true,
  get: function get() {
    return _types.ActionType;
  }
});
Object.defineProperty(exports, "ActionTypeRegistryContract", {
  enumerable: true,
  get: function get() {
    return _types.ActionTypeRegistryContract;
  }
});
Object.defineProperty(exports, "loadActionTypes", {
  enumerable: true,
  get: function get() {
    return _action_connector_api.loadActionTypes;
  }
});
Object.defineProperty(exports, "TIME_UNITS", {
  enumerable: true,
  get: function get() {
    return _constants.TIME_UNITS;
  }
});
Object.defineProperty(exports, "getTimeUnitLabel", {
  enumerable: true,
  get: function get() {
    return _get_time_unit_label.getTimeUnitLabel;
  }
});
Object.defineProperty(exports, "ForLastExpression", {
  enumerable: true,
  get: function get() {
    return _for_the_last.ForLastExpression;
  }
});

var _plugin = require("./plugin");

Object.keys(_plugin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _plugin[key];
    }
  });
});

var _alerts_context = require("./application/context/alerts_context");

var _actions_connectors_context = require("./application/context/actions_connectors_context");

var _alert_form = require("./application/sections/alert_form");

var _action_connector_form = require("./application/sections/action_connector_form");

var _types = require("./types");

var _action_connector_api = require("./application/lib/action_connector_api");

var _constants = require("./application/constants");

var _get_time_unit_label = require("./common/lib/get_time_unit_label");

var _for_the_last = require("./common/expression_items/for_the_last");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function plugin(ctx) {
  return new _plugin.Plugin(ctx);
}