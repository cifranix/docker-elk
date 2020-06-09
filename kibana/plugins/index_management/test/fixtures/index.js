"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _template = require("./template");

Object.keys(_template).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _template[key];
    }
  });
});