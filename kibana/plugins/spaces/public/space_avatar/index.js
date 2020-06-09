"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SpaceAvatar: true
};
Object.defineProperty(exports, "SpaceAvatar", {
  enumerable: true,
  get: function get() {
    return _space_avatar.SpaceAvatar;
  }
});

var _space_avatar = require("./space_avatar");

var _space_attributes = require("./space_attributes");

Object.keys(_space_attributes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _space_attributes[key];
    }
  });
});