"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutCreateDrilldown = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _form_create_drilldown = require("../form_create_drilldown");

var _flyout_frame = require("../flyout_frame");

var _i18n = require("./i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlyoutCreateDrilldown = function FlyoutCreateDrilldown(_ref) {
  var context = _ref.context,
      onClose = _ref.onClose;

  var footer = _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {},
    fill: true
  }, _i18n.txtCreateDrilldown);

  return _react.default.createElement(_flyout_frame.FlyoutFrame, {
    title: _i18n.txtCreateDrilldown,
    footer: footer,
    onClose: onClose
  }, _react.default.createElement(_form_create_drilldown.FormCreateDrilldown, null));
};

exports.FlyoutCreateDrilldown = FlyoutCreateDrilldown;