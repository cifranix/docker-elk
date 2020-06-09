"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search_result = require("./search_result");

Object.keys(_search_result).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _search_result[key];
    }
  });
});