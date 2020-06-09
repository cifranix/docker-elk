"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _legacy_icon = require("./legacy_icon");

Object.keys(_legacy_icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _legacy_icon[key];
    }
  });
});