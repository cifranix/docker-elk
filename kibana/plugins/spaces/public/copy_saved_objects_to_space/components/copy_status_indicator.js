"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyStatusIndicator = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CopyStatusIndicator = function CopyStatusIndicator(props) {
  var summarizedCopyResult = props.summarizedCopyResult,
      conflictResolutionInProgress = props.conflictResolutionInProgress;

  if (summarizedCopyResult.processing || conflictResolutionInProgress) {
    return _react.default.createElement(_eui.EuiLoadingSpinner, null);
  }

  var objectResult = summarizedCopyResult.objects.find(function (o) {
    return o.type === props.object.type && o.id === props.object.id;
  });
  var successful = !objectResult.hasUnresolvableErrors && (objectResult.conflicts.length === 0 || props.overwritePending === true);
  var successColor = props.overwritePending ? 'warning' : 'success';
  var hasConflicts = objectResult.conflicts.length > 0;
  var hasUnresolvableErrors = objectResult.hasUnresolvableErrors;

  if (successful) {
    var message = props.overwritePending ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.copyStatus.pendingOverwriteMessage",
      defaultMessage: "Saved object will be overwritten. Click 'Skip' to cancel this operation."
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpace.copyStatus.successMessage",
      defaultMessage: "Saved object copied successfully."
    });
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'check',
      color: successColor,
      content: message
    });
  }

  if (hasUnresolvableErrors) {
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'cross',
      color: 'danger',
      "data-test-subj": "cts-object-result-error-".concat(objectResult.id),
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatus.unresolvableErrorMessage",
        defaultMessage: "There was an error copying this saved object."
      })
    });
  }

  if (hasConflicts) {
    return _react.default.createElement(_eui.EuiIconTip, {
      type: 'alert',
      color: 'warning',
      content: _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatus.conflictsMessage",
        defaultMessage: "A saved object with a matching id ({id}) already exists in this space.",
        values: {
          id: objectResult.conflicts[0].obj.id
        }
      })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyStatus.conflictsOverwriteMessage",
        defaultMessage: "Click 'Overwrite' to replace this version with the copied one."
      })))
    });
  }

  return null;
};

exports.CopyStatusIndicator = CopyStatusIndicator;