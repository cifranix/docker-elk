"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupByBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LocalizedOptions = {
  message: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.groupByBar.byIssueLabel', {
    defaultMessage: 'by issue'
  }),
  index: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.groupByBar.byIndexLabel', {
    defaultMessage: 'by index'
  })
};

var GroupByBar = function GroupByBar(_ref) {
  var availableGroupByOptions = _ref.availableGroupByOptions,
      currentGroupBy = _ref.currentGroupBy,
      onGroupByChange = _ref.onGroupByChange;

  if (availableGroupByOptions.length <= 1) {
    return null;
  }

  return _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, availableGroupByOptions.map(function (option) {
    return _react.default.createElement(_eui.EuiFilterButton, {
      key: option,
      onClick: onGroupByChange.bind(null, option),
      hasActiveFilters: currentGroupBy === option
    }, LocalizedOptions[option]);
  })));
};

exports.GroupByBar = GroupByBar;