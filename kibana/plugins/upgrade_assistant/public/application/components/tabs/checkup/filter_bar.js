"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBar = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LocalizedOptions = {
  all: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.filterBar.allButtonLabel', {
    defaultMessage: 'all'
  }),
  critical: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.controls.filterBar.criticalButtonLabel', {
    defaultMessage: 'critical'
  })
};
var allFilterOptions = Object.keys(_types.LevelFilterOption);

var FilterBar = function FilterBar(_ref) {
  var _ref$allDeprecations = _ref.allDeprecations,
      allDeprecations = _ref$allDeprecations === void 0 ? [] : _ref$allDeprecations,
      currentFilter = _ref.currentFilter,
      onFilterChange = _ref.onFilterChange;
  var levelGroups = (0, _lodash.groupBy)(allDeprecations, 'level');
  var levelCounts = Object.keys(levelGroups).reduce(function (counts, level) {
    counts[level] = levelGroups[level].length;
    return counts;
  }, {});
  var allCount = allDeprecations.length;
  return _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFilterGroup, null, allFilterOptions.map(function (option) {
    return _react.default.createElement(_eui.EuiFilterButton, {
      key: option,
      onClick: onFilterChange.bind(null, option),
      hasActiveFilters: currentFilter === option,
      numFilters: option === _types.LevelFilterOption.all ? allCount : levelCounts[option] || undefined
    }, LocalizedOptions[option]);
  })));
};

exports.FilterBar = FilterBar;