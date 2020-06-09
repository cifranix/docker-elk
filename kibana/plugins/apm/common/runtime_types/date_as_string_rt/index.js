"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateAsStringRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Checks whether a string is a valid ISO timestamp,
// but doesn't convert it into a Date object when decoding
const dateAsStringRt = new t.Type('DateAsString', t.string.is, (input, context) => _Either.either.chain(t.string.validate(input, context), str => {
  const date = new Date(str);
  return isNaN(date.getTime()) ? t.failure(input, context) : t.success(str);
}), t.identity);
exports.dateAsStringRt = dateAsStringRt;