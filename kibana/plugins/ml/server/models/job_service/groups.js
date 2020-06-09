"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupsProvider = groupsProvider;

var _calendar = require("../calendar");

var _calendars = require("../../../common/constants/calendars");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function groupsProvider(callAsCurrentUser) {
  const calMngr = new _calendar.CalendarManager(callAsCurrentUser);

  async function getAllGroups() {
    const groups = {};
    const jobIds = {};
    const [{
      jobs
    }, calendars] = await Promise.all([callAsCurrentUser('ml.jobs'), calMngr.getAllCalendars()]);

    if (jobs) {
      jobs.forEach(job => {
        jobIds[job.job_id] = null;

        if (job.groups !== undefined) {
          job.groups.forEach(g => {
            if (groups[g] === undefined) {
              groups[g] = {
                id: g,
                jobIds: [job.job_id],
                calendarIds: []
              };
            } else {
              groups[g].jobIds.push(job.job_id);
            }
          });
        }
      });
    }

    if (calendars) {
      calendars.forEach(cal => {
        cal.job_ids.forEach(jId => {
          // don't include _all in the calendar groups list
          if (jId !== _calendars.GLOBAL_CALENDAR && jobIds[jId] === undefined) {
            if (groups[jId] === undefined) {
              groups[jId] = {
                id: jId,
                jobIds: [],
                calendarIds: [cal.calendar_id]
              };
            } else {
              groups[jId].calendarIds.push(cal.calendar_id);
            }
          }
        });
      });
    }

    return Object.keys(groups).map(g => groups[g]);
  }

  async function updateGroups(jobs) {
    const results = {};

    for (const job of jobs) {
      const {
        job_id: jobId,
        groups
      } = job;

      try {
        await callAsCurrentUser('ml.updateJob', {
          jobId,
          body: {
            groups
          }
        });
        results[jobId] = {
          success: true
        };
      } catch (error) {
        results[jobId] = {
          success: false,
          error
        };
      }
    }

    return results;
  }

  return {
    getAllGroups,
    updateGroups
  };
}