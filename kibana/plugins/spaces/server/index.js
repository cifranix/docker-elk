"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SpacesPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.SpacesPluginSetup;
  }
});
Object.defineProperty(exports, "SpacesServiceSetup", {
  enumerable: true,
  get: function () {
    return _spaces_service.SpacesServiceSetup;
  }
});
Object.defineProperty(exports, "Space", {
  enumerable: true,
  get: function () {
    return _space.Space;
  }
});
exports.plugin = exports.config = void 0;

var _config = require("./config");

var _plugin = require("./plugin");

var _spaces_service = require("./spaces_service");

var _space = require("../common/model/space");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// These exports are part of public Spaces plugin contract, any change in signature of exported
// functions or removal of exports should be considered as a breaking change. Ideally we should
// reduce number of such exports to zero and provide everything we want to expose via Setup/Start
// run-time contracts.
// end public contract exports
const config = {
  schema: _config.ConfigSchema
};
exports.config = config;

const plugin = initializerContext => new _plugin.Plugin(initializerContext);

exports.plugin = plugin;