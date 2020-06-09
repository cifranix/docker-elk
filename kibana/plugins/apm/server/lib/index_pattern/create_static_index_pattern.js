"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStaticIndexPattern = createStaticIndexPattern;

var _index_pattern = _interopRequireDefault(require("../../tutorial/index_pattern.json"));

var _index_pattern_constants = require("../../../common/index_pattern_constants");

var _saved_objects = require("../../../../../../src/core/server/saved_objects");

var _has_historical_agent_data = require("../services/get_services/has_historical_agent_data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
async function createStaticIndexPattern(setup, context, savedObjectsClient) {
  const {
    config
  } = context; // don't autocreate APM index pattern if it's been disabled via the config

  if (!config['xpack.apm.autocreateApmIndexPattern']) {
    return;
  } // Discover and other apps will throw errors if an index pattern exists without having matching indices.
  // The following ensures the index pattern is only created if APM data is found


  const hasData = await (0, _has_historical_agent_data.hasHistoricalAgentData)(setup);

  if (!hasData) {
    return;
  }

  try {
    const apmIndexPatternTitle = config['apm_oss.indexPattern'];
    await savedObjectsClient.create('index-pattern', { ..._index_pattern.default.attributes,
      title: apmIndexPatternTitle
    }, {
      id: _index_pattern_constants.APM_STATIC_INDEX_PATTERN_ID,
      overwrite: false
    });
    return;
  } catch (e) {
    // if the index pattern (saved object) already exists a conflict error (code: 409) will be thrown
    // that error should be silenced
    if (_saved_objects.SavedObjectsErrorHelpers.isConflictError(e)) {
      return;
    }

    throw e;
  }
}