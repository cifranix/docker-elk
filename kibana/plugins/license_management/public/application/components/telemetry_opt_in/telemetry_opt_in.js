"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryOptIn = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _telemetry = require("../../lib/telemetry");

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

var TelemetryOptIn =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TelemetryOptIn, _React$Component);

  function TelemetryOptIn() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TelemetryOptIn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TelemetryOptIn)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showMoreTelemetryInfo: false,
      showExample: false
    });

    _defineProperty(_assertThisInitialized(_this), "closeReadMorePopover", function () {
      _this.setState({
        showMoreTelemetryInfo: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickReadMore", function () {
      var showMoreTelemetryInfo = _this.state.showMoreTelemetryInfo;

      _this.setState({
        showMoreTelemetryInfo: !showMoreTelemetryInfo
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickExample", function () {
      _this.setState({
        showExample: true
      });

      _this.closeReadMorePopover();
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeOptIn", function (event) {
      var isOptingInToTelemetry = event.target.checked;
      var onOptInChange = _this.props.onOptInChange;
      onOptInChange(isOptingInToTelemetry);
    });

    return _this;
  }

  _createClass(TelemetryOptIn, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          showMoreTelemetryInfo = _this$state.showMoreTelemetryInfo,
          showExample = _this$state.showExample;
      var _this$props = this.props,
          isStartTrial = _this$props.isStartTrial,
          isOptingInToTelemetry = _this$props.isOptingInToTelemetry,
          telemetry = _this$props.telemetry;
      var example = null;

      if (showExample) {
        example = _react.default.createElement(_telemetry.OptInExampleFlyout, {
          onClose: function onClose() {
            return _this2.setState({
              showExample: false
            });
          },
          fetchExample: telemetry.telemetryService.fetchExample
        });
      }

      var toCurrentCustomers;

      if (!isStartTrial) {
        toCurrentCustomers = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }), _react.default.createElement(_eui.EuiTitle, {
          size: "s"
        }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.licenseMgmt.telemetryOptIn.customersHelpSupportDescription",
          defaultMessage: "Help Elastic support provide better service"
        }))), _react.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }));
      }

      var readMoreButton = _react.default.createElement(_eui.EuiLink, {
        onClick: this.onClickReadMore
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.telemetryOptIn.readMoreLinkText",
        defaultMessage: "Read more"
      }));

      var popover = _react.default.createElement(_eui.EuiPopover, {
        ownFocus: true,
        id: "readMorePopover",
        button: readMoreButton,
        isOpen: showMoreTelemetryInfo,
        closePopover: this.closeReadMorePopover,
        className: "eui-AlignBaseline"
      }, _react.default.createElement(_eui.EuiText, {
        className: "licManagement__narrowText"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.telemetryOptIn.featureUsageWarningMessage",
        defaultMessage: "This feature periodically sends basic feature usage statistics. This information will not be shared outside of Elastic. See an {exampleLink} or read our {telemetryPrivacyStatementLink}. You can disable this feature any time.",
        values: {
          exampleLink: _react.default.createElement(_eui.EuiLink, {
            onClick: this.onClickExample
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.telemetryOptIn.exampleLinkText",
            defaultMessage: "example"
          })),
          telemetryPrivacyStatementLink: _react.default.createElement(_eui.EuiLink, {
            href: _telemetry.PRIVACY_STATEMENT_URL,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.telemetryOptIn.telemetryPrivacyStatementLinkText",
            defaultMessage: "telemetry privacy statement"
          }))
        }
      }))));

      return _react.default.createElement(_react.Fragment, null, example, toCurrentCustomers, _react.default.createElement(_eui.EuiCheckbox, {
        label: _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.licenseMgmt.telemetryOptIn.sendBasicFeatureStatisticsLabel",
          defaultMessage: "Send basic feature usage statistics to Elastic periodically. {popover}",
          values: {
            popover: popover
          }
        })),
        id: "isOptingInToTelemetry",
        checked: isOptingInToTelemetry,
        onChange: this.onChangeOptIn
      }));
    }
  }]);

  return TelemetryOptIn;
}(_react.default.Component);

exports.TelemetryOptIn = TelemetryOptIn;