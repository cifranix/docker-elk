"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodesOverview = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _lib = require("../../lib/lib");

var _formatters = require("../../utils/formatters");

var _empty_states = require("../empty_states");

var _loading = require("../loading");

var _map = require("../waffle/map");

var _view_switcher = require("../waffle/view_switcher");

var _table = require("./table");

var _snapshot_api = require("../../../common/http_api/snapshot_api");

var _convert_interval_to_string = require("../../utils/convert_interval_to_string");

var _create_formatter_for_metric = require("../metrics_explorer/helpers/create_formatter_for_metric");

var _METRIC_FORMATTERS, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  display: flex;\n  top: 70px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  flex: 1 1 auto;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var METRIC_FORMATTERS = (_METRIC_FORMATTERS = {}, _defineProperty(_METRIC_FORMATTERS, 'count', {
  formatter: _lib.InfraFormatterType.number,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 'cpu', {
  formatter: _lib.InfraFormatterType.percent,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 'memory', {
  formatter: _lib.InfraFormatterType.percent,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 'rx', {
  formatter: _lib.InfraFormatterType.bits,
  template: '{{value}}/s'
}), _defineProperty(_METRIC_FORMATTERS, 'tx', {
  formatter: _lib.InfraFormatterType.bits,
  template: '{{value}}/s'
}), _defineProperty(_METRIC_FORMATTERS, 'logRate', {
  formatter: _lib.InfraFormatterType.abbreviatedNumber,
  template: '{{value}}/s'
}), _defineProperty(_METRIC_FORMATTERS, 'diskIOReadBytes', {
  formatter: _lib.InfraFormatterType.bytes,
  template: '{{value}}/s'
}), _defineProperty(_METRIC_FORMATTERS, 'diskIOWriteBytes', {
  formatter: _lib.InfraFormatterType.bytes,
  template: '{{value}}/s'
}), _defineProperty(_METRIC_FORMATTERS, 's3BucketSize', {
  formatter: _lib.InfraFormatterType.bytes,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 's3TotalRequests', {
  formatter: _lib.InfraFormatterType.abbreviatedNumber,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 's3NumberOfObjects', {
  formatter: _lib.InfraFormatterType.abbreviatedNumber,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 's3UploadBytes', {
  formatter: _lib.InfraFormatterType.bytes,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 's3DownloadBytes', {
  formatter: _lib.InfraFormatterType.bytes,
  template: '{{value}}'
}), _defineProperty(_METRIC_FORMATTERS, 'sqsOldestMessage', {
  formatter: _lib.InfraFormatterType.number,
  template: '{{value}} seconds'
}), _METRIC_FORMATTERS);

var calculateBoundsFromNodes = function calculateBoundsFromNodes(nodes) {
  var maxValues = nodes.map(function (node) {
    return node.metric.max;
  });
  var minValues = nodes.map(function (node) {
    return node.metric.value;
  }); // if there is only one value then we need to set the bottom range to zero for min
  // otherwise the legend will look silly since both values are the same for top and
  // bottom.

  if (minValues.length === 1) {
    minValues.unshift(0);
  }

  return {
    min: (0, _lodash.min)(minValues) || 0,
    max: (0, _lodash.max)(maxValues) || 0
  };
};

var NodesOverview = (_temp = _class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NodesOverview, _React$Component);

  function NodesOverview() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NodesOverview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NodesOverview)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleViewChange", function (view) {
      return _this.props.onViewChange(view);
    });

    _defineProperty(_assertThisInitialized(_this), "formatter", function (val) {
      var metric = _this.props.options.metric;

      if (_snapshot_api.SnapshotCustomMetricInputRT.is(metric)) {
        var _formatter = (0, _create_formatter_for_metric.createFormatterForMetric)(metric);

        return _formatter(val);
      }

      var metricFormatter = (0, _lodash.get)(METRIC_FORMATTERS, metric.type, METRIC_FORMATTERS.count);

      if (val == null) {
        return '';
      }

      var formatter = (0, _formatters.createFormatter)(metricFormatter.formatter, metricFormatter.template);
      return formatter(val);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrilldown", function (filter) {
      _this.props.onDrilldown({
        kind: 'kuery',
        expression: filter
      });

      return;
    });

    return _this;
  }

  _createClass(NodesOverview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoBounds = _this$props.autoBounds,
          boundsOverride = _this$props.boundsOverride,
          loading = _this$props.loading,
          nodes = _this$props.nodes,
          nodeType = _this$props.nodeType,
          reload = _this$props.reload,
          view = _this$props.view,
          currentTime = _this$props.currentTime,
          options = _this$props.options,
          interval = _this$props.interval;

      if (loading) {
        return _react2.default.createElement(_loading.InfraLoadingPanel, {
          height: "100%",
          width: "100%",
          text: _i18n.i18n.translate('xpack.infra.waffle.loadingDataText', {
            defaultMessage: 'Loading data'
          })
        });
      } else if (!loading && nodes && nodes.length === 0) {
        return _react2.default.createElement(_empty_states.NoData, {
          titleText: _i18n.i18n.translate('xpack.infra.waffle.noDataTitle', {
            defaultMessage: 'There is no data to display.'
          }),
          bodyText: _i18n.i18n.translate('xpack.infra.waffle.noDataDescription', {
            defaultMessage: 'Try adjusting your time or filter.'
          }),
          refetchText: _i18n.i18n.translate('xpack.infra.waffle.checkNewDataButtonLabel', {
            defaultMessage: 'Check for new data'
          }),
          onRefetch: function onRefetch() {
            reload();
          },
          testString: "noMetricsDataPrompt"
        });
      }

      var dataBounds = calculateBoundsFromNodes(nodes);
      var bounds = autoBounds ? dataBounds : boundsOverride;
      var intervalAsString = (0, _convert_interval_to_string.convertIntervalToString)(interval);
      return _react2.default.createElement(MainContainer, null, _react2.default.createElement(ViewSwitcherContainer, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_view_switcher.ViewSwitcher, {
        view: view,
        onChange: this.handleViewChange
      })), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiText, {
        color: "subdued"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.homePage.toolbar.showingLastOneMinuteDataText",
        defaultMessage: "Showing the last {duration} of data at the selected time",
        values: {
          duration: intervalAsString
        }
      })))))), view === 'table' ? _react2.default.createElement(TableContainer, null, _react2.default.createElement(_table.TableView, {
        nodeType: nodeType,
        nodes: nodes,
        options: options,
        formatter: this.formatter,
        currentTime: currentTime,
        onFilter: this.handleDrilldown
      })) : _react2.default.createElement(MapContainer, null, _react2.default.createElement(_map.Map, {
        nodeType: nodeType,
        nodes: nodes,
        options: options,
        formatter: this.formatter,
        currentTime: currentTime,
        onFilter: this.handleDrilldown,
        bounds: bounds,
        dataBounds: dataBounds
      })));
    }
  }]);

  return NodesOverview;
}(_react2.default.Component), _defineProperty(_class, "displayName", 'Waffle'), _temp);
exports.NodesOverview = NodesOverview;

var MainContainer = _public.euiStyled.div(_templateObject());

var TableContainer = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.paddingSizes.l;
});

var ViewSwitcherContainer = _public.euiStyled.div(_templateObject3(), function (props) {
  return props.theme.eui.paddingSizes.l;
});

var MapContainer = _public.euiStyled.div(_templateObject4());