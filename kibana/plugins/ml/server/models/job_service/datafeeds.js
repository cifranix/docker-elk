"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datafeedsProvider = datafeedsProvider;

var _i18n = require("@kbn/i18n");

var _states = require("../../../common/constants/states");

var _error_utils = require("./error_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function datafeedsProvider(callAsCurrentUser) {
  async function forceStartDatafeeds(datafeedIds, start, end) {
    const jobIds = await getJobIdsByDatafeedId();
    const doStartsCalled = datafeedIds.reduce((acc, cur) => {
      acc[cur] = false;
      return acc;
    }, {});
    const results = {};

    async function doStart(datafeedId) {
      if (doStartsCalled[datafeedId] === false) {
        doStartsCalled[datafeedId] = true;

        try {
          await startDatafeed(datafeedId, start, end);
          return {
            started: true
          };
        } catch (error) {
          return {
            started: false,
            error
          };
        }
      } else {
        return {
          started: true
        };
      }
    }

    for (const datafeedId of datafeedIds) {
      const jobId = jobIds[datafeedId];

      if (jobId !== undefined) {
        try {
          if (await openJob(jobId)) {
            results[datafeedId] = await doStart(datafeedId);
          }
        } catch (error) {
          if ((0, _error_utils.isRequestTimeout)(error)) {
            // if the open request times out, start the datafeed anyway
            // then break out of the loop so no more requests are fired.
            // use fillResultsWithTimeouts to add a timeout error to each
            // remaining job
            results[datafeedId] = await doStart(datafeedId);
            return (0, _error_utils.fillResultsWithTimeouts)(results, datafeedId, datafeedIds, _states.JOB_STATE.OPENED);
          }

          results[datafeedId] = {
            started: false,
            error
          };
        }
      } else {
        results[datafeedId] = {
          started: false,
          error: _i18n.i18n.translate('xpack.ml.models.jobService.jobHasNoDatafeedErrorMessage', {
            defaultMessage: 'Job has no datafeed'
          })
        };
      }
    }

    return results;
  }

  async function openJob(jobId) {
    let opened = false;

    try {
      const resp = await callAsCurrentUser('ml.openJob', {
        jobId
      });
      opened = resp.opened;
    } catch (error) {
      if (error.statusCode === 409) {
        opened = true;
      } else {
        throw error;
      }
    }

    return opened;
  }

  async function startDatafeed(datafeedId, start, end) {
    return callAsCurrentUser('ml.startDatafeed', {
      datafeedId,
      start,
      end
    });
  }

  async function stopDatafeeds(datafeedIds) {
    const results = {};

    for (const datafeedId of datafeedIds) {
      try {
        results[datafeedId] = await callAsCurrentUser('ml.stopDatafeed', {
          datafeedId
        });
      } catch (error) {
        if ((0, _error_utils.isRequestTimeout)(error)) {
          return (0, _error_utils.fillResultsWithTimeouts)(results, datafeedId, datafeedIds, _states.DATAFEED_STATE.STOPPED);
        }
      }
    }

    return results;
  }

  async function forceDeleteDatafeed(datafeedId) {
    return callAsCurrentUser('ml.deleteDatafeed', {
      datafeedId,
      force: true
    });
  }

  async function getDatafeedIdsByJobId() {
    const {
      datafeeds
    } = await callAsCurrentUser('ml.datafeeds');
    return datafeeds.reduce((acc, cur) => {
      acc[cur.job_id] = cur.datafeed_id;
      return acc;
    }, {});
  }

  async function getJobIdsByDatafeedId() {
    const {
      datafeeds
    } = await callAsCurrentUser('ml.datafeeds');
    return datafeeds.reduce((acc, cur) => {
      acc[cur.datafeed_id] = cur.job_id;
      return acc;
    }, {});
  }

  return {
    forceStartDatafeeds,
    stopDatafeeds,
    forceDeleteDatafeed,
    getDatafeedIdsByJobId,
    getJobIdsByDatafeedId
  };
}