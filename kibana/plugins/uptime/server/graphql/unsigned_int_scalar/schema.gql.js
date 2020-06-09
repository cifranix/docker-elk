"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsignedIntegerSchema = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const unsignedIntegerSchema = (0, _graphqlTag.default)`
  scalar UnsignedInteger
`;
exports.unsignedIntegerSchema = unsignedIntegerSchema;