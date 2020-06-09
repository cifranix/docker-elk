"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartTrial = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _telemetry_opt_in = require("../../../components/telemetry_opt_in");

var _constants = require("../../../../../common/constants");

var _app_context = require("../../../app_context");

var _telemetry = require("../../../lib/telemetry");

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

var StartTrial =
/*#__PURE__*/
function (_Component) {
  _inherits(StartTrial, _Component);

  function StartTrial() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StartTrial);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StartTrial)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "cancelRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "confirmRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      showConfirmation: false,
      isOptingInToTelemetry: false
    });

    _defineProperty(_assertThisInitialized(_this), "onOptInChange", function (isOptingInToTelemetry) {
      _this.setState({
        isOptingInToTelemetry: isOptingInToTelemetry
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onStartLicenseTrial", function () {
      var _this$props = _this.props,
          telemetry = _this$props.telemetry,
          startLicenseTrial = _this$props.startLicenseTrial;

      if (_this.state.isOptingInToTelemetry && telemetry) {
        telemetry.telemetryService.setOptIn(true);
      }

      startLicenseTrial();
    });

    _defineProperty(_assertThisInitialized(_this), "cancel", function () {
      _this.setState({
        showConfirmation: false
      });
    });

    return _this;
  }

  _createClass(StartTrial, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.props.loadTrialStatus();
    }
  }, {
    key: "acknowledgeModal",
    value: function acknowledgeModal(docLinks) {
      var _this$state = this.state,
          showConfirmation = _this$state.showConfirmation,
          isOptingInToTelemetry = _this$state.isOptingInToTelemetry;
      var telemetry = this.props.telemetry;

      if (!showConfirmation) {
        return null;
      }

      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
        className: "licManagement__modal",
        onClose: this.cancel
      }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, {
        "data-test-subj": "confirmModalTitleText"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalTitle",
        defaultMessage: "Start your free 30-day trial"
      }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiText, {
        "data-test-subj": "confirmModalBodyText"
      }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription",
        defaultMessage: "This trial is for the full set of {platinumLicenseFeaturesLinkText} of the Elastic Stack. You'll get immediate access to:",
        values: {
          platinumLicenseFeaturesLinkText: _react.default.createElement(_eui.EuiLink, {
            href: _constants.EXTERNAL_LINKS.SUBSCRIPTIONS,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.platinumLicenseFeaturesLinkText",
            defaultMessage: "Platinum features"
          }))
        }
      })), _react.default.createElement("ul", null, _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.mashingLearningFeatureTitle",
        defaultMessage: "Machine learning"
      })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.alertingFeatureTitle",
        defaultMessage: "Alerting"
      })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.graphCapabilitiesFeatureTitle",
        defaultMessage: "Graph capabilities"
      })), _react.default.createElement("li", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.dataBaseConnectivityFeatureTitle",
        defaultMessage: "{jdbcStandard} and {odbcStandard} connectivity for {sqlDataBase}",
        values: {
          jdbcStandard: 'JDBC',
          odbcStandard: 'ODBC',
          sqlDataBase: 'SQL'
        }
      }))), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.securityFeaturesConfigurationDescription",
        defaultMessage: "Advanced security features, such as authentication ({authenticationTypeList}), field- and document-level security, and auditing, require configuration. See the {securityDocumentationLinkText} for instructions.",
        values: {
          authenticationTypeList: 'AD/LDAP, SAML, PKI, SAML/SSO',
          securityDocumentationLinkText: _react.default.createElement(_eui.EuiLink, {
            href: docLinks.security,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.securityDocumentationLinkText",
            defaultMessage: "documentation"
          }))
        }
      })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.termsAndConditionsDescription",
        defaultMessage: "By starting this trial, you agree that it is subject to these {termsAndConditionsLinkText}.",
        values: {
          termsAndConditionsLinkText: _react.default.createElement(_eui.EuiLink, {
            href: _constants.EXTERNAL_LINKS.TRIAL_LICENSE,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModalDescription.termsAndConditionsLinkText",
            defaultMessage: "terms and conditions"
          }))
        }
      })))))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, (0, _telemetry.shouldShowTelemetryOptIn)(telemetry) && _react.default.createElement(_telemetry_opt_in.TelemetryOptIn, {
        telemetry: telemetry,
        isStartTrial: true,
        onOptInChange: this.onOptInChange,
        isOptingInToTelemetry: isOptingInToTelemetry
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "licManagement__ieFlex"
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "licManagement__ieFlex"
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "confirmModalCancelButton",
        onClick: this.cancel,
        buttonRef: this.cancelRef
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "licManagement__ieFlex"
      }, _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "confirmModalConfirmButton",
        onClick: this.onStartLicenseTrial,
        fill: true,
        buttonRef: this.confirmRef,
        color: "primary"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.confirmModal.startTrialButtonLabel",
        defaultMessage: "Start my trial"
      })))))))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var shouldShowStartTrial = this.props.shouldShowStartTrial;

      if (!shouldShowStartTrial) {
        return null;
      }

      var description = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.platinumFeaturesExperienceDescription",
        defaultMessage: "Experience what machine learning, advanced security, and all our other {platinumLicenseFeaturesLinkText} have to offer.",
        values: {
          platinumLicenseFeaturesLinkText: _react.default.createElement(_eui.EuiLink, {
            href: _constants.EXTERNAL_LINKS.SUBSCRIPTIONS,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.licenseDashboard.startTrial.platinumLicenseFeaturesLinkText",
            defaultMessage: "Platinum features"
          }))
        }
      }));

      var footer = _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "startTrialButton",
        onClick: function onClick() {
          return _this2.setState({
            showConfirmation: true
          });
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licenseMgmt.licenseDashboard.startTrial.startTrialButtonLabel",
        defaultMessage: "Start trial"
      }));

      return _react.default.createElement(_app_context.AppContextConsumer, null, function (dependencies) {
        return _react.default.createElement(_eui.EuiFlexItem, null, _this2.acknowledgeModal(dependencies.docLinks), _react.default.createElement(_eui.EuiCard, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.licenseMgmt.licenseDashboard.startTrialTitle",
            defaultMessage: "Start a 30-day trial"
          }),
          description: description,
          footer: footer
        }));
      });
    }
  }]);

  return StartTrial;
}(_react.Component);

exports.StartTrial = StartTrial;