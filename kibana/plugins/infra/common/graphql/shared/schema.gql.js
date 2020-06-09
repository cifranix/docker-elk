"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const sharedSchema = (0, _graphqlTag.default)`
  "A representation of the log entry's position in the event stream"
  type InfraTimeKey {
    "The timestamp of the event that the log entry corresponds to"
    time: Float!
    "The tiebreaker that disambiguates events with the same timestamp"
    tiebreaker: Float!
  }

  input InfraTimeKeyInput {
    time: Float!
    tiebreaker: Float!
  }

  enum InfraIndexType {
    ANY
    LOGS
    METRICS
  }

  enum InfraNodeType {
    pod
    container
    host
    awsEC2
    awsS3
    awsRDS
    awsSQS
  }
`;
exports.sharedSchema = sharedSchema;