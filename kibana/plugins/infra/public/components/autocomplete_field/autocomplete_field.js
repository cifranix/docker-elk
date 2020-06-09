"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutocompleteField = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

var _typed_react = require("../../utils/typed_react");

var _suggestion_item = require("./suggestion_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 100%;\n  margin-top: 2px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  z-index: ", ";\n  max-height: 322px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var AutocompleteField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutocompleteField, _React$Component);

  function AutocompleteField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AutocompleteField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AutocompleteField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      areSuggestionsVisible: false,
      isFocused: false,
      selectedIndex: null
    });

    _defineProperty(_assertThisInitialized(_this), "inputElement", null);

    _defineProperty(_assertThisInitialized(_this), "handleChangeInputRef", function (element) {
      _this.inputElement = element;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (evt) {
      _this.changeValue(evt.currentTarget.value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (evt) {
      var suggestions = _this.props.suggestions;

      switch (evt.key) {
        case 'ArrowUp':
          evt.preventDefault();

          if (suggestions.length > 0) {
            _this.setState((0, _typed_react.composeStateUpdaters)(withSuggestionsVisible, withPreviousSuggestionSelected));
          }

          break;

        case 'ArrowDown':
          evt.preventDefault();

          if (suggestions.length > 0) {
            _this.setState((0, _typed_react.composeStateUpdaters)(withSuggestionsVisible, withNextSuggestionSelected));
          } else {
            _this.updateSuggestions();
          }

          break;

        case 'Enter':
          evt.preventDefault();

          if (_this.state.selectedIndex !== null) {
            _this.applySelectedSuggestion();
          } else {
            _this.submit();
          }

          break;

        case 'Escape':
          evt.preventDefault();

          _this.setState(withSuggestionsHidden);

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (evt) {
      switch (evt.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Home':
        case 'End':
          _this.updateSuggestions();

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function () {
      _this.setState((0, _typed_react.composeStateUpdaters)(withSuggestionsVisible, withFocused));
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      _this.setState((0, _typed_react.composeStateUpdaters)(withSuggestionsHidden, withUnfocused));
    });

    _defineProperty(_assertThisInitialized(_this), "selectSuggestionAt", function (index) {
      return function () {
        _this.setState(withSuggestionAtIndexSelected(index));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "applySelectedSuggestion", function () {
      if (_this.state.selectedIndex !== null) {
        _this.applySuggestionAt(_this.state.selectedIndex)();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "applySuggestionAt", function (index) {
      return function () {
        var _this$props = _this.props,
            value = _this$props.value,
            suggestions = _this$props.suggestions;
        var selectedSuggestion = suggestions[index];

        if (!selectedSuggestion) {
          return;
        }

        var newValue = value.substr(0, selectedSuggestion.start) + selectedSuggestion.text + value.substr(selectedSuggestion.end);

        _this.setState(withSuggestionsHidden);

        _this.changeValue(newValue);

        _this.focusInputElement();
      };
    });

    _defineProperty(_assertThisInitialized(_this), "changeValue", function (value) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusInputElement", function () {
      if (_this.inputElement) {
        _this.inputElement.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showSuggestions", function () {
      _this.setState(withSuggestionsVisible);
    });

    _defineProperty(_assertThisInitialized(_this), "submit", function () {
      var _this$props2 = _this.props,
          isValid = _this$props2.isValid,
          onSubmit = _this$props2.onSubmit,
          value = _this$props2.value;

      if (isValid && onSubmit) {
        onSubmit(value);
      }

      _this.setState(withSuggestionsHidden);
    });

    _defineProperty(_assertThisInitialized(_this), "updateSuggestions", function () {
      var inputCursorPosition = _this.inputElement ? _this.inputElement.selectionStart || 0 : 0;

      _this.props.loadSuggestions(_this.props.value, inputCursorPosition, 200);
    });

    return _this;
  }

  _createClass(AutocompleteField, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          suggestions = _this$props3.suggestions,
          isLoadingSuggestions = _this$props3.isLoadingSuggestions,
          isValid = _this$props3.isValid,
          placeholder = _this$props3.placeholder,
          value = _this$props3.value,
          ariaLabel = _this$props3['aria-label'];
      var _this$state = this.state,
          areSuggestionsVisible = _this$state.areSuggestionsVisible,
          selectedIndex = _this$state.selectedIndex;
      return _react.default.createElement(_eui.EuiOutsideClickDetector, {
        onOutsideClick: this.handleBlur
      }, _react.default.createElement(AutocompleteContainer, null, _react.default.createElement(FixedEuiFieldSearch, {
        fullWidth: true,
        inputRef: this.handleChangeInputRef,
        isLoading: isLoadingSuggestions,
        isInvalid: !isValid,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onSearch: this.submit,
        placeholder: placeholder,
        value: value,
        "aria-label": ariaLabel
      }), areSuggestionsVisible && !isLoadingSuggestions && suggestions.length > 0 ? _react.default.createElement(SuggestionsPanel, null, suggestions.map(function (suggestion, suggestionIndex) {
        return _react.default.createElement(_suggestion_item.SuggestionItem, {
          key: suggestion.text,
          suggestion: suggestion,
          isSelected: suggestionIndex === selectedIndex,
          onMouseEnter: _this2.selectSuggestionAt(suggestionIndex),
          onClick: _this2.applySuggestionAt(suggestionIndex)
        });
      })) : null));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.inputElement && this.props.autoFocus) {
        this.inputElement.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var hasNewValue = prevProps.value !== this.props.value;
      var hasNewSuggestions = prevProps.suggestions !== this.props.suggestions;

      if (hasNewValue) {
        this.updateSuggestions();
      }

      if (hasNewValue && this.props.value === '') {
        this.submit();
      }

      if (hasNewSuggestions && this.state.isFocused) {
        this.showSuggestions();
      }
    }
  }]);

  return AutocompleteField;
}(_react.default.Component);

exports.AutocompleteField = AutocompleteField;

var withPreviousSuggestionSelected = function withPreviousSuggestionSelected(state, props) {
  return _objectSpread({}, state, {
    selectedIndex: props.suggestions.length === 0 ? null : state.selectedIndex !== null ? (state.selectedIndex + props.suggestions.length - 1) % props.suggestions.length : Math.max(props.suggestions.length - 1, 0)
  });
};

var withNextSuggestionSelected = function withNextSuggestionSelected(state, props) {
  return _objectSpread({}, state, {
    selectedIndex: props.suggestions.length === 0 ? null : state.selectedIndex !== null ? (state.selectedIndex + 1) % props.suggestions.length : 0
  });
};

var withSuggestionAtIndexSelected = function withSuggestionAtIndexSelected(suggestionIndex) {
  return function (state, props) {
    return _objectSpread({}, state, {
      selectedIndex: props.suggestions.length === 0 ? null : suggestionIndex >= 0 && suggestionIndex < props.suggestions.length ? suggestionIndex : 0
    });
  };
};

var withSuggestionsVisible = function withSuggestionsVisible(state) {
  return _objectSpread({}, state, {
    areSuggestionsVisible: true
  });
};

var withSuggestionsHidden = function withSuggestionsHidden(state) {
  return _objectSpread({}, state, {
    areSuggestionsVisible: false,
    selectedIndex: null
  });
};

var withFocused = function withFocused(state) {
  return _objectSpread({}, state, {
    isFocused: true
  });
};

var withUnfocused = function withUnfocused(state) {
  return _objectSpread({}, state, {
    isFocused: false
  });
};

var FixedEuiFieldSearch = _eui.EuiFieldSearch;

var AutocompleteContainer = _public.euiStyled.div(_templateObject());

var SuggestionsPanel = (0, _public.euiStyled)(_eui.EuiPanel).attrs(function () {
  return {
    paddingSize: 'none',
    hasShadow: true
  };
})(_templateObject2(), function (props) {
  return props.theme.eui.euiZLevel1;
});