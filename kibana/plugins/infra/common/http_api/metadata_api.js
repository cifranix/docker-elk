"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraMetadataRT = exports.InfraMetadataInfoRT = exports.InfraMetadataCloudRT = exports.InfraMetadataMachineRT = exports.InfraMetadataProjectRT = exports.InfraMetadataInstanceRT = exports.InfraMetadataHostRT = exports.InfraMetadataOSRT = exports.InfraMetadataFeatureRT = exports.InfraMetadataRequestRT = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _types = require("../../common/inventory_models/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const InfraMetadataRequestRT = rt.type({
  nodeId: rt.string,
  nodeType: _types.ItemTypeRT,
  sourceId: rt.string
});
exports.InfraMetadataRequestRT = InfraMetadataRequestRT;
const InfraMetadataFeatureRT = rt.type({
  name: rt.string,
  source: rt.string
});
exports.InfraMetadataFeatureRT = InfraMetadataFeatureRT;
const InfraMetadataOSRT = rt.partial({
  codename: rt.string,
  family: rt.string,
  kernel: rt.string,
  name: rt.string,
  platform: rt.string,
  version: rt.string
});
exports.InfraMetadataOSRT = InfraMetadataOSRT;
const InfraMetadataHostRT = rt.partial({
  name: rt.string,
  os: InfraMetadataOSRT,
  architecture: rt.string,
  containerized: rt.boolean
});
exports.InfraMetadataHostRT = InfraMetadataHostRT;
const InfraMetadataInstanceRT = rt.partial({
  id: rt.string,
  name: rt.string
});
exports.InfraMetadataInstanceRT = InfraMetadataInstanceRT;
const InfraMetadataProjectRT = rt.partial({
  id: rt.string
});
exports.InfraMetadataProjectRT = InfraMetadataProjectRT;
const InfraMetadataMachineRT = rt.partial({
  interface: rt.string
});
exports.InfraMetadataMachineRT = InfraMetadataMachineRT;
const InfraMetadataCloudRT = rt.partial({
  instance: InfraMetadataInstanceRT,
  provider: rt.string,
  availability_zone: rt.string,
  project: InfraMetadataProjectRT,
  machine: InfraMetadataMachineRT
});
exports.InfraMetadataCloudRT = InfraMetadataCloudRT;
const InfraMetadataInfoRT = rt.partial({
  cloud: InfraMetadataCloudRT,
  host: InfraMetadataHostRT
});
exports.InfraMetadataInfoRT = InfraMetadataInfoRT;
const InfraMetadataRequiredRT = rt.type({
  id: rt.string,
  name: rt.string,
  features: rt.array(InfraMetadataFeatureRT)
});
const InfraMetadataOptionalRT = rt.partial({
  info: InfraMetadataInfoRT
});
const InfraMetadataRT = rt.intersection([InfraMetadataRequiredRT, InfraMetadataOptionalRT]);
exports.InfraMetadataRT = InfraMetadataRT;