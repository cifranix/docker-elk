"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMlSystemProvider = getMlSystemProvider;

var _spaces_utils = require("../../lib/spaces_utils");

var _check_privileges = require("../../lib/check_privileges");

var _index_patterns = require("../../../common/constants/index_patterns");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getMlSystemProvider(isMinimumLicense, isFullLicense, mlLicense, spaces, cloud) {
  return {
    mlSystemProvider(callAsCurrentUser, request) {
      return {
        mlCapabilities(ignoreSpaces) {
          isMinimumLicense();
          const {
            isMlEnabledInSpace
          } = spaces !== undefined ? (0, _spaces_utils.spacesUtilsProvider)(spaces, request) : {
            isMlEnabledInSpace: async () => true
          };
          const {
            getPrivileges
          } = (0, _check_privileges.privilegesProvider)(callAsCurrentUser, mlLicense, isMlEnabledInSpace, ignoreSpaces);
          return getPrivileges();
        },

        async mlInfo() {
          isMinimumLicense();
          const info = await callAsCurrentUser('ml.info');
          const cloudId = cloud && cloud.cloudId;
          return { ...info,
            cloudId
          };
        },

        async mlSearch(searchParams) {
          isFullLicense();
          return callAsCurrentUser('search', { ...searchParams,
            index: _index_patterns.ML_RESULTS_INDEX_PATTERN
          });
        }

      };
    }

  };
}