"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awsRDSConnections = void 0;

var _create_tsvb_model = require("../../../create_tsvb_model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const awsRDSConnections = (0, _create_tsvb_model.createTSVBModel)('awsRDSConnections', ['aws.rds'], [{
  id: 'connections',
  split_mode: 'everything',
  metrics: [{
    field: 'aws.rds.database_connections',
    id: 'avg-conns',
    type: 'avg'
  }]
}]);
exports.awsRDSConnections = awsRDSConnections;