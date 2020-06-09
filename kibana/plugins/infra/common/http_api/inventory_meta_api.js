"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryMetaRequestRT = exports.InventoryMetaResponseRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _types = require("../inventory_models/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CloudAccountRT = rt.type({
  value: rt.string,
  name: rt.string
});
const InventoryMetaResponseRT = rt.type({
  accounts: rt.array(CloudAccountRT),
  projects: rt.array(rt.string),
  regions: rt.array(rt.string)
});
exports.InventoryMetaResponseRT = InventoryMetaResponseRT;
const InventoryMetaRequestRT = rt.type({
  sourceId: rt.string,
  nodeType: _types.ItemTypeRT
});
exports.InventoryMetaRequestRT = InventoryMetaRequestRT;