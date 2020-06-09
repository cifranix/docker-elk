"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixDefaultFieldsButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/**
 * Field types used by Metricbeat to generate the default_field setting.
 * Matches Beats code here:
 * https://github.com/elastic/beats/blob/eee127cb59b56f2ed7c7e317398c3f79c4158216/libbeat/template/processor.go#L104
 */
var BEAT_DEFAULT_FIELD_TYPES = new Set(['keyword', 'text', 'ip']);
var BEAT_OTHER_DEFAULT_FIELDS = new Set(['fields.*']);

/**
 * Renders a button if given index is a valid Metricbeat index to add a default_field setting.
 */
var FixDefaultFieldsButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FixDefaultFieldsButton, _React$Component);

  function FixDefaultFieldsButton(props) {
    var _this;

    _classCallCheck(this, FixDefaultFieldsButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FixDefaultFieldsButton).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isBeatsIndex", function () {
      var indexName = _this.props.indexName;
      return indexName.startsWith('metricbeat-') || indexName.startsWith('filebeat-');
    });

    _defineProperty(_assertThisInitialized(_this), "fixBeatsIndex",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.isBeatsIndex()) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _this.setState({
                fixLoadingState: _types.LoadingState.Loading
              });

              _context.prev = 3;
              _context.next = 6;
              return _this.props.http.post("/api/upgrade_assistant/add_query_default_field/".concat(_this.props.indexName), {
                body: JSON.stringify({
                  fieldTypes: _toConsumableArray(BEAT_DEFAULT_FIELD_TYPES),
                  otherFields: _toConsumableArray(BEAT_OTHER_DEFAULT_FIELDS)
                })
              });

            case 6:
              _this.setState({
                fixLoadingState: _types.LoadingState.Success
              });

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](3);

              _this.setState({
                fixLoadingState: _types.LoadingState.Error
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 9]]);
    })));

    _this.state = {};
    return _this;
  }

  _createClass(FixDefaultFieldsButton, [{
    key: "render",
    value: function render() {
      var fixLoadingState = this.state.fixLoadingState;

      if (!this.isBeatsIndex()) {
        return null;
      }

      var buttonProps = {
        size: 's',
        onClick: this.fixBeatsIndex
      };
      var buttonContent;

      switch (fixLoadingState) {
        case _types.LoadingState.Loading:
          buttonProps.disabled = true;
          buttonProps.isLoading = true;
          buttonContent = _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.checkupTab.fixMetricbeatIndexButton.fixingLabel",
            defaultMessage: "Fixing\u2026"
          });
          break;

        case _types.LoadingState.Success:
          buttonProps.iconSide = 'left';
          buttonProps.iconType = 'check';
          buttonProps.disabled = true;
          buttonContent = _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.checkupTab.fixMetricbeatIndexButton.fixedLabel",
            defaultMessage: "Fixed"
          });
          break;

        case _types.LoadingState.Error:
          buttonProps.color = 'danger';
          buttonProps.iconSide = 'left';
          buttonProps.iconType = 'cross';
          buttonContent = _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.checkupTab.fixMetricbeatIndexButton.failedLabel",
            defaultMessage: "Failed"
          });
          break;

        default:
          buttonContent = _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.checkupTab.fixMetricbeatIndexButton.reindexLabel",
            defaultMessage: "Fix"
          });
      }

      return _react.default.createElement(_eui.EuiButton, buttonProps, buttonContent);
    }
  }]);

  return FixDefaultFieldsButton;
}(_react.default.Component);

exports.FixDefaultFieldsButton = FixDefaultFieldsButton;