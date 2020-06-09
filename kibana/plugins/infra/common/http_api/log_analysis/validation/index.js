"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log_entry_rate_indices = require("./log_entry_rate_indices");

Object.keys(_log_entry_rate_indices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _log_entry_rate_indices[key];
    }
  });
});