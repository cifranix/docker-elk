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

var _repository_add = require("./repository_add.helpers");

var _repository_edit = require("./repository_edit.helpers");

var _policy_add = require("./policy_add.helpers");

var _policy_edit = require("./policy_edit.helpers");

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
  repositoryAdd: {
    setup: _repository_add.setup
  },
  repositoryEdit: {
    setup: _repository_edit.setup
  },
  policyAdd: {
    setup: _policy_add.setup
  },
  policyEdit: {
    setup: _policy_edit.setup
  }
};
exports.pageHelpers = pageHelpers;