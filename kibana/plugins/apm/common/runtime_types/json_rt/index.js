"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const jsonRt = new t.Type('JSON', t.any.is, (input, context) => _Either.either.chain(t.string.validate(input, context), str => {
  try {
    return t.success(JSON.parse(str));
  } catch (e) {
    return t.failure(input, context);
  }
}), a => JSON.stringify(a));
exports.jsonRt = jsonRt;