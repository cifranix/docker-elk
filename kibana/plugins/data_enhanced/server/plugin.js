"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.EnhancedDataServerPlugin = void 0;

var _common = require("../../../../src/plugins/data/common");

var _search = require("./search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class EnhancedDataServerPlugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;
  }

  setup(core, deps) {
    deps.data.search.registerSearchStrategyProvider(this.initializerContext.opaqueId, _common.ES_SEARCH_STRATEGY, _search.enhancedEsSearchStrategyProvider);
  }

  start(core) {}

  stop() {}

}

exports.Plugin = exports.EnhancedDataServerPlugin = EnhancedDataServerPlugin;