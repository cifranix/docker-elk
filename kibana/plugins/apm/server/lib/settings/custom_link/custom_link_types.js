"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payloadRt = exports.filterOptionsRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const filterOptionsRt = t.partial({
  [_elasticsearch_fieldnames.SERVICE_NAME]: t.string,
  [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: t.string,
  [_elasticsearch_fieldnames.TRANSACTION_NAME]: t.string,
  [_elasticsearch_fieldnames.TRANSACTION_TYPE]: t.string
});
exports.filterOptionsRt = filterOptionsRt;
const payloadRt = t.intersection([t.type({
  label: t.string,
  url: t.string
}), t.partial({
  id: t.string,
  filters: t.array(t.type({
    key: t.string,
    value: t.string
  }))
})]);
exports.payloadRt = payloadRt;