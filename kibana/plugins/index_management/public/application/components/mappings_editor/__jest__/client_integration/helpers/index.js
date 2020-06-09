"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MappingsEditorTestBed", {
  enumerable: true,
  get: function get() {
    return _mappings_editor.MappingsEditorTestBed;
  }
});
Object.defineProperty(exports, "nextTick", {
  enumerable: true,
  get: function get() {
    return _test_utils.nextTick;
  }
});
Object.defineProperty(exports, "getRandomString", {
  enumerable: true,
  get: function get() {
    return _test_utils.getRandomString;
  }
});
Object.defineProperty(exports, "findTestSubject", {
  enumerable: true,
  get: function get() {
    return _test_utils.findTestSubject;
  }
});
Object.defineProperty(exports, "TestBed", {
  enumerable: true,
  get: function get() {
    return _test_utils.TestBed;
  }
});
exports.componentHelpers = void 0;

var _mappings_editor = require("./mappings_editor.helpers");

var _test_utils = require("../../../../../../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var componentHelpers = {
  mappingsEditor: {
    setup: _mappings_editor.setup
  }
};
exports.componentHelpers = componentHelpers;