"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogSearchInput = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _classnames = _interopRequireDefault(require("classnames"));

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _class, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: transparent;\n  box-shadow: none;\n\n  &:focus {\n    box-shadow: inset 0 -2px 0 0 ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LogSearchInput = (_temp = _class =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(LogSearchInput, _React$PureComponent);

  function LogSearchInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LogSearchInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LogSearchInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      query: ''
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (evt) {
      evt.preventDefault();
      var query = _this.state.query;

      if (query === '') {
        _this.props.onClear();
      } else {
        _this.props.onSearch(_this.state.query);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangeQuery", function (evt) {
      _this.setState({
        query: evt.target.value
      });
    });

    return _this;
  }

  _createClass(LogSearchInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          isLoading = _this$props.isLoading;
      var query = this.state.query;
      var classes = (0, _classnames.default)('loggingSearchInput', className);
      return React.createElement("form", {
        onSubmit: this.handleSubmit
      }, React.createElement(PlainSearchField, {
        "aria-label": _i18n.i18n.translate('xpack.infra.logs.search.searchInLogsAriaLabel', {
          defaultMessage: 'search'
        }),
        className: classes,
        fullWidth: true,
        isLoading: isLoading,
        onChange: this.handleChangeQuery,
        placeholder: _i18n.i18n.translate('xpack.infra.logs.search.searchInLogsPlaceholder', {
          defaultMessage: 'Search'
        }),
        value: query
      }));
    }
  }]);

  return LogSearchInput;
}(React.PureComponent), _defineProperty(_class, "displayName", 'LogSearchInput'), _temp);
exports.LogSearchInput = LogSearchInput;
var PlainSearchField = (0, _public.euiStyled)(_eui.EuiFieldSearch)(_templateObject(), function (props) {
  return props.theme.eui.euiColorPrimary;
});