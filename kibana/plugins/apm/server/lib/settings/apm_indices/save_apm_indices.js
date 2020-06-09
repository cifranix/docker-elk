"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveApmIndices = saveApmIndices;

var _apm_saved_object_constants = require("../../../../common/apm_saved_object_constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function saveApmIndices(savedObjectsClient, apmIndices) {
  return await savedObjectsClient.create(_apm_saved_object_constants.APM_INDICES_SAVED_OBJECT_TYPE, removeEmpty(apmIndices), {
    id: _apm_saved_object_constants.APM_INDICES_SAVED_OBJECT_ID,
    overwrite: true
  });
} // remove empty/undefined values


function removeEmpty(apmIndices) {
  return Object.entries(apmIndices).map(([key, value]) => [key, value === null || value === void 0 ? void 0 : value.trim()]).filter(([key, value]) => !!value).reduce((obj, [key, value]) => ({ ...obj,
    [key]: value
  }), {});
}