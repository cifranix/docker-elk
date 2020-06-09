"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _wizard = require("./wizard");

var _step_types = require("../components/step_types");

var _general = require("../../common/job_creator/util/general");

var _kibana = require("../../../../contexts/kibana");

var _job_creator = require("../../common/job_creator");

var _new_job = require("../../../../../../common/constants/new_job");

var _chart_loader = require("../../common/chart_loader");

var _results_loader = require("../../common/results_loader");

var _job_validator = require("../../common/job_validator");

var _ml = require("../../../../contexts/ml");

var _full_time_range_selector = require("../../../../components/full_time_range_selector");

var _time_buckets = require("../../../../util/time_buckets");

var _job_service = require("../../../../services/job_service");

var _anomaly_detection_jobs = require("../../../../../../common/types/anomaly_detection_jobs");

var _new_job_capabilities_service = require("../../../../services/new_job_capabilities_service");

var _fields = require("../../../../../../common/types/fields");

var _ml_server_info = require("../../../../services/ml_server_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_WIDTH = 1200; // document.querySelector('.single-metric-job-container').width();

var BAR_TARGET = PAGE_WIDTH > 2000 ? 1000 : PAGE_WIDTH / 2;
var MAX_BARS = BAR_TARGET + BAR_TARGET / 100 * 100; // 100% larger than bar target

var Page = function Page(_ref) {
  var existingJobsAndGroups = _ref.existingJobsAndGroups,
      jobType = _ref.jobType;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  var mlContext = (0, _ml.useMlContext)();
  var jobCreator = (0, _job_creator.jobCreatorFactory)(jobType)(mlContext.currentIndexPattern, mlContext.currentSavedSearch, mlContext.combinedQuery);

  var _getTimeFilterRange = (0, _full_time_range_selector.getTimeFilterRange)(),
      from = _getTimeFilterRange.from,
      to = _getTimeFilterRange.to;

  jobCreator.setTimeRange(from, to);
  var firstWizardStep = jobType === _new_job.JOB_TYPE.ADVANCED ? _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED : _step_types.WIZARD_STEPS.TIME_RANGE;
  var autoSetTimeRange = false;

  if (_job_service.mlJobService.tempJobCloningObjects.job !== undefined) {
    // cloning a job
    var clonedJob = _job_service.mlJobService.cloneJob(_job_service.mlJobService.tempJobCloningObjects.job);

    var _expandCombinedJobCon = (0, _anomaly_detection_jobs.expandCombinedJobConfig)(clonedJob),
        job = _expandCombinedJobCon.job,
        datafeed = _expandCombinedJobCon.datafeed;

    initCategorizationSettings();
    jobCreator.cloneFromExistingJob(job, datafeed); // if we're not skipping the time range, this is a standard job clone, so wipe the jobId

    if (_job_service.mlJobService.tempJobCloningObjects.skipTimeRangeStep === false) {
      jobCreator.jobId = '';
    } else if (jobType !== _new_job.JOB_TYPE.ADVANCED) {
      firstWizardStep = _step_types.WIZARD_STEPS.PICK_FIELDS;
    }

    _job_service.mlJobService.tempJobCloningObjects.skipTimeRangeStep = false;
    _job_service.mlJobService.tempJobCloningObjects.job = undefined;

    if (_job_service.mlJobService.tempJobCloningObjects.start !== undefined && _job_service.mlJobService.tempJobCloningObjects.end !== undefined) {
      // auto select the start and end dates for the time range picker
      jobCreator.setTimeRange(_job_service.mlJobService.tempJobCloningObjects.start, _job_service.mlJobService.tempJobCloningObjects.end);
      _job_service.mlJobService.tempJobCloningObjects.start = undefined;
      _job_service.mlJobService.tempJobCloningObjects.end = undefined;
    } else {
      // if not start and end times are set and this is an advanced job,
      // auto set the time range based on the index
      autoSetTimeRange = (0, _job_creator.isAdvancedJobCreator)(jobCreator);
    }

    if (_job_service.mlJobService.tempJobCloningObjects.calendars) {
      jobCreator.calendars = _job_service.mlJobService.tempJobCloningObjects.calendars;
      _job_service.mlJobService.tempJobCloningObjects.calendars = undefined;
    }
  } else {
    // creating a new job
    jobCreator.bucketSpan = _new_job.DEFAULT_BUCKET_SPAN;

    if (jobCreator.type !== _new_job.JOB_TYPE.POPULATION && jobCreator.type !== _new_job.JOB_TYPE.ADVANCED && jobCreator.type !== _new_job.JOB_TYPE.CATEGORIZATION) {
      // for all other than population or advanced, use 10MB
      jobCreator.modelMemoryLimit = _new_job.DEFAULT_MODEL_MEMORY_LIMIT;
    }

    if (jobCreator.type === _new_job.JOB_TYPE.SINGLE_METRIC) {
      jobCreator.modelPlot = true;
    }

    if (mlContext.currentSavedSearch !== null) {
      // Jobs created from saved searches cannot be cloned in the wizard as the
      // ML job config holds no reference to the saved search ID.
      jobCreator.createdBy = null;
    } // auto set the time range if creating a new advanced job


    autoSetTimeRange = (0, _job_creator.isAdvancedJobCreator)(jobCreator);
    initCategorizationSettings();

    if ((0, _job_creator.isCategorizationJobCreator)(jobCreator)) {
      var catFields = _new_job_capabilities_service.newJobCapsService.catFields;

      if (catFields.length === 1) {
        jobCreator.categorizationFieldName = catFields[0].name;
      }
    }
  }

  if (autoSetTimeRange && (0, _job_creator.isAdvancedJobCreator)(jobCreator)) {
    // for advanced jobs, load the full time range start and end times
    // so they can be used for job validation and bucket span estimation
    try {
      jobCreator.autoSetTimeRange();
    } catch (error) {
      var toasts = notifications.toasts;
      toasts.addDanger({
        title: _i18n.i18n.translate('xpack.ml.newJob.wizard.autoSetJobCreatorTimeRange.error', {
          defaultMessage: "Error retrieving beginning and end times of index"
        }),
        text: error
      });
    }
  }

  function initCategorizationSettings() {
    if ((0, _job_creator.isCategorizationJobCreator)(jobCreator)) {
      // categorization job will always use a count agg, so give it
      // to the job creator now
      var count = _new_job_capabilities_service.newJobCapsService.getAggById('count');

      var rare = _new_job_capabilities_service.newJobCapsService.getAggById('rare');

      var eventRate = _new_job_capabilities_service.newJobCapsService.getFieldById(_fields.EVENT_RATE_FIELD_ID);

      jobCreator.setDefaultDetectorProperties(count, rare, eventRate);

      var _getNewJobDefaults = (0, _ml_server_info.getNewJobDefaults)(),
          anomalyDetectors = _getNewJobDefaults.anomaly_detectors;

      jobCreator.categorizationAnalyzer = anomalyDetectors.categorization_analyzer;
    }
  }

  var chartInterval = new _time_buckets.TimeBuckets();
  chartInterval.setBarTarget(BAR_TARGET);
  chartInterval.setMaxBars(MAX_BARS);
  chartInterval.setInterval('auto');
  var chartLoader = new _chart_loader.ChartLoader(mlContext.currentIndexPattern, mlContext.combinedQuery);
  var jobValidator = new _job_validator.JobValidator(jobCreator, existingJobsAndGroups);
  var resultsLoader = new _results_loader.ResultsLoader(jobCreator, chartInterval, chartLoader);
  (0, _react.useEffect)(function () {
    return function () {
      jobCreator.forceStopRefreshPolls();
    };
  });
  var jobCreatorTitle = (0, _general.getJobCreatorTitle)(jobCreator);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPage, {
    style: {
      backgroundColor: 'inherit'
    },
    "data-test-subj": "mlPageJobWizard ".concat(jobType)
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.page.createJob",
    defaultMessage: "Create job"
  }), ": ", jobCreatorTitle)))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_wizard.Wizard, {
    jobCreator: jobCreator,
    chartLoader: chartLoader,
    resultsLoader: resultsLoader,
    chartInterval: chartInterval,
    jobValidator: jobValidator,
    existingJobsAndGroups: existingJobsAndGroups,
    firstWizardStep: firstWizardStep
  }))))));
};

exports.Page = Page;