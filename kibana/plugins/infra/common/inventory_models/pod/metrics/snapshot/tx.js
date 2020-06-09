"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tx = void 0;

var _network_traffic = require("../../../shared/metrics/snapshot/network_traffic");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const tx = (0, _network_traffic.networkTraffic)('tx', 'kubernetes.pod.network.tx.bytes');
exports.tx = tx;