"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configuration_form = require("./configuration_form");

Object.keys(_configuration_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _configuration_form[key];
    }
  });
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

var _templates_form = require("./templates_form");

Object.keys(_templates_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _templates_form[key];
    }
  });
});

var _multiple_mappings_warning = require("./multiple_mappings_warning");

Object.keys(_multiple_mappings_warning).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _multiple_mappings_warning[key];
    }
  });
});