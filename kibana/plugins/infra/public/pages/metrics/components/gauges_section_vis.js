"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GaugesSectionVis = void 0;

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../observability/public");

var _formatters = require("../../../utils/formatters");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-evenly;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getFormatter = function getFormatter() {
  var defaultFormatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'number';
  var defaultFormatterTemplate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{{value}}';
  var seriesOverrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var seriesId = arguments.length > 3 ? arguments[3] : undefined;
  return function (val) {
    if (val == null) {
      return '';
    }

    var formatter = (0, _lodash.get)(seriesOverrides, [seriesId, 'formatter'], defaultFormatter);
    var formatterTemplate = (0, _lodash.get)(seriesOverrides, [seriesId, 'formatterTemplate'], defaultFormatterTemplate);
    return (0, _formatters.createFormatter)(formatter, formatterTemplate)(val);
  };
};

var GaugesSectionVis = function GaugesSectionVis(_ref) {
  var id = _ref.id,
      metric = _ref.metric,
      seriesOverrides = _ref.seriesOverrides,
      formatter = _ref.formatter,
      formatterTemplate = _ref.formatterTemplate;

  if (!metric || !id) {
    return null;
  }

  return _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(GroupBox, null, metric.series.map(function (series) {
    var lastDataPoint = (0, _lodash.last)(series.data);

    if (!lastDataPoint) {
      return null;
    }

    var formatterFn = getFormatter(formatter, formatterTemplate, seriesOverrides, series.id);
    var value = formatterFn(lastDataPoint.value || 0);
    var name = (0, _helpers.getChartName)(seriesOverrides, series.id, series.id);
    var dataMax = (0, _lodash.max)(series.data.map(function (d) {
      return d.value || 0;
    }));
    var gaugeMax = (0, _lodash.get)(seriesOverrides, [series.id, 'gaugeMax'], dataMax);
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: "".concat(id, "-").concat(series.id),
      style: {
        margin: '0.4rem'
      }
    }, _react.default.createElement(_eui.EuiPanel, {
      style: {
        minWidth: '160px'
      }
    }, _react.default.createElement(_eui.EuiText, {
      style: {
        textAlign: 'right'
      },
      size: "s"
    }, name), _react.default.createElement(_eui.EuiTitle, {
      size: "s"
    }, _react.default.createElement("h1", {
      style: {
        textAlign: 'right',
        whiteSpace: 'nowrap'
      }
    }, value)), _react.default.createElement(_eui.EuiProgress, {
      value: lastDataPoint.value || 0,
      max: gaugeMax,
      size: "s",
      color: "primary"
    })));
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.GaugesSectionVis = GaugesSectionVis;

var GroupBox = _public.euiStyled.div(_templateObject());