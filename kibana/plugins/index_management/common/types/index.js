"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templates = require("./templates");

Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _templates[key];
    }
  });
});