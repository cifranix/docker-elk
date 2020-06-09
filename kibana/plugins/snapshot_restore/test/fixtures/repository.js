"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRepository = void 0;

var _test_utils = require("../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const defaultSettings = {
  chunkSize: '10mb',
  location: '/tmp/es-backups'
};

const getRepository = ({
  name = (0, _test_utils.getRandomString)(),
  type = 'fs',
  settings = defaultSettings
} = {}) => ({
  name,
  type,
  settings
});

exports.getRepository = getRepository;