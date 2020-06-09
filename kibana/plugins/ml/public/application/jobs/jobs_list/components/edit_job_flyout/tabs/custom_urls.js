"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomUrls = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _custom_url_editor = require("../../../../components/custom_url_editor");

var _utils = require("../../../../components/custom_url_editor/utils");

var _public = require("../../../../../../../../../../src/plugins/kibana_react/public");

var _edit_utils = require("../edit_utils");

var _custom_url_utils = require("../../../../../util/custom_url_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MAX_NUMBER_DASHBOARDS = 1000;
var MAX_NUMBER_INDEX_PATTERNS = 1000;

var CustomUrlsUI =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomUrlsUI, _Component);

  function CustomUrlsUI(props) {
    var _this;

    _classCallCheck(this, CustomUrlsUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomUrlsUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "editNewCustomUrl", function () {
      // Opens the editor for configuring a new custom URL.
      _this.setState(function (prevState) {
        var dashboards = prevState.dashboards,
            indexPatterns = prevState.indexPatterns;
        return {
          editorOpen: true,
          editorSettings: (0, _utils.getNewCustomUrlDefaults)(_this.props.job, dashboards, indexPatterns)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setEditCustomUrl", function (customUrl) {
      _this.setState({
        editorSettings: customUrl
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addNewCustomUrl", function () {
      (0, _utils.buildCustomUrlFromSettings)(_this.state.editorSettings).then(function (customUrl) {
        var customUrls = [].concat(_toConsumableArray(_this.state.customUrls), [customUrl]);

        _this.props.setCustomUrls(customUrls);

        _this.setState({
          editorOpen: false
        });
      }).catch(function (error) {
        // eslint-disable-next-line no-console
        console.error('Error building custom URL from settings:', error);
        var toasts = _this.props.kibana.services.notifications.toasts;
        toasts.addDanger(_i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.addNewUrlErrorNotificationMessage', {
          defaultMessage: 'An error occurred building the new custom URL from the supplied settings'
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTestButtonClick", function () {
      var toasts = _this.props.kibana.services.notifications.toasts;
      var job = _this.props.job;
      (0, _utils.buildCustomUrlFromSettings)(_this.state.editorSettings).then(function (customUrl) {
        (0, _utils.getTestUrl)(job, customUrl).then(function (testUrl) {
          (0, _custom_url_utils.openCustomUrlWindow)(testUrl, customUrl);
        }).catch(function (resp) {
          // eslint-disable-next-line no-console
          console.error('Error obtaining URL for test:', resp);
          toasts.addWarning(_i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.getTestUrlErrorNotificationMessage', {
            defaultMessage: 'An error occurred obtaining the URL to test the configuration'
          }));
        });
      }).catch(function (resp) {
        // eslint-disable-next-line no-console
        console.error('Error building custom URL from settings:', resp);
        toasts.addWarning(_i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.buildUrlErrorNotificationMessage', {
          defaultMessage: 'An error occurred building the custom URL for testing from the supplied settings'
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeEditor", function () {
      _this.setState({
        editorOpen: false
      });
    });

    _this.state = {
      customUrls: [],
      dashboards: [],
      indexPatterns: [],
      queryEntityFieldNames: [],
      editorOpen: false
    };
    return _this;
  }

  _createClass(CustomUrlsUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var toasts = this.props.kibana.services.notifications.toasts;
      (0, _edit_utils.loadSavedDashboards)(MAX_NUMBER_DASHBOARDS).then(function (dashboards) {
        _this2.setState({
          dashboards: dashboards
        });
      }).catch(function (resp) {
        // eslint-disable-next-line no-console
        console.error('Error loading list of dashboards:', resp);
        toasts.addDanger(_i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.loadSavedDashboardsErrorNotificationMessage', {
          defaultMessage: 'An error occurred loading the list of saved Kibana dashboards'
        }));
      });
      (0, _edit_utils.loadIndexPatterns)(MAX_NUMBER_INDEX_PATTERNS).then(function (indexPatterns) {
        _this2.setState({
          indexPatterns: indexPatterns
        });
      }).catch(function (resp) {
        // eslint-disable-next-line no-console
        console.error('Error loading list of dashboards:', resp);
        toasts.addDanger(_i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.loadIndexPatternsErrorNotificationMessage', {
          defaultMessage: 'An error occurred loading the list of saved index patterns'
        }));
      });
    }
  }, {
    key: "renderEditor",
    value: function renderEditor() {
      var _this$props$editMode;

      var _this$state = this.state,
          customUrls = _this$state.customUrls,
          editorOpen = _this$state.editorOpen,
          editorSettings = _this$state.editorSettings,
          dashboards = _this$state.dashboards,
          indexPatterns = _this$state.indexPatterns,
          queryEntityFieldNames = _this$state.queryEntityFieldNames;
      var editMode = (_this$props$editMode = this.props.editMode) !== null && _this$props$editMode !== void 0 ? _this$props$editMode : 'inline';

      var editor = _react.default.createElement(_custom_url_editor.CustomUrlEditor, {
        customUrl: editorSettings,
        setEditCustomUrl: this.setEditCustomUrl,
        savedCustomUrls: customUrls,
        dashboards: dashboards,
        indexPatterns: indexPatterns,
        queryEntityFieldNames: queryEntityFieldNames
      });

      var isValidEditorSettings = editorOpen && editorSettings !== undefined ? (0, _utils.isValidCustomUrlSettings)(editorSettings, customUrls) : true;

      var addButton = _react.default.createElement(_eui.EuiButton, {
        onClick: this.addNewCustomUrl,
        isDisabled: !isValidEditorSettings,
        "data-test-subj": "mlJobAddCustomUrl"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.jobsList.editJobFlyout.customUrls.addButtonLabel",
        defaultMessage: "Add"
      }));

      var testButton = _react.default.createElement(_eui.EuiButtonEmpty, {
        iconType: "popout",
        iconSide: "right",
        onClick: this.onTestButtonClick,
        isDisabled: !isValidEditorSettings
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.jobsList.editJobFlyout.customUrls.testButtonLabel",
        defaultMessage: "Test"
      }));

      return editMode === 'inline' ? _react.default.createElement(_eui.EuiPanel, {
        className: "edit-custom-url-panel"
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        color: "text",
        onClick: this.closeEditor,
        iconType: "cross",
        "aria-label": _i18n.i18n.translate('xpack.ml.jobsList.editJobFlyout.customUrls.closeEditorAriaLabel', {
          defaultMessage: 'Close custom URL editor'
        }),
        className: "close-editor-button"
      }), editor, _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, addButton), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, testButton))) : _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
        onClose: this.closeEditor,
        initialFocus: "[name=label]",
        style: {
          width: 500
        },
        "data-test-subj": "mlJobNewCustomUrlFormModal"
      }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.jobsList.editJobFlyout.customUrls.addCustomUrlButtonLabel",
        defaultMessage: "Add custom URL"
      }))), _react.default.createElement(_eui.EuiModalBody, null, editor), _react.default.createElement(_eui.EuiModalFooter, null, testButton, addButton)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          customUrls = _this$state2.customUrls,
          editorOpen = _this$state2.editorOpen;
      var _this$props$editMode2 = this.props.editMode,
          editMode = _this$props$editMode2 === void 0 ? 'inline' : _this$props$editMode2;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), (!editorOpen || editMode === 'modal') && _react.default.createElement(_eui.EuiButton, {
        size: "s",
        onClick: this.editNewCustomUrl,
        "data-test-subj": "mlJobOpenCustomUrlFormButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.jobsList.editJobFlyout.customUrls.addCustomUrlButtonLabel",
        defaultMessage: "Add custom URL"
      })), editorOpen && this.renderEditor(), _react.default.createElement(_eui.EuiSpacer, {
        size: "l"
      }), _react.default.createElement(_custom_url_editor.CustomUrlList, {
        job: this.props.job,
        customUrls: customUrls,
        setCustomUrls: this.props.setCustomUrls
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      return {
        job: props.job,
        customUrls: props.jobCustomUrls,
        queryEntityFieldNames: (0, _utils.getQueryEntityFieldNames)(props.job)
      };
    }
  }]);

  return CustomUrlsUI;
}(_react.Component);

var CustomUrls = (0, _public.withKibana)(CustomUrlsUI);
exports.CustomUrls = CustomUrls;