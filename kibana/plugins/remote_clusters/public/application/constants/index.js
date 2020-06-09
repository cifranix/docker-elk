"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CRUD_APP_BASE_PATH: true
};
Object.defineProperty(exports, "CRUD_APP_BASE_PATH", {
  enumerable: true,
  get: function get() {
    return _paths.CRUD_APP_BASE_PATH;
  }
});

var _paths = require("./paths");

var _ui_metric = require("./ui_metric");

Object.keys(_ui_metric).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ui_metric[key];
    }
  });
});