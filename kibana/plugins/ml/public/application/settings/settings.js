"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _navigation_menu = require("../components/navigation_menu");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Settings = function Settings(_ref) {
  var canGetFilters = _ref.canGetFilters,
      canGetCalendars = _ref.canGetCalendars;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "settings"
  }), _react.default.createElement(_eui.EuiPage, {
    className: "mlSettingsPage",
    "data-test-subj": "mlPageSettings"
  }, _react.default.createElement(_eui.EuiPageBody, {
    className: "mlSettingsPage__body"
  }, _react.default.createElement(_eui.EuiPageContent, {
    className: "mlSettingsPage__content",
    horizontalPosition: "center"
  }, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.settings.jobManagementTitle",
    defaultMessage: "Job Management"
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "ml_calendar_mng_button",
    size: "l",
    color: "primary",
    href: "#/settings/calendars_list",
    isDisabled: canGetCalendars === false
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.settings.calendarManagementButtonLabel",
    defaultMessage: "Calendar management"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "ml_filter_lists_button",
    size: "l",
    color: "primary",
    href: "#/settings/filter_lists",
    isDisabled: canGetFilters === false
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.settings.filterListsButtonLabel",
    defaultMessage: "Filter Lists"
  }))))))));
};

exports.Settings = Settings;