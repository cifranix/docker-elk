"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessorEvent = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let ProcessorEvent;
exports.ProcessorEvent = ProcessorEvent;

(function (ProcessorEvent) {
  ProcessorEvent["transaction"] = "transaction";
  ProcessorEvent["error"] = "error";
  ProcessorEvent["metric"] = "metric";
})(ProcessorEvent || (exports.ProcessorEvent = ProcessorEvent = {}));