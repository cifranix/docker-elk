"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECTION = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let PROJECTION;
exports.PROJECTION = PROJECTION;

(function (PROJECTION) {
  PROJECTION["SERVICES"] = "services";
  PROJECTION["TRANSACTION_GROUPS"] = "transactionGroups";
  PROJECTION["TRACES"] = "traces";
  PROJECTION["TRANSACTIONS"] = "transactions";
  PROJECTION["METRICS"] = "metrics";
  PROJECTION["ERROR_GROUPS"] = "errorGroups";
  PROJECTION["SERVICE_NODES"] = "serviceNodes";
})(PROJECTION || (exports.PROJECTION = PROJECTION = {}));