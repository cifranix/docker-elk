"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = require("./source");

Object.keys(_source).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _source[key];
    }
  });
});