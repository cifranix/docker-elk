"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModulesProvider = getModulesProvider;

var _data_recognizer = require("../../models/data_recognizer");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getModulesProvider(isFullLicense) {
  return {
    modulesProvider(callAsCurrentUser, savedObjectsClient) {
      isFullLicense();
      return {
        recognize(indexPatternTitle) {
          const dr = dataRecognizerFactory(callAsCurrentUser, savedObjectsClient);
          return dr.findMatches(indexPatternTitle);
        },

        getModule(moduleId) {
          const dr = dataRecognizerFactory(callAsCurrentUser, savedObjectsClient);

          if (moduleId === undefined) {
            return dr.listModules();
          } else {
            return dr.getModule(moduleId);
          }
        },

        saveModuleItems(moduleId, prefix, groups, indexPatternName, query, useDedicatedIndex, startDatafeed, start, end, jobOverrides, datafeedOverrides, estimateModelMemory) {
          const dr = dataRecognizerFactory(callAsCurrentUser, savedObjectsClient);
          return dr.setupModuleItems(moduleId, prefix, groups, indexPatternName, query, useDedicatedIndex, startDatafeed, start, end, jobOverrides, datafeedOverrides, estimateModelMemory);
        }

      };
    }

  };
}

function dataRecognizerFactory(callAsCurrentUser, savedObjectsClient) {
  return new _data_recognizer.DataRecognizer(callAsCurrentUser, savedObjectsClient);
}