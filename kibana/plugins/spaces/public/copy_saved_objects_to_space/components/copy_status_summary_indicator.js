"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyStatusSummaryIndicator = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CopyStatusSummaryIndicator = function CopyStatusSummaryIndicator(props) {
  var summarizedCopyResult = props.summarizedCopyResult;

  var getDataTestSubj = function getDataTestSubj(status) {
    return "cts-summary-indicator-".concat(status, "-").concat(props.space.id);
  };

  if (summarizedCopyResult.processing || props.conflictResolutionInProgress) {
    return _react.default.createElement(_eui.EuiLoadingSpinner, {
      "data-test-subj": getDataTestSubj('loading')
    });
  }

  if (summarizedCopyResult.successful) {
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'check',
      color: 'success',
      iconProps: {
        'data-test-subj': getDataTestSubj('success')
      },
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatusSummary.successMessage",
        defaultMessage: "Copied successfully to the {space} space.",
        values: {
          space: props.space.name
        }
      })
    });
  }

  if (summarizedCopyResult.hasUnresolvableErrors) {
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'cross',
      color: 'danger',
      iconProps: {
        'data-test-subj': getDataTestSubj('failed')
      },
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatusSummary.failedMessage",
        defaultMessage: "Copy to the {space} space failed. Expand this section for details.",
        values: {
          space: props.space.name
        }
      })
    });
  }

  if (summarizedCopyResult.hasConflicts) {
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'alert',
      color: 'warning',
      iconProps: {
        'data-test-subj': getDataTestSubj('conflicts')
      },
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatusSummary.conflictsMessage",
        defaultMessage: "One or more conflicts detected in the {space} space. Expand this section to resolve.",
        values: {
          space: props.space.name
        }
      })
    });
  }

  return null;
};

exports.CopyStatusSummaryIndicator = CopyStatusSummaryIndicator;