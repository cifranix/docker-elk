"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithSource = void 0;

var _react = require("react");

var _source = require("../source");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WithSource = function WithSource(_ref) {
  var children = _ref.children;

  var _useContext = (0, _react.useContext)(_source.Source.Context),
      createSourceConfiguration = _useContext.createSourceConfiguration,
      createDerivedIndexPattern = _useContext.createDerivedIndexPattern,
      source = _useContext.source,
      sourceExists = _useContext.sourceExists,
      sourceId = _useContext.sourceId,
      metricIndicesExist = _useContext.metricIndicesExist,
      logIndicesExist = _useContext.logIndicesExist,
      isLoading = _useContext.isLoading,
      loadSource = _useContext.loadSource,
      hasFailedLoadingSource = _useContext.hasFailedLoadingSource,
      loadSourceFailureMessage = _useContext.loadSourceFailureMessage,
      updateSourceConfiguration = _useContext.updateSourceConfiguration,
      version = _useContext.version;

  return children({
    create: createSourceConfiguration,
    configuration: source && source.configuration,
    createDerivedIndexPattern: createDerivedIndexPattern,
    exists: sourceExists,
    hasFailed: hasFailedLoadingSource,
    isLoading: isLoading,
    lastFailureMessage: loadSourceFailureMessage,
    load: loadSource,
    logIndicesExist: logIndicesExist,
    metricIndicesExist: metricIndicesExist,
    sourceId: sourceId,
    update: updateSourceConfiguration,
    version: version
  });
};

exports.WithSource = WithSource;