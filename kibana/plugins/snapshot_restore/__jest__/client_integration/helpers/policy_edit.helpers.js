"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _test_utils = require("../../../../../test_utils");

var _policy_edit = require("../../../public/application/sections/policy_edit");

var _setup_environment = require("./setup_environment");

var _constant = require("./constant");

var _policy_form = require("./policy_form.helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @kbn/eslint/no-restricted-paths */
const testBedConfig = {
  memoryRouter: {
    initialEntries: [`/edit_policy/${_constant.POLICY_NAME}`],
    componentRoutePath: '/edit_policy/:name'
  },
  doMountAsync: true
};
const initTestBed = (0, _test_utils.registerTestBed)((0, _setup_environment.WithAppDependencies)(_policy_edit.PolicyEdit), testBedConfig);

const setup = _policy_form.formSetup.bind(null, initTestBed);

exports.setup = setup;