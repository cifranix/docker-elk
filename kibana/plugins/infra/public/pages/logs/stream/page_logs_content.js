"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPageLogsContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _auto_sizer = require("../../../components/auto_sizer");

var _log_entry_flyout = require("../../../components/logging/log_entry_flyout");

var _log_minimap = require("../../../components/logging/log_minimap");

var _log_text_stream = require("../../../components/logging/log_text_stream");

var _page = require("../../../components/page");

var _log_summary = require("../../../containers/logs/log_summary");

var _log_view_configuration = require("../../../containers/logs/log_view_configuration");

var _log_filter = require("../../../containers/logs/log_filter");

var _log_flyout = require("../../../containers/logs/log_flyout");

var _log_position = require("../../../containers/logs/log_position");

var _with_log_textview = require("../../../containers/logs/with_log_textview");

var _with_stream_items = require("../../../containers/logs/with_stream_items");

var _source = require("../../../containers/source");

var _page_toolbar = require("./page_toolbar");

var _log_highlights = require("../../../containers/logs/log_highlights");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  overflow: hidden;\n  min-width: 100px;\n  max-width: 100px;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogsPageLogsContent = function LogsPageLogsContent() {
  var _useContext = (0, _react.useContext)(_source.Source.Context),
      source = _useContext.source,
      sourceId = _useContext.sourceId,
      version = _useContext.version;

  var _useContext2 = (0, _react.useContext)(_log_view_configuration.LogViewConfiguration.Context),
      textScale = _useContext2.textScale,
      textWrap = _useContext2.textWrap;

  var _useContext3 = (0, _react.useContext)(_log_flyout.LogFlyout.Context),
      setFlyoutVisibility = _useContext3.setFlyoutVisibility,
      flyoutVisible = _useContext3.flyoutVisible,
      setFlyoutId = _useContext3.setFlyoutId,
      surroundingLogsId = _useContext3.surroundingLogsId,
      setSurroundingLogsId = _useContext3.setSurroundingLogsId,
      flyoutItem = _useContext3.flyoutItem,
      isLoading = _useContext3.isLoading;

  var _useContext4 = (0, _react.useContext)(_log_highlights.LogHighlightsState.Context),
      logSummaryHighlights = _useContext4.logSummaryHighlights;

  var _useContext5 = (0, _react.useContext)(_log_filter.LogFilterState.Context),
      applyLogFilterQuery = _useContext5.applyLogFilterQuery;

  var _useContext6 = (0, _react.useContext)(_log_position.LogPositionState.Context),
      isStreaming = _useContext6.isStreaming,
      targetPosition = _useContext6.targetPosition,
      visibleMidpointTime = _useContext6.visibleMidpointTime,
      visibleTimeInterval = _useContext6.visibleTimeInterval,
      reportVisiblePositions = _useContext6.reportVisiblePositions,
      jumpToTargetPosition = _useContext6.jumpToTargetPosition,
      startLiveStreaming = _useContext6.startLiveStreaming,
      stopLiveStreaming = _useContext6.stopLiveStreaming,
      startDateExpression = _useContext6.startDateExpression,
      endDateExpression = _useContext6.endDateExpression,
      updateDateRange = _useContext6.updateDateRange;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_with_log_textview.WithLogTextviewUrlState, null), _react.default.createElement(_log_flyout.WithFlyoutOptionsUrlState, null), _react.default.createElement(_page_toolbar.LogsToolbar, null), flyoutVisible ? _react.default.createElement(_log_entry_flyout.LogEntryFlyout, {
    setFilter: applyLogFilterQuery,
    setTarget: function setTarget(timeKey, flyoutItemId) {
      jumpToTargetPosition(timeKey);
      setSurroundingLogsId(flyoutItemId);
      stopLiveStreaming();
    },
    setFlyoutVisibility: setFlyoutVisibility,
    flyoutItem: flyoutItem,
    loading: isLoading
  }) : null, _react.default.createElement(_page.PageContent, {
    key: "".concat(sourceId, "-").concat(version)
  }, _react.default.createElement(_with_stream_items.WithStreamItems, null, function (_ref) {
    var currentHighlightKey = _ref.currentHighlightKey,
        hasMoreAfterEnd = _ref.hasMoreAfterEnd,
        hasMoreBeforeStart = _ref.hasMoreBeforeStart,
        isLoadingMore = _ref.isLoadingMore,
        isReloading = _ref.isReloading,
        items = _ref.items,
        lastLoadedTime = _ref.lastLoadedTime,
        fetchNewerEntries = _ref.fetchNewerEntries,
        checkForNewEntries = _ref.checkForNewEntries;
    return _react.default.createElement(_log_text_stream.ScrollableLogTextStreamView, {
      columnConfigurations: source && source.configuration.logColumns || [],
      hasMoreAfterEnd: hasMoreAfterEnd,
      hasMoreBeforeStart: hasMoreBeforeStart,
      isLoadingMore: isLoadingMore,
      isReloading: isReloading,
      isStreaming: isStreaming,
      items: items,
      jumpToTarget: jumpToTargetPosition,
      lastLoadedTime: lastLoadedTime,
      loadNewerItems: fetchNewerEntries,
      reloadItems: checkForNewEntries,
      reportVisibleInterval: reportVisiblePositions,
      scale: textScale,
      target: targetPosition,
      wrap: textWrap,
      setFlyoutItem: setFlyoutId,
      setFlyoutVisibility: setFlyoutVisibility,
      highlightedItem: surroundingLogsId ? surroundingLogsId : null,
      currentHighlightKey: currentHighlightKey,
      startDateExpression: startDateExpression,
      endDateExpression: endDateExpression,
      updateDateRange: updateDateRange,
      startLiveStreaming: startLiveStreaming
    });
  }), _react.default.createElement(_auto_sizer.AutoSizer, {
    content: true,
    bounds: true,
    detectAnyWindowResize: "height"
  }, function (_ref2) {
    var measureRef = _ref2.measureRef,
        _ref2$bounds$height = _ref2.bounds.height,
        height = _ref2$bounds$height === void 0 ? 0 : _ref2$bounds$height,
        _ref2$content$width = _ref2.content.width,
        width = _ref2$content$width === void 0 ? 0 : _ref2$content$width;
    return _react.default.createElement(LogPageMinimapColumn, {
      ref: measureRef
    }, _react.default.createElement(_log_summary.WithSummary, null, function (_ref3) {
      var buckets = _ref3.buckets,
          start = _ref3.start,
          end = _ref3.end;
      return _react.default.createElement(_with_stream_items.WithStreamItems, null, function (_ref4) {
        var isReloading = _ref4.isReloading;
        return _react.default.createElement(_log_minimap.LogMinimap, {
          start: start,
          end: end,
          height: height,
          width: width,
          highlightedInterval: isReloading ? null : visibleTimeInterval,
          jumpToTarget: jumpToTargetPosition,
          summaryBuckets: buckets,
          summaryHighlightBuckets: logSummaryHighlights.length > 0 ? logSummaryHighlights[0].buckets : [],
          target: visibleMidpointTime
        });
      });
    }));
  })));
};

exports.LogsPageLogsContent = LogsPageLogsContent;

var LogPageMinimapColumn = _public.euiStyled.div(_templateObject());