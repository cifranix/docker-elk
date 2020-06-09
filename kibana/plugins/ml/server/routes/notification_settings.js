"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationRoutes = notificationRoutes;

var _error_wrapper = require("../client/error_wrapper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Routes for notification settings
 */
function notificationRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup NotificationSettings
   *
   * @api {get} /api/ml/notification_settings Get notification settings
   * @apiName GetNotificationSettings
   * @apiDescription Returns cluster notification settings
   */
  router.get({
    path: '/api/ml/notification_settings',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const params = {
        includeDefaults: true,
        filterPath: '**.xpack.notification'
      };
      const resp = await context.ml.mlClient.callAsCurrentUser('cluster.getSettings', params);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}