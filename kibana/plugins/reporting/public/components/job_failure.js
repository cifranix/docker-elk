"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFailureToast = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getFailureToast = function getFailureToast(errorText, job, getManagmenetLink) {
  return {
    title: (0, _public.toMountPoint)(_react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.reporting.publicNotifier.error.couldNotCreateReportTitle",
      defaultMessage: "Could not create report for {reportObjectType} '{reportObjectTitle}'.",
      values: {
        reportObjectType: job.type,
        reportObjectTitle: job.title
      }
    })),
    text: (0, _public.toMountPoint)(_react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      size: "m",
      title: _i18n.i18n.translate('xpack.reporting.publicNotifier.error.calloutTitle', {
        defaultMessage: 'The reporting job failed'
      }),
      color: "danger",
      iconType: "alert"
    }, errorText), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.reporting.publicNotifier.error.checkManagement",
      defaultMessage: "More information is available at {path}.",
      values: {
        path: _react.default.createElement("a", {
          href: getManagmenetLink()
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.reporting.publicNotifier.error.reportingSectionUrlLinkLabel",
          defaultMessage: "Management > Kibana > Reporting"
        }))
      }
    })))),
    iconType: undefined,
    'data-test-subj': 'completeReportFailure'
  };
};

exports.getFailureToast = getFailureToast;