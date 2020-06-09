"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Legend = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _with_waffle_options = require("../../containers/waffle/with_waffle_options");

var _gradient_legend = require("./gradient_legend");

var _legend_controls = require("./legend_controls");

var _type_guards = require("./lib/type_guards");

var _steps_legend = require("./steps_legend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 10px;\n  left: 10px;\n  right: 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Legend = function Legend(_ref) {
  var dataBounds = _ref.dataBounds,
      legend = _ref.legend,
      bounds = _ref.bounds,
      formatter = _ref.formatter;
  return _react.default.createElement(LegendContainer, null, _react.default.createElement(_with_waffle_options.WithWaffleOptions, null, function (_ref2) {
    var changeBoundsOverride = _ref2.changeBoundsOverride,
        changeAutoBounds = _ref2.changeAutoBounds,
        autoBounds = _ref2.autoBounds,
        boundsOverride = _ref2.boundsOverride;
    return _react.default.createElement(_legend_controls.LegendControls, {
      dataBounds: dataBounds,
      bounds: bounds,
      autoBounds: autoBounds,
      boundsOverride: boundsOverride,
      onChange: function onChange(options) {
        changeBoundsOverride(options.bounds);
        changeAutoBounds(options.auto);
      }
    });
  }), (0, _type_guards.isInfraWaffleMapGradientLegend)(legend) && _react.default.createElement(_gradient_legend.GradientLegend, {
    formatter: formatter,
    legend: legend,
    bounds: bounds
  }), (0, _type_guards.isInfraWaffleMapStepLegend)(legend) && _react.default.createElement(_steps_legend.StepLegend, {
    formatter: formatter,
    legend: legend
  }));
};

exports.Legend = Legend;

var LegendContainer = _public.euiStyled.div(_templateObject());