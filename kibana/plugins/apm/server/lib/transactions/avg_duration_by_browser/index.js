"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionAvgDurationByBrowser = getTransactionAvgDurationByBrowser;

var _fetcher = require("./fetcher");

var _transformer = require("./transformer");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTransactionAvgDurationByBrowser(options) {
  return (0, _transformer.transformer)({
    response: await (0, _fetcher.fetcher)(options)
  });
}