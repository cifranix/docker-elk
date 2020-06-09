"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitySpecificSingleMetricViewerLink = exports.AnalyzeInMlButton = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _risonNode = require("rison-node");

var _use_link_props = require("../../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var AnalyzeInMlButton = function AnalyzeInMlButton(_ref) {
  var jobId = _ref.jobId,
      partition = _ref.partition,
      timeRange = _ref.timeRange;
  var linkProps = (0, _use_link_props.useLinkProps)(typeof partition === 'string' ? getEntitySpecificSingleMetricViewerLink(jobId, timeRange, {
    'event.dataset': partition
  }) : getOverallAnomalyExplorerLinkDescriptor(jobId, timeRange));

  var buttonLabel = _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.analyzeInMlButtonLabel",
    defaultMessage: "Analyze in ML"
  });

  return typeof partition === 'string' ? _react2.default.createElement(_eui.EuiButton, _extends({
    fill: false,
    size: "s"
  }, linkProps), buttonLabel) : _react2.default.createElement(_eui.EuiButton, _extends({
    fill: true,
    size: "s"
  }, linkProps), buttonLabel);
};

exports.AnalyzeInMlButton = AnalyzeInMlButton;

var getOverallAnomalyExplorerLinkDescriptor = function getOverallAnomalyExplorerLinkDescriptor(jobId, timeRange) {
  var _convertTimeRangeToPa = convertTimeRangeToParams(timeRange),
      from = _convertTimeRangeToPa.from,
      to = _convertTimeRangeToPa.to;

  var _g = (0, _risonNode.encode)({
    ml: {
      jobIds: [jobId]
    },
    time: {
      from: from,
      to: to
    }
  });

  return {
    app: 'ml',
    hash: '/explorer',
    search: {
      _g: _g
    }
  };
};

var getEntitySpecificSingleMetricViewerLink = function getEntitySpecificSingleMetricViewerLink(jobId, timeRange, entities) {
  var _convertTimeRangeToPa2 = convertTimeRangeToParams(timeRange),
      from = _convertTimeRangeToPa2.from,
      to = _convertTimeRangeToPa2.to;

  var _g = (0, _risonNode.encode)({
    ml: {
      jobIds: [jobId]
    },
    time: {
      from: from,
      to: to,
      mode: 'absolute'
    }
  });

  var _a = (0, _risonNode.encode)({
    mlTimeSeriesExplorer: {
      entities: entities
    }
  });

  return {
    app: 'ml',
    hash: '/timeseriesexplorer',
    search: {
      _g: _g,
      _a: _a
    }
  };
};

exports.getEntitySpecificSingleMetricViewerLink = getEntitySpecificSingleMetricViewerLink;

var convertTimeRangeToParams = function convertTimeRangeToParams(timeRange) {
  return {
    from: new Date(timeRange.startTime).toISOString(),
    to: new Date(timeRange.endTime).toISOString()
  };
};