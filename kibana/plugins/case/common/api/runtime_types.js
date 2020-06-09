"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excess = excess;
exports.decodeOrThrow = exports.throwErrors = exports.createPlainError = void 0;

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var rt = _interopRequireWildcard(require("io-ts"));

var _PathReporter = require("io-ts/lib/PathReporter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createPlainError = message => new Error(message);

exports.createPlainError = createPlainError;

const throwErrors = createError => errors => {
  throw createError((0, _PathReporter.failure)(errors).join('\n'));
};

exports.throwErrors = throwErrors;

const decodeOrThrow = (runtimeType, createError = createPlainError) => inputValue => (0, _pipeable.pipe)(runtimeType.decode(inputValue), (0, _Either.fold)(throwErrors(createError), _function.identity));

exports.decodeOrThrow = decodeOrThrow;

const getExcessProps = (props, r) => {
  const ex = [];

  for (const k of Object.keys(r)) {
    if (!props.hasOwnProperty(k)) {
      ex.push(k);
    }
  }

  return ex;
};

function excess(codec) {
  const r = new rt.InterfaceType(codec.name, codec.is, (i, c) => _Either.either.chain(rt.UnknownRecord.validate(i, c), s => {
    const ex = getExcessProps(codec.props, s);
    return ex.length > 0 ? rt.failure(i, c, `Invalid value ${JSON.stringify(i)} supplied to : ${codec.name}, excess properties: ${JSON.stringify(ex)}`) : codec.validate(i, c);
  }), codec.encode, codec.props);
  return r;
}