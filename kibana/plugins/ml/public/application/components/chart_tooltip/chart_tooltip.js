"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartTooltip = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _chart_tooltip_service = require("./chart_tooltip_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useRefWithCallback(chartTooltipState) {
  var ref = (0, _react.useRef)(null);
  return function (node) {
    ref.current = node;

    if (node !== null && node.parentElement !== null && chartTooltipState !== undefined && chartTooltipState.isTooltipVisible) {
      var parentBounding = node.parentElement.getBoundingClientRect();
      var targetPosition = chartTooltipState.targetPosition,
          offset = chartTooltipState.offset;
      var contentWidth = document.body.clientWidth - parentBounding.left;
      var tooltipWidth = node.clientWidth;
      var left = targetPosition.left + offset.x - parentBounding.left;

      if (left + tooltipWidth > contentWidth) {
        // the tooltip is hanging off the side of the page,
        // so move it to the other side of the target
        left = left - (tooltipWidth + offset.x);
      }

      var top = targetPosition.top + offset.y - parentBounding.top;

      if (chartTooltipState.tooltipPosition.left !== left || chartTooltipState.tooltipPosition.top !== top) {
        // render the tooltip with adjusted position.
        _chart_tooltip_service.chartTooltip$.next(_objectSpread({}, chartTooltipState, {
          tooltipPosition: {
            left: left,
            top: top
          }
        }));
      }
    }
  };
}

var renderHeader = function renderHeader(headerData, formatter) {
  if (!headerData) {
    return null;
  }

  return formatter ? formatter(headerData) : headerData.label;
};

var ChartTooltip = function ChartTooltip() {
  var chartTooltipState = (0, _useObservable.default)(_chart_tooltip_service.chartTooltip$);
  var chartTooltipElement = useRefWithCallback(chartTooltipState);

  if (chartTooltipState === undefined || !chartTooltipState.isTooltipVisible) {
    return _react.default.createElement("div", {
      className: "mlChartTooltip mlChartTooltip--hidden",
      ref: chartTooltipElement
    });
  }

  var tooltipData = chartTooltipState.tooltipData,
      tooltipHeaderFormatter = chartTooltipState.tooltipHeaderFormatter,
      tooltipPosition = chartTooltipState.tooltipPosition;
  var transform = "translate(".concat(tooltipPosition.left, "px, ").concat(tooltipPosition.top, "px)");
  return _react.default.createElement("div", {
    className: "mlChartTooltip",
    style: {
      transform: transform
    },
    ref: chartTooltipElement
  }, tooltipData.length > 0 && tooltipData[0].skipHeader === undefined && _react.default.createElement("div", {
    className: "mlChartTooltip__header"
  }, renderHeader(tooltipData[0], tooltipHeaderFormatter)), tooltipData.length > 1 && _react.default.createElement("div", {
    className: "mlChartTooltip__list"
  }, tooltipData.slice(1).map(function (_ref) {
    var label = _ref.label,
        value = _ref.value,
        color = _ref.color,
        isHighlighted = _ref.isHighlighted,
        seriesIdentifier = _ref.seriesIdentifier,
        valueAccessor = _ref.valueAccessor;
    var classes = (0, _classnames.default)('mlChartTooltip__item', {
      /* eslint @typescript-eslint/camelcase:0 */
      echTooltip__rowHighlighted: isHighlighted
    });
    return _react.default.createElement("div", {
      key: "".concat(seriesIdentifier.key, "__").concat(valueAccessor),
      className: classes,
      style: {
        borderLeftColor: color
      }
    }, _react.default.createElement("span", {
      className: "mlChartTooltip__label"
    }, label), _react.default.createElement("span", {
      className: "mlChartTooltip__value"
    }, value));
  })));
};

exports.ChartTooltip = ChartTooltip;