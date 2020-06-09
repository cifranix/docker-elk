"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicIndexPatternRoute = exports.staticIndexPatternRoute = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _create_static_index_pattern = require("../lib/index_pattern/create_static_index_pattern");

var _create_route = require("./create_route");

var _setup_request = require("../lib/helpers/setup_request");

var _get_internal_saved_objects_client = require("../lib/helpers/get_internal_saved_objects_client");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const staticIndexPatternRoute = (0, _create_route.createRoute)(core => ({
  method: 'POST',
  path: '/api/apm/index_pattern/static',
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    const savedObjectsClient = await (0, _get_internal_saved_objects_client.getInternalSavedObjectsClient)(core);
    await (0, _create_static_index_pattern.createStaticIndexPattern)(setup, context, savedObjectsClient); // send empty response regardless of outcome

    return undefined;
  }
}));
exports.staticIndexPatternRoute = staticIndexPatternRoute;
const dynamicIndexPatternRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/index_pattern/dynamic',
  params: {
    query: t.partial({
      processorEvent: t.union([t.literal('transaction'), t.literal('metric'), t.literal('error')])
    })
  },
  handler: async ({
    context,
    request
  }) => {
    const {
      dynamicIndexPattern
    } = await (0, _setup_request.setupRequest)(context, request);
    return {
      dynamicIndexPattern
    };
  }
}));
exports.dynamicIndexPatternRoute = dynamicIndexPatternRoute;