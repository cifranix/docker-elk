"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultPrivileges = getDefaultPrivileges;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
//
function getDefaultPrivileges() {
  return {
    // Anomaly Detection
    canGetJobs: false,
    canCreateJob: false,
    canDeleteJob: false,
    canOpenJob: false,
    canCloseJob: false,
    canForecastJob: false,
    canGetDatafeeds: false,
    canStartStopDatafeed: false,
    canUpdateJob: false,
    canUpdateDatafeed: false,
    canPreviewDatafeed: false,
    // Calendars
    canGetCalendars: false,
    canCreateCalendar: false,
    canDeleteCalendar: false,
    // Filters
    canGetFilters: false,
    canCreateFilter: false,
    canDeleteFilter: false,
    // File Data Visualizer
    canFindFileStructure: false,
    // Data Frame Analytics
    canGetDataFrameAnalytics: false,
    canDeleteDataFrameAnalytics: false,
    canCreateDataFrameAnalytics: false,
    canStartStopDataFrameAnalytics: false
  };
}