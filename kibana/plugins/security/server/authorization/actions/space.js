"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceActions = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class SpaceActions {
  constructor(versionNumber) {
    _defineProperty(this, "prefix", void 0);

    this.prefix = `space:${versionNumber}:`;
  }

  get manage() {
    return `${this.prefix}manage`;
  }

}

exports.SpaceActions = SpaceActions;