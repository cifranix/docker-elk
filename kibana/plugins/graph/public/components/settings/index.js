"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = require("./settings");

Object.keys(_settings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _settings[key];
    }
  });
});