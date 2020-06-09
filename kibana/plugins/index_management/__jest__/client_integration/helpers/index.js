"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "nextTick", {
  enumerable: true,
  get: function () {
    return _test_utils.nextTick;
  }
});
Object.defineProperty(exports, "getRandomString", {
  enumerable: true,
  get: function () {
    return _test_utils.getRandomString;
  }
});
Object.defineProperty(exports, "findTestSubject", {
  enumerable: true,
  get: function () {
    return _test_utils.findTestSubject;
  }
});
Object.defineProperty(exports, "TestBed", {
  enumerable: true,
  get: function () {
    return _test_utils.TestBed;
  }
});
Object.defineProperty(exports, "setupEnvironment", {
  enumerable: true,
  get: function () {
    return _setup_environment.setupEnvironment;
  }
});
exports.pageHelpers = void 0;

var _home = require("./home.helpers");

var _template_create = require("./template_create.helpers");

var _template_clone = require("./template_clone.helpers");

var _template_edit = require("./template_edit.helpers");

var _test_utils = require("../../../../../test_utils");

var _setup_environment = require("./setup_environment");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const pageHelpers = {
  home: {
    setup: _home.setup
  },
  templateCreate: {
    setup: _template_create.setup
  },
  templateClone: {
    setup: _template_clone.setup
  },
  templateEdit: {
    setup: _template_edit.setup
  }
};
exports.pageHelpers = pageHelpers;