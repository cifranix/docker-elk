"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumberFloatRt = getNumberFloatRt;
exports.numberFloatRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getNumberFloatRt({
  min,
  max
}) {
  return new t.Type('numberFloatRt', t.string.is, (input, context) => {
    return _Either.either.chain(t.string.validate(input, context), inputAsString => {
      const inputAsFloat = parseFloat(inputAsString);
      const maxThreeDecimals = parseFloat(inputAsFloat.toFixed(3)) === inputAsFloat;
      const isValid = inputAsFloat >= min && inputAsFloat <= max && maxThreeDecimals;
      return isValid ? t.success(inputAsString) : t.failure(input, context, `Number must be between ${min} and ${max}`);
    });
  }, t.identity);
}

const numberFloatRt = getNumberFloatRt({
  min: 0,
  max: 1
});
exports.numberFloatRt = numberFloatRt;