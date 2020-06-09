"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabSettings = function TabSettings(_ref) {
  var templateDetails = _ref.templateDetails;
  var settings = templateDetails.settings;

  if (settings && Object.keys(settings).length) {
    return _react.default.createElement("div", {
      "data-test-subj": "settingsTab"
    }, _react.default.createElement(_eui.EuiCodeBlock, {
      lang: "json"
    }, JSON.stringify(settings, null, 2)));
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.settingsTab.noSettingsTitle",
      defaultMessage: "No settings defined."
    }),
    iconType: "pin",
    "data-test-subj": "noSettingsCallout"
  });
};

exports.TabSettings = TabSettings;