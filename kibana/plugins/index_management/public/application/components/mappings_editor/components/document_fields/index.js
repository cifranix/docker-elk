"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _document_fields = require("./document_fields");

Object.keys(_document_fields).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _document_fields[key];
    }
  });
});

var _editor_toggle_controls = require("./editor_toggle_controls");

Object.keys(_editor_toggle_controls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _editor_toggle_controls[key];
    }
  });
});