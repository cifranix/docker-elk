"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateResultCallout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _page = require("../page");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateResultCallout = (0, _react.memo)(function (_ref) {
  var saveState = _ref.saveState,
      resultsUrl = _ref.resultsUrl,
      onReset = _ref.onReset;

  if (saveState === _page.SAVE_STATE.NOT_SAVED) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, saveState === _page.SAVE_STATE.SAVED && _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.jobsCreatedTitle",
      defaultMessage: "Jobs created"
    }),
    color: "success",
    iconType: "checkInCircleFilled"
  }), saveState === _page.SAVE_STATE.FAILED && _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.simple.recognize.jobsCreationFailedTitle",
      defaultMessage: "Jobs creation failed"
    }),
    color: "danger",
    iconType: "alert"
  }), saveState === _page.SAVE_STATE.PARTIAL_FAILURE && _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.someJobsCreationFailedTitle",
      defaultMessage: "Some jobs failed to be created"
    }),
    color: "warning",
    iconType: "alert"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    alignItems: "center"
  }, saveState !== _page.SAVE_STATE.SAVING && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    fill: false,
    "aria-label": _i18n.i18n.translate('xpack.ml.newJi18n(ob.recognize.jobsCreationFailed.resetButtonAriaLabel', {
      defaultMessage: 'Reset'
    }),
    onClick: onReset
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.someJobsCreationFailed.resetButtonLabel",
    defaultMessage: "Reset"
  }))), (saveState === _page.SAVE_STATE.SAVED || saveState === _page.SAVE_STATE.PARTIAL_FAILURE) && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    color: "primary",
    fill: true,
    href: resultsUrl,
    "aria-label": _i18n.i18n.translate('xpack.ml.newJob.recognize.viewResultsAriaLabel', {
      defaultMessage: 'View Results'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.viewResultsLinkText",
    defaultMessage: "View Results"
  })))));
});
exports.CreateResultCallout = CreateResultCallout;