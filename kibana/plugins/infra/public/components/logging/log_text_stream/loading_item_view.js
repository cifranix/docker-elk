"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogTextStreamLoadingItemView = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _log_text_separator = require("./log_text_separator");

var _datemath = require("../../../utils/datemath");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding-left: ", ";\n  padding-top: ", ";\n  padding-bottom: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: 40px;\n"]);

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TIMESTAMP_FORMAT = {
  hour12: false,
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

var LogTextStreamLoadingItemView =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(LogTextStreamLoadingItemView, _React$PureComponent);

  function LogTextStreamLoadingItemView() {
    _classCallCheck(this, LogTextStreamLoadingItemView);

    return _possibleConstructorReturn(this, _getPrototypeOf(LogTextStreamLoadingItemView).apply(this, arguments));
  }

  _createClass(LogTextStreamLoadingItemView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          position = _this$props.position,
          timestamp = _this$props.timestamp,
          startDateExpression = _this$props.startDateExpression,
          endDateExpression = _this$props.endDateExpression,
          className = _this$props.className,
          hasMore = _this$props.hasMore,
          isLoading = _this$props.isLoading,
          isStreaming = _this$props.isStreaming,
          onExtendRange = _this$props.onExtendRange,
          onStreamStart = _this$props.onStreamStart;
      var shouldShowCta = !hasMore && !isStreaming;
      var extra = React.createElement(LoadingItemViewExtra, {
        justifyContent: "center",
        alignItems: "center",
        gutterSize: "m"
      }, isLoading || isStreaming ? React.createElement(ProgressSpinner, {
        kind: isStreaming ? 'streaming' : 'loading'
      }) : shouldShowCta ? React.createElement(ProgressCta, {
        position: position,
        onStreamStart: onStreamStart,
        onExtendRange: onExtendRange,
        startDateExpression: startDateExpression,
        endDateExpression: endDateExpression
      }) : null);
      return React.createElement(ProgressEntryWrapper, {
        className: className,
        position: position
      }, position === 'start' ? extra : null, React.createElement(ProgressMessage, {
        timestamp: timestamp,
        position: position,
        isStreaming: isStreaming
      }), position === 'end' ? extra : null);
    }
  }]);

  return LogTextStreamLoadingItemView;
}(React.PureComponent);

exports.LogTextStreamLoadingItemView = LogTextStreamLoadingItemView;
var LoadingItemViewExtra = (0, _public.euiStyled)(_eui.EuiFlexGroup)(_templateObject());

var ProgressEntryWrapper = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiSizeS;
}, function (props) {
  return props.position === 'start' ? props.theme.eui.euiSizeL : props.theme.eui.euiSizeM;
}, function (props) {
  return props.position === 'end' ? props.theme.eui.euiSizeL : props.theme.eui.euiSizeM;
});

var ProgressMessage = function ProgressMessage(_ref) {
  var timestamp = _ref.timestamp,
      position = _ref.position,
      isStreaming = _ref.isStreaming;
  var formattedTimestamp = isStreaming && position === 'end' ? React.createElement(_react.FormattedRelative, {
    units: "second",
    value: timestamp,
    updateInterval: 1
  }) : React.createElement(_react.FormattedTime, _extends({
    value: timestamp
  }, TIMESTAMP_FORMAT));
  var message = position === 'start' ? React.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.showingEntriesFromTimestamp",
    defaultMessage: "Showing entries from {timestamp}",
    values: {
      timestamp: formattedTimestamp
    }
  }) : isStreaming ? React.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.lastUpdate",
    defaultMessage: "Last update {timestamp}",
    values: {
      timestamp: formattedTimestamp
    }
  }) : React.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.showingEntriesUntilTimestamp",
    defaultMessage: "Showing entries until {timestamp}",
    values: {
      timestamp: formattedTimestamp
    }
  });
  return React.createElement(_log_text_separator.LogTextSeparator, null, React.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, message));
};

var ProgressSpinner = function ProgressSpinner(_ref2) {
  var kind = _ref2.kind;
  return React.createElement(React.Fragment, null, React.createElement(_eui.EuiFlexItem, {
    grow: false
  }, React.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  })), React.createElement(_eui.EuiFlexItem, {
    grow: false
  }, React.createElement(_eui.EuiText, {
    size: "s"
  }, kind === 'streaming' ? React.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.streamingNewEntriesText",
    defaultMessage: "Streaming new entries"
  }) : React.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.loadingNewEntriesText",
    defaultMessage: "Loading new entries"
  }))));
};

var ProgressCta = function ProgressCta(_ref3) {
  var position = _ref3.position,
      startDateExpression = _ref3.startDateExpression,
      endDateExpression = _ref3.endDateExpression,
      onExtendRange = _ref3.onExtendRange,
      onStreamStart = _ref3.onStreamStart;
  var rangeEdge = position === 'start' ? startDateExpression : endDateExpression;

  if (rangeEdge === 'now' && position === 'end') {
    return React.createElement(_eui.EuiButton, {
      onClick: onStreamStart,
      size: "s"
    }, React.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logs.streamLive",
      defaultMessage: "Stream live"
    }));
  }

  var iconType = position === 'start' ? 'arrowUp' : 'arrowDown';
  var extendedRange = position === 'start' ? (0, _datemath.extendDatemath)(startDateExpression, 'before', endDateExpression) : (0, _datemath.extendDatemath)(endDateExpression, 'after', startDateExpression);

  if (!extendedRange || !('diffUnit' in extendedRange)) {
    return null;
  }

  return React.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      if (typeof onExtendRange === 'function') {
        onExtendRange(extendedRange.value);
      }
    },
    iconType: iconType,
    size: "s"
  }, React.createElement(ProgressExtendMessage, {
    amount: extendedRange.diffAmount,
    unit: extendedRange.diffUnit
  }));
};

var ProgressExtendMessage = function ProgressExtendMessage(_ref4) {
  var amount = _ref4.amount,
      unit = _ref4.unit;

  switch (unit) {
    case 'ms':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByMillisecondsButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {millisecond} other {milliseconds}}",
        values: {
          amount: amount
        }
      });

    case 's':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeBySecondsButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {second} other {seconds}}",
        values: {
          amount: amount
        }
      });

    case 'm':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByMinutesButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {minute} other {minutes}}",
        values: {
          amount: amount
        }
      });

    case 'h':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByHoursButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {hour} other {hours}}",
        values: {
          amount: amount
        }
      });

    case 'd':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByDaysButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {day} other {days}}",
        values: {
          amount: amount
        }
      });

    case 'w':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByWeeksButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {week} other {weeks}}",
        values: {
          amount: amount
        }
      });

    case 'M':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByMonthsButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {month} other {months}}",
        values: {
          amount: amount
        }
      });

    case 'y':
      return React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.extendTimeframeByYearsButton",
        defaultMessage: "Extend time frame by {amount, number} {amount, plural, one {year} other {years}}",
        values: {
          amount: amount
        }
      });

    default:
      throw new TypeError('Unhandled unit: ' + unit);
  }
};