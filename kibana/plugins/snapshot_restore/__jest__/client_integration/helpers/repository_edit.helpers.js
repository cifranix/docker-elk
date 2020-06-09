"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _test_utils = require("../../../../../test_utils");

var _repository_edit = require("../../../public/application/sections/repository_edit");

var _setup_environment = require("./setup_environment");

var _constant = require("./constant");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @kbn/eslint/no-restricted-paths */
const testBedConfig = {
  memoryRouter: {
    initialEntries: [`/${_constant.REPOSITORY_NAME}`],
    componentRoutePath: '/:name'
  },
  doMountAsync: true
};
const setup = (0, _test_utils.registerTestBed)((0, _setup_environment.WithAppDependencies)(_repository_edit.RepositoryEdit), testBedConfig);
exports.setup = setup;