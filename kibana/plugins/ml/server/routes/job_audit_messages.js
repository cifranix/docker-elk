"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobAuditMessagesRoutes = jobAuditMessagesRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _job_audit_messages = require("../models/job_audit_messages");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Routes for job audit message routes
 */
function jobAuditMessagesRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup JobAuditMessages
   *
   * @api {get} /api/ml/job_audit_messages/messages/:jobId Get audit messages
   * @apiName GetJobAuditMessages
   * @apiDescription Returns audit messages for specified job ID
   */
  router.get({
    path: '/api/ml/job_audit_messages/messages/{jobId}',
    validate: {
      params: _configSchema.schema.object({
        jobId: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        from: _configSchema.schema.maybe(_configSchema.schema.any())
      }))
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        getJobAuditMessages
      } = (0, _job_audit_messages.jobAuditMessagesProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobId
      } = request.params;
      const {
        from
      } = request.query;
      const resp = await getJobAuditMessages(jobId, from);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobAuditMessages
   *
   * @api {get} /api/ml/job_audit_messages/messages Get all audit messages
   * @apiName GetAllJobAuditMessages
   * @apiDescription Returns all audit messages
   */

  router.get({
    path: '/api/ml/job_audit_messages/messages',
    validate: {
      params: _configSchema.schema.object({
        jobId: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        from: _configSchema.schema.maybe(_configSchema.schema.any())
      }))
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        getJobAuditMessages
      } = (0, _job_audit_messages.jobAuditMessagesProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        from
      } = request.query;
      const resp = await getJobAuditMessages(undefined, from);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}