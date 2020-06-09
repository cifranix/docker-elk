"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyStepReview = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _lib = require("../../../../../common/lib");

var _app_context = require("../../../app_context");

var _collapsible_indices_list = require("../../collapsible_indices_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PolicyStepReview = function PolicyStepReview(_ref) {
  var policy = _ref.policy,
      updateCurrentStep = _ref.updateCurrentStep;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var name = policy.name,
      snapshotName = policy.snapshotName,
      schedule = policy.schedule,
      repository = policy.repository,
      config = policy.config,
      retention = policy.retention;

  var _ref2 = config || {
    indices: undefined,
    includeGlobalState: undefined,
    ignoreUnavailable: undefined,
    partial: undefined
  },
      indices = _ref2.indices,
      includeGlobalState = _ref2.includeGlobalState,
      ignoreUnavailable = _ref2.ignoreUnavailable,
      partial = _ref2.partial;

  var serializedPolicy = (0, _lib.serializePolicy)(policy);
  var serializedRetention = serializedPolicy.retention;

  var EditStepTooltip = function EditStepTooltip(_ref3) {
    var step = _ref3.step;
    return _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.editStepTooltip",
        defaultMessage: "Edit"
      })
    }, _react.default.createElement(_eui.EuiLink, {
      onClick: function onClick() {
        return updateCurrentStep(step);
      }
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "pencil",
      "aria-label": i18n.translate('xpack.snapshotRestore.policyForm.stepReview.editIconAriaLabel', {
        defaultMessage: 'Edit step'
      })
    })));
  };

  var renderSummaryTab = function renderSummaryTab() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.sectionLogisticsTitle",
      defaultMessage: "Logistics"
    }), ' ', _react.default.createElement(EditStepTooltip, {
      step: 1
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.nameLabel",
      defaultMessage: "Policy name"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, name))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.snapshotNameLabel",
      defaultMessage: "Snapshot name"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, snapshotName)))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.repositoryLabel",
      defaultMessage: "Repository"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, repository))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.scheduleLabel",
      defaultMessage: "Schedule"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, schedule)))), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.sectionSettingsTitle",
      defaultMessage: "Snapshot settings"
    }), ' ', _react.default.createElement(EditStepTooltip, {
      step: 2
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.indicesLabel",
      defaultMessage: "Indices"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, _react.default.createElement(_collapsible_indices_list.CollapsibleIndicesList, {
      indices: indices
    })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.ignoreUnavailableLabel",
      defaultMessage: "Ignore unavailable indices"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, ignoreUnavailable ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.ignoreUnavailableTrueLabel",
      defaultMessage: "Yes"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.ignoreUnavailableFalseLabel",
      defaultMessage: "No"
    }))))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.partialLabel",
      defaultMessage: "Allow partial shards"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, partial ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.partialTrueLabel",
      defaultMessage: "Yes"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.partialFalseLabel",
      defaultMessage: "No"
    })))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.includeGlobalStateLabel",
      defaultMessage: "Include global state"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, includeGlobalState === false ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.includeGlobalStateFalseLabel",
      defaultMessage: "No"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.summaryTab.includeGlobalStateTrueLabel",
      defaultMessage: "Yes"
    }))))), serializedRetention ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.retentionTab.sectionRetentionTitle",
      defaultMessage: "Snapshot retention"
    }), ' ', _react.default.createElement(EditStepTooltip, {
      step: 3
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, retention.expireAfterValue && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.retentionTab.expireAfterLabel",
      defaultMessage: "Delete after"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.expireAfterValue, retention.expireAfterUnit)), retention.minCount && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.retentionTab.minCountLabel",
      defaultMessage: "Min count"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.minCount)), retention.maxCount && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyForm.stepReview.retentionTab.maxCountLabel",
      defaultMessage: "Max count"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, retention.maxCount)))) : null);
  };

  var renderRequestTab = function renderRequestTab() {
    var endpoint = "PUT _slm/policy/".concat(name);
    var json = JSON.stringify(serializedPolicy, null, 2);
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      isCopyable: true
    }, "".concat(endpoint, "\n").concat(json)));
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyForm.stepReviewTitle",
    defaultMessage: "Review policy"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTabbedContent, {
    tabs: [{
      id: 'summary',
      name: i18n.translate('xpack.snapshotRestore.policyForm.stepReview.summaryTabTitle', {
        defaultMessage: 'Summary'
      }),
      content: renderSummaryTab()
    }, {
      id: 'json',
      name: i18n.translate('xpack.snapshotRestore.policyForm.stepReview.requestTabTitle', {
        defaultMessage: 'Request'
      }),
      content: renderRequestTab()
    }]
  }));
};

exports.PolicyStepReview = PolicyStepReview;