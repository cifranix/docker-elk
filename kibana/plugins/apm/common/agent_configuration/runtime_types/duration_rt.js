"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDurationRt = getDurationRt;
exports.durationRt = exports.DURATION_UNITS = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

var _amount_and_unit = require("../amount_and_unit");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const DURATION_UNITS = ['ms', 's', 'm'];
exports.DURATION_UNITS = DURATION_UNITS;

function getDurationRt({
  min
}) {
  return new t.Type('durationRt', t.string.is, (input, context) => {
    return _Either.either.chain(t.string.validate(input, context), inputAsString => {
      const {
        amount,
        unit
      } = (0, _amount_and_unit.amountAndUnitToObject)(inputAsString);
      const amountAsInt = parseInt(amount, 10);
      const isValidUnit = DURATION_UNITS.includes(unit);
      const isValid = amountAsInt >= min && isValidUnit;
      return isValid ? t.success(inputAsString) : t.failure(input, context, `Must have numeric amount and a valid unit (${DURATION_UNITS})`);
    });
  }, t.identity);
}

const durationRt = getDurationRt({
  min: 1
});
exports.durationRt = durationRt;