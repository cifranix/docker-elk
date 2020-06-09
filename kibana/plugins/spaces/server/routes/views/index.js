"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSpacesViewsRoutes = initSpacesViewsRoutes;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initSpacesViewsRoutes(deps) {
  deps.viewRouter.get({
    path: '/spaces/space_selector',
    validate: false
  }, async (context, request, response) => {
    return response.ok({
      headers: {
        'Content-Security-Policy': deps.cspHeader
      },
      body: await context.core.rendering.render({
        includeUserSettings: true
      })
    });
  });
}