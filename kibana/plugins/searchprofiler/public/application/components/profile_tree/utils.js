"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasVisibleChild = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hasVisibleChild = function hasVisibleChild(_ref) {
  var children = _ref.children;
  return Boolean(children && children.some(function (child) {
    return child.visible;
  }));
};

exports.hasVisibleChild = hasVisibleChild;