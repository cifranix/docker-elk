"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spaceIdToNamespace = spaceIdToNamespace;
exports.namespaceToSpaceId = namespaceToSpaceId;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function spaceIdToNamespace(spaceId) {
  if (!spaceId) {
    throw new TypeError('spaceId is required');
  }

  if (spaceId === _constants.DEFAULT_SPACE_ID) {
    return undefined;
  }

  return spaceId;
}

function namespaceToSpaceId(namespace) {
  if (namespace === '') {
    throw new TypeError('namespace cannot be an empty string');
  }

  if (!namespace) {
    return _constants.DEFAULT_SPACE_ID;
  }

  return namespace;
}