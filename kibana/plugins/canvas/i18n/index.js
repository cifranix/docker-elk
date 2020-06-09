"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18n = require("../../../legacy/plugins/canvas/i18n");

Object.keys(_i18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _i18n[key];
    }
  });
});