"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApi = void 0;

var _constants = require("../../../common/constants");

var _app_dependencies = require("../app_dependencies");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useApi = function useApi() {
  var _useAppDependencies = (0, _app_dependencies.useAppDependencies)(),
      http = _useAppDependencies.http;

  return {
    getTransforms: function getTransforms(transformId) {
      var transformIdString = transformId !== undefined ? "/".concat(transformId) : '';
      return http.get("".concat(_constants.API_BASE_PATH, "transforms").concat(transformIdString));
    },
    getTransformsStats: function getTransformsStats(transformId) {
      if (transformId !== undefined) {
        return http.get("".concat(_constants.API_BASE_PATH, "transforms/").concat(transformId, "/_stats"));
      }

      return http.get("".concat(_constants.API_BASE_PATH, "transforms/_stats"));
    },
    createTransform: function createTransform(transformId, transformConfig) {
      return http.put("".concat(_constants.API_BASE_PATH, "transforms/").concat(transformId), {
        body: JSON.stringify(transformConfig)
      });
    },
    deleteTransforms: function deleteTransforms(transformsInfo) {
      return http.post("".concat(_constants.API_BASE_PATH, "delete_transforms"), {
        body: JSON.stringify(transformsInfo)
      });
    },
    getTransformsPreview: function getTransformsPreview(obj) {
      return http.post("".concat(_constants.API_BASE_PATH, "transforms/_preview"), {
        body: JSON.stringify(obj)
      });
    },
    startTransforms: function startTransforms(transformsInfo) {
      return http.post("".concat(_constants.API_BASE_PATH, "start_transforms"), {
        body: JSON.stringify(transformsInfo)
      });
    },
    stopTransforms: function stopTransforms(transformsInfo) {
      return http.post("".concat(_constants.API_BASE_PATH, "stop_transforms"), {
        body: JSON.stringify(transformsInfo)
      });
    },
    getTransformAuditMessages: function getTransformAuditMessages(transformId) {
      return http.get("".concat(_constants.API_BASE_PATH, "transforms/").concat(transformId, "/messages"));
    },
    esSearch: function esSearch(payload) {
      return http.post("".concat(_constants.API_BASE_PATH, "es_search"), {
        body: JSON.stringify(payload)
      });
    },
    getIndices: function getIndices() {
      return http.get("/api/index_management/indices");
    }
  };
};

exports.useApi = useApi;