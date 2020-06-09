"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionGroupList = getTransactionGroupList;

var _fetcher = require("./fetcher");

var _transform = require("./transform");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTransactionGroupList(options, setup) {
  const {
    start,
    end
  } = setup;
  const response = await (0, _fetcher.transactionGroupsFetcher)(options, setup);
  return (0, _transform.transactionGroupsTransformer)({
    response,
    start,
    end
  });
}