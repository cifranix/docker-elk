"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReindexFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _types = require("../../../../../../../../common/types");

var _checklist_step = require("./checklist_step");

var _warnings_step = require("./warnings_step");

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

var ReindexFlyoutStep;

(function (ReindexFlyoutStep) {
  ReindexFlyoutStep[ReindexFlyoutStep["reindexWarnings"] = 0] = "reindexWarnings";
  ReindexFlyoutStep[ReindexFlyoutStep["checklist"] = 1] = "checklist";
})(ReindexFlyoutStep || (ReindexFlyoutStep = {}));

var getOpenAndCloseIndexDocLink = function getOpenAndCloseIndexDocLink(_ref) {
  var ELASTIC_WEBSITE_URL = _ref.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _ref.DOC_LINK_VERSION;
  return _react.default.createElement(_eui.EuiLink, {
    target: "_blank",
    href: "".concat(ELASTIC_WEBSITE_URL, "/guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/indices-open-close.html")
  }, _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.reindexing.flyout.openAndCloseDocumentation', {
    defaultMessage: 'documentation'
  }));
};

var getIndexClosedCallout = function getIndexClosedCallout(docLinks) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.reindexing.flyout.indexClosedCallout.calloutTitle', {
      defaultMessage: 'Index closed'
    }),
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.indexClosedCallout.calloutDetails",
    defaultMessage: "This index is currently closed. The Upgrade Assistant will open, reindex and then close the index. {reindexingMayTakeLongerEmph}. Please see the {docs} for more information.",
    values: {
      docs: getOpenAndCloseIndexDocLink(docLinks),
      reindexingMayTakeLongerEmph: _react.default.createElement("b", null, _i18n.i18n.translate('xpack.upgradeAssistant.checkupTab.reindexing.flyout.indexClosedCallout.calloutDetails.reindexingTakesLongerEmphasis', {
        defaultMessage: 'Reindexing may take longer than usual'
      }))
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};
/**
 * Wrapper for the contents of the flyout that manages which step of the flyout to show.
 */


var ReindexFlyout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReindexFlyout, _React$Component);

  function ReindexFlyout(props) {
    var _this;

    _classCallCheck(this, ReindexFlyout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReindexFlyout).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "advanceNextStep", function () {
      _this.setState({
        currentFlyoutStep: ReindexFlyoutStep.checklist
      });
    });

    var _props$reindexState = props.reindexState,
        status = _props$reindexState.status,
        reindexWarnings = _props$reindexState.reindexWarnings;
    _this.state = {
      // If there are any warnings and we haven't started reindexing, show the warnings step first.
      currentFlyoutStep: reindexWarnings && reindexWarnings.length > 0 && status === undefined ? ReindexFlyoutStep.reindexWarnings : ReindexFlyoutStep.checklist
    };
    return _this;
  }

  _createClass(ReindexFlyout, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          closeFlyout = _this$props.closeFlyout,
          indexName = _this$props.indexName,
          reindexState = _this$props.reindexState,
          startReindex = _this$props.startReindex,
          cancelReindex = _this$props.cancelReindex,
          reindexBlocker = _this$props.reindexBlocker,
          docLinks = _this$props.docLinks;
      var currentFlyoutStep = this.state.currentFlyoutStep;
      var flyoutContents;
      var globalCallout = reindexBlocker === 'index-closed' && reindexState.status !== _types.ReindexStatus.completed ? getIndexClosedCallout(docLinks) : undefined;

      switch (currentFlyoutStep) {
        case ReindexFlyoutStep.reindexWarnings:
          flyoutContents = _react.default.createElement(_warnings_step.WarningsFlyoutStep, {
            renderGlobalCallouts: function renderGlobalCallouts() {
              return globalCallout;
            },
            closeFlyout: closeFlyout,
            warnings: reindexState.reindexWarnings,
            advanceNextStep: this.advanceNextStep
          });
          break;

        case ReindexFlyoutStep.checklist:
          flyoutContents = _react.default.createElement(_checklist_step.ChecklistFlyoutStep, {
            http: this.props.http,
            renderGlobalCallouts: function renderGlobalCallouts() {
              return globalCallout;
            },
            closeFlyout: closeFlyout,
            reindexState: reindexState,
            startReindex: startReindex,
            cancelReindex: cancelReindex
          });
          break;

        default:
          throw new Error("Invalid flyout step: ".concat(currentFlyoutStep));
      }

      return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_eui.EuiFlyout, {
        onClose: closeFlyout,
        "aria-labelledby": "Reindex",
        ownFocus: true,
        size: "m",
        maxWidth: true
      }, _react.default.createElement(_eui.EuiFlyoutHeader, {
        hasBorder: true
      }, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.flyoutHeader",
        defaultMessage: "Reindex {indexName}",
        values: {
          indexName: indexName
        }
      })))), flyoutContents));
    }
  }]);

  return ReindexFlyout;
}(_react.default.Component);

exports.ReindexFlyout = ReindexFlyout;