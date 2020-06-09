"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CopySavedObjectsToSpaceService: true
};
Object.defineProperty(exports, "CopySavedObjectsToSpaceService", {
  enumerable: true,
  get: function get() {
    return _copy_saved_objects_to_space_service.CopySavedObjectsToSpaceService;
  }
});

var _summarize_copy_result = require("./summarize_copy_result");

Object.keys(_summarize_copy_result).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _summarize_copy_result[key];
    }
  });
});

var _copy_saved_objects_to_space_service = require("./copy_saved_objects_to_space_service");