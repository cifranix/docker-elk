"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRANSFORM_STATE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// reflects https://github.com/elastic/elasticsearch/blob/master/x-pack/plugin/core/src/main/java/org/elasticsearch/xpack/core/dataframe/transforms/DataFrameTransformStats.java#L243
let TRANSFORM_STATE;
exports.TRANSFORM_STATE = TRANSFORM_STATE;

(function (TRANSFORM_STATE) {
  TRANSFORM_STATE["ABORTING"] = "aborting";
  TRANSFORM_STATE["FAILED"] = "failed";
  TRANSFORM_STATE["INDEXING"] = "indexing";
  TRANSFORM_STATE["STARTED"] = "started";
  TRANSFORM_STATE["STOPPED"] = "stopped";
  TRANSFORM_STATE["STOPPING"] = "stopping";
})(TRANSFORM_STATE || (exports.TRANSFORM_STATE = TRANSFORM_STATE = {}));