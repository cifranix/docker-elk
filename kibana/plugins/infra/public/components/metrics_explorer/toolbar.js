"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerToolbar = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _toolbar = require("../eui/toolbar");

var _kuery_bar = require("./kuery_bar");

var _metrics = require("./metrics");

var _group_by = require("./group_by");

var _aggregation = require("./aggregation");

var _chart_options = require("./chart_options");

var _toolbar_control = require("../saved_views/toolbar_control");

var _metrics_explorer_view = require("../../../common/saved_objects/metrics_explorer_view");

var _use_kibana_ui_setting = require("../../utils/use_kibana_ui_setting");

var _map_timepicker_quickranges_to_datepicker_ranges = require("../../utils/map_timepicker_quickranges_to_datepicker_ranges");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsExplorerToolbar = function MetricsExplorerToolbar(_ref) {
  var timeRange = _ref.timeRange,
      derivedIndexPattern = _ref.derivedIndexPattern,
      options = _ref.options,
      _onTimeChange = _ref.onTimeChange,
      onRefresh = _ref.onRefresh,
      onGroupByChange = _ref.onGroupByChange,
      onFilterQuerySubmit = _ref.onFilterQuerySubmit,
      onMetricsChange = _ref.onMetricsChange,
      onAggregationChange = _ref.onAggregationChange,
      chartOptions = _ref.chartOptions,
      onChartOptionsChange = _ref.onChartOptionsChange,
      defaultViewState = _ref.defaultViewState,
      onViewStateChange = _ref.onViewStateChange;
  var isDefaultOptions = options.aggregation === 'avg' && options.metrics.length === 0;

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('timepicker:quickRanges'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      timepickerQuickRanges = _useKibanaUiSetting2[0];

  var commonlyUsedRanges = (0, _map_timepicker_quickranges_to_datepicker_ranges.mapKibanaQuickRangesToDatePickerRanges)(timepickerQuickRanges);
  return _react2.default.createElement(_toolbar.Toolbar, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: options.aggregation === 'count' ? 2 : false
  }, _react2.default.createElement(_aggregation.MetricsExplorerAggregationPicker, {
    fullWidth: true,
    options: options,
    onChange: onAggregationChange
  })), options.aggregation !== 'count' && _react2.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.metricsExplorer.aggregationLabel",
    defaultMessage: "of"
  })), options.aggregation !== 'count' && _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react2.default.createElement(_metrics.MetricsExplorerMetrics, {
    autoFocus: isDefaultOptions,
    fields: derivedIndexPattern.fields,
    options: options,
    onChange: onMetricsChange
  })), _react2.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.metricsExplorer.groupByToolbarLabel",
    defaultMessage: "graph per"
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react2.default.createElement(_group_by.MetricsExplorerGroupBy, {
    onChange: onGroupByChange,
    fields: derivedIndexPattern.fields,
    options: options
  }))), _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_kuery_bar.MetricsExplorerKueryBar, {
    derivedIndexPattern: derivedIndexPattern,
    onSubmit: onFilterQuerySubmit,
    value: options.filterQuery
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_chart_options.MetricsExplorerChartOptions, {
    onChange: onChartOptionsChange,
    chartOptions: chartOptions
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_toolbar_control.SavedViewsToolbarControls, {
    defaultViewState: defaultViewState,
    viewState: {
      options: options,
      chartOptions: chartOptions,
      currentTimerange: timeRange
    },
    viewType: _metrics_explorer_view.metricsExplorerViewSavedObjectType,
    onViewChange: onViewStateChange
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    style: {
      marginRight: 5
    }
  }, _react2.default.createElement(_eui.EuiSuperDatePicker, {
    start: timeRange.from,
    end: timeRange.to,
    onTimeChange: function onTimeChange(_ref2) {
      var start = _ref2.start,
          end = _ref2.end;
      return _onTimeChange(start, end);
    },
    onRefresh: onRefresh,
    commonlyUsedRanges: commonlyUsedRanges
  }))));
};

exports.MetricsExplorerToolbar = MetricsExplorerToolbar;