"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _job_creator = require("../../../../../common/job_creator");

var _ml_server_info = require("../../../../../../../services/ml_server_info");

var _common = require("../common");

var _ml = require("../../../../../../../contexts/ml");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobDetails = function JobDetails() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var mlContext = (0, _ml.useMlContext)();
  var dateFormat = mlContext.kibanaConfig.get('dateFormat');

  var _getNewJobDefaults = (0, _ml_server_info.getNewJobDefaults)(),
      anomalyDetectors = _getNewJobDefaults.anomaly_detectors;

  var isAdvanced = (0, _job_creator.isAdvancedJobCreator)(jobCreator);
  var modelMemoryLimitDefault = anomalyDetectors.model_memory_limit || '';
  var modelMemoryLimit = jobCreator.modelMemoryLimit !== null ? jobCreator.modelMemoryLimit : _react.default.createElement(_common.Italic, null, "".concat(modelMemoryLimitDefault, " (").concat(_common.defaultLabel, ")"));
  var jobDetails = [{
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.jobDetails.title', {
      defaultMessage: 'Job ID'
    }),
    description: jobCreator.jobId
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.jobDescription.title', {
      defaultMessage: 'Job description'
    }),
    description: jobCreator.description.length > 0 ? jobCreator.description : _react.default.createElement(_common.Italic, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.summaryStep.jobDetails.jobDescription.placeholder",
      defaultMessage: "No description provided"
    }))
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.groups.title', {
      defaultMessage: 'Groups'
    }),
    description: jobCreator.groups.length > 0 ? jobCreator.groups.join(', ') : _react.default.createElement(_common.Italic, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.summaryStep.jobDetails.groups.placeholder",
      defaultMessage: "No groups selected"
    }))
  }];
  var detectorDetails = [{
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.bucketSpan.title', {
      defaultMessage: 'Bucket span'
    }),
    description: jobCreator.bucketSpan
  }];

  if ((0, _job_creator.isMultiMetricJobCreator)(jobCreator)) {
    detectorDetails.push({
      title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.splitField.title', {
        defaultMessage: 'Split field'
      }),
      description: (0, _job_creator.isMultiMetricJobCreator)(jobCreator) && jobCreator.splitField !== null ? jobCreator.splitField.name : _react.default.createElement(_common.Italic, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.newJob.wizard.summaryStep.jobDetails.splitField.placeholder",
        defaultMessage: "No split field selected"
      }))
    });
  }

  if ((0, _job_creator.isPopulationJobCreator)(jobCreator)) {
    detectorDetails.push({
      title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.populationField.title', {
        defaultMessage: 'Population field'
      }),
      description: (0, _job_creator.isPopulationJobCreator)(jobCreator) && jobCreator.splitField !== null ? jobCreator.splitField.name : _react.default.createElement("span", {
        style: {
          fontStyle: jobCreator.splitField !== null ? 'inherit' : 'italic'
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.newJob.wizard.summaryStep.jobDetails.populationField.placeholder",
        defaultMessage: "No population field selected"
      }))
    });
  }

  if (isAdvanced && jobCreator.categorizationFieldName !== null) {
    detectorDetails.push({
      title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.categorizationField.title', {
        defaultMessage: 'Categorization field'
      }),
      description: jobCreator.categorizationFieldName
    });
  }

  if (isAdvanced && jobCreator.summaryCountFieldName !== null) {
    detectorDetails.push({
      title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.summaryCountField.title', {
        defaultMessage: 'Summary count field'
      }),
      description: jobCreator.summaryCountFieldName
    });
  }

  detectorDetails.push({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.influencers.title', {
      defaultMessage: 'Influencers'
    }),
    description: jobCreator.influencers.length > 0 ? jobCreator.influencers.join(', ') : _react.default.createElement(_common.Italic, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.summaryStep.jobDetails.influencers.placeholder",
      defaultMessage: "No influencers selected"
    }))
  });
  var advancedDetails = [{
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.enableModelPlot.title', {
      defaultMessage: 'Enable model plot'
    }),
    description: jobCreator.modelPlot ? _common.trueLabel : _common.falseLabel
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.useDedicatedIndex.title', {
      defaultMessage: 'Use dedicated index'
    }),
    description: jobCreator.useDedicatedIndex ? _common.trueLabel : _common.falseLabel
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.jobDetails.modelMemoryLimit.title', {
      defaultMessage: 'Model memory limit'
    }),
    description: modelMemoryLimit
  }];
  var timeRangeDetails = [{
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.timeRange.start.title', {
      defaultMessage: 'Start'
    }),
    description: (0, _moment.default)(jobCreator.start).format(dateFormat)
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.timeRange.end.title', {
      defaultMessage: 'End'
    }),
    description: (0, _moment.default)(jobCreator.end).format(dateFormat)
  }];
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    listItems: jobDetails
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    listItems: detectorDetails
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    listItems: advancedDetails
  })), isAdvanced === false && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    listItems: timeRangeDetails
  })));
};

exports.JobDetails = JobDetails;