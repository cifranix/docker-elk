"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityControl = exports.EMPTY_FIELD_VALUE_LABEL = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

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

var EMPTY_FIELD_VALUE_LABEL = _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.emptyPartitionFieldLabel.', {
  defaultMessage: '"" (empty string)'
});

exports.EMPTY_FIELD_VALUE_LABEL = EMPTY_FIELD_VALUE_LABEL;

var EntityControl =
/*#__PURE__*/
function (_Component) {
  _inherits(EntityControl, _Component);

  function EntityControl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EntityControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EntityControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "inputRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedOptions: undefined,
      options: undefined,
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selectedOptions) {
      var options = selectedOptions.length > 0 ? selectedOptions : undefined;

      _this.setState({
        selectedOptions: options
      });

      var fieldValue = Array.isArray(options) && options[0].value !== null ? options[0].value : null;

      _this.props.entityFieldValueChanged(_this.props.entity, fieldValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (searchValue) {
      _this.setState({
        isLoading: true,
        options: []
      });

      _this.props.onSearchChange(_this.props.entity, searchValue);
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option) {
      var label = option.label;
      return label === EMPTY_FIELD_VALUE_LABEL ? _react.default.createElement("i", null, label) : label;
    });

    return _this;
  }

  _createClass(EntityControl, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          entity = _this$props.entity,
          forceSelection = _this$props.forceSelection,
          isLoading = _this$props.isLoading,
          propOptions = _this$props.options;
      var _this$state = this.state,
          stateOptions = _this$state.options,
          selectedOptions = _this$state.selectedOptions;
      var fieldValue = entity.fieldValue;
      var selectedOptionsUpdate = selectedOptions;

      if (selectedOptions === undefined && fieldValue !== null || Array.isArray(selectedOptions) && // @ts-ignore
      selectedOptions[0].value !== fieldValue && fieldValue !== null) {
        selectedOptionsUpdate = [{
          label: fieldValue === '' ? EMPTY_FIELD_VALUE_LABEL : fieldValue,
          value: fieldValue
        }];
      } else if (Array.isArray(selectedOptions) && fieldValue === null) {
        selectedOptionsUpdate = undefined;
      }

      if (prevProps.isLoading === true && isLoading === false) {
        this.setState({
          isLoading: false,
          selectedOptions: selectedOptionsUpdate
        });
      }

      if (!(0, _lodash.isEqual)(propOptions, stateOptions)) {
        this.setState({
          options: propOptions
        });
      }

      if (forceSelection && this.inputRef) {
        this.inputRef.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          entity = _this$props2.entity,
          forceSelection = _this$props2.forceSelection;
      var _this$state2 = this.state,
          isLoading = _this$state2.isLoading,
          options = _this$state2.options,
          selectedOptions = _this$state2.selectedOptions;

      var control = _react.default.createElement(_eui.EuiComboBox, {
        async: true,
        isLoading: isLoading,
        inputRef: function inputRef(input) {
          if (input) {
            _this2.inputRef = input;
          }
        },
        style: {
          minWidth: '300px'
        },
        placeholder: _i18n.i18n.translate('xpack.ml.timeSeriesExplorer.enterValuePlaceholder', {
          defaultMessage: 'Enter value'
        }),
        singleSelection: {
          asPlainText: true
        },
        options: options,
        selectedOptions: selectedOptions,
        onChange: this.onChange,
        onSearchChange: this.onSearchChange,
        isClearable: false,
        renderOption: this.renderOption
      });

      var selectMessage = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.timeSeriesExplorer.selectFieldMessage",
        defaultMessage: "Select {fieldName}",
        values: {
          fieldName: entity.fieldName
        }
      });

      return _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: entity.fieldName,
        helpText: forceSelection ? selectMessage : null
      }, _react.default.createElement(_eui.EuiToolTip, {
        position: "right",
        content: forceSelection ? selectMessage : null
      }, control)));
    }
  }]);

  return EntityControl;
}(_react.Component);

exports.EntityControl = EntityControl;