"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeneralErrorToast = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getGeneralErrorToast = function getGeneralErrorToast(errorText, err) {
  return {
    text: (0, _public.toMountPoint)(_react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: errorText,
      color: "danger",
      iconType: "alert"
    }, err.toString()), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.reporting.publicNotifier.error.tryRefresh",
      defaultMessage: "Try refreshing the page."
    }))),
    iconType: undefined
  };
};

exports.getGeneralErrorToast = getGeneralErrorToast;