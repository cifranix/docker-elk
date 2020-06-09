"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeDetailsPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _use_node_details = require("../../../containers/node_details/use_node_details");

var _side_nav = require("./side_nav");

var _auto_sizer = require("../../../components/auto_sizer");

var _time_controls = require("./time_controls");

var _side_nav_context = require("../lib/side_nav_context");

var _page_body = require("./page_body");

var _public = require("../../../../../observability/public");

var _page_error = require("./page_error");

var _metadata_context = require("../../../pages/metrics/containers/metadata_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var NodeDetailsPage = function NodeDetailsPage(props) {
  var parsedTimeRange = props.parsedTimeRange;

  var _useNodeDetails = (0, _use_node_details.useNodeDetails)(props.requiredMetrics, props.nodeId, props.nodeType, props.sourceId, props.parsedTimeRange, props.cloudId),
      metrics = _useNodeDetails.metrics,
      loading = _useNodeDetails.loading,
      makeRequest = _useNodeDetails.makeRequest,
      error = _useNodeDetails.error;

  var refetch = (0, _react.useCallback)(function () {
    makeRequest();
  }, [makeRequest]);
  (0, _react.useEffect)(function () {
    makeRequest();
  }, [makeRequest, parsedTimeRange]);

  if (error) {
    return _react.default.createElement(_page_error.PageError, {
      error: error,
      name: props.name
    });
  }

  return _react.default.createElement(_eui.EuiPage, {
    style: {
      flex: '1 0 auto'
    }
  }, _react.default.createElement(_side_nav.MetricsSideNav, {
    loading: props.metadataLoading,
    name: props.name,
    items: props.sideNav
  }), _react.default.createElement(_auto_sizer.AutoSizer, {
    content: false,
    bounds: true,
    detectAnyWindowResize: true
  }, function (_ref) {
    var _ref$bounds$width = _ref.bounds.width,
        width = _ref$bounds$width === void 0 ? 0 : _ref$bounds$width;
    var w = width ? "".concat(width, "px") : "100%";
    return _react.default.createElement(MetricsDetailsPageColumn, null, _react.default.createElement(_eui.EuiPageBody, {
      style: {
        width: w
      }
    }, _react.default.createElement(_eui.EuiPageHeader, {
      style: {
        flex: '0 0 auto'
      }
    }, _react.default.createElement(_eui.EuiPageHeaderSection, {
      style: {
        width: '100%'
      }
    }, _react.default.createElement(MetricsTitleTimeRangeContainer, null, _react.default.createElement(_eui.EuiHideFor, {
      sizes: ['xs', 's']
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react.default.createElement("h1", null, props.name))), _react.default.createElement(_time_controls.MetricsTimeControls, {
      currentTimeRange: props.timeRange,
      isLiveStreaming: props.isAutoReloading,
      refreshInterval: props.refreshInterval,
      setRefreshInterval: props.setRefreshInterval,
      onChangeTimeRange: props.setTimeRange,
      setAutoReload: props.setAutoReload,
      onRefresh: props.triggerRefresh
    })))), _react.default.createElement(_side_nav_context.SideNavContext.Provider, {
      value: {
        items: props.sideNav,
        addNavItem: props.addNavItem
      }
    }, _react.default.createElement(_metadata_context.MetadataContext.Provider, {
      value: props.metadata
    }, _react.default.createElement(_page_body.PageBody, {
      loading: metrics.length > 0 && props.isAutoReloading ? false : loading,
      refetch: refetch,
      type: props.nodeType,
      metrics: metrics,
      onChangeRangeTime: props.setTimeRange,
      isLiveStreaming: props.isAutoReloading,
      stopLiveStreaming: function stopLiveStreaming() {
        return props.setAutoReload(false);
      }
    })))));
  }));
};

exports.NodeDetailsPage = NodeDetailsPage;

var MetricsDetailsPageColumn = _public.euiStyled.div(_templateObject());

var MetricsTitleTimeRangeContainer = _public.euiStyled.div(_templateObject2());