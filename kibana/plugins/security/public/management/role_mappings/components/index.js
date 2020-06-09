"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _delete_provider = require("./delete_provider");

Object.keys(_delete_provider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _delete_provider[key];
    }
  });
});

var _no_compatible_realms = require("./no_compatible_realms");

Object.keys(_no_compatible_realms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _no_compatible_realms[key];
    }
  });
});

var _permission_denied = require("./permission_denied");

Object.keys(_permission_denied).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _permission_denied[key];
    }
  });
});

var _section_loading = require("./section_loading");

Object.keys(_section_loading).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _section_loading[key];
    }
  });
});