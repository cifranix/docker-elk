"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log_text_scale = require("./log_text_scale");

Object.keys(_log_text_scale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _log_text_scale[key];
    }
  });
});