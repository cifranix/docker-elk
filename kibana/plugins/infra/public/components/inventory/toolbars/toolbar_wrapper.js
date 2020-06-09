"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toMetricOpt = exports.toGroupByOpt = exports.ToolbarWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _with_source = require("../../../containers/with_source");

var _with_waffle_options = require("../../../containers/waffle/with_waffle_options");

var _toolbar = require("../../eui/toolbar");

var _field_to_display_name = require("../../waffle/lib/field_to_display_name");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ToolbarWrapper = function ToolbarWrapper(props) {
  return _react.default.createElement(_toolbar.Toolbar, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m"
  }, _react.default.createElement(_with_source.WithSource, null, function (_ref) {
    var createDerivedIndexPattern = _ref.createDerivedIndexPattern;
    return _react.default.createElement(_with_waffle_options.WithWaffleOptions, null, function (_ref2) {
      var changeMetric = _ref2.changeMetric,
          changeGroupBy = _ref2.changeGroupBy,
          changeCustomOptions = _ref2.changeCustomOptions,
          changeAccount = _ref2.changeAccount,
          changeRegion = _ref2.changeRegion,
          customOptions = _ref2.customOptions,
          groupBy = _ref2.groupBy,
          metric = _ref2.metric,
          nodeType = _ref2.nodeType,
          accountId = _ref2.accountId,
          region = _ref2.region,
          customMetrics = _ref2.customMetrics,
          changeCustomMetrics = _ref2.changeCustomMetrics;
      return props.children({
        createDerivedIndexPattern: createDerivedIndexPattern,
        changeMetric: changeMetric,
        changeGroupBy: changeGroupBy,
        changeAccount: changeAccount,
        changeRegion: changeRegion,
        changeCustomOptions: changeCustomOptions,
        customOptions: customOptions,
        groupBy: groupBy,
        metric: metric,
        nodeType: nodeType,
        region: region,
        accountId: accountId,
        customMetrics: customMetrics,
        changeCustomMetrics: changeCustomMetrics
      });
    });
  })));
};

exports.ToolbarWrapper = ToolbarWrapper;
var ToolbarTranslations = {
  CPUUsage: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.cpuUsageText', {
    defaultMessage: 'CPU usage'
  }),
  MemoryUsage: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.memoryUsageText', {
    defaultMessage: 'Memory usage'
  }),
  InboundTraffic: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.inboundTrafficText', {
    defaultMessage: 'Inbound traffic'
  }),
  OutboundTraffic: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.outboundTrafficText', {
    defaultMessage: 'Outbound traffic'
  }),
  LogRate: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.hostLogRateText', {
    defaultMessage: 'Log rate'
  }),
  Load: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.loadText', {
    defaultMessage: 'Load'
  }),
  Count: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.countText', {
    defaultMessage: 'Count'
  }),
  DiskIOReadBytes: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.diskIOReadBytes', {
    defaultMessage: 'Disk Reads'
  }),
  DiskIOWriteBytes: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.diskIOWriteBytes', {
    defaultMessage: 'Disk Writes'
  }),
  s3BucketSize: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.s3BucketSize', {
    defaultMessage: 'Bucket Size'
  }),
  s3TotalRequests: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.s3TotalRequests', {
    defaultMessage: 'Total Requests'
  }),
  s3NumberOfObjects: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.s3NumberOfObjects', {
    defaultMessage: 'Number of Objects'
  }),
  s3DownloadBytes: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.s3DownloadBytes', {
    defaultMessage: 'Downloads (Bytes)'
  }),
  s3UploadBytes: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.s3UploadBytes', {
    defaultMessage: 'Uploads (Bytes)'
  }),
  rdsConnections: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.rdsConnections', {
    defaultMessage: 'Connections'
  }),
  rdsQueriesExecuted: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.rdsQueriesExecuted', {
    defaultMessage: 'Queries Executed'
  }),
  rdsActiveTransactions: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.rdsActiveTransactions', {
    defaultMessage: 'Active Transactions'
  }),
  rdsLatency: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.rdsLatency', {
    defaultMessage: 'Latency'
  }),
  sqsMessagesVisible: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.sqsMessagesVisible', {
    defaultMessage: 'Messages Available'
  }),
  sqsMessagesDelayed: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.sqsMessagesDelayed', {
    defaultMessage: 'Messages Delayed'
  }),
  sqsMessagesSent: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.sqsMessagesSent', {
    defaultMessage: 'Messages Added'
  }),
  sqsMessagesEmpty: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.sqsMessagesEmpty', {
    defaultMessage: 'Messages Returned Empty'
  }),
  sqsOldestMessage: _i18n.i18n.translate('xpack.infra.waffle.metricOptions.sqsOldestMessage', {
    defaultMessage: 'Oldest Message'
  })
};

