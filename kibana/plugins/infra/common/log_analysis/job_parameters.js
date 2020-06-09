"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobCustomSettingsRT = exports.jobSourceConfigurationRT = exports.getDatafeedId = exports.getJobId = exports.getJobIdPrefix = exports.partitionField = exports.categoriesMessageField = exports.bucketSpan = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const bucketSpan = 900000;
exports.bucketSpan = bucketSpan;
const categoriesMessageField = 'message';
exports.categoriesMessageField = categoriesMessageField;
const partitionField = 'event.dataset';
exports.partitionField = partitionField;

const getJobIdPrefix = (spaceId, sourceId) => `kibana-logs-ui-${spaceId}-${sourceId}-`;

exports.getJobIdPrefix = getJobIdPrefix;

const getJobId = (spaceId, sourceId, jobType) => `${getJobIdPrefix(spaceId, sourceId)}${jobType}`;

exports.getJobId = getJobId;

const getDatafeedId = (spaceId, sourceId, jobType) => `datafeed-${getJobId(spaceId, sourceId, jobType)}`;

exports.getDatafeedId = getDatafeedId;
const jobSourceConfigurationRT = rt.type({
  indexPattern: rt.string,
  timestampField: rt.string,
  bucketSpan: rt.number
});
exports.jobSourceConfigurationRT = jobSourceConfigurationRT;
const jobCustomSettingsRT = rt.partial({
  job_revision: rt.number,
  logs_source_config: rt.partial(jobSourceConfigurationRT.props)
});
exports.jobCustomSettingsRT = jobCustomSettingsRT;