"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportDeleteButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReportDeleteButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ReportDeleteButton, _PureComponent);

  function ReportDeleteButton(props) {
    var _this;

    _classCallCheck(this, ReportDeleteButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportDeleteButton).call(this, props));
    _this.state = {
      showConfirm: false
    };
    return _this;
  }

  _createClass(ReportDeleteButton, [{
    key: "hideConfirm",
    value: function hideConfirm() {
      this.setState({
        showConfirm: false
      });
    }
  }, {
    key: "showConfirm",
    value: function showConfirm() {
      this.setState({
        showConfirm: true
      });
    }
  }, {
    key: "renderConfirm",
    value: function renderConfirm() {
      var _this2 = this;

      var _this$props = this.props,
          intl = _this$props.intl,
          jobsToDelete = _this$props.jobsToDelete;
      var title = jobsToDelete.length > 1 ? intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteNumConfirmTitle',
        defaultMessage: "Delete {num} reports?"
      }, {
        num: jobsToDelete.length
      }) : intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteConfirmTitle',
        defaultMessage: "Delete the \"{name}\" report?"
      }, {
        name: jobsToDelete[0].object_title
      });
      var message = intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteConfirmMessage',
        defaultMessage: "You can't recover deleted reports."
      });
      var confirmButtonText = intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteConfirmButton',
        defaultMessage: "Delete"
      });
      var cancelButtonText = intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteCancelButton',
        defaultMessage: "Cancel"
      });
      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
        title: title,
        onCancel: function onCancel() {
          return _this2.hideConfirm();
        },
        onConfirm: function onConfirm() {
          return _this2.props.performDelete();
        },
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        defaultFocusedButton: "confirm",
        buttonColor: "danger"
      }, message));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          jobsToDelete = _this$props2.jobsToDelete,
          intl = _this$props2.intl;
      if (jobsToDelete.length === 0) return null;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiButton, {
        onClick: function onClick() {
          return _this3.showConfirm();
        },
        iconType: "trash",
        color: 'danger'
      }, intl.formatMessage({
        id: 'xpack.reporting.listing.table.deleteReportButton',
        defaultMessage: "Delete ({num})"
      }, {
        num: jobsToDelete.length
      })), this.state.showConfirm ? this.renderConfirm() : null);
    }
  }]);

  return ReportDeleteButton;
}(_react.PureComponent);

exports.ReportDeleteButton = ReportDeleteButton;