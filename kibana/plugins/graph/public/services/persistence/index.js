"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _serialize = require("./serialize");

Object.keys(_serialize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _serialize[key];
    }
  });
});

var _deserialize = require("./deserialize");

Object.keys(_deserialize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _deserialize[key];
    }
  });
});