"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecationLoggingToggle = exports.DeprecationLoggingToggleUI = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DeprecationLoggingToggleUI =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DeprecationLoggingToggleUI, _React$Component);

  function DeprecationLoggingToggleUI(props) {
    var _this;

    _classCallCheck(this, DeprecationLoggingToggleUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DeprecationLoggingToggleUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "loadData",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              _this.setState({
                loadingState: _types.LoadingState.Loading
              });

              _context.next = 4;
              return _this.props.http.get('/api/upgrade_assistant/deprecation_logging');

            case 4:
              resp = _context.sent;

              _this.setState({
                loadingState: _types.LoadingState.Success,
                loggingEnabled: resp.isEnabled
              });

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              _this.setState({
                loadingState: _types.LoadingState.Error
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "toggleLogging",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var newEnabled, resp;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // Optimistically toggle the UI
              newEnabled = !_this.state.loggingEnabled;

              _this.setState({
                loadingState: _types.LoadingState.Loading,
                loggingEnabled: newEnabled
              });

              _context2.next = 5;
              return _this.props.http.put('/api/upgrade_assistant/deprecation_logging', {
                body: JSON.stringify({
                  isEnabled: newEnabled
                })
              });

            case 5:
              resp = _context2.sent;

              _this.setState({
                loadingState: _types.LoadingState.Success,
                loggingEnabled: resp.isEnabled
              });

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);

              _this.setState({
                loadingState: _types.LoadingState.Error
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    })));

    _this.state = {
      loadingState: _types.LoadingState.Loading
    };
    return _this;
  }

  _createClass(DeprecationLoggingToggleUI, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          loggingEnabled = _this$state.loggingEnabled,
          loadingState = _this$state.loadingState; // Show a spinner until we've done the initial load.

      if (loadingState === _types.LoadingState.Loading && loggingEnabled === undefined) {
        return _react.default.createElement(_eui.EuiLoadingSpinner, {
          size: "l"
        });
      }

      return _react.default.createElement(_eui.EuiSwitch, {
        id: "xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingToggleSwitch",
        "data-test-subj": "upgradeAssistantDeprecationToggle",
        label: this.renderLoggingState(),
        checked: loggingEnabled || false,
        onChange: this.toggleLogging,
        disabled: loadingState === _types.LoadingState.Loading || loadingState === _types.LoadingState.Error
      });
    }
  }, {
    key: "renderLoggingState",
    value: function renderLoggingState() {
      var intl = this.props.intl;
      var _this$state2 = this.state,
          loggingEnabled = _this$state2.loggingEnabled,
          loadingState = _this$state2.loadingState;

      if (loadingState === _types.LoadingState.Error) {
        return intl.formatMessage({
          id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingToggleSwitch.errorLabel',
          defaultMessage: 'Could not load logging state'
        });
      } else if (loggingEnabled) {
        return intl.formatMessage({
          id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingToggleSwitch.enabledLabel',
          defaultMessage: 'On'
        });
      } else {
        return intl.formatMessage({
          id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingToggleSwitch.disabledLabel',
          defaultMessage: 'Off'
        });
      }
    }
  }]);

  return DeprecationLoggingToggleUI;
}(_react.default.Component);

exports.DeprecationLoggingToggleUI = DeprecationLoggingToggleUI;
var DeprecationLoggingToggle = (0, _react2.injectI18n)(DeprecationLoggingToggleUI);
exports.DeprecationLoggingToggle = DeprecationLoggingToggle;