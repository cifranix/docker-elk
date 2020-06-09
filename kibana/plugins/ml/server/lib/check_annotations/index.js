"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnnotationsFeatureAvailable = isAnnotationsFeatureAvailable;

var _log = require("../../client/log");

var _index_patterns = require("../../../common/constants/index_patterns");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Annotations Feature is available if:
// - ML_ANNOTATIONS_INDEX_PATTERN index is present
// - ML_ANNOTATIONS_INDEX_ALIAS_READ alias is present
// - ML_ANNOTATIONS_INDEX_ALIAS_WRITE alias is present
async function isAnnotationsFeatureAvailable(callAsCurrentUser) {
  try {
    const indexParams = {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_PATTERN
    };
    const annotationsIndexExists = await callAsCurrentUser('indices.exists', indexParams);

    if (!annotationsIndexExists) {
      return false;
    }

    const annotationsReadAliasExists = await callAsCurrentUser('indices.existsAlias', {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_READ,
      name: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_READ
    });

    if (!annotationsReadAliasExists) {
      return false;
    }

    const annotationsWriteAliasExists = await callAsCurrentUser('indices.existsAlias', {
      index: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_WRITE,
      name: _index_patterns.ML_ANNOTATIONS_INDEX_ALIAS_WRITE
    });

    if (!annotationsWriteAliasExists) {
      return false;
    }
  } catch (err) {
    _log.mlLog.info('Disabling ML annotations feature because the index/alias integrity check failed.');

    return false;
  }

  return true;
}