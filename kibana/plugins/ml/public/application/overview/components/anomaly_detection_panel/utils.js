"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupsFromJobs = getGroupsFromJobs;
exports.getStatsBarData = getStatsBarData;
exports.getJobsFromGroup = getJobsFromGroup;
exports.getJobsWithTimerange = getJobsWithTimerange;

var _i18n = require("@kbn/i18n");

var _states = require("../../../../../common/constants/states");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getGroupsFromJobs(jobs) {
  var groups = {
    ungrouped: {
      id: 'ungrouped',
      jobIds: [],
      docs_processed: 0,
      latest_timestamp: 0,
      max_anomaly_score: null,
      jobs_in_group: 0
    }
  };
  jobs.forEach(function (job) {
    // Organize job by group
    if (job.groups.length > 0) {
      job.groups.forEach(function (g) {
        if (groups[g] === undefined) {
          groups[g] = {
            id: g,
            jobIds: [job.id],
            docs_processed: job.processed_record_count,
            latest_timestamp: job.latestTimestampMs,
            max_anomaly_score: null,
            jobs_in_group: 1
          };
        } else {
          groups[g].jobIds.push(job.id);
          groups[g].docs_processed += job.processed_record_count;
          groups[g].jobs_in_group++; // if incoming job latest timestamp is greater than the last saved one, replace it

          if (groups[g].latest_timestamp === undefined) {
            groups[g].latest_timestamp = job.latestTimestampMs;
          } else if (job.latestTimestampMs && job.latestTimestampMs > groups[g].latest_timestamp) {
            groups[g].latest_timestamp = job.latestTimestampMs;
          }
        }
      });
    } else {
      groups.ungrouped.jobIds.push(job.id);
      groups.ungrouped.docs_processed += job.processed_record_count;
      groups.ungrouped.jobs_in_group++; // if incoming job latest timestamp is greater than the last saved one, replace it

      if (job.latestTimestampMs && job.latestTimestampMs > groups.ungrouped.latest_timestamp) {
        groups.ungrouped.latest_timestamp = job.latestTimestampMs;
      }
    }
  });

  if (groups.ungrouped.jobIds.length === 0) {
    delete groups.ungrouped;
  }

  var count = Object.values(groups).length;
  return {
    groups: groups,
    count: count
  };
}

function getStatsBarData(jobsList) {
  var jobStats = {
    activeNodes: {
      label: _i18n.i18n.translate('xpack.ml.overviewJobsList.statsBar.activeMLNodesLabel', {
        defaultMessage: 'Active ML nodes'
      }),
      value: 0,
      show: true
    },
    total: {
      label: _i18n.i18n.translate('xpack.ml.overviewJobsList.statsBar.totalJobsLabel', {
        defaultMessage: 'Total jobs'
      }),
      value: 0,
      show: true
    },
    open: {
      label: _i18n.i18n.translate('xpack.ml.overviewJobsList.statsBar.openJobsLabel', {
        defaultMessage: 'Open jobs'
      }),
      value: 0,
      show: true
    },
    closed: {
      label: _i18n.i18n.translate('xpack.ml.overviewJobsList.statsBar.closedJobsLabel', {
        defaultMessage: 'Closed jobs'
      }),
      value: 0,
      show: true
    },
    failed: {
      label: _i18n.i18n.translate('xpack.ml.overviewJobsList.statsBar.failedJobsLabel', {
        defaultMessage: 'Failed jobs'
      }),
      value: 0,
      show: false
    },
    activeDatafeeds: {
      label: _i18n.i18n.translate('xpack.ml.jobsList.statsBar.activeDatafeedsLabel', {
        defaultMessage: 'Active datafeeds'
      }),
      value: 0,
      show: true
    }
  };

  if (jobsList === undefined) {
    return jobStats;
  } // object to keep track of nodes being used by jobs


  var mlNodes = {};
  var failedJobs = 0;
  jobsList.forEach(function (job) {
    if (job.jobState === _states.JOB_STATE.OPENED) {
      jobStats.open.value++;
    } else if (job.jobState === _states.JOB_STATE.CLOSED) {
      jobStats.closed.value++;
    } else if (job.jobState === _states.JOB_STATE.FAILED) {
      failedJobs++;
    }

    if (job.hasDatafeed && job.datafeedState === _states.DATAFEED_STATE.STARTED) {
      jobStats.activeDatafeeds.value++;
    }

    if (job.nodeName !== undefined) {
      mlNodes[job.nodeName] = {};
    }
  });
  jobStats.total.value = jobsList.length; // Only show failed jobs if it is non-zero

  if (failedJobs) {
    jobStats.failed.value = failedJobs;
    jobStats.failed.show = true;
  } else {
    jobStats.failed.show = false;
  }

  jobStats.activeNodes.value = Object.keys(mlNodes).length;
  return jobStats;
}

function getJobsFromGroup(group, jobs) {
  return group.jobIds.map(function (jobId) {
    return jobs[jobId];
  }).filter(function (id) {
    return id !== undefined;
  });
}

function getJobsWithTimerange(jobsList) {
  var jobs = {};
  jobsList.forEach(function (job) {
    if (jobs[job.id] === undefined) {
      // create the job in the object with the times you need
      if (job.earliestTimestampMs !== undefined) {
        var earliestTimestampMs = job.earliestTimestampMs,
            latestResultsTimestampMs = job.latestResultsTimestampMs;
        jobs[job.id] = {
          id: job.id,
          earliestTimestampMs: earliestTimestampMs,
          latestResultsTimestampMs: latestResultsTimestampMs
        };
      }
    }
  });
  return jobs;
}