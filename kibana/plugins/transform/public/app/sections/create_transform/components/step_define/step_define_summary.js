"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepDefineSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

var _pivot_preview = require("../../../../components/pivot_preview");

var _aggregation_list = require("../aggregation_list");

var _group_by_list = require("../group_by_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StepDefineSummary = function StepDefineSummary(_ref) {
  var _ref$formState = _ref.formState,
      searchString = _ref$formState.searchString,
      searchQuery = _ref$formState.searchQuery,
      groupByList = _ref$formState.groupByList,
      aggList = _ref$formState.aggList,
      searchItems = _ref.searchItems;
  var pivotQuery = (0, _common.getPivotQuery)(searchQuery);
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      minWidth: '420px'
    }
  }, _react.default.createElement("div", {
    "data-test-subj": "transformStepDefineSummary"
  }, _react.default.createElement(_eui.EuiForm, null, searchItems.savedSearch === undefined && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.indexPatternLabel', {
      defaultMessage: 'Index pattern'
    })
  }, _react.default.createElement("span", null, searchItems.indexPattern.title)), typeof searchString === 'string' && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.queryLabel', {
      defaultMessage: 'Query'
    })
  }, _react.default.createElement("span", null, searchString)), typeof searchString === 'undefined' && !(0, _common.isDefaultQuery)(pivotQuery) && !(0, _common.isMatchAllQuery)(pivotQuery) && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.queryCodeBlockLabel', {
      defaultMessage: 'Query'
    })
  }, _react.default.createElement(_eui.EuiCodeBlock, {
    language: "js",
    fontSize: "s",
    paddingSize: "s",
    color: "light",
    overflowHeight: 300,
    isCopyable: true
  }, JSON.stringify(pivotQuery, null, 2)))), searchItems.savedSearch !== undefined && searchItems.savedSearch.id !== undefined && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.savedSearchLabel', {
      defaultMessage: 'Saved search'
    })
  }, _react.default.createElement("span", null, searchItems.savedSearch.title)), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.groupByLabel', {
      defaultMessage: 'Group by'
    })
  }, _react.default.createElement(_group_by_list.GroupByListSummary, {
    list: groupByList
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDefineSummary.aggregationsLabel', {
      defaultMessage: 'Aggregations'
    })
  }, _react.default.createElement(_aggregation_list.AggListSummary, {
    list: aggList
  }))))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_pivot_preview.PivotPreview, {
    aggs: aggList,
    groupBy: groupByList,
    indexPatternTitle: searchItems.indexPattern.title,
    query: pivotQuery
  }))));
};

exports.StepDefineSummary = StepDefineSummary;