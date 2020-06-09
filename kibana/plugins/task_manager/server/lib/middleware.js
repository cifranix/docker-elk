"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMiddlewareToChain = addMiddlewareToChain;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * BeforeSaveMiddlewareParams is nearly identical to RunContext, but
 * taskInstance is before save (no _id property)
 *
 * taskInstance property is guaranteed to exist. The params can optionally
 * include fields from an "options" object passed as the 2nd parameter to
 * taskManager.schedule()
 */
function addMiddlewareToChain(prevMiddleware, middleware) {
  const beforeSave = middleware.beforeSave ? params => middleware.beforeSave(params).then(prevMiddleware.beforeSave) : prevMiddleware.beforeSave;
  const beforeRun = middleware.beforeRun ? params => middleware.beforeRun(params).then(prevMiddleware.beforeRun) : prevMiddleware.beforeRun;
  const beforeMarkRunning = middleware.beforeMarkRunning ? params => middleware.beforeMarkRunning(params).then(prevMiddleware.beforeMarkRunning) : prevMiddleware.beforeMarkRunning;
  return {
    beforeSave,
    beforeRun,
    beforeMarkRunning
  };
}