"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WATCH = exports.WATCH_ID = void 0;

var _fixtures = require("../../../test/fixtures");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const WATCH_ID = 'my-test-watch';
exports.WATCH_ID = WATCH_ID;
const WATCH = {
  watch: (0, _fixtures.getWatch)({
    id: WATCH_ID
  })
};
exports.WATCH = WATCH;