"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../constants");

var _components = require("../../../../../components");

var _navigation = require("../../../../../services/navigation");

var _snapshot_state = require("./snapshot_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabSummary = function TabSummary(_ref) {
  var snapshotDetails = _ref.snapshotDetails;
  var versionId = snapshotDetails.versionId,
      version = snapshotDetails.version,
      includeGlobalState = snapshotDetails.includeGlobalState,
      indices = snapshotDetails.indices,
      state = snapshotDetails.state,
      startTimeInMillis = snapshotDetails.startTimeInMillis,
      endTimeInMillis = snapshotDetails.endTimeInMillis,
      durationInMillis = snapshotDetails.durationInMillis,
      uuid = snapshotDetails.uuid,
      policyName = snapshotDetails.policyName;
  return _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse"
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "version"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemVersionLabel",
    defaultMessage: "Version / Version ID"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, version, " / ", versionId)), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "uuid"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemUuidLabel",
    defaultMessage: "UUID"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, uuid))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "state"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemStateLabel",
    defaultMessage: "State"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_snapshot_state.SnapshotState, {
    state: state
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "includeGlobalState"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateLabel",
    defaultMessage: "Includes global state"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, includeGlobalState ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateYesLabel",
    defaultMessage: "Yes"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemIncludeGlobalStateNoLabel",
    defaultMessage: "No"
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "indices"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemIndicesLabel",
    defaultMessage: "Indices ({indicesCount})",
    values: {
      indicesCount: indices.length
    }
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_components.CollapsibleIndicesList, {
    indices: indices
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "startTime"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemStartTimeLabel",
    defaultMessage: "Start time"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_components.DataPlaceholder, {
    data: startTimeInMillis
  }, _react.default.createElement(_components.FormattedDateTime, {
    epochMs: startTimeInMillis
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "endTime"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemEndTimeLabel",
    defaultMessage: "End time"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, state === _constants.SNAPSHOT_STATE.IN_PROGRESS ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }) : _react.default.createElement(_components.DataPlaceholder, {
    data: endTimeInMillis
  }, _react.default.createElement(_components.FormattedDateTime, {
    epochMs: endTimeInMillis
  }))))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "duration"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemDurationLabel",
    defaultMessage: "Duration"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, state === _constants.SNAPSHOT_STATE.IN_PROGRESS ? _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  }) : _react.default.createElement(_components.DataPlaceholder, {
    data: durationInMillis
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.itemDurationValueLabel",
    "data-test-subj": "srSnapshotDetailsDurationValue",
    defaultMessage: "{seconds} {seconds, plural, one {second} other {seconds}}",
    values: {
      seconds: Math.ceil(durationInMillis / 1000)
    }
  })))), policyName ? _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "policy"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
    "data-test-subj": "title"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.createdByLabel",
    defaultMessage: "Created by"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
    className: "eui-textBreakWord",
    "data-test-subj": "value"
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.linkToPolicy)(policyName)
  }, policyName))) : null));
};

exports.TabSummary = TabSummary;