var toGroupByOpt = function toGroupByOpt(field) {
  return {
    text: (0, _field_to_display_name.fieldToName)(field),
    field: field
  };
};

exports.toGroupByOpt = toGroupByOpt;

var toMetricOpt = function toMetricOpt(metric) {
  switch (metric) {
    case 'cpu':
      return {
        text: ToolbarTranslations.CPUUsage,
        value: 'cpu'
      };

    case 'memory':
      return {
        text: ToolbarTranslations.MemoryUsage,
        value: 'memory'
      };

    case 'rx':
      return {
        text: ToolbarTranslations.InboundTraffic,
        value: 'rx'
      };

    case 'tx':
      return {
        text: ToolbarTranslations.OutboundTraffic,
        value: 'tx'
      };

    case 'logRate':
      return {
        text: ToolbarTranslations.LogRate,
        value: 'logRate'
      };

    case 'load':
      return {
        text: ToolbarTranslations.Load,
        value: 'load'
      };

    case 'count':
      return {
        text: ToolbarTranslations.Count,
        value: 'count'
      };

    case 'diskIOReadBytes':
      return {
        text: ToolbarTranslations.DiskIOReadBytes,
        value: 'diskIOReadBytes'
      };

    case 'diskIOWriteBytes':
      return {
        text: ToolbarTranslations.DiskIOWriteBytes,
        value: 'diskIOWriteBytes'
      };

    case 's3BucketSize':
      return {
        text: ToolbarTranslations.s3BucketSize,
        value: 's3BucketSize'
      };

    case 's3TotalRequests':
      return {
        text: ToolbarTranslations.s3TotalRequests,
        value: 's3TotalRequests'
      };

    case 's3NumberOfObjects':
      return {
        text: ToolbarTranslations.s3NumberOfObjects,
        value: 's3NumberOfObjects'
      };

    case 's3DownloadBytes':
      return {
        text: ToolbarTranslations.s3DownloadBytes,
        value: 's3DownloadBytes'
      };

    case 's3UploadBytes':
      return {
        text: ToolbarTranslations.s3UploadBytes,
        value: 's3UploadBytes'
      };

    case 'rdsConnections':
      return {
        text: ToolbarTranslations.rdsConnections,
        value: 'rdsConnections'
      };

    case 'rdsQueriesExecuted':
      return {
        text: ToolbarTranslations.rdsQueriesExecuted,
        value: 'rdsQueriesExecuted'
      };

    case 'rdsActiveTransactions':
      return {
        text: ToolbarTranslations.rdsActiveTransactions,
        value: 'rdsActiveTransactions'
      };

    case 'rdsLatency':
      return {
        text: ToolbarTranslations.rdsLatency,
        value: 'rdsLatency'
      };

    case 'sqsMessagesVisible':
      return {
        text: ToolbarTranslations.sqsMessagesVisible,
        value: 'sqsMessagesVisible'
      };

    case 'sqsMessagesDelayed':
      return {
        text: ToolbarTranslations.sqsMessagesDelayed,
        value: 'sqsMessagesDelayed'
      };

    case 'sqsMessagesSent':
      return {
        text: ToolbarTranslations.sqsMessagesSent,
        value: 'sqsMessagesSent'
      };

    case 'sqsMessagesEmpty':
      return {
        text: ToolbarTranslations.sqsMessagesEmpty,
        value: 'sqsMessagesEmpty'
      };

    case 'sqsOldestMessage':
      return {
        text: ToolbarTranslations.sqsOldestMessage,
        value: 'sqsOldestMessage'
      };
  }
};

exports.toMetricOpt = toMetricOpt;