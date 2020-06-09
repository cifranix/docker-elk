"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAnalyticsFlyoutWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _create_analytics_advanced_editor = require("../create_analytics_advanced_editor");

var _create_analytics_form = require("../create_analytics_form");

var _create_analytics_flyout = require("../create_analytics_flyout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateAnalyticsFlyoutWrapper = function CreateAnalyticsFlyoutWrapper(props) {
  var _props$state = props.state,
      isAdvancedEditorEnabled = _props$state.isAdvancedEditorEnabled,
      isModalVisible = _props$state.isModalVisible;

  if (isModalVisible === false) {
    return null;
  }

  return _react.default.createElement(_create_analytics_flyout.CreateAnalyticsFlyout, props, isAdvancedEditorEnabled === false && _react.default.createElement(_create_analytics_form.CreateAnalyticsForm, props), isAdvancedEditorEnabled === true && _react.default.createElement(_create_analytics_advanced_editor.CreateAnalyticsAdvancedEditor, props));
};

exports.CreateAnalyticsFlyoutWrapper = CreateAnalyticsFlyoutWrapper;