"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenCapturePanelContent = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reporting_panel_content = require("./reporting_panel_content");

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

var ScreenCapturePanelContent =
/*#__PURE__*/
function (_Component) {
  _inherits(ScreenCapturePanelContent, _Component);

  function ScreenCapturePanelContent(props) {
    var _this;

    _classCallCheck(this, ScreenCapturePanelContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScreenCapturePanelContent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function () {
      if (_this.state.isPreserveLayoutSupported) {
        return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSwitch, {
          label: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.reporting.screenCapturePanelContent.optimizeForPrintingLabel",
            defaultMessage: "Optimize for printing"
          }),
          checked: _this.state.usePrintLayout,
          onChange: _this.handlePrintLayoutChange,
          "data-test-subj": "usePrintLayout"
        }), _react2.default.createElement(_eui.EuiSpacer, {
          size: "s"
        }));
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handlePrintLayoutChange", function (evt) {
      _this.setState({
        usePrintLayout: evt.target.checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getLayout", function () {
      if (_this.state.usePrintLayout) {
        return {
          id: 'print'
        };
      }

      var el = document.querySelector('[data-shared-items-container]');
      var bounds = el ? el.getBoundingClientRect() : {
        height: 768,
        width: 1024
      };
      return {
        id: _this.props.reportType === 'png' ? 'png' : 'preserve_layout',
        dimensions: {
          height: bounds.height,
          width: bounds.width
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getJobParams", function () {
      return _objectSpread({}, _this.props.getJobParams(), {
        layout: _this.getLayout()
      });
    });

    var isPreserveLayoutSupported = props.reportType !== 'png' && props.objectType !== 'visualization';
    _this.state = {
      isPreserveLayoutSupported: isPreserveLayoutSupported,
      usePrintLayout: false
    };
    return _this;
  }

  _createClass(ScreenCapturePanelContent, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_reporting_panel_content.ReportingPanelContent, {
        apiClient: this.props.apiClient,
        toasts: this.props.toasts,
        reportType: this.props.reportType,
        layoutId: this.getLayout().id,
        objectType: this.props.objectType,
        objectId: this.props.objectId,
        getJobParams: this.getJobParams,
        options: this.renderOptions(),
        isDirty: this.props.isDirty,
        onClose: this.props.onClose
      });
    }
  }]);

  return ScreenCapturePanelContent;
}(_react2.Component);

exports.ScreenCapturePanelContent = ScreenCapturePanelContent;