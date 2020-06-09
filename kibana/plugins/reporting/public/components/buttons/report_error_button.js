"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportErrorButton = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _constants = require("../../../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var ReportErrorButtonUi =
/*#__PURE__*/
function (_Component) {
  _inherits(ReportErrorButtonUi, _Component);

  function ReportErrorButtonUi(props) {
    var _this;

    _classCallCheck(this, ReportErrorButtonUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportErrorButtonUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState(function (prevState) {
        return {
          isPopoverOpen: !prevState.isPopoverOpen
        };
      });

      if (!_this.state.error) {
        _this.loadError();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadError",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, record, apiClient, intl, reportContent;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, record = _this$props.record, apiClient = _this$props.apiClient, intl = _this$props.intl;

              _this.setState({
                isLoading: true
              });

              _context.prev = 2;
              _context.next = 5;
              return apiClient.getContent(record.id);

            case 5:
              reportContent = _context.sent;

              if (_this.mounted) {
                _this.setState({
                  isLoading: false,
                  error: reportContent.content
                });
              }

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);

              if (_this.mounted) {
                _this.setState({
                  isLoading: false,
                  calloutTitle: intl.formatMessage({
                    id: 'xpack.reporting.errorButton.unableToFetchReportContentTitle',
                    defaultMessage: 'Unable to fetch report content'
                  }),
                  error: _context.t0.message
                });
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 9]]);
    })));

    _this.state = {
      isLoading: false,
      isPopoverOpen: false,
      calloutTitle: props.intl.formatMessage({
        id: 'xpack.reporting.errorButton.unableToGenerateReportTitle',
        defaultMessage: 'Unable to generate report'
      })
    };
    return _this;
  }

  _createClass(ReportErrorButtonUi, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          record = _this$props2.record,
          intl = _this$props2.intl;

      if (record.status !== _constants.JobStatuses.FAILED) {
        return null;
      }

      var button = _react2.default.createElement(_eui.EuiButtonIcon, {
        onClick: this.togglePopover,
        iconType: "alert",
        color: 'danger',
        "aria-label": intl.formatMessage({
          id: 'xpack.reporting.errorButton.showReportErrorAriaLabel',
          defaultMessage: 'Show report error'
        })
      });

      return _react2.default.createElement(_eui.EuiPopover, {
        id: "popover",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        anchorPosition: "downRight"
      }, _react2.default.createElement(_eui.EuiCallOut, {
        color: "danger",
        title: this.state.calloutTitle
      }, _react2.default.createElement("p", null, this.state.error)));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }]);

  return ReportErrorButtonUi;
}(_react2.Component);

var ReportErrorButton = (0, _react.injectI18n)(ReportErrorButtonUi);
exports.ReportErrorButton = ReportErrorButton;