"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logs_router = require("./logs_router");

Object.keys(_logs_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logs_router[key];
    }
  });
});

var _metrics_router = require("./metrics_router");

Object.keys(_metrics_router).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _metrics_router[key];
    }
  });
});