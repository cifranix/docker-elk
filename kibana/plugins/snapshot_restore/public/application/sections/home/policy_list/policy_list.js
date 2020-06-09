"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../common/constants");

var _components = require("../../../components");

var _constants2 = require("../../../constants");

var _http = require("../../../services/http");

var _navigation = require("../../../services/navigation");

var _authorization = require("../../../lib/authorization");

var _app_context = require("../../../app_context");

var _policy_details = require("./policy_details");

var _policy_table = require("./policy_table");

var _policy_retention_schedule = require("./policy_retention_schedule");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PolicyList = function PolicyList(_ref) {
  var policyName = _ref.match.params.policyName,
      history = _ref.history;

  var _useLoadPolicies = (0, _http.useLoadPolicies)(),
      error = _useLoadPolicies.error,
      isLoading = _useLoadPolicies.isLoading,
      _useLoadPolicies$data = _useLoadPolicies.data;

  _useLoadPolicies$data = _useLoadPolicies$data === void 0 ? {
    policies: undefined
  } : _useLoadPolicies$data;
  var policies = _useLoadPolicies$data.policies,
      reload = _useLoadPolicies.sendRequest;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService; // Load retention cluster settings


  var _useLoadRetentionSett = (0, _http.useLoadRetentionSettings)(),
      isLoadingRetentionSettings = _useLoadRetentionSett.isLoading,
      retentionSettingsError = _useLoadRetentionSett.error,
      retentionSettings = _useLoadRetentionSett.data,
      reloadRetentionSettings = _useLoadRetentionSett.sendRequest;

  var openPolicyDetailsUrl = function openPolicyDetailsUrl(newPolicyName) {
    return (0, _navigation.linkToPolicy)(newPolicyName);
  };

  var closePolicyDetails = function closePolicyDetails() {
    history.push("".concat(_constants2.BASE_PATH, "/policies"));
  };

  var onPolicyDeleted = function onPolicyDeleted(policiesDeleted) {
    if (policyName && policiesDeleted.includes(policyName)) {
      closePolicyDetails();
    }

    if (policiesDeleted.length) {
      reload();
    }
  };

  var onPolicyExecuted = function onPolicyExecuted() {
    reload();
  }; // Track component loaded


  (0, _react.useEffect)(function () {
    uiMetricService.trackUiMetric(_constants2.UIM_POLICY_LIST_LOAD);
  }, [uiMetricService]);
  var content;

  if (isLoading) {
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyList.loadingPoliciesDescription",
      defaultMessage: "Loading policies\u2026"
    }));
  } else if (error) {
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.LoadingPoliciesErrorMessage",
        defaultMessage: "Error loading policies"
      }),
      error: error
    });
  } else if (policies && policies.length === 0) {
    content = _react.default.createElement(_eui.EuiEmptyPrompt, {
      iconType: "managementApp",
      title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.emptyPromptTitle",
        defaultMessage: "Create your first snapshot policy"
      })),
      body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.emptyPromptDescription",
        defaultMessage: "A policy automates the creation and deletion of snapshots."
      }))),
      actions: _react.default.createElement(_eui.EuiButton, {
        href: (0, _navigation.linkToAddPolicy)(),
        fill: true,
        iconType: "plusInCircle",
        "data-test-subj": "createPolicyButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.createPolicyButton",
        defaultMessage: "Create a policy"
      })),
      "data-test-subj": "emptyPrompt"
    });
  } else {
    var policySchedules = policies.map(function (policy) {
      return policy.schedule;
    });
    var hasDuplicateSchedules = policySchedules.length > new Set(policySchedules).size;
    var hasRetention = Boolean(policies.find(function (policy) {
      return policy.retention;
    }));
    content = _react.default.createElement(_react.Fragment, null, hasDuplicateSchedules ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyScheduleWarningTitle",
        defaultMessage: "Two or more policies have the same schedule"
      }),
      color: "warning",
      iconType: "alert"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyScheduleWarningDescription",
      defaultMessage: "Only one snapshot can be taken at a time. To avoid snapshot failures, edit or delete the policies."
    })), _react.default.createElement(_eui.EuiSpacer, null)) : null, hasRetention ? _react.default.createElement(_policy_retention_schedule.PolicyRetentionSchedule, {
      retentionSettings: retentionSettings,
      onRetentionScheduleUpdated: reloadRetentionSettings,
      isLoading: isLoadingRetentionSettings,
      error: retentionSettingsError
    }) : null, _react.default.createElement(_policy_table.PolicyTable, {
      policies: policies || [],
      reload: reload,
      openPolicyDetailsUrl: openPolicyDetailsUrl,
      onPolicyDeleted: onPolicyDeleted,
      onPolicyExecuted: onPolicyExecuted
    }));
  }

  return _react.default.createElement(_authorization.WithPrivileges, {
    privileges: _constants.APP_SLM_CLUSTER_PRIVILEGES.map(function (name) {
      return "cluster.".concat(name);
    })
  }, function (_ref2) {
    var hasPrivileges = _ref2.hasPrivileges,
        privilegesMissing = _ref2.privilegesMissing;
    return hasPrivileges ? _react.default.createElement("section", {
      "data-test-subj": "policyList"
    }, policyName ? _react.default.createElement(_policy_details.PolicyDetails, {
      policyName: policyName,
      onClose: closePolicyDetails,
      onPolicyDeleted: onPolicyDeleted,
      onPolicyExecuted: onPolicyExecuted
    }) : null, content) : _react.default.createElement(_authorization.NotAuthorizedSection, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.deniedPrivilegeTitle",
        defaultMessage: "You're missing cluster privileges"
      }),
      message: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.deniedPrivilegeDescription",
        defaultMessage: "To manage Snapshot Lifecycle Policies, you must have {privilegesCount, plural, one {this cluster privilege} other {these cluster privileges}}: {missingPrivileges}.",
        values: {
          missingPrivileges: privilegesMissing.cluster.join(', '),
          privilegesCount: privilegesMissing.cluster.length
        }
      })
    });
  });
};

exports.PolicyList = PolicyList;