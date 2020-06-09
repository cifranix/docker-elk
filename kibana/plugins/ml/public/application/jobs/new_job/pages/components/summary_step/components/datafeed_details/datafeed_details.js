"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatafeedDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _ml_job_editor = require("../../../../../../jobs_list/components/ml_job_editor");

var _job_utils = require("../../../../../../../../../common/util/job_utils");

var _new_job = require("../../../../../../../../../common/constants/new_job");

var _ml_server_info = require("../../../../../../../services/ml_server_info");

var _common = require("../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EDITOR_HEIGHT = '200px';

var DatafeedDetails = function DatafeedDetails() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var _getNewJobDefaults = (0, _ml_server_info.getNewJobDefaults)(),
      datafeeds = _getNewJobDefaults.datafeeds;

  var queryString = JSON.stringify(jobCreator.query, null, 2);
  var defaultFrequency = (0, _job_utils.calculateDatafeedFrequencyDefaultSeconds)(jobCreator.bucketSpanMs / 1000);
  var scrollSizeDefault = datafeeds.scroll_size || '';

  var queryDelay = jobCreator.queryDelay || _react.default.createElement(_common.Italic, null, "".concat(_new_job.DEFAULT_QUERY_DELAY, " (").concat(_common.defaultLabel, ")"));

  var frequency = jobCreator.frequency || _react.default.createElement(_common.Italic, null, "".concat(defaultFrequency, "s (").concat(_common.defaultLabel, ")"));

  var scrollSize = jobCreator.scrollSize !== null ? "".concat(jobCreator.scrollSize) : _react.default.createElement(_common.Italic, null, "".concat(scrollSizeDefault, " (").concat(_common.defaultLabel, ")"));
  var datafeedDetails = [{
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.datafeedDetails.timeField.title', {
      defaultMessage: 'Time field'
    }),
    description: jobCreator.timeFieldName
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.datafeedDetails.queryDelay.title', {
      defaultMessage: 'Query delay'
    }),
    description: queryDelay
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.datafeedDetails.frequency.title', {
      defaultMessage: 'Frequency'
    }),
    description: frequency
  }, {
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.datafeedDetails.scrollSize.title', {
      defaultMessage: 'Scroll size'
    }),
    description: scrollSize
  }];

  var queryTitle = _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.datafeedDetails.query.title', {
    defaultMessage: 'Elasticsearch query'
  });

  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: queryTitle,
    fullWidth: true
  }, _react.default.createElement(_ml_job_editor.MLJobEditor, {
    value: queryString,
    height: EDITOR_HEIGHT,
    readOnly: true
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
    compressed: true,
    listItems: datafeedDetails
  })));
};

exports.DatafeedDetails = DatafeedDetails;