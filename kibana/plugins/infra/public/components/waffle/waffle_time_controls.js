"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaffleTimeControls = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WaffleTimeControls =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WaffleTimeControls, _React$Component);

  function WaffleTimeControls() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WaffleTimeControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WaffleTimeControls)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleChangeDate", function (time) {
      var onChangeTime = _this.props.onChangeTime;

      if (onChangeTime && time) {
        onChangeTime(time.valueOf());
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startLiveStreaming", function () {
      var startLiveStreaming = _this.props.startLiveStreaming;

      if (startLiveStreaming) {
        startLiveStreaming();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stopLiveStreaming", function () {
      var stopLiveStreaming = _this.props.stopLiveStreaming;

      if (stopLiveStreaming) {
        stopLiveStreaming();
      }
    });

    return _this;
  }

  _createClass(WaffleTimeControls, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          currentTime = _this$props.currentTime,
          isLiveStreaming = _this$props.isLiveStreaming;
      var currentMoment = (0, _moment.default)(currentTime);
      var liveStreamingButton = isLiveStreaming ? _react2.default.createElement(_eui.EuiButtonEmpty, {
        color: "primary",
        iconSide: "left",
        iconType: "pause",
        onClick: this.stopLiveStreaming
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.waffleTime.stopRefreshingButtonLabel",
        defaultMessage: "Stop refreshing"
      })) : _react2.default.createElement(_eui.EuiButtonEmpty, {
        iconSide: "left",
        iconType: "play",
        onClick: this.startLiveStreaming
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.waffleTime.autoRefreshButtonLabel",
        defaultMessage: "Auto-refresh"
      }));
      return _react2.default.createElement(_eui.EuiFormControlLayout, {
        append: liveStreamingButton,
        "data-test-subj": "waffleDatePicker"
      }, _react2.default.createElement(_eui.EuiDatePicker, {
        className: "euiFieldText--inGroup",
        dateFormat: "L LTS",
        disabled: isLiveStreaming,
        injectTimes: currentMoment ? [currentMoment] : [],
        isLoading: isLiveStreaming,
        onChange: this.handleChangeDate,
        popperPlacement: "top-end",
        selected: currentMoment,
        shouldCloseOnSelect: true,
        showTimeSelect: true,
        timeFormat: "LT"
      }));
    }
  }]);

  return WaffleTimeControls;
}(_react2.default.Component);

exports.WaffleTimeControls = WaffleTimeControls;