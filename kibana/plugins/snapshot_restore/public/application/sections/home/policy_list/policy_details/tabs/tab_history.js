"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabHistory = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _components = require("../../../../../components");

var _navigation = require("../../../../../services/navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabHistory = function TabHistory(_ref) {
  var policy = _ref.policy;
  var lastSuccess = policy.lastSuccess,
      lastFailure = policy.lastFailure,
      nextExecutionMillis = policy.nextExecutionMillis,
      name = policy.name,
      repository = policy.repository;

  var renderLastSuccess = function renderLastSuccess() {
    if (!lastSuccess) {
      return null;
    }

    var time = lastSuccess.time,
        snapshotName = lastSuccess.snapshotName;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastSuccessTitle",
      defaultMessage: "Last successful snapshot"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "successDate"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastSuccess.dateLabel",
      defaultMessage: "Date"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
      className: "eui-textBreakWord",
      "data-test-subj": "value"
    }, _react.default.createElement(_components.FormattedDateTime, {
      epochMs: time
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "successSnapshot"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastSuccess.snapshotNameLabel",
      defaultMessage: "Snapshot name"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
      className: "eui-textBreakWord",
      "data-test-subj": "value"
    }, _react.default.createElement(_eui.EuiLink, {
      href: (0, _navigation.linkToSnapshot)(repository, snapshotName)
    }, snapshotName))))));
  };

  var renderLastFailure = function renderLastFailure() {
    if (!lastFailure) {
      return null;
    }

    var time = lastFailure.time,
        snapshotName = lastFailure.snapshotName,
        details = lastFailure.details;
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastFailureTitle",
      defaultMessage: "Last snapshot failure"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiDescriptionList, {
      textStyle: "reverse"
    }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "failureDate"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastFailure.dateLabel",
      defaultMessage: "Date"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
      className: "eui-textBreakWord",
      "data-test-subj": "value"
    }, _react.default.createElement(_components.FormattedDateTime, {
      epochMs: time
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "failureSnapshot"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastFailure.snapshotNameLabel",
      defaultMessage: "Snapshot name"
    })), _react.default.createElement(_eui.EuiDescriptionListDescription, {
      className: "eui-textBreakWord",
      "data-test-subj": "value"
    }, snapshotName))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
      "data-test-subj": "failureDetails"
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.lastFailure.detailsLabel",
      defaultMessage: "Details"
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiDescriptionListDescription, {
      className: "eui-textBreakWord",
      "data-test-subj": "value"
    }, _react.default.createElement(_eui.EuiCodeEditor, {
      mode: "json",
      theme: "textmate",
      width: "100%",
      isReadOnly: true,
      value: JSON.stringify(details, null, 2),
      setOptions: {
        showLineNumbers: false,
        tabSize: 2
      },
      editorProps: {
        $blockScrolling: Infinity
      },
      minLines: 6,
      maxLines: 12,
      wrapEnabled: true,
      showGutter: false,
      "aria-label": _i18n.i18n.translate('xpack.snapshotRestore.policyDetails.lastFailure.detailsAriaLabel', {
        defaultMessage: "Last failure details for policy '{name}'",
        values: {
          name: name
        }
      })
    }))))));
  };

  return lastSuccess || lastFailure ? _react.default.createElement(_react.Fragment, null, renderLastSuccess(), lastSuccess && lastFailure ? _react.default.createElement(_eui.EuiHorizontalRule, null) : null, renderLastFailure()) : _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.noHistoryMessage",
    defaultMessage: "This policy will run on {date} at {time}.",
    values: {
      date: _react.default.createElement(_components.FormattedDateTime, {
        epochMs: nextExecutionMillis,
        type: "date"
      }),
      time: _react.default.createElement(_components.FormattedDateTime, {
        epochMs: nextExecutionMillis,
        type: "time"
      })
    }
  })));
};

exports.TabHistory = TabHistory;