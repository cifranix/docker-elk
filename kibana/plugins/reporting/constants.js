"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSV_REPORTING_ACTION = exports.USES_HEADLESS_JOB_TYPES = exports.CSV_FROM_SAVEDOBJECT_JOB_TYPE = exports.CSV_JOB_TYPE = exports.PNG_JOB_TYPE = exports.PDF_JOB_TYPE = exports.JobStatuses = exports.JOB_STATUS_COMPLETED = exports.JOB_STATUS_FAILED = exports.REPORTING_MANAGEMENT_HOME = exports.API_GENERATE_IMMEDIATE = exports.API_BASE_GENERATE = exports.API_LIST_URL = exports.API_BASE_URL = exports.JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG = exports.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = 'xpack.reporting.jobCompletionNotifications';
exports.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY = JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY;
const JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG = {
  jobCompletionNotifier: {
    interval: 10000,
    intervalErrorMultiplier: 5
  }
}; // Routes

exports.JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG = JOB_COMPLETION_NOTIFICATIONS_POLLER_CONFIG;
const API_BASE_URL = '/api/reporting';
exports.API_BASE_URL = API_BASE_URL;
const API_LIST_URL = `${API_BASE_URL}/jobs`;
exports.API_LIST_URL = API_LIST_URL;
const API_BASE_GENERATE = `${API_BASE_URL}/generate`;
exports.API_BASE_GENERATE = API_BASE_GENERATE;
const API_GENERATE_IMMEDIATE = `${API_BASE_URL}/v1/generate/immediate/csv/saved-object`;
exports.API_GENERATE_IMMEDIATE = API_GENERATE_IMMEDIATE;
const REPORTING_MANAGEMENT_HOME = '/app/kibana#/management/kibana/reporting'; // Statuses

exports.REPORTING_MANAGEMENT_HOME = REPORTING_MANAGEMENT_HOME;
const JOB_STATUS_FAILED = 'failed';
exports.JOB_STATUS_FAILED = JOB_STATUS_FAILED;
const JOB_STATUS_COMPLETED = 'completed';
exports.JOB_STATUS_COMPLETED = JOB_STATUS_COMPLETED;
let JobStatuses; // Types

exports.JobStatuses = JobStatuses;

(function (JobStatuses) {
  JobStatuses["PENDING"] = "pending";
  JobStatuses["PROCESSING"] = "processing";
  JobStatuses["COMPLETED"] = "completed";
  JobStatuses["FAILED"] = "failed";
  JobStatuses["CANCELLED"] = "cancelled";
})(JobStatuses || (exports.JobStatuses = JobStatuses = {}));

const PDF_JOB_TYPE = 'printable_pdf';
exports.PDF_JOB_TYPE = PDF_JOB_TYPE;
const PNG_JOB_TYPE = 'PNG';
exports.PNG_JOB_TYPE = PNG_JOB_TYPE;
const CSV_JOB_TYPE = 'csv';
exports.CSV_JOB_TYPE = CSV_JOB_TYPE;
const CSV_FROM_SAVEDOBJECT_JOB_TYPE = 'csv_from_savedobject';
exports.CSV_FROM_SAVEDOBJECT_JOB_TYPE = CSV_FROM_SAVEDOBJECT_JOB_TYPE;
const USES_HEADLESS_JOB_TYPES = [PDF_JOB_TYPE, PNG_JOB_TYPE]; // Actions

exports.USES_HEADLESS_JOB_TYPES = USES_HEADLESS_JOB_TYPES;
const CSV_REPORTING_ACTION = 'downloadCsvReport';
exports.CSV_REPORTING_ACTION = CSV_REPORTING_ACTION;