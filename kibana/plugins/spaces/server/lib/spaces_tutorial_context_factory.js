"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpacesTutorialContextFactory = createSpacesTutorialContextFactory;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createSpacesTutorialContextFactory(spacesService) {
  return function spacesTutorialContextFactory(request) {
    return {
      spaceId: spacesService.getSpaceId(request),
      isInDefaultSpace: spacesService.isInDefaultSpace(request)
    };
  };
}