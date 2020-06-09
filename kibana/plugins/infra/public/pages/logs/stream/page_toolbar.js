"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsToolbar = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _autocomplete_field = require("../../../components/autocomplete_field");

var _eui2 = require("../../../components/eui");

var _log_customization_menu = require("../../../components/logging/log_customization_menu");

var _log_highlights_menu = require("../../../components/logging/log_highlights_menu");

var _log_highlights = require("../../../containers/logs/log_highlights/log_highlights");

var _log_text_scale_controls = require("../../../components/logging/log_text_scale_controls");

var _log_text_wrap_controls = require("../../../components/logging/log_text_wrap_controls");

var _log_flyout = require("../../../containers/logs/log_flyout");

var _log_view_configuration = require("../../../containers/logs/log_view_configuration");

var _log_filter = require("../../../containers/logs/log_filter");

var _log_position = require("../../../containers/logs/log_position");

var _source = require("../../../containers/source");

var _with_kuery_autocompletion = require("../../../containers/with_kuery_autocompletion");

var _log_datepicker = require("../../../components/logging/log_datepicker");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogsToolbar = function LogsToolbar() {
  var _useContext = (0, _react.useContext)(_source.Source.Context),
      createDerivedIndexPattern = _useContext.createDerivedIndexPattern;

  var derivedIndexPattern = createDerivedIndexPattern('logs');

  var _useContext2 = (0, _react.useContext)(_log_view_configuration.LogViewConfiguration.Context),
      availableTextScales = _useContext2.availableTextScales,
      setTextScale = _useContext2.setTextScale,
      setTextWrap = _useContext2.setTextWrap,
      textScale = _useContext2.textScale,
      textWrap = _useContext2.textWrap;

  var _useContext3 = (0, _react.useContext)(_log_filter.LogFilterState.Context),
      filterQueryDraft = _useContext3.filterQueryDraft,
      isFilterQueryDraftValid = _useContext3.isFilterQueryDraftValid,
      applyLogFilterQuery = _useContext3.applyLogFilterQuery,
      setLogFilterQueryDraft = _useContext3.setLogFilterQueryDraft;

  var _useContext4 = (0, _react.useContext)(_log_flyout.LogFlyout.Context),
      setSurroundingLogsId = _useContext4.setSurroundingLogsId;

  var _useContext5 = (0, _react.useContext)(_log_highlights.LogHighlightsState.Context),
      setHighlightTerms = _useContext5.setHighlightTerms,
      loadLogEntryHighlightsRequest = _useContext5.loadLogEntryHighlightsRequest,
      highlightTerms = _useContext5.highlightTerms,
      hasPreviousHighlight = _useContext5.hasPreviousHighlight,
      hasNextHighlight = _useContext5.hasNextHighlight,
      goToPreviousHighlight = _useContext5.goToPreviousHighlight,
      goToNextHighlight = _useContext5.goToNextHighlight;

  var _useContext6 = (0, _react.useContext)(_log_position.LogPositionState.Context),
      isStreaming = _useContext6.isStreaming,
      startLiveStreaming = _useContext6.startLiveStreaming,
      stopLiveStreaming = _useContext6.stopLiveStreaming,
      startDateExpression = _useContext6.startDateExpression,
      endDateExpression = _useContext6.endDateExpression,
      updateDateRange = _useContext6.updateDateRange;

  return _react.default.createElement(_eui2.Toolbar, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_with_kuery_autocompletion.WithKueryAutocompletion, {
    indexPattern: derivedIndexPattern
  }, function (_ref) {
    var isLoadingSuggestions = _ref.isLoadingSuggestions,
        loadSuggestions = _ref.loadSuggestions,
        suggestions = _ref.suggestions;
    return _react.default.createElement(_autocomplete_field.AutocompleteField, {
      isLoadingSuggestions: isLoadingSuggestions,
      isValid: isFilterQueryDraftValid,
      loadSuggestions: loadSuggestions,
      onChange: function onChange(expression) {
        setSurroundingLogsId(null);
        setLogFilterQueryDraft(expression);
      },
      onSubmit: function onSubmit(expression) {
        setSurroundingLogsId(null);
        applyLogFilterQuery(expression);
      },
      placeholder: _i18n.i18n.translate('xpack.infra.logsPage.toolbar.kqlSearchFieldPlaceholder', {
        defaultMessage: 'Search for log entries… (e.g. host.name:host-1)'
      }),
      suggestions: suggestions,
      value: filterQueryDraft ? filterQueryDraft.expression : '',
      "aria-label": _i18n.i18n.translate('xpack.infra.logsPage.toolbar.kqlSearchFieldAriaLabel', {
        defaultMessage: 'Search for log entries'
      })
    });
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_customization_menu.LogCustomizationMenu, null, _react.default.createElement(_log_text_wrap_controls.LogTextWrapControls, {
    wrap: textWrap,
    setTextWrap: setTextWrap
  }), _react.default.createElement(_log_text_scale_controls.LogTextScaleControls, {
    availableTextScales: availableTextScales,
    textScale: textScale,
    setTextScale: setTextScale
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_highlights_menu.LogHighlightsMenu, {
    onChange: setHighlightTerms,
    isLoading: loadLogEntryHighlightsRequest.state === 'pending',
    activeHighlights: highlightTerms.filter(function (highlightTerm) {
      return highlightTerm.length > 0;
    }).length > 0,
    goToPreviousHighlight: goToPreviousHighlight,
    goToNextHighlight: goToNextHighlight,
    hasPreviousHighlight: hasPreviousHighlight,
    hasNextHighlight: hasNextHighlight
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_datepicker.LogDatepicker, {
    startDateExpression: startDateExpression,
    endDateExpression: endDateExpression,
    onStartStreaming: startLiveStreaming,
    onStopStreaming: stopLiveStreaming,
    isStreaming: isStreaming,
    onUpdateDateRange: updateDateRange
  }))));
};

exports.LogsToolbar = LogsToolbar;