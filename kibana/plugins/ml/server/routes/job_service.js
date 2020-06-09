"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobServiceRoutes = jobServiceRoutes;

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _job_service_schema = require("./schemas/job_service_schema");

var _job_service = require("../models/job_service");

var _new_job = require("../models/job_service/new_job");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Routes for job service
 */
function jobServiceRoutes({
  router,
  mlLicense
}) {
  async function hasPermissionToCreateJobs(callAsCurrentUser) {
    if (mlLicense.isSecurityEnabled() === false) {
      return true;
    }

    const resp = await callAsCurrentUser('ml.privilegeCheck', {
      body: {
        cluster: ['cluster:admin/xpack/ml/job/put', 'cluster:admin/xpack/ml/job/open', 'cluster:admin/xpack/ml/datafeeds/put']
      }
    });
    return resp.has_all_requested;
  }
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/force_start_datafeeds Start datafeeds
   * @apiName ForceStartDatafeeds
   * @apiDescription Starts one or more datafeeds
   */


  router.post({
    path: '/api/ml/jobs/force_start_datafeeds',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.forceStartDatafeedSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        forceStartDatafeeds
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        datafeedIds,
        start,
        end
      } = request.body;
      const resp = await forceStartDatafeeds(datafeedIds, start, end);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/stop_datafeeds Stop datafeeds
   * @apiName StopDatafeeds
   * @apiDescription Stops one or more datafeeds
   */

  router.post({
    path: '/api/ml/jobs/stop_datafeeds',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.datafeedIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        stopDatafeeds
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        datafeedIds
      } = request.body;
      const resp = await stopDatafeeds(datafeedIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/delete_jobs Delete jobs
   * @apiName DeleteJobs
   * @apiDescription Deletes an existing anomaly detection job
   */

  router.post({
    path: '/api/ml/jobs/delete_jobs',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        deleteJobs
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobIds
      } = request.body;
      const resp = await deleteJobs(jobIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/close_jobs Close jobs
   * @apiName CloseJobs
   * @apiDescription Closes one or more anomaly detection jobs
   */

  router.post({
    path: '/api/ml/jobs/close_jobs',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        closeJobs
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobIds
      } = request.body;
      const resp = await closeJobs(jobIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/jobs_summary Jobs summary
   * @apiName JobsSummary
   * @apiDescription Creates a summary jobs list. Jobs include job stats, datafeed stats, and calendars.
   */

  router.post({
    path: '/api/ml/jobs/jobs_summary',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        jobsSummary
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobIds
      } = request.body;
      const resp = await jobsSummary(jobIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/jobs_with_time_range Jobs with time range
   * @apiName JobsWithTimeRange
   * @apiDescription Creates a list of jobs with data about the job's time range
   */

  router.post({
    path: '/api/ml/jobs/jobs_with_time_range',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobsWithTimerangeSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        jobsWithTimerange
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await jobsWithTimerange();
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/jobs Create jobs list
   * @apiName CreateFullJobsList
   * @apiDescription Creates a list of jobs
   */

  router.post({
    path: '/api/ml/jobs/jobs',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        createFullJobsList
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobIds
      } = request.body;
      const resp = await createFullJobsList(jobIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {get} /api/ml/jobs/groups Get job groups
   * @apiName GetAllGroups
   * @apiDescription Returns array of group objects with job ids listed for each group
   */

  router.get({
    path: '/api/ml/jobs/groups',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        getAllGroups
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await getAllGroups();
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/update_groups Update job groups
   * @apiName UpdateGroups
   * @apiDescription Updates 'groups' property of an anomaly detection job
   */

  router.post({
    path: '/api/ml/jobs/update_groups',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.updateGroupsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        updateGroups
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobs
      } = request.body;
      const resp = await updateGroups(jobs);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {get} /api/ml/jobs/deleting_jobs_tasks Get deleting  job tasks
   * @apiName DeletingJobTasks
   * @apiDescription Gets the ids of deleting anomaly detection jobs
   */

  router.get({
    path: '/api/ml/jobs/deleting_jobs_tasks',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        deletingJobTasks
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await deletingJobTasks();
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/jobs_exist Check if jobs exist
   * @apiName JobsExist
   * @apiDescription Checks if each of the jobs in the specified list of IDs exist
   */

  router.post({
    path: '/api/ml/jobs/jobs_exist',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.jobIdsSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        jobsExist
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobIds
      } = request.body;
      const resp = await jobsExist(jobIds);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {get} /api/ml/jobs/new_job_caps/:indexPattern Get new job capabilities
   * @apiName NewJobCaps
   * @apiDescription Retrieve the capabilities of fields for indices
   */

  router.get({
    path: '/api/ml/jobs/new_job_caps/{indexPattern}',
    validate: {
      params: _configSchema.schema.object({
        indexPattern: _configSchema.schema.string()
      }),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        rollup: _configSchema.schema.maybe(_configSchema.schema.string())
      }))
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        indexPattern
      } = request.params;
      const isRollup = request.query.rollup === 'true';
      const savedObjectsClient = context.core.savedObjects.client;
      const {
        newJobCaps
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await newJobCaps(indexPattern, isRollup, savedObjectsClient);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/new_job_line_chart Get job line chart data
   * @apiName NewJobLineChart
   * @apiDescription Returns line chart data for anomaly detection job
   */

  router.post({
    path: '/api/ml/jobs/new_job_line_chart',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.chartSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        indexPatternTitle,
        timeField,
        start,
        end,
        intervalMs,
        query,
        aggFieldNamePairs,
        splitFieldName,
        splitFieldValue
      } = request.body;
      const {
        newJobLineChart
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await newJobLineChart(indexPatternTitle, timeField, start, end, intervalMs, query, aggFieldNamePairs, splitFieldName, splitFieldValue);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/new_job_population_chart Get population job chart data
   * @apiName NewJobPopulationChart
   * @apiDescription Returns population job chart data
   */

  router.post({
    path: '/api/ml/jobs/new_job_population_chart',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.chartSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        indexPatternTitle,
        timeField,
        start,
        end,
        intervalMs,
        query,
        aggFieldNamePairs,
        splitFieldName
      } = request.body;
      const {
        newJobPopulationChart
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await newJobPopulationChart(indexPatternTitle, timeField, start, end, intervalMs, query, aggFieldNamePairs, splitFieldName);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {get} /api/ml/jobs/all_jobs_and_group_ids Get all job and group IDs
   * @apiName GetAllJobAndGroupIds
   * @apiDescription Returns a list of all job IDs and all group IDs
   */

  router.get({
    path: '/api/ml/jobs/all_jobs_and_group_ids',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        getAllJobAndGroupIds
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const resp = await getAllJobAndGroupIds();
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/look_back_progress Get lookback progress
   * @apiName GetLookBackProgress
   * @apiDescription Returns current progress of anomaly detection job
   */

  router.post({
    path: '/api/ml/jobs/look_back_progress',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.lookBackProgressSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        getLookBackProgress
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobId,
        start,
        end
      } = request.body;
      const resp = await getLookBackProgress(jobId, start, end);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/categorization_field_examples Get categorization field examples
   * @apiName ValidateCategoryExamples
   * @apiDescription Validates category examples
   */

  router.post({
    path: '/api/ml/jobs/categorization_field_examples',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.categorizationFieldExamplesSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      // due to the use of the _analyze endpoint which is called by the kibana user,
      // basic job creation privileges are required to use this endpoint
      if ((await hasPermissionToCreateJobs(context.ml.mlClient.callAsCurrentUser)) === false) {
        throw _boom.default.forbidden('Insufficient privileges, the machine_learning_admin role is required.');
      }

      const {
        validateCategoryExamples
      } = (0, _new_job.categorizationExamplesProvider)(context.ml.mlClient.callAsCurrentUser, context.ml.mlClient.callAsInternalUser);
      const {
        indexPatternTitle,
        timeField,
        query,
        size,
        field,
        start,
        end,
        analyzer
      } = request.body;
      const resp = await validateCategoryExamples(indexPatternTitle, query, size, field, timeField, start, end, analyzer);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup JobService
   *
   * @api {post} /api/ml/jobs/top_categories Get top categories
   * @apiName TopCategories
   * @apiDescription Returns list of top categories
   */

  router.post({
    path: '/api/ml/jobs/top_categories',
    validate: {
      body: _configSchema.schema.object(_job_service_schema.topCategoriesSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        topCategories
      } = (0, _job_service.jobServiceProvider)(context.ml.mlClient.callAsCurrentUser);
      const {
        jobId,
        count
      } = request.body;
      const resp = await topCategories(jobId, count);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}