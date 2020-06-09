"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckupTab = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _version = require("../../../../../common/version");

var _error_banner = require("../../error_banner");

var _types = require("../../types");

var _controls = require("./controls");

var _grouped = require("./deprecations/grouped");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

/**
 * Displays a list of deprecations that filterable and groupable. Can be used for cluster,
 * nodes, or indices checkups.
 */
var CheckupTab =
/*#__PURE__*/
function (_UpgradeAssistantTabC) {
  _inherits(CheckupTab, _UpgradeAssistantTabC);

  function CheckupTab(props) {
    var _this;

    _classCallCheck(this, CheckupTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckupTab).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "changeFilter", function (filter) {
      _this.setState({
        currentFilter: filter
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSearch", function (search) {
      _this.setState({
        search: search
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeGroupBy", function (groupBy) {
      _this.setState({
        currentGroupBy: groupBy
      });
    });

    _this.state = {
      // initialize to all filters
      currentFilter: _types.LevelFilterOption.all,
      search: '',
      currentGroupBy: _types.GroupByOption.message
    };
    return _this;
  }

  _createClass(CheckupTab, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alertBanner = _this$props.alertBanner,
          checkupLabel = _this$props.checkupLabel,
          deprecations = _this$props.deprecations,
          loadingError = _this$props.loadingError,
          loadingState = _this$props.loadingState,
          refreshCheckupData = _this$props.refreshCheckupData,
          setSelectedTabIndex = _this$props.setSelectedTabIndex,
          _this$props$showBacku = _this$props.showBackupWarning,
          showBackupWarning = _this$props$showBacku === void 0 ? false : _this$props$showBacku;
      var _this$state = this.state,
          currentFilter = _this$state.currentFilter,
          currentGroupBy = _this$state.currentGroupBy;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiText, {
        grow: false
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.tabDetail",
        defaultMessage: "These {strongCheckupLabel} issues need your attention. Resolve them before upgrading to Elasticsearch {nextEsVersion}.",
        values: {
          strongCheckupLabel: _react.default.createElement("strong", null, checkupLabel),
          nextEsVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".x")
        }
      }))), _react.default.createElement(_eui.EuiSpacer, null), alertBanner && _react.default.createElement(_react.Fragment, null, alertBanner, _react.default.createElement(_eui.EuiSpacer, null)), showBackupWarning && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutTitle",
          defaultMessage: "Back up your indices now"
        }),
        color: "warning",
        iconType: "help"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutBody.calloutDetail",
        defaultMessage: "Back up your data using the {snapshotRestoreDocsButton}.",
        values: {
          snapshotRestoreDocsButton: _react.default.createElement(_eui.EuiLink, {
            href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/modules-snapshots.html",
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutBody.snapshotRestoreDocsButtonLabel",
            defaultMessage: "snapshot and restore APIs"
          }))
        }
      }))), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentBody, null, loadingState === _types.LoadingState.Error ? _react.default.createElement(_error_banner.LoadingErrorBanner, {
        loadingError: loadingError
      }) : deprecations && deprecations.length > 0 ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_controls.CheckupControls, {
        allDeprecations: deprecations,
        loadingState: loadingState,
        loadData: refreshCheckupData,
        currentFilter: currentFilter,
        onFilterChange: this.changeFilter,
        onSearchChange: this.changeSearch,
        availableGroupByOptions: this.availableGroupByOptions(),
        currentGroupBy: currentGroupBy,
        onGroupByChange: this.changeGroupBy
      }), _react.default.createElement(_eui.EuiSpacer, null), this.renderCheckupData()) : _react.default.createElement(_eui.EuiEmptyPrompt, {
        iconType: "faceHappy",
        title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.noIssues.noIssuesTitle",
          defaultMessage: "All clear!"
        })),
        body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", {
          "data-test-subj": "upgradeAssistantIssueSummary"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.noIssues.noIssuesLabel",
          defaultMessage: "You have no {strongCheckupLabel} issues.",
          values: {
            strongCheckupLabel: _react.default.createElement("strong", null, checkupLabel)
          }
        })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.noIssues.nextStepsDetail",
          defaultMessage: "Check the {overviewTabButton} for next steps.",
          values: {
            overviewTabButton: _react.default.createElement(_eui.EuiLink, {
              onClick: function onClick() {
                return setSelectedTabIndex(0);
              }
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.upgradeAssistant.checkupTab.noIssues.nextStepsDetail.overviewTabButtonLabel",
              defaultMessage: "Overview tab"
            }))
          }
        })))
      }))));
    }
  }, {
    key: "availableGroupByOptions",
    value: function availableGroupByOptions() {
      var deprecations = this.props.deprecations;

      if (!deprecations) {
        return [];
      }

      return Object.keys(_types.GroupByOption).filter(function (opt) {
        return (0, _lodash.find)(deprecations, opt);
      });
    }
  }, {
    key: "renderCheckupData",
    value: function renderCheckupData() {
      var deprecations = this.props.deprecations;
      var _this$state2 = this.state,
          currentFilter = _this$state2.currentFilter,
          currentGroupBy = _this$state2.currentGroupBy,
          search = _this$state2.search;
      return _react.default.createElement(_grouped.GroupedDeprecations, {
        currentGroupBy: currentGroupBy,
        currentFilter: currentFilter,
        search: search,
        allDeprecations: deprecations
      });
    }
  }]);

  return CheckupTab;
}(_types.UpgradeAssistantTabComponent);

exports.CheckupTab = CheckupTab;