"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradientLegend = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  font-size: 11px;\n  text-align: center;\n  top: 0;\n  left: 0;\n  white-space: nowrap;\n  transform: translate(-50%, 0);\n  ", ":first-child & {\n    padding-left: 5px;\n    transform: translate(0, 0);\n  }\n  ", ":last-child & {\n    padding-right: 5px;\n    transform: translate(-100%, 0);\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  background-color: ", ";\n  width: 1px;\n  left: 0;\n  top: 15px;\n  bottom: 0;\n  ", ":first-child {\n    top: 2px;\n  }\n  ", ":last-child {\n    top: 2px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  bottom: 0;\n  top: -18px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  height: 10px;\n  bottom: 0;\n  left: 0;\n  right: 40px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var createTickRender = function createTickRender(bounds, formatter) {
  return function (rule, index) {
    var value = rule.value === 0 ? bounds.min : bounds.max * rule.value;
    var style = {
      left: "".concat(rule.value * 100, "%")
    };
    var label = formatter(value);
    return _react.default.createElement(GradientLegendTick, {
      style: style,
      key: "legend-rule-".concat(index)
    }, _react.default.createElement(GradientLegendTickLine, null), _react.default.createElement(GradientLegendTickLabel, null, label));
  };
};

var GradientLegend = function GradientLegend(_ref) {
  var legend = _ref.legend,
      bounds = _ref.bounds,
      formatter = _ref.formatter;
  var maxValue = legend.rules.reduce(function (acc, rule) {
    return acc < rule.value ? rule.value : acc;
  }, 0);
  var colorStops = legend.rules.map(function (rule) {
    var percent = rule.value / maxValue * 100;
    return "".concat(rule.color, " ").concat(percent, "%");
  });
  var style = {
    background: "linear-gradient(to right, ".concat(colorStops, ")")
  };
  return _react.default.createElement(GradientLegendContainer, {
    style: style
  }, legend.rules.map(createTickRender(bounds, formatter)));
};

exports.GradientLegend = GradientLegend;

var GradientLegendContainer = _public.euiStyled.div(_templateObject());

var GradientLegendTick = _public.euiStyled.div(_templateObject2());

var GradientLegendTickLine = _public.euiStyled.div(_templateObject3(), function (props) {
  return props.theme.eui.euiBorderColor;
}, GradientLegendTick, GradientLegendTick);

var GradientLegendTickLabel = _public.euiStyled.div(_templateObject4(), GradientLegendTick, GradientLegendTick);