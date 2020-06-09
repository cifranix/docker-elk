"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIM_TRANSFORM_SHOW_DETAILS_CLICK = exports.UIM_TRANSFORM_DELETE_MANY = exports.UIM_TRANSFORM_DELETE = exports.UIM_TRANSFORM_CREATE = exports.UIM_TRANSFORM_LIST_LOAD = exports.UIM_APP_NAME = exports.TRANSFORM_DOC_PATHS = exports.SECTION_SLUG = exports.CLIENT_BASE_PATH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CLIENT_BASE_PATH = '/management/elasticsearch/transform/';
exports.CLIENT_BASE_PATH = CLIENT_BASE_PATH;
var SECTION_SLUG;
exports.SECTION_SLUG = SECTION_SLUG;

(function (SECTION_SLUG) {
  SECTION_SLUG["HOME"] = "transform_management";
  SECTION_SLUG["CLONE_TRANSFORM"] = "clone_transform";
  SECTION_SLUG["CREATE_TRANSFORM"] = "create_transform";
})(SECTION_SLUG || (exports.SECTION_SLUG = SECTION_SLUG = {}));

var TRANSFORM_DOC_PATHS; // UI Metric constants

exports.TRANSFORM_DOC_PATHS = TRANSFORM_DOC_PATHS;

(function (TRANSFORM_DOC_PATHS) {
  TRANSFORM_DOC_PATHS["default"] = "docs.html";
  TRANSFORM_DOC_PATHS["plugins"] = "plugins.html";
  TRANSFORM_DOC_PATHS["transforms"] = "transforms.html";
})(TRANSFORM_DOC_PATHS || (exports.TRANSFORM_DOC_PATHS = TRANSFORM_DOC_PATHS = {}));

var UIM_APP_NAME = 'transform';
exports.UIM_APP_NAME = UIM_APP_NAME;
var UIM_TRANSFORM_LIST_LOAD = 'transform_list_load';
exports.UIM_TRANSFORM_LIST_LOAD = UIM_TRANSFORM_LIST_LOAD;
var UIM_TRANSFORM_CREATE = 'transform_create';
exports.UIM_TRANSFORM_CREATE = UIM_TRANSFORM_CREATE;
var UIM_TRANSFORM_DELETE = 'transform_delete';
exports.UIM_TRANSFORM_DELETE = UIM_TRANSFORM_DELETE;
var UIM_TRANSFORM_DELETE_MANY = 'transform_delete_many';
exports.UIM_TRANSFORM_DELETE_MANY = UIM_TRANSFORM_DELETE_MANY;
var UIM_TRANSFORM_SHOW_DETAILS_CLICK = 'transform_show_details_click';
exports.UIM_TRANSFORM_SHOW_DETAILS_CLICK = UIM_TRANSFORM_SHOW_DETAILS_CLICK;