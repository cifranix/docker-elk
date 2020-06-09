"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source_id = require("./source_id");

Object.keys(_source_id).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _source_id[key];
    }
  });
});