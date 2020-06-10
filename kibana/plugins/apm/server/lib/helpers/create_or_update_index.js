"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdateIndex = createOrUpdateIndex;

var _pRetry = _interopRequireDefault(require("p-retry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createOrUpdateIndex({
  index,
  mappings,
  esClient,
  logger
}) {
  try {
    /*
     * In some cases we could be trying to create an index before ES is ready.
     * When this happens, we retry creating the index with exponential backoff.
     * We use retry's default formula, meaning that the first retry happens after 2s,
     * the 5th after 32s, and the final attempt after around 17m. If the final attempt fails,
     * the error is logged to the console.
     * See https://github.com/sindresorhus/p-retry and https://github.com/tim-kos/node-retry.
     */
    await (0, _pRetry.default)(async () => {
      const {
        callAsInternalUser
      } = esClient;
      const indexExists = await callAsInternalUser('indices.exists', {
        index
      });
      const result = indexExists ? await updateExistingIndex({
        index,
        callAsInternalUser,
        mappings
      }) : await createNewIndex({
        index,
        callAsInternalUser,
        mappings
      });

      if (!result.acknowledged) {
        const resultError = result && result.error && JSON.stringify(result.error);
        throw new Error(resultError);
      }
    });
  } catch (e) {
    logger.error(`Could not create APM index: '${index}'. Error: ${e.message}.`);
  }
}

function createNewIndex({
  index,
  callAsInternalUser,
  mappings
}) {
  return callAsInternalUser('indices.create', {
    index,
    body: {
      // auto_expand_replicas: Allows cluster to not have replicas for this index
      settings: {
        'index.auto_expand_replicas': '0-1'
      },
      mappings
    }
  });
}

function updateExistingIndex({
  index,
  callAsInternalUser,
  mappings
}) {
  return callAsInternalUser('indices.putMapping', {
    index,
    body: mappings
  });
}