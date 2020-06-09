"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeTimeRangeModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _does_inherit_time_range = require("./does_inherit_time_range");

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

var CustomizeTimeRangeModal =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomizeTimeRangeModal, _Component);

  function CustomizeTimeRangeModal(props) {
    var _this;

    _classCallCheck(this, CustomizeTimeRangeModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomizeTimeRangeModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onTimeChange", function (_ref) {
      var start = _ref.start,
          end = _ref.end;

      _this.setState({
        timeRange: {
          from: start,
          to: end
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "cancel", function () {
      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onInheritToggle", function () {
      _this.setState(function (prevState) {
        return {
          inheritTimeRange: !prevState.inheritTimeRange
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addToPanel", function () {
      var embeddable = _this.props.embeddable;
      embeddable.updateInput({
        timeRange: _this.state.timeRange
      });

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "inheritFromParent", function () {
      var embeddable = _this.props.embeddable;
      var parent = embeddable.parent;
      var parentPanels = parent.getInput().panels; // Remove any explicit input to this child from the parent.

      parent.updateInput({
        panels: _objectSpread({}, parentPanels, _defineProperty({}, embeddable.id, _objectSpread({}, parentPanels[embeddable.id], {
          explicitInput: _objectSpread({}, parentPanels[embeddable.id].explicitInput, {
            timeRange: undefined
          })
        })))
      });

      _this.props.onClose();
    });

    _this.state = {
      timeRange: props.embeddable.getInput().timeRange,
      inheritTimeRange: (0, _does_inherit_time_range.doesInheritTimeRange)(props.embeddable)
    };
    return _this;
  }

  _createClass(CustomizeTimeRangeModal, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, {
        "data-test-subj": "customizePanelTitle"
      }, _i18n.i18n.translate('xpack.advancedUiActions.customizeTimeRange.modal.headerTitle', {
        defaultMessage: 'Customize panel time range'
      }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.advancedUiActions.customizePanelTimeRange.modal.optionsMenuForm.panelTitleFormRowLabel', {
          defaultMessage: 'Time range'
        })
      }, _react.default.createElement(_eui.EuiSuperDatePicker, {
        start: this.state.timeRange ? this.state.timeRange.from : undefined,
        end: this.state.timeRange ? this.state.timeRange.to : undefined,
        isPaused: false,
        onTimeChange: this.onTimeChange,
        showUpdateButton: false,
        dateFormat: this.props.dateFormat,
        commonlyUsedRanges: this.props.commonlyUsedRanges.map(function (_ref2) {
          var from = _ref2.from,
              to = _ref2.to,
              display = _ref2.display;
          return {
            start: from,
            end: to,
            label: display
          };
        })
      }))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        responsive: false,
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.inheritFromParent,
        color: "danger",
        "data-test-subj": "removePerPanelTimeRangeButton",
        disabled: !this.props.embeddable.parent || this.state.inheritTimeRange,
        flush: "left"
      }, _i18n.i18n.translate('xpack.advancedUiActions.customizePanelTimeRange.modal.removeButtonTitle', {
        defaultMessage: 'Remove'
      })))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: this.cancel,
        "data-test-subj": "cancelPerPanelTimeRangeButton"
      }, _i18n.i18n.translate('xpack.advancedUiActions.customizePanelTimeRange.modal.cancelButtonTitle', {
        defaultMessage: 'Cancel'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "addPerPanelTimeRangeButton",
        onClick: this.addToPanel,
        fill: true
      }, this.state.inheritTimeRange ? _i18n.i18n.translate('xpack.advancedUiActions.customizePanelTimeRange.modal.addToPanelButtonTitle', {
        defaultMessage: 'Add to panel'
      }) : _i18n.i18n.translate('xpack.advancedUiActions.customizePanelTimeRange.modal.updatePanelTimeRangeButtonTitle', {
        defaultMessage: 'Update'
      }))))));
    }
  }]);

  return CustomizeTimeRangeModal;
}(_react.Component);

exports.CustomizeTimeRangeModal = CustomizeTimeRangeModal;