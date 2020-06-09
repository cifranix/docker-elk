"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snapshot = require("./snapshot");

Object.keys(_snapshot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _snapshot[key];
    }
  });
});