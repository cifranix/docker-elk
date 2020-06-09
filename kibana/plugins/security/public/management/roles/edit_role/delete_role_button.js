"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRoleButton = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

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

var DeleteRoleButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DeleteRoleButton, _Component);

  function DeleteRoleButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeleteRoleButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeleteRoleButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showModal: false
    });

    _defineProperty(_assertThisInitialized(_this), "maybeShowModal", function () {
      if (!_this.state.showModal) {
        return null;
      }

      return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiConfirmModal, {
        title: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.deleteRoleButton.deleteRoleTitle",
          defaultMessage: "Delete Role"
        }),
        onCancel: _this.closeModal,
        onConfirm: _this.onConfirmDelete,
        cancelButtonText: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.deleteRoleButton.cancelButtonLabel",
          defaultMessage: "No, don't delete"
        }),
        confirmButtonText: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.management.editRole.deleteRoleButton.confirmButtonLabel",
          defaultMessage: "Yes, delete role"
        }),
        buttonColor: 'danger'
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.deleteRoleButton.deletingRoleConfirmationText",
        defaultMessage: "Are you sure you want to delete this role?"
      })), _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.deleteRoleButton.deletingRoleWarningText",
        defaultMessage: "This action cannot be undone!"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "closeModal", function () {
      _this.setState({
        showModal: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showModal", function () {
      _this.setState({
        showModal: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmDelete", function () {
      _this.closeModal();

      _this.props.onDelete();
    });

    return _this;
  }

  _createClass(DeleteRoleButton, [{
    key: "render",
    value: function render() {
      if (!this.props.canDelete) {
        return null;
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiButtonEmpty, {
        color: 'danger',
        onClick: this.showModal
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.deleteRoleButton.deleteRoleButtonLabel",
        defaultMessage: "Delete role"
      })), this.maybeShowModal());
    }
  }]);

  return DeleteRoleButton;
}(_react2.Component);

exports.DeleteRoleButton = DeleteRoleButton;