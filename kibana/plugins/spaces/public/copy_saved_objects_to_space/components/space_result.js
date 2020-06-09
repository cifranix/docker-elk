"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceResult = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _space_avatar = require("../../space_avatar");

var _copy_status_summary_indicator = require("./copy_status_summary_indicator");

var _space_result_details = require("./space_result_details");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SpaceResult = function SpaceResult(props) {
  var space = props.space,
      summarizedCopyResult = props.summarizedCopyResult,
      retries = props.retries,
      onRetriesChange = props.onRetriesChange,
      savedObject = props.savedObject,
      conflictResolutionInProgress = props.conflictResolutionInProgress;
  var spaceHasPendingOverwrites = retries.some(function (r) {
    return r.overwrite;
  });
  return _react.default.createElement(_eui.EuiAccordion, {
    id: "copyToSpace-".concat(space.id),
    "data-test-subj": "cts-space-result-".concat(space.id),
    className: "spcCopyToSpaceResult",
    buttonContent: _react.default.createElement(_eui.EuiFlexGroup, {
      responsive: false
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_space_avatar.SpaceAvatar, {
      space: space,
      size: "s"
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, null, space.name))),
    extraAction: _react.default.createElement(_copy_status_summary_indicator.CopyStatusSummaryIndicator, {
      space: space,
      summarizedCopyResult: summarizedCopyResult,
      conflictResolutionInProgress: conflictResolutionInProgress && spaceHasPendingOverwrites
    })
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_space_result_details.SpaceCopyResultDetails, {
    savedObject: savedObject,
    summarizedCopyResult: summarizedCopyResult,
    space: space,
    retries: retries,
    onRetriesChange: onRetriesChange,
    conflictResolutionInProgress: conflictResolutionInProgress && spaceHasPendingOverwrites
  }));
};

exports.SpaceResult = SpaceResult;