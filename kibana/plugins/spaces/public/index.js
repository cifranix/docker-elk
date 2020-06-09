"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SpacesPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.SpacesPluginSetup;
  }
});
Object.defineProperty(exports, "SpacesPluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.SpacesPluginStart;
  }
});
Object.defineProperty(exports, "Space", {
  enumerable: true,
  get: function get() {
    return _space.Space;
  }
});
Object.defineProperty(exports, "SpaceAvatar", {
  enumerable: true,
  get: function get() {
    return _space_avatar.SpaceAvatar;
  }
});
Object.defineProperty(exports, "getSpaceColor", {
  enumerable: true,
  get: function get() {
    return _space_avatar.getSpaceColor;
  }
});
Object.defineProperty(exports, "getSpaceImageUrl", {
  enumerable: true,
  get: function get() {
    return _space_avatar.getSpaceImageUrl;
  }
});
Object.defineProperty(exports, "getSpaceInitials", {
  enumerable: true,
  get: function get() {
    return _space_avatar.getSpaceInitials;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _space = require("../common/model/space");

var _space_avatar = require("./space_avatar");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin() {
  return new _plugin.SpacesPlugin();
};

exports.plugin = plugin;