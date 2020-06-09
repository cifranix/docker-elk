"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataFrameAnalytics = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var dataFrameAnalytics = {
  getDataFrameAnalytics: function getDataFrameAnalytics(analyticsId) {
    var analyticsIdString = analyticsId !== undefined ? "/".concat(analyticsId) : '';
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics").concat(analyticsIdString),
      method: 'GET'
    });
  },
  getDataFrameAnalyticsStats: function getDataFrameAnalyticsStats(analyticsId) {
    if (analyticsId !== undefined) {
      return (0, _http_service.http)({
        path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId, "/_stats"),
        method: 'GET'
      });
    }

    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/_stats"),
      method: 'GET'
    });
  },
  createDataFrameAnalytics: function createDataFrameAnalytics(analyticsId, analyticsConfig) {
    var body = JSON.stringify(analyticsConfig);
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId),
      method: 'PUT',
      body: body
    });
  },
  evaluateDataFrameAnalytics: function evaluateDataFrameAnalytics(evaluateConfig) {
    var body = JSON.stringify(evaluateConfig);
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/_evaluate"),
      method: 'POST',
      body: body
    });
  },
  explainDataFrameAnalytics: function explainDataFrameAnalytics(jobConfig) {
    var body = JSON.stringify(jobConfig);
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/_explain"),
      method: 'POST',
      body: body
    });
  },
  deleteDataFrameAnalytics: function deleteDataFrameAnalytics(analyticsId) {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId),
      method: 'DELETE'
    });
  },
  startDataFrameAnalytics: function startDataFrameAnalytics(analyticsId) {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId, "/_start"),
      method: 'POST'
    });
  },
  stopDataFrameAnalytics: function stopDataFrameAnalytics(analyticsId) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId, "/_stop"),
      method: 'POST',
      query: {
        force: force
      }
    });
  },
  getAnalyticsAuditMessages: function getAnalyticsAuditMessages(analyticsId) {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/data_frame/analytics/").concat(analyticsId, "/messages"),
      method: 'GET'
    });
  }
};
exports.dataFrameAnalytics = dataFrameAnalytics;