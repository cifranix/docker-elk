"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectFindOptionsRt = exports.NumberFromString = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const NumberFromString = new rt.Type('NumberFromString', rt.number.is, (u, c) => _Either.either.chain(rt.string.validate(u, c), s => {
  const n = +s;
  return isNaN(n) ? rt.failure(u, c, 'cannot parse to a number') : rt.success(n);
}), String);
exports.NumberFromString = NumberFromString;
const SavedObjectFindOptionsRt = rt.partial({
  defaultSearchOperator: rt.union([rt.literal('AND'), rt.literal('OR')]),
  fields: rt.array(rt.string),
  filter: rt.string,
  page: NumberFromString,
  perPage: NumberFromString,
  search: rt.string,
  searchFields: rt.array(rt.string),
  sortField: rt.string,
  sortOrder: rt.union([rt.literal('desc'), rt.literal('asc')])
});
exports.SavedObjectFindOptionsRt = SavedObjectFindOptionsRt;