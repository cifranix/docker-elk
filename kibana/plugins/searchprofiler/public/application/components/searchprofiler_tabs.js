"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchProfilerTabs = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SearchProfilerTabs = function SearchProfilerTabs(_ref) {
  var activeTab = _ref.activeTab,
      activateTab = _ref.activateTab,
      has = _ref.has;
  return _react.default.createElement(_eui.EuiTabs, null, _react.default.createElement(_eui.EuiTab, {
    isSelected: activeTab === 'searches',
    disabled: !has.searches,
    onClick: function onClick() {
      return activateTab('searches');
    }
  }, _i18n.i18n.translate('xpack.searchProfiler.queryProfileTabTitle', {
    defaultMessage: 'Query Profile'
  })), _react.default.createElement(_eui.EuiTab, {
    isSelected: activeTab === 'aggregations',
    disabled: !has.aggregations,
    onClick: function onClick() {
      return activateTab('aggregations');
    }
  }, _i18n.i18n.translate('xpack.searchProfiler.aggregationProfileTabTitle', {
    defaultMessage: 'Aggregation Profile'
  })));
};

exports.SearchProfilerTabs = SearchProfilerTabs;