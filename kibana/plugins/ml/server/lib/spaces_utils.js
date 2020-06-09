"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacesUtilsProvider = spacesUtilsProvider;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function spacesUtilsProvider(spacesPlugin, request) {
  async function activeSpace() {
    try {
      return {
        valid: true,
        space: await spacesPlugin.spacesService.getActiveSpace(request)
      };
    } catch (e) {
      return {
        valid: false
      };
    }
  }

  async function isMlEnabledInSpace() {
    const {
      valid,
      space
    } = await activeSpace();

    if (valid === true && space !== undefined) {
      return space.disabledFeatures.includes('ml') === false;
    }

    return true;
  }

  return {
    isMlEnabledInSpace
  };
}