"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricComparison = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  white-space: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SingleMetricComparison = function SingleMetricComparison(_ref) {
  var currentValue = _ref.currentValue,
      previousValue = _ref.previousValue;
  var changeFactor = currentValue / previousValue - 1;

  if (changeFactor < 0) {
    return _react.default.createElement(NoWrapSpan, null, _react.default.createElement(_eui.EuiIcon, {
      type: "sortDown",
      color: "danger"
    }), _react.default.createElement(_eui.EuiTextColor, {
      color: "danger"
    }, formatPercentage(changeFactor)));
  } else if (changeFactor > 0 && Number.isFinite(changeFactor)) {
    return _react.default.createElement(NoWrapSpan, null, _react.default.createElement(_eui.EuiIcon, {
      type: "sortUp",
      color: "success"
    }), _react.default.createElement(_eui.EuiTextColor, {
      color: "secondary"
    }, formatPercentage(changeFactor)));
  } else if (changeFactor > 0 && !Number.isFinite(changeFactor)) {
    return _react.default.createElement(NoWrapSpan, null, _react.default.createElement(_eui.EuiIcon, {
      type: "sortUp",
      color: "success"
    }), _react.default.createElement(_eui.EuiTextColor, {
      color: "secondary"
    }, newCategoryTrendLabel));
  }

  return null;
};

exports.SingleMetricComparison = SingleMetricComparison;

var formatPercentage = function formatPercentage(value) {
  return (0, _numeral.default)(value).format('+0,0 %');
};

var newCategoryTrendLabel = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.newCategoryTrendLabel', {
  defaultMessage: 'new'
});

var NoWrapSpan = _public.euiStyled.span(_templateObject());