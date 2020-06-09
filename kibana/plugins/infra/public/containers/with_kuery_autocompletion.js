"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithKueryAutocompletion = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WithKueryAutocompletionComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WithKueryAutocompletionComponent, _React$Component);

  function WithKueryAutocompletionComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WithKueryAutocompletionComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithKueryAutocompletionComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentRequest: null,
      suggestions: []
    });

    _defineProperty(_assertThisInitialized(_this), "loadSuggestions",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(expression, cursorPosition, maxSuggestions) {
        var indexPattern, language, hasQuerySuggestions, suggestions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                indexPattern = _this.props.indexPattern;
                language = 'kuery';
                hasQuerySuggestions = _this.props.kibana.services.data.autocomplete.hasQuerySuggestions(language);

                if (hasQuerySuggestions) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                _this.setState({
                  currentRequest: {
                    expression: expression,
                    cursorPosition: cursorPosition
                  },
                  suggestions: []
                });

                _context.next = 8;
                return _this.props.kibana.services.data.autocomplete.getQuerySuggestions({
                  language: language,
                  query: expression,
                  selectionStart: cursorPosition,
                  selectionEnd: cursorPosition,
                  indexPatterns: [indexPattern],
                  boolFilter: []
                });

              case 8:
                _context.t0 = _context.sent;

                if (_context.t0) {
                  _context.next = 11;
                  break;
                }

                _context.t0 = [];

              case 11:
                suggestions = _context.t0;

                _this.setState(function (state) {
                  return state.currentRequest && state.currentRequest.expression !== expression && state.currentRequest.cursorPosition !== cursorPosition ? state // ignore this result, since a newer request is in flight
                  : _objectSpread({}, state, {
                    currentRequest: null,
                    suggestions: maxSuggestions ? suggestions.slice(0, maxSuggestions) : suggestions
                  });
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    return _this;
  }

  _createClass(WithKueryAutocompletionComponent, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          currentRequest = _this$state.currentRequest,
          suggestions = _this$state.suggestions;
      return this.props.children({
        isLoadingSuggestions: currentRequest !== null,
        loadSuggestions: this.loadSuggestions,
        suggestions: suggestions
      });
    }
  }]);

  return WithKueryAutocompletionComponent;
}(_react.default.Component);

var WithKueryAutocompletion = (0, _public.withKibana)(WithKueryAutocompletionComponent);
exports.WithKueryAutocompletion = WithKueryAutocompletion;