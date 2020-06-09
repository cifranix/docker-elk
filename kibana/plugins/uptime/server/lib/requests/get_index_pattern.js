"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUptimeIndexPattern = void 0;

var _server = require("../../../../../../src/plugins/data/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getUptimeIndexPattern = async ({
  callES,
  dynamicSettings
}) => {
  const callAsCurrentUser = async (endpoint, clientParams = {}, options) => callES(endpoint, clientParams, options);

  const indexPatternsFetcher = new _server.IndexPatternsFetcher(callAsCurrentUser); // Since `getDynamicIndexPattern` is called in setup_request (and thus by every endpoint)
  // and since `getFieldsForWildcard` will throw if the specified indices don't exist,
  // we have to catch errors here to avoid all endpoints returning 500 for users without APM data
  // (would be a bad first time experience)

  try {
    const fields = await indexPatternsFetcher.getFieldsForWildcard({
      pattern: dynamicSettings.heartbeatIndices
    });
    const indexPattern = {
      fields,
      title: dynamicSettings.heartbeatIndices
    };
    return indexPattern;
  } catch (e) {
    var _e$output;

    const notExists = ((_e$output = e.output) === null || _e$output === void 0 ? void 0 : _e$output.statusCode) === 404;

    if (notExists) {
      // eslint-disable-next-line no-console
      console.error(`Could not get dynamic index pattern because indices "${dynamicSettings.heartbeatIndices}" don't exist`);
      return;
    } // re-throw


    throw e;
  }
};

exports.getUptimeIndexPattern = getUptimeIndexPattern;