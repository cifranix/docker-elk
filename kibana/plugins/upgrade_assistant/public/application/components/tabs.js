"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpgradeAssistantTabs = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _latest_minor_banner = require("./latest_minor_banner");

var _checkup = require("./tabs/checkup");

var _overview = require("./tabs/overview");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var ClusterUpgradeState;

(function (ClusterUpgradeState) {
  ClusterUpgradeState[ClusterUpgradeState["needsUpgrade"] = 0] = "needsUpgrade";
  ClusterUpgradeState[ClusterUpgradeState["partiallyUpgraded"] = 1] = "partiallyUpgraded";
  ClusterUpgradeState[ClusterUpgradeState["upgraded"] = 2] = "upgraded";
})(ClusterUpgradeState || (ClusterUpgradeState = {}));

var UpgradeAssistantTabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UpgradeAssistantTabs, _React$Component);

  function UpgradeAssistantTabs(props) {
    var _this;

    _classCallCheck(this, UpgradeAssistantTabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpgradeAssistantTabs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function (selectedTab) {
      var selectedTabIndex = (0, _lodash.findIndex)(_this.tabs, {
        id: selectedTab.id
      });

      if (selectedTabIndex === -1) {
        throw new Error("Clicked tab did not exist in tabs array");
      } // Send telemetry info about the current selected tab
      // only in case the clicked tab id it's different from the
      // current selected tab id


      if (_this.tabs[_this.state.selectedTabIndex].id !== selectedTab.id) {
        _this.sendTelemetryInfo(selectedTab.id);
      }

      _this.setSelectedTabIndex(selectedTabIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectedTabIndex", function (selectedTabIndex) {
      _this.setState({
        selectedTabIndex: selectedTabIndex
      });
    });

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
              return _this.props.http.get('/api/upgrade_assistant/status');

            case 4:
              resp = _context.sent;

              _this.setState({
                loadingState: _types.LoadingState.Success,
                checkupData: resp
              });

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              if ((0, _lodash.get)(_context.t0, 'response.status') === 426) {
                _this.setState({
                  loadingState: _types.LoadingState.Success,
                  clusterUpgradeState: (0, _lodash.get)(_context.t0, 'response.data.attributes.allNodesUpgraded', false) ? ClusterUpgradeState.upgraded : ClusterUpgradeState.partiallyUpgraded
                });
              } else {
                _this.setState({
                  loadingState: _types.LoadingState.Error,
                  loadingError: _context.t0
                });
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    })));

    _this.state = {
      loadingState: _types.LoadingState.Loading,
      clusterUpgradeState: ClusterUpgradeState.needsUpgrade,
      selectedTabIndex: 0,
      telemetryState: _types.TelemetryState.Complete
    };
    return _this;
  }

  _createClass(UpgradeAssistantTabs, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadData();

              case 2:
                // Send telemetry info about the default selected tab
                this.sendTelemetryInfo(this.tabs[this.state.selectedTabIndex].id);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          selectedTabIndex = _this$state.selectedTabIndex,
          telemetryState = _this$state.telemetryState,
          clusterUpgradeState = _this$state.clusterUpgradeState;
      var tabs = this.tabs;

      if (clusterUpgradeState === ClusterUpgradeState.partiallyUpgraded) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
          iconType: "logoElasticsearch",
          title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.tabs.upgradingInterstitial.upgradingTitle",
            defaultMessage: "Your cluster is upgrading"
          })),
          body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.tabs.upgradingInterstitial.upgradingDescription",
            defaultMessage: "One or more Elasticsearch nodes have a newer version of Elasticsearch than Kibana. Once all your nodes are upgraded, upgrade Kibana."
          }))
        })));
      } else if (clusterUpgradeState === ClusterUpgradeState.upgraded) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiEmptyPrompt, {
          iconType: "logoElasticsearch",
          title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.tabs.upgradingInterstitial.upgradeCompleteTitle",
            defaultMessage: "Your cluster has been upgraded"
          })),
          body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.tabs.upgradingInterstitial.upgradeCompleteDescription",
            defaultMessage: "All Elasticsearch nodes have been upgraded. You may now upgrade Kibana."
          }))
        })));
      }

      return _react.default.createElement(_eui.EuiTabbedContent, {
        "data-test-subj": telemetryState === _types.TelemetryState.Running ? 'upgradeAssistantTelemetryRunning' : undefined,
        tabs: tabs,
        onTabClick: this.onTabClick,
        selectedTab: tabs[selectedTabIndex]
      });
    }
  }, {
    key: "sendTelemetryInfo",
    value: function () {
      var _sendTelemetryInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(tabName) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.state.loadingState !== _types.LoadingState.Success)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.setState({
                  telemetryState: _types.TelemetryState.Running
                });
                _context3.next = 5;
                return this.props.http.fetch('/api/upgrade_assistant/telemetry/ui_open', {
                  method: 'PUT',
                  body: JSON.stringify((0, _lodash.set)({}, tabName, true))
                });

              case 5:
                this.setState({
                  telemetryState: _types.TelemetryState.Complete
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendTelemetryInfo(_x) {
        return _sendTelemetryInfo.apply(this, arguments);
      }

      return sendTelemetryInfo;
    }()
  }, {
    key: "tabs",
    get: function get() {
      var _this$state2 = this.state,
          loadingError = _this$state2.loadingError,
          loadingState = _this$state2.loadingState,
          checkupData = _this$state2.checkupData;
      var commonProps = {
        loadingError: loadingError,
        loadingState: loadingState,
        refreshCheckupData: this.loadData,
        setSelectedTabIndex: this.setSelectedTabIndex,
        // Remove this in last minor of the current major (eg. 6.7)
        alertBanner: _react.default.createElement(_latest_minor_banner.LatestMinorBanner, null)
      };
      return [{
        id: 'overview',
        name: _i18n.i18n.translate('xpack.upgradeAssistant.overviewTab.overviewTabTitle', {
          defaultMessage: 'Overview'
        }),
        content: _react.default.createElement(_overview.OverviewTab, _extends({
          checkupData: checkupData
        }, commonProps))
      }, {
        id: 'cluster',
        name: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.clusterTabLabel', {
          defaultMessage: 'Cluster'
        }),
        content: _react.default.createElement(_checkup.CheckupTab, _extends({
          key: "cluster",
          deprecations: checkupData ? checkupData.cluster : undefined,
          checkupLabel: _i18n.i18n.translate('xpack.upgradeAssistant.tabs.checkupTab.clusterLabel', {
            defaultMessage: 'cluster'
          })
        }, commonProps))
      }, {
        id: 'indices',
        name: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.indicesTabLabel', {
          defaultMessage: 'Indices'
        }),
        content: _react.default.createElement(_checkup.CheckupTab, _extends({
          key: "indices",
          deprecations: checkupData ? checkupData.indices : undefined,
          checkupLabel: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.indexLabel', {
            defaultMessage: 'index'
          }),
          showBackupWarning: true
        }, commonProps))
      }];
    }
  }]);

  return UpgradeAssistantTabs;
}(_react.default.Component);

exports.UpgradeAssistantTabs = UpgradeAssistantTabs;