"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomFieldPanel = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _class, _temp;

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

var initialState = {
  selectedOptions: []
};
var CustomFieldPanel = (_temp = _class =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CustomFieldPanel, _React$PureComponent);

  function CustomFieldPanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomFieldPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomFieldPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", initialState);

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function () {
      _this.props.onSubmit(_this.state.selectedOptions[0].label);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFieldSelection", function (selectedOptions) {
      _this.setState({
        selectedOptions: selectedOptions
      });
    });

    return _this;
  }

  _createClass(CustomFieldPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fields = _this$props.fields,
          currentOptions = _this$props.currentOptions;
      var options = fields.filter(function (f) {
        return f.aggregatable && f.type === 'string' && !(currentOptions && currentOptions.some(function (o) {
          return o.field === f.name;
        }));
      }).map(function (f) {
        return {
          label: f.name
        };
      });
      var isSubmitDisabled = !this.state.selectedOptions.length;
      return _react.default.createElement("div", {
        style: {
          padding: 16
        }
      }, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.infra.waffle.customGroupByFieldLabel', {
          defaultMessage: 'Field'
        }),
        helpText: _i18n.i18n.translate('xpack.infra.waffle.customGroupByHelpText', {
          defaultMessage: 'This is the field used for the terms aggregation'
        }),
        display: "rowCompressed",
        fullWidth: true
      }, _react.default.createElement(_eui.EuiComboBox, {
        placeholder: _i18n.i18n.translate('xpack.infra.waffle.customGroupByDropdownPlacehoder', {
          defaultMessage: 'Select one'
        }),
        singleSelection: {
          asPlainText: true
        },
        selectedOptions: this.state.selectedOptions,
        options: options,
        onChange: this.handleFieldSelection,
        fullWidth: true,
        isClearable: false
      })), _react.default.createElement(_eui.EuiButton, {
        disabled: isSubmitDisabled,
        type: "submit",
        size: "s",
        fill: true,
        onClick: this.handleSubmit
      }, "Add")));
    }
  }]);

  return CustomFieldPanel;
}(_react.default.PureComponent), _defineProperty(_class, "displayName", 'CustomFieldPanel'), _temp);
exports.CustomFieldPanel = CustomFieldPanel;