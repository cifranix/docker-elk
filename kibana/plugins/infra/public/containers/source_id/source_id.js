"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceSourceIdInQueryString = exports.useSourceId = void 0;

var runtimeTypes = _interopRequireWildcard(require("io-ts"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _use_url_state = require("../../utils/use_url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SOURCE_ID_URL_STATE_KEY = 'sourceId';

var useSourceId = function useSourceId() {
  return (0, _use_url_state.useUrlState)({
    defaultState: 'default',
    decodeUrlState: decodeSourceIdUrlState,
    encodeUrlState: encodeSourceIdUrlState,
    urlStateKey: SOURCE_ID_URL_STATE_KEY
  });
};

exports.useSourceId = useSourceId;

var replaceSourceIdInQueryString = function replaceSourceIdInQueryString(sourceId) {
  return (0, _use_url_state.replaceStateKeyInQueryString)(SOURCE_ID_URL_STATE_KEY, sourceId);
};

exports.replaceSourceIdInQueryString = replaceSourceIdInQueryString;
var sourceIdRuntimeType = runtimeTypes.union([runtimeTypes.string, runtimeTypes.undefined]);
var encodeSourceIdUrlState = sourceIdRuntimeType.encode;

var decodeSourceIdUrlState = function decodeSourceIdUrlState(value) {
  return (0, _pipeable.pipe)(sourceIdRuntimeType.decode(value), (0, _Either.fold)((0, _function.constant)(undefined), _function.identity));
};