"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApi = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var apiFactory = function apiFactory() {
  return {
    getTransforms: function getTransforms(transformId) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    getTransformsStats: function getTransformsStats(transformId) {
      if (transformId !== undefined) {
        return new Promise(function (resolve, reject) {
          resolve([]);
        });
      }

      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    createTransform: function createTransform(transformId, transformConfig) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    deleteTransforms: function deleteTransforms(transformsInfo) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    getTransformsPreview: function getTransformsPreview(obj) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    startTransforms: function startTransforms(transformsInfo) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    stopTransforms: function stopTransforms(transformsInfo) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    getTransformAuditMessages: function getTransformAuditMessages(transformId) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    esSearch: function esSearch(payload) {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    },
    getIndices: function getIndices() {
      return new Promise(function (resolve, reject) {
        resolve([]);
      });
    }
  };
};

var useApi = function useApi() {
  return apiFactory();
};

exports.useApi = useApi;