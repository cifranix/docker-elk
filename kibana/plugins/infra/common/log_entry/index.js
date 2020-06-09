"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log_entry = require("./log_entry");

Object.keys(_log_entry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _log_entry[key];
    }
  });
});