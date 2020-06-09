"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSwitcher = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ViewSwitcher = function ViewSwitcher(_ref) {
  var view = _ref.view,
      onChange = _ref.onChange;
  var buttons = [{
    id: 'map',
    label: _i18n.i18n.translate('xpack.infra.viewSwitcher.mapViewLabel', {
      defaultMessage: 'Map view'
    }),
    iconType: 'apps'
  }, {
    id: 'table',
    label: _i18n.i18n.translate('xpack.infra.viewSwitcher.tableViewLabel', {
      defaultMessage: 'Table view'
    }),
    iconType: 'editorUnorderedList'
  }];
  return _react.default.createElement(_eui.EuiButtonGroup, {
    legend: _i18n.i18n.translate('xpack.infra.viewSwitcher.lenged', {
      defaultMessage: 'Switch between table and map view'
    }),
    options: buttons,
    color: "primary",
    idSelected: view,
    onChange: onChange
  });
};

exports.ViewSwitcher = ViewSwitcher;