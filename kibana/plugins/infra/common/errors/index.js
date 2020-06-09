"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metrics = require("./metrics");

Object.keys(_metrics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metrics[key];
    }
  });
});