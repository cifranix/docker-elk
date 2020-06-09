"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepLegend = void 0;

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _lib = require("../../lib/lib");

var _OPERATORS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  font-size: 12px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 2px;\n  border-radius: 3px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 24px;\n  height: 24px;\n  flex: 0 0 auto;\n  margin-right: 5px;\n  border-radius: 3px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  margin-right: 20px\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  padding: 10px 40px 10px 10px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OPERATORS = (_OPERATORS = {}, _defineProperty(_OPERATORS, _lib.InfraWaffleMapRuleOperator.gte, '>='), _defineProperty(_OPERATORS, _lib.InfraWaffleMapRuleOperator.gt, '>'), _defineProperty(_OPERATORS, _lib.InfraWaffleMapRuleOperator.lte, '<='), _defineProperty(_OPERATORS, _lib.InfraWaffleMapRuleOperator.lt, '<'), _defineProperty(_OPERATORS, _lib.InfraWaffleMapRuleOperator.eq, '='), _OPERATORS);

var createStep = function createStep(formatter) {
  return function (rule, index) {
    var label = rule.label != null ? rule.label : "".concat(OPERATORS[rule.operator], " ").concat(formatter(rule.value));
    var squareStyle = {
      backgroundColor: (0, _polished.darken)(0.4, rule.color)
    };
    var squareInnerStyle = {
      backgroundColor: rule.color
    };
    return _react.default.createElement(StepContainer, {
      key: "legend-step-".concat(index)
    }, _react.default.createElement(StepSquare, {
      style: squareStyle
    }, _react.default.createElement(StepSquareInner, {
      style: squareInnerStyle
    })), _react.default.createElement(StepLabel, null, label));
  };
};

var StepLegend = function StepLegend(_ref) {
  var legend = _ref.legend,
      formatter = _ref.formatter;
  return _react.default.createElement(StepLegendContainer, null, legend.rules.map(createStep(formatter)));
};

exports.StepLegend = StepLegend;

var StepLegendContainer = _public.euiStyled.div(_templateObject());

var StepContainer = _public.euiStyled.div(_templateObject2());

var StepSquare = _public.euiStyled.div(_templateObject3());

var StepSquareInner = _public.euiStyled.div(_templateObject4());

var StepLabel = _public.euiStyled.div(_templateObject5());