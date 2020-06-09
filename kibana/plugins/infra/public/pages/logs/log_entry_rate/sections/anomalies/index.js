"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesResults = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../observability/public");

var _log_analysis = require("../../../../../../common/log_analysis");

var _data_formatters = require("../helpers/data_formatters");

var _chart = require("./chart");

var _table = require("./table");

var _log_analysis_job_status = require("../../../../../components/logging/log_analysis_job_status");

var _log_analysis_results = require("../../../../../components/logging/log_analysis_results");

var _loading_overlay_wrapper = require("../../../../../components/loading_overlay_wrapper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  white-space: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AnomaliesResults = function AnomaliesResults(_ref) {
  var isLoading = _ref.isLoading,
      jobStatus = _ref.jobStatus,
      results = _ref.results,
      setTimeRange = _ref.setTimeRange,
      setupStatus = _ref.setupStatus,
      timeRange = _ref.timeRange,
      viewSetupForReconfiguration = _ref.viewSetupForReconfiguration,
      viewSetupForUpdate = _ref.viewSetupForUpdate,
      jobId = _ref.jobId;
  var hasAnomalies = (0, _react.useMemo)(function () {
    return results && results.histogramBuckets ? results.histogramBuckets.some(function (bucket) {
      return bucket.partitions.some(function (partition) {
        return partition.anomalies.length > 0;
      });
    }) : false;
  }, [results]);
  var logEntryRateSeries = (0, _react.useMemo)(function () {
    return results && results.histogramBuckets ? (0, _data_formatters.getLogEntryRateCombinedSeries)(results) : [];
  }, [results]);
  var anomalyAnnotations = (0, _react.useMemo)(function () {
    return results && results.histogramBuckets ? (0, _data_formatters.getAnnotationsForAll)(results) : {
      warning: [],
      minor: [],
      major: [],
      critical: []
    };
  }, [results]);
  var topAnomalyScore = (0, _react.useMemo)(function () {
    return results && results.histogramBuckets ? (0, _data_formatters.getTopAnomalyScoreAcrossAllPartitions)(results) : undefined;
  }, [results]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s",
    "aria-label": title
  }, _react.default.createElement("h2", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_job_status.RecreateJobButton, {
    onClick: viewSetupForUpdate,
    size: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_results.AnalyzeInMlButton, {
    jobId: jobId,
    timeRange: timeRange
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_log_analysis_job_status.LogAnalysisJobProblemIndicator, {
    jobStatus: jobStatus,
    setupStatus: setupStatus,
    onRecreateMlJobForReconfiguration: viewSetupForReconfiguration,
    onRecreateMlJobForUpdate: viewSetupForUpdate
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_loading_overlay_wrapper.LoadingOverlayWrapper, {
    isLoading: isLoading,
    loadingChildren: _react.default.createElement(LoadingOverlayContent, null)
  }, !results || results && results.histogramBuckets && !results.histogramBuckets.length ? _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.infra.logs.analysis.anomalySectionNoDataTitle', {
      defaultMessage: 'There is no data to display.'
    })),
    titleSize: "m",
    body: _react.default.createElement("p", null, _i18n.i18n.translate('xpack.infra.logs.analysis.anomalySectionNoDataBody', {
      defaultMessage: 'You may want to adjust your time range.'
    }))
  }) : !hasAnomalies ? _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.infra.logs.analysis.anomalySectionNoAnomaliesTitle', {
      defaultMessage: 'No anomalies were detected.'
    })),
    titleSize: "m"
  }) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 8
  }, _react.default.createElement(_chart.AnomaliesChart, {
    chartId: "overall",
    setTimeRange: setTimeRange,
    timeRange: timeRange,
    series: logEntryRateSeries,
    annotations: anomalyAnnotations,
    renderAnnotationTooltip: renderAnnotationTooltip
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiStat, {
    title: (0, _numeral.default)(results.totalNumberOfLogEntries).format('0.00a'),
    titleSize: "m",
    description: _i18n.i18n.translate('xpack.infra.logs.analysis.overallAnomaliesNumberOfLogEntriesDescription', {
      defaultMessage: 'Number of log entries'
    }),
    reverse: true
  }), _react.default.createElement(_eui.EuiStat, {
    title: topAnomalyScore ? (0, _log_analysis.formatAnomalyScore)(topAnomalyScore) : null,
    titleSize: "m",
    description: _i18n.i18n.translate('xpack.infra.logs.analysis.overallAnomaliesTopAnomalyScoreDescription', {
      defaultMessage: 'Max anomaly score'
    }),
    reverse: true
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_table.AnomaliesTable, {
    results: results,
    setTimeRange: setTimeRange,
    timeRange: timeRange,
    jobId: jobId
  }))));
};

exports.AnomaliesResults = AnomaliesResults;

var title = _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesSectionTitle', {
  defaultMessage: 'Anomalies'
});

var overallAnomalyScoreLabel = _i18n.i18n.translate('xpack.infra.logs.analysis.overallAnomalyChartMaxScoresLabel', {
  defaultMessage: 'Max anomaly scores:'
});

var AnnotationTooltip = function AnnotationTooltip(_ref2) {
  var details = _ref2.details;
  var parsedDetails = JSON.parse(details);
  return _react.default.createElement(TooltipWrapper, null, _react.default.createElement("span", null, _react.default.createElement("b", null, overallAnomalyScoreLabel)), _react.default.createElement("ul", null, parsedDetails.anomalyScoresByPartition.map(function (_ref3) {
    var partitionName = _ref3.partitionName,
        maximumAnomalyScore = _ref3.maximumAnomalyScore;
    return _react.default.createElement("li", {
      key: "overall-anomaly-chart-".concat(partitionName)
    }, _react.default.createElement("span", null, "".concat(partitionName, ": "), _react.default.createElement("b", null, maximumAnomalyScore)));
  })));
};

var renderAnnotationTooltip = function renderAnnotationTooltip(details) {
  // Note: Seems to be necessary to get things typed correctly all the way through to elastic-charts components
  if (!details) {
    return _react.default.createElement("div", null);
  }

  return _react.default.createElement(AnnotationTooltip, {
    details: details
  });
};

var TooltipWrapper = (0, _public.euiStyled)('div')(_templateObject());

var loadingAriaLabel = _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesSectionLoadingAriaLabel', {
  defaultMessage: 'Loading anomalies'
});

var LoadingOverlayContent = function LoadingOverlayContent() {
  return _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl",
    "aria-label": loadingAriaLabel
  });
};