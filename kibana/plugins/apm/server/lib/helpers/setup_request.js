"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupRequest = setupRequest;

var _moment = _interopRequireDefault(require("moment"));

var _get_apm_indices = require("../settings/apm_indices/get_apm_indices");

var _get_ui_filters_es = require("./convert_ui_filters/get_ui_filters_es");

var _es_client = require("./es_client");

var _get_dynamic_index_pattern = require("../index_pattern/get_dynamic_index_pattern");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function decodeUiFilters(indexPattern, uiFiltersEncoded) {
  if (!uiFiltersEncoded || !indexPattern) {
    return [];
  }

  const uiFilters = JSON.parse(uiFiltersEncoded);
  return (0, _get_ui_filters_es.getUiFiltersES)(indexPattern, uiFilters);
} // Explicitly type Setup to prevent TS initialization errors
// https://github.com/microsoft/TypeScript/issues/34933


async function setupRequest(context, request) {
  const {
    config
  } = context;
  const {
    query
  } = context.params;
  const indices = await (0, _get_apm_indices.getApmIndices)({
    savedObjectsClient: context.core.savedObjects.client,
    config
  });
  const dynamicIndexPattern = await (0, _get_dynamic_index_pattern.getDynamicIndexPattern)({
    context,
    indices,
    processorEvent: query.processorEvent
  });
  const uiFiltersES = decodeUiFilters(dynamicIndexPattern, query.uiFilters);
  const coreSetupRequest = {
    indices,
    client: (0, _es_client.getESClient)(context, request, {
      clientAsInternalUser: false
    }),
    internalClient: (0, _es_client.getESClient)(context, request, {
      clientAsInternalUser: true
    }),
    config,
    dynamicIndexPattern
  };
  return { ...('start' in query ? {
      start: _moment.default.utc(query.start).valueOf()
    } : {}),
    ...('end' in query ? {
      end: _moment.default.utc(query.end).valueOf()
    } : {}),
    ...('uiFilters' in query ? {
      uiFiltersES
    } : {}),
    ...coreSetupRequest
  };
}