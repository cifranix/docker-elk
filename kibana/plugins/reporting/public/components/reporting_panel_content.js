"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingPanelContent = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _url = _interopRequireDefault(require("url"));

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReportingPanelContentUi =
/*#__PURE__*/
function (_Component) {
  _inherits(ReportingPanelContentUi, _Component);

  function ReportingPanelContentUi(_props) {
    var _this;

    _classCallCheck(this, ReportingPanelContentUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportingPanelContentUi).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "getAbsoluteReportGenerationUrl", function (props) {
      var relativePath = _this.props.apiClient.getReportingJobPath(props.reportType, props.getJobParams());

      return _url.default.resolve(window.location.href, relativePath);
    });

    _defineProperty(_assertThisInitialized(_this), "renderGenerateReportButton", function (isDisabled) {
      return _react2.default.createElement(_eui.EuiButton, {
        disabled: isDisabled,
        fullWidth: true,
        fill: true,
        onClick: _this.createReportingJob,
        "data-test-subj": "generateReportButton",
        size: "s"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.reporting.panelContent.generateButtonLabel",
        defaultMessage: "Generate {reportingType}",
        values: {
          reportingType: _this.prettyPrintReportingType()
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "prettyPrintReportingType", function () {
      switch (_this.props.reportType) {
        case 'printablePdf':
          return 'PDF';

        case 'csv':
          return 'CSV';

        case 'png':
          return 'PNG';

        default:
          return _this.props.reportType;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "markAsStale", function () {
      if (!_this.mounted) {
        return;
      }

      _this.setState({
        isStale: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isNotSaved", function () {
      return _this.props.objectId === undefined || _this.props.objectId === '';
    });

    _defineProperty(_assertThisInitialized(_this), "setAbsoluteReportGenerationUrl", function () {
      if (!_this.mounted) {
        return;
      }

      var absoluteUrl = _this.getAbsoluteReportGenerationUrl(_this.props);

      _this.setState({
        absoluteUrl: absoluteUrl
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createReportingJob", function () {
      var intl = _this.props.intl;
      return _this.props.apiClient.createReportingJob(_this.props.reportType, _this.props.getJobParams()).then(function () {
        _this.props.toasts.addSuccess({
          title: intl.formatMessage({
            id: 'xpack.reporting.panelContent.successfullyQueuedReportNotificationTitle',
            defaultMessage: 'Queued report for {objectType}'
          }, {
            objectType: _this.props.objectType
          }),
          text: (0, _public.toMountPoint)(_react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.reporting.panelContent.successfullyQueuedReportNotificationDescription",
            defaultMessage: "Track its progress in Management"
          })),
          'data-test-subj': 'queueReportSuccess'
        });

        _this.props.onClose();
      }).catch(function (error) {
        var _error$res;

        if (error.message === 'not exportable') {
          return _this.props.toasts.addWarning({
            title: intl.formatMessage({
              id: 'xpack.reporting.panelContent.whatCanBeExportedWarningTitle',
              defaultMessage: 'Only saved {objectType} can be exported'
            }, {
              objectType: _this.props.objectType
            }),
            text: (0, _public.toMountPoint)(_react2.default.createElement(_react.FormattedMessage, {
              id: "xpack.reporting.panelContent.whatCanBeExportedWarningDescription",
              defaultMessage: "Please save your work first"
            }))
          });
        }

        var defaultMessage = (error === null || error === void 0 ? void 0 : (_error$res = error.res) === null || _error$res === void 0 ? void 0 : _error$res.status) === 403 ? _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.reporting.panelContent.noPermissionToGenerateReportDescription",
          defaultMessage: "You don't have permission to generate this report."
        }) : _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.reporting.panelContent.notification.cantReachServerDescription",
          defaultMessage: "Can't reach the server. Please try again."
        });

        _this.props.toasts.addDanger({
          title: intl.formatMessage({
            id: 'xpack.reporting.panelContent.notification.reportingErrorTitle',
            defaultMessage: 'Reporting error'
          }),
          text: (0, _public.toMountPoint)(error.message || defaultMessage),
          'data-test-subj': 'queueReportError'
        });
      });
    });

    _this.state = {
      isStale: false,
      absoluteUrl: _this.getAbsoluteReportGenerationUrl(_props),
      layoutId: ''
    };
    return _this;
  }

  _createClass(ReportingPanelContentUi, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.layoutId && this.props.layoutId !== prevState.layoutId) {
        this.setState(_objectSpread({}, prevState, {
          absoluteUrl: this.getAbsoluteReportGenerationUrl(this.props),
          layoutId: this.props.layoutId
        }));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('hashchange', this.markAsStale);
      window.removeEventListener('resize', this.setAbsoluteReportGenerationUrl);
      this.mounted = false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      window.addEventListener('hashchange', this.markAsStale, false);
      window.addEventListener('resize', this.setAbsoluteReportGenerationUrl);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isNotSaved() || this.props.isDirty || this.state.isStale) {
        return _react2.default.createElement(_eui.EuiForm, {
          className: "kbnShareContextMenu__finalPanel",
          "data-test-subj": "shareReportingForm"
        }, _react2.default.createElement(_eui.EuiFormRow, {
          helpText: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.reporting.panelContent.saveWorkDescription",
            defaultMessage: "Please save your work before generating a report."
          })
        }, this.renderGenerateReportButton(true)));
      }

      var reportMsg = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.reporting.panelContent.generationTimeDescription",
        defaultMessage: "{reportingType}s can take a minute or two to generate based upon the size of your {objectType}.",
        description: "Here 'reportingType' can be 'PDF' or 'CSV'",
        values: {
          reportingType: this.prettyPrintReportingType(),
          objectType: this.props.objectType
        }
      });

      return _react2.default.createElement(_eui.EuiForm, {
        className: "kbnShareContextMenu__finalPanel",
        "data-test-subj": "shareReportingForm"
      }, _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement("p", null, reportMsg)), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), this.props.options, this.renderGenerateReportButton(false), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.reporting.panelContent.howToCallGenerationDescription",
        defaultMessage: "Alternatively, copy this POST URL to call generation from outside Kibana or from Watcher."
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react2.default.createElement(_eui.EuiCopy, {
        textToCopy: this.state.absoluteUrl,
        anchorClassName: "eui-displayBlock"
      }, function (copy) {
        return _react2.default.createElement(_eui.EuiButton, {
          fullWidth: true,
          onClick: copy,
          size: "s"
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.reporting.panelContent.copyUrlButtonLabel",
          defaultMessage: "Copy POST URL"
        }));
      }));
    }
  }]);

  return ReportingPanelContentUi;
}(_react2.Component);

var ReportingPanelContent = (0, _react.injectI18n)(ReportingPanelContentUi);
exports.ReportingPanelContent = ReportingPanelContent;