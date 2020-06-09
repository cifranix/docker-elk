"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _module_jobs = require("./module_jobs");

var _group_color_utils = require("../../../../../../common/util/group_color_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobItem = (0, _react.memo)(function (_ref) {
  var job = _ref.job,
      jobOverride = _ref.jobOverride,
      isSaving = _ref.isSaving,
      jobPrefix = _ref.jobPrefix,
      onEditRequest = _ref.onEditRequest;
  var id = job.id,
      _job$config = job.config,
      description = _job$config.description,
      groups = _job$config.groups,
      datafeedResult = job.datafeedResult,
      setupResult = job.setupResult;
  var jobGroups = jobOverride && jobOverride.groups || groups;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    justifyContent: "spaceBetween",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "secondary"
  }, jobPrefix, id)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "right",
    content: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.job.overrideJobConfigurationLabel",
      defaultMessage: "Override job configuration"
    })
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": _i18n.i18n.translate('xpack.ml.newJob.recognize.job.overrideJobConfigurationLabel', {
      defaultMessage: 'Override job configuration'
    }),
    iconType: "pencil",
    onClick: function onClick() {
      return onEditRequest(job);
    }
  })))), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, description), _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    responsive: false,
    gutterSize: "xs"
  }, jobGroups.map(function (group) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      key: group
    }, _react.default.createElement(_eui.EuiBadge, {
      color: (0, _group_color_utils.tabColor)(group)
    }, group));
  })), setupResult && setupResult.error && _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "danger"
  }, setupResult.error.msg), datafeedResult && datafeedResult.error && _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "danger"
  }, datafeedResult.error.msg)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      width: _module_jobs.SETUP_RESULTS_WIDTH
    }
  }, isSaving && _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }), setupResult && datafeedResult && _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    wrap: false,
    responsive: false,
    justifyContent: "spaceAround"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: setupResult.success ? 'check' : 'cross',
    color: setupResult.success ? 'secondary' : 'danger',
    size: "m",
    "aria-label": setupResult.success ? _i18n.i18n.translate('xpack.ml.newJob.recognize.job.savedAriaLabel', {
      defaultMessage: 'Saved'
    }) : _i18n.i18n.translate('xpack.ml.newJob.recognize.job.saveFailedAriaLabel', {
      defaultMessage: 'Save failed'
    })
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: datafeedResult.success ? 'check' : 'cross',
    color: datafeedResult.success ? 'secondary' : 'danger',
    size: "m",
    "aria-label": setupResult.success ? _i18n.i18n.translate('xpack.ml.newJob.recognize.datafeed.savedAriaLabel', {
      defaultMessage: 'Saved'
    }) : _i18n.i18n.translate('xpack.ml.newJob.recognize.datafeed.saveFailedAriaLabel', {
      defaultMessage: 'Save failed'
    })
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: datafeedResult.started ? 'check' : 'cross',
    color: datafeedResult.started ? 'secondary' : 'danger',
    size: "m",
    "aria-label": setupResult.success ? _i18n.i18n.translate('xpack.ml.newJob.recognize.running.startedAriaLabel', {
      defaultMessage: 'Started'
    }) : _i18n.i18n.translate('xpack.ml.newJob.recognize.running.startFailedAriaLabel', {
      defaultMessage: 'Start failed'
    })
  })))));
});
exports.JobItem = JobItem;