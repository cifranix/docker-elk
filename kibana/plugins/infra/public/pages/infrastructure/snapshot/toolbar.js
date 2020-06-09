"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotToolbar = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _autocomplete_field = require("../../../components/autocomplete_field");

var _toolbar = require("../../../components/eui/toolbar");

var _waffle_time_controls = require("../../../components/waffle/waffle_time_controls");

var _with_waffle_filters = require("../../../containers/waffle/with_waffle_filters");

var _with_waffle_time = require("../../../containers/waffle/with_waffle_time");

var _with_kuery_autocompletion = require("../../../containers/with_kuery_autocompletion");

var _with_source = require("../../../containers/with_source");

var _with_waffle_options = require("../../../containers/waffle/with_waffle_options");

var _waffle_inventory_switcher = require("../../../components/waffle/waffle_inventory_switcher");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SnapshotToolbar = function SnapshotToolbar() {
  return _react.default.createElement(_toolbar.Toolbar, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_with_waffle_options.WithWaffleOptions, null, function (_ref) {
    var changeMetric = _ref.changeMetric,
        changeNodeType = _ref.changeNodeType,
        changeGroupBy = _ref.changeGroupBy,
        changeAccount = _ref.changeAccount,
        changeRegion = _ref.changeRegion,
        changeCustomMetrics = _ref.changeCustomMetrics,
        nodeType = _ref.nodeType;
    return _react.default.createElement(_waffle_inventory_switcher.WaffleInventorySwitcher, {
      nodeType: nodeType,
      changeNodeType: changeNodeType,
      changeMetric: changeMetric,
      changeGroupBy: changeGroupBy,
      changeAccount: changeAccount,
      changeRegion: changeRegion,
      changeCustomMetrics: changeCustomMetrics
    });
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_with_source.WithSource, null, function (_ref2) {
    var createDerivedIndexPattern = _ref2.createDerivedIndexPattern;
    return _react.default.createElement(_with_kuery_autocompletion.WithKueryAutocompletion, {
      indexPattern: createDerivedIndexPattern('metrics')
    }, function (_ref3) {
      var isLoadingSuggestions = _ref3.isLoadingSuggestions,
          loadSuggestions = _ref3.loadSuggestions,
          suggestions = _ref3.suggestions;
      return _react.default.createElement(_with_waffle_filters.WithWaffleFilter, {
        indexPattern: createDerivedIndexPattern('metrics')
      }, function (_ref4) {
        var applyFilterQueryFromKueryExpression = _ref4.applyFilterQueryFromKueryExpression,
            filterQueryDraft = _ref4.filterQueryDraft,
            isFilterQueryDraftValid = _ref4.isFilterQueryDraftValid,
            setFilterQueryDraftFromKueryExpression = _ref4.setFilterQueryDraftFromKueryExpression;
        return _react.default.createElement(_autocomplete_field.AutocompleteField, {
          isLoadingSuggestions: isLoadingSuggestions,
          isValid: isFilterQueryDraftValid,
          loadSuggestions: loadSuggestions,
          onChange: setFilterQueryDraftFromKueryExpression,
          onSubmit: applyFilterQueryFromKueryExpression,
          placeholder: _i18n.i18n.translate('xpack.infra.homePage.toolbar.kqlSearchFieldPlaceholder', {
            defaultMessage: 'Search for infrastructure data… (e.g. host.name:host-1)'
          }),
          suggestions: suggestions,
          value: filterQueryDraft ? filterQueryDraft.expression : '',
          autoFocus: true
        });
      });
    });
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_with_waffle_time.WithWaffleTime, {
    resetOnUnmount: true
  }, function (_ref5) {
    var currentTime = _ref5.currentTime,
        isAutoReloading = _ref5.isAutoReloading,
        jumpToTime = _ref5.jumpToTime,
        startAutoReload = _ref5.startAutoReload,
        stopAutoReload = _ref5.stopAutoReload;
    return _react.default.createElement(_waffle_time_controls.WaffleTimeControls, {
      currentTime: currentTime,
      isLiveStreaming: isAutoReloading,
      onChangeTime: jumpToTime,
      startLiveStreaming: startAutoReload,
      stopLiveStreaming: stopAutoReload
    });
  }))));
};

exports.SnapshotToolbar = SnapshotToolbar;