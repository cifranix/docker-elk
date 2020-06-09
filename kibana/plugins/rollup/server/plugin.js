"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollupPlugin = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class RollupPlugin {
  constructor(initContext) {
    _defineProperty(this, "initContext", void 0);

    this.initContext = initContext;
  }

  setup() {
    return {
      __legacy: {
        config: this.initContext.config,
        logger: this.initContext.logger
      }
    };
  }

  start() {}

  stop() {}

}

exports.RollupPlugin = RollupPlugin;