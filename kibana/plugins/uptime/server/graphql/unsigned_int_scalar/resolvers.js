"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsignedIntegerResolverFunctions = exports.parseLiteral = exports.parseValue = exports.serialize = void 0;

var _graphql = require("graphql");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const serialize = value => {
  // `parseInt` will yield `2019` for a value such as "2019-07-08T16:59:09.796Z"
  if (isNaN(Number(value))) {
    return Date.parse(value);
  }

  return parseInt(value, 10);
};

exports.serialize = serialize;

const parseValue = value => {
  const parsed = parseInt(value, 10);

  if (parsed < 0) {
    return null;
  }

  return parsed;
};

exports.parseValue = parseValue;

const parseLiteral = ast => {
  switch (ast.kind) {
    case _graphql.Kind.INT:
    case _graphql.Kind.FLOAT:
    case _graphql.Kind.STRING:
      return parseInt(ast.value, 10);
  }

  return null;
};

exports.parseLiteral = parseLiteral;
const unsignedIntegerScalar = new _graphql.GraphQLScalarType({
  name: 'UnsignedInteger',
  description: 'Represents an unsigned 32-bit integer',
  serialize,
  parseValue,
  parseLiteral
});
/**
 * This scalar resolver will parse an integer string of > 32 bits and return a value of type `number`.
 * This assumes that the code is running in an environment that supports big ints.
 */

const unsignedIntegerResolverFunctions = libs => ({
  UnsignedInteger: unsignedIntegerScalar
});

exports.unsignedIntegerResolverFunctions = unsignedIntegerResolverFunctions;