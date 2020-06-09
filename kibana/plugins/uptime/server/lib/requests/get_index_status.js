"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexStatus = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getIndexStatus = async ({
  callES,
  dynamicSettings
}) => {
  const {
    _shards: {
      total
    },
    count
  } = await callES('count', {
    index: dynamicSettings.heartbeatIndices
  });
  return {
    indexExists: total > 0,
    docCount: count
  };
};

exports.getIndexStatus = getIndexStatus;