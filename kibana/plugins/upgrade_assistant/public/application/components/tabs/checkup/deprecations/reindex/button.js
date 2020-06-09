"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReindexButton = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../../../../../common/types");

var _types2 = require("../../../../types");

var _flyout = require("./flyout");

var _polling_service = require("./polling_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

/**
 * Displays a button that will display a flyout when clicked with the reindexing status for
 * the given `indexName`.
 */
var ReindexButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReindexButton, _React$Component);

  function ReindexButton(props) {
    var _this;

    _classCallCheck(this, ReindexButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReindexButton).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "service", void 0);

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "startReindex",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.reindexState.status) {
                // if status didn't exist we are starting a reindex action
                _this.sendUIReindexTelemetryInfo('start');
              }

              _context.next = 3;
              return _this.service.startReindex();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "cancelReindex",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.sendUIReindexTelemetryInfo('stop');

              _context2.next = 3;
              return _this.service.cancelReindex();

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "showFlyout", function () {
      _this.sendUIReindexTelemetryInfo('open');

      _this.setState({
        flyoutVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeFlyout", function () {
      _this.sendUIReindexTelemetryInfo('close');

      _this.setState({
        flyoutVisible: false
      });
    });

    _this.service = _this.newService();
    _this.state = {
      flyoutVisible: false,
      reindexState: _this.service.status$.value
    };
    return _this;
  }

  _createClass(ReindexButton, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.subscribeToUpdates();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function () {
      var _componentWillUnmount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.unsubscribeToUpdates();

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function componentWillUnmount() {
        return _componentWillUnmount.apply(this, arguments);
      }

      return componentWillUnmount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.indexName !== this.props.indexName) {
        this.unsubscribeToUpdates();
        this.service = this.newService();
        this.subscribeToUpdates();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          indexName = _this$props.indexName,
          reindexBlocker = _this$props.reindexBlocker,
          docLinks = _this$props.docLinks;
      var _this$state = this.state,
          flyoutVisible = _this$state.flyoutVisible,
          reindexState = _this$state.reindexState;
      var buttonProps = {
        size: 's',
        onClick: this.showFlyout
      };

      var buttonContent = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.reindexLabel",
        defaultMessage: "Reindex"
      });

      if (reindexState.loadingState === _types2.LoadingState.Loading) {
        buttonProps.disabled = true;
        buttonContent = _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.loadingLabel",
          defaultMessage: "Loading\u2026"
        });
      } else {
        switch (reindexState.status) {
          case _types.ReindexStatus.inProgress:
            buttonContent = _react.default.createElement("span", null, _react.default.createElement(_eui.EuiLoadingSpinner, {
              className: "upgReindexButton__spinner",
              size: "m"
            }), " Reindexing\u2026");
            break;

          case _types.ReindexStatus.completed:
            buttonProps.color = 'secondary';
            buttonProps.iconSide = 'left';
            buttonProps.iconType = 'check';
            buttonContent = _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.doneLabel",
              defaultMessage: "Done"
            });
            break;

          case _types.ReindexStatus.failed:
            buttonProps.color = 'danger';
            buttonProps.iconSide = 'left';
            buttonProps.iconType = 'cross';
            buttonContent = _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.failedLabel",
              defaultMessage: "Failed"
            });
            break;

          case _types.ReindexStatus.paused:
            buttonProps.color = 'warning';
            buttonProps.iconSide = 'left';
            buttonProps.iconType = 'pause';
            buttonContent = _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.pausedLabel",
              defaultMessage: "Paused"
            });

          case _types.ReindexStatus.cancelled:
            buttonProps.color = 'danger';
            buttonProps.iconSide = 'left';
            buttonProps.iconType = 'cross';
            buttonContent = _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.cancelledLabel",
              defaultMessage: "Cancelled"
            });
            break;
        }
      }

      var showIndexedClosedWarning = reindexBlocker === 'index-closed' && reindexState.status !== _types.ReindexStatus.completed;

      if (showIndexedClosedWarning) {
        buttonProps.color = 'warning';
        buttonProps.iconType = 'alert';
      }

      var button = _react.default.createElement(_eui.EuiButton, buttonProps, buttonContent);

      return _react.default.createElement(_react.Fragment, null, showIndexedClosedWarning ? _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: _react.default.createElement(_eui.EuiText, {
          size: "s"
        }, _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.reindexing.reindexButton.indexClosedToolTipDetails', {
          defaultMessage: '"{indexName}" needs to be reindexed, but it is currently closed. The Upgrade Assistant will open, reindex and then close the index. Reindexing may take longer than usual.',
          values: {
            indexName: indexName
          }
        }))
      }, button) : button, flyoutVisible && _react.default.createElement(_flyout.ReindexFlyout, {
        http: this.props.http,
        reindexBlocker: reindexBlocker,
        docLinks: docLinks,
        indexName: indexName,
        closeFlyout: this.closeFlyout,
        reindexState: reindexState,
        startReindex: this.startReindex,
        cancelReindex: this.cancelReindex
      }));
    }
  }, {
    key: "newService",
    value: function newService() {
      var _this$props2 = this.props,
          indexName = _this$props2.indexName,
          http = _this$props2.http;
      return new _polling_service.ReindexPollingService(indexName, http);
    }
  }, {
    key: "subscribeToUpdates",
    value: function subscribeToUpdates() {
      var _this2 = this;

      this.service.updateStatus();
      this.subscription = this.service.status$.subscribe(function (reindexState) {
        return _this2.setState({
          reindexState: reindexState
        });
      });
    }
  }, {
    key: "unsubscribeToUpdates",
    value: function unsubscribeToUpdates() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        delete this.subscription;
      }

      if (this.service) {
        this.service.stopPolling();
      }
    }
  }, {
    key: "sendUIReindexTelemetryInfo",
    value: function () {
      var _sendUIReindexTelemetryInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(uiReindexAction) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.props.http.fetch('/api/upgrade_assistant/telemetry/ui_reindex', {
                  method: 'PUT',
                  body: JSON.stringify((0, _lodash.set)({}, uiReindexAction, true))
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function sendUIReindexTelemetryInfo(_x) {
        return _sendUIReindexTelemetryInfo.apply(this, arguments);
      }

      return sendUIReindexTelemetryInfo;
    }()
  }]);

  return ReindexButton;
}(_react.default.Component);

exports.ReindexButton = ReindexButton;