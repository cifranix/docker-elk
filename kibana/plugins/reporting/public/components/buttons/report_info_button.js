"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportInfoButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _constants = require("../../../constants");

var _reporting_api_client = require("../../lib/reporting_api_client");

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

var NA = 'n/a';
var UNKNOWN = 'unknown';

var getDimensions = function getDimensions(info) {
  var defaultDimensions = {
    width: null,
    height: null
  };

  var _get = (0, _lodash.get)(info, 'payload.layout.dimensions', defaultDimensions),
      width = _get.width,
      height = _get.height;

  if (width && height) {
    return "Width: ".concat(width, " x Height: ").concat(height);
  }

  return NA;
};

var ReportInfoButton =
/*#__PURE__*/
function (_Component) {
  _inherits(ReportInfoButton, _Component);

  function ReportInfoButton(props) {
    var _this;

    _classCallCheck(this, ReportInfoButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportInfoButton).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "loadInfo",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var info;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                isLoading: true
              });

              _context.prev = 1;
              _context.next = 4;
              return _this.props.apiClient.getInfo(_this.props.jobId);

            case 4:
              info = _context.sent;

              if (_this.mounted) {
                _this.setState({
                  isLoading: false,
                  info: info
                });
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              if (_this.mounted) {
                _this.setState({
                  isLoading: false,
                  calloutTitle: 'Unable to fetch report info',
                  info: null,
                  error: _context.t0
                });
              }

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "closeFlyout", function () {
      _this.setState({
        isFlyoutVisible: false,
        info: null // force re-read for next click

      });
    });

    _defineProperty(_assertThisInitialized(_this), "showFlyout", function () {
      _this.setState({
        isFlyoutVisible: true
      });

      if (!_this.state.info) {
        _this.loadInfo();
      }
    });

    _this.state = {
      isLoading: false,
      isFlyoutVisible: false,
      calloutTitle: 'Job Info',
      info: null,
      error: null
    };
    _this.closeFlyout = _this.closeFlyout.bind(_assertThisInitialized(_this));
    _this.showFlyout = _this.showFlyout.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReportInfoButton, [{
    key: "renderInfo",
    value: function renderInfo() {
      var _this$state = this.state,
          info = _this$state.info,
          err = _this$state.error;

      if (err) {
        return err.message;
      }

      if (!info) {
        return null;
      }

      var jobType = info.jobtype || NA;
      var attempts = info.attempts ? info.attempts.toString() : NA;
      var maxAttempts = info.max_attempts ? info.max_attempts.toString() : NA;
      var priority = info.priority ? info.priority.toString() : NA;
      var timeout = info.timeout ? info.timeout.toString() : NA;
      var warnings = info.output && info.output.warnings ? info.output.warnings.join(',') : null;
      var jobInfoDateTimes = [{
        title: 'Created By',
        description: info.created_by || NA
      }, {
        title: 'Created At',
        description: info.created_at || NA
      }, {
        title: 'Started At',
        description: info.started_at || NA
      }, {
        title: 'Completed At',
        description: info.completed_at || NA
      }, {
        title: 'Processed By',
        description: info.kibana_name && info.kibana_id ? "".concat(info.kibana_name, " (").concat(info.kibana_id, ")") : UNKNOWN
      }, {
        title: 'Browser Timezone',
        description: (0, _lodash.get)(info, 'payload.browserTimezone') || NA
      }];
      var jobInfoPayload = [{
        title: 'Title',
        description: (0, _lodash.get)(info, 'payload.title') || NA
      }, {
        title: 'Type',
        description: (0, _lodash.get)(info, 'payload.type') || NA
      }, {
        title: 'Layout',
        description: (0, _lodash.get)(info, 'meta.layout') || NA
      }, {
        title: 'Dimensions',
        description: getDimensions(info)
      }, {
        title: 'Job Type',
        description: jobType
      }, {
        title: 'Content Type',
        description: (0, _lodash.get)(info, 'output.content_type') || NA
      }, {
        title: 'Size in Bytes',
        description: (0, _lodash.get)(info, 'output.size') || NA
      }];
      var jobInfoStatus = [{
        title: 'Attempts',
        description: attempts
      }, {
        title: 'Max Attempts',
        description: maxAttempts
      }, {
        title: 'Priority',
        description: priority
      }, {
        title: 'Timeout',
        description: timeout
      }, {
        title: 'Status',
        description: info.status || NA
      }, {
        title: 'Browser Type',
        description: _constants.USES_HEADLESS_JOB_TYPES.includes(jobType) ? info.browser_type || UNKNOWN : NA
      }];

      if (warnings) {
        jobInfoStatus.push({
          title: 'Errors',
          description: warnings
        });
      }

      var jobInfoParts = {
        datetimes: jobInfoDateTimes,
        payload: jobInfoPayload,
        status: jobInfoStatus
      };
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiDescriptionList, {
        listItems: jobInfoParts.datetimes,
        type: "column",
        align: "center",
        compressed: true
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiDescriptionList, {
        listItems: jobInfoParts.payload,
        type: "column",
        align: "center",
        compressed: true
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiDescriptionList, {
        listItems: jobInfoParts.status,
        type: "column",
        align: "center",
        compressed: true
      }));
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
  }, {
    key: "render",
    value: function render() {
      var flyout;

      if (this.state.isFlyoutVisible) {
        flyout = _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_eui.EuiFlyout, {
          ownFocus: true,
          onClose: this.closeFlyout,
          size: "s",
          "aria-labelledby": "flyoutTitle",
          "data-test-subj": "reportInfoFlyout"
        }, _react.default.createElement(_eui.EuiFlyoutHeader, {
          hasBorder: true
        }, _react.default.createElement(_eui.EuiTitle, {
          size: "m"
        }, _react.default.createElement("h2", {
          id: "flyoutTitle"
        }, this.state.calloutTitle))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, this.renderInfo()))));
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: this.showFlyout,
        iconType: "iInCircle",
        color: 'primary',
        "data-test-subj": "reportInfoButton",
        "aria-label": "Show report info"
      }), flyout);
    }
  }]);

  return ReportInfoButton;
}(_react.Component);

exports.ReportInfoButton = ReportInfoButton;