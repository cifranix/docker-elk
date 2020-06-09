"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCustomLink = deleteCustomLink;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function deleteCustomLink({
  customLinkId,
  setup
}) {
  const {
    internalClient,
    indices
  } = setup;
  const params = {
    refresh: 'wait_for',
    index: indices.apmCustomLinkIndex,
    id: customLinkId
  };
  return internalClient.delete(params);
}