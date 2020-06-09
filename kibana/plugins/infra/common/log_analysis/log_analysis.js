"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExampleDataIndex = exports.isSetupStatusWithResults = exports.isHealthyJobStatus = exports.isJobStatusWithResults = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// combines and abstracts job and datafeed status
// setup hidden even though the job definitions are outdated

/**
 * Maps a job status to the possibility that results have already been produced
 * before this state was reached.
 */
const isJobStatusWithResults = jobStatus => ['started', 'finished', 'stopped', 'failed'].includes(jobStatus);

exports.isJobStatusWithResults = isJobStatusWithResults;

const isHealthyJobStatus = jobStatus => ['started', 'finished'].includes(jobStatus);
/**
 * Maps a setup status to the possibility that results have already been
 * produced before this state was reached.
 */


exports.isHealthyJobStatus = isHealthyJobStatus;

const isSetupStatusWithResults = setupStatus => ['skipped', 'hiddenAfterSuccess', 'skippedButReconfigurable', 'skippedButUpdatable'].includes(setupStatus);

exports.isSetupStatusWithResults = isSetupStatusWithResults;
const KIBANA_SAMPLE_DATA_INDICES = ['kibana_sample_data_logs*'];

const isExampleDataIndex = indexName => KIBANA_SAMPLE_DATA_INDICES.includes(indexName);

exports.isExampleDataIndex = isExampleDataIndex;