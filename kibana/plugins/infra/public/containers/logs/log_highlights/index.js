"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log_highlights = require("./log_highlights");

Object.keys(_log_highlights).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _log_highlights[key];
    }
  });
});