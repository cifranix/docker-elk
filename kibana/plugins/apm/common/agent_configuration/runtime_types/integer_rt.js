"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntegerRt = getIntegerRt;
exports.integerRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getIntegerRt({
  min,
  max
}) {
  return new t.Type('integerRt', t.string.is, (input, context) => {
    return _Either.either.chain(t.string.validate(input, context), inputAsString => {
      const inputAsInt = parseInt(inputAsString, 10);
      const isValid = inputAsInt >= min && inputAsInt <= max;
      return isValid ? t.success(inputAsString) : t.failure(input, context, `Number must be a valid number between ${min} and ${max}`);
    });
  }, t.identity);
}

const integerRt = getIntegerRt({
  min: -Infinity,
  max: Infinity
});
exports.integerRt = integerRt;