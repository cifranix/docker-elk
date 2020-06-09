"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplate = void 0;

var _test_utils = require("../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getTemplate = ({
  name = (0, _test_utils.getRandomString)(),
  version = (0, _test_utils.getRandomNumber)(),
  order = (0, _test_utils.getRandomNumber)(),
  indexPatterns = [],
  settings,
  aliases,
  mappings,
  isManaged = false
} = {}) => ({
  name,
  version,
  order,
  indexPatterns,
  settings,
  aliases,
  mappings,
  isManaged
});

exports.getTemplate = getTemplate;