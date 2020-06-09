"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../../../app_context");

var _components = require("../../../../../components");

var _navigation = require("../../../../../services/navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabSummary = function TabSummary(_ref) {
  var policy = _ref.policy;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var version = policy.version,
      name = policy.name,
      modifiedDateMillis = policy.modifiedDateMillis,
      snapshotName = policy.snapshotName,
      repository = policy.repository,
      schedule = policy.schedule,
      nextExecutionMillis = policy.nextExecutionMillis,
      config = policy.config,
      stats = policy.stats,
      retention = policy.retention,
      isManagedPolicy = policy.isManagedPolicy;

  var _ref2 = config || {
    includeGlobalState: undefined,
    ignoreUnavailable: undefined,
    indices: undefined,
    partial: undefined
  },
      includeGlobalState = _ref2.includeGlobalState,
      ignoreUnavailable = _ref2.ignoreUnavailable,
      indices = _ref2.indices,
      partial = _ref2.partial;

  return _react.default.createElement(_react.Fragment, null, isManagedPolicy ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    size: "s",
    color: "warning",
    iconType: "iInCircle",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.managedPolicyWarningTitle",
      defaultMessage: "This is a managed policy used by other systems. Any changes you make might affect how these systems operate."
    })
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })) : null, stats && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    title: stats.snapshotsTaken,
    description: i18n.translate('xpack.snapshotRestore.policyDetails.snapshotsTakenStat', {
      defaultMessage: 'Snapshots'
    }),
    titleSize: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    title: stats.snapshotsFailed,
    description: i18n.translate('xpack.snapshotRestore.policyDetails.snapshotsFailedStat', {
      defaultMessage: 'Failures'
    }),
    titleSize: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    title: stats.snapshotsDeleted,
    description: i18n.translate('xpack.snapshotRestore.policyDetails.snapshotsDeletedStat', {
      defaultMessage: 'Deleted'
    }),
    titleSize: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    title: stats.snapshotDeletionFailures,
    description: i18n.translate('xpack.snapshotRestore.policyDetails.snapshotDeletionFailuresStat', {
      defaultMessage: 'Deletion failures'
    }),
    titleSize: "s"
  })))), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.generalTitle",
    defaultMessage: "General"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "version"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.versionLabel",
    defaultMessage: "Version"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, version)), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "modified"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.modifiedDateLabel",
    defaultMessage: "Last modified"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_components.FormattedDateTime, {
    epochMs: modifiedDateMillis
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "name"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.snapshotNameLabel",
    defaultMessage: "Snapshot name"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.linkToSnapshots)(undefined, name)
  }, snapshotName))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "repository"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.repositoryLabel",
    defaultMessage: "Repository"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.linkToRepository)(repository)
  }, repository)))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "schedule"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.scheduleLabel",
    defaultMessage: "Schedule"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, schedule)), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "execution"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.nextExecutionLabel",
    defaultMessage: "Next snapshot"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_components.FormattedDateTime, {
    epochMs: nextExecutionMillis
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "indices"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.indicesLabel",
    defaultMessage: "Indices"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_components.CollapsibleIndicesList, {
    indices: indices
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "includeGlobalState"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.ignoreUnavailableLabel",
    defaultMessage: "Ignore unavailable indices"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, ignoreUnavailable ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.ignoreUnavailableTrueLabel",
    defaultMessage: "Yes"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.ignoreUnavailableFalseLabel",
    defaultMessage: "No"
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "partial"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.partialLabel",
    defaultMessage: "Allow partial shards"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, partial ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.partialTrueLabel",
    defaultMessage: "Yes"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.partialFalseLabel",
    defaultMessage: "No"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "includeGlobalState"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.includeGlobalStateLabel",
    defaultMessage: "Include global state"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, includeGlobalState === false ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.includeGlobalStateFalseLabel",
    defaultMessage: "No"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.includeGlobalStateTrueLabel",
    defaultMessage: "Yes"
  }))))), retention && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.retentionTitle",
    defaultMessage: "Retention"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse"
  }, retention.expireAfterValue && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.expireAfterLabel",
    defaultMessage: "Delete after"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.expireAfterValue, retention.expireAfterUnit)), retention.minCount && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.minCountLabel",
    defaultMessage: "Min count"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.minCount)), retention.maxCount && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.maxCountLabel",
    defaultMessage: "Max count"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.maxCount)))));
};

exports.TabSummary = TabSummary;