"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineAccountManagementRoutes = defineAccountManagementRoutes;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Defines routes required for the Account Management view.
 */
function defineAccountManagementRoutes({
  router,
  csp
}) {
  router.get({
    path: '/security/account',
    validate: false
  }, async (context, request, response) => {
    return response.ok({
      body: await context.core.rendering.render({
        includeUserSettings: true
      }),
      headers: {
        'content-security-policy': csp.header
      }
    });
  });
}