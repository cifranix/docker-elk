"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCancellableEffect = exports.createCancellationSignal = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createCancellationSignal = function createCancellationSignal() {
  var cancellationSignal = {
    isCancelled: false,
    cancel: function cancel() {
      cancellationSignal.isCancelled = true;
    }
  };
  return cancellationSignal;
};

exports.createCancellationSignal = createCancellationSignal;

var useCancellableEffect = function useCancellableEffect(effect, deps) {
  (0, _react.useEffect)(function () {
    var cancellationSignal = createCancellationSignal();
    effect(function () {
      return cancellationSignal.isCancelled;
    });
    return cancellationSignal.cancel; // the dependencies are managed externally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

exports.useCancellableEffect = useCancellableEffect;