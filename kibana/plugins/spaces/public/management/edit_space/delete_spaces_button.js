"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteSpacesButton = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _confirm_delete_modal = require("../components/confirm_delete_modal");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var DeleteSpacesButton =
/*#__PURE__*/
function (_Component) {
  _inherits(DeleteSpacesButton, _Component);

  function DeleteSpacesButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeleteSpacesButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeleteSpacesButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showConfirmDeleteModal: false,
      showConfirmRedirectModal: false
    });

    _defineProperty(_assertThisInitialized(_this), "onDeleteClick", function () {
      _this.setState({
        showConfirmDeleteModal: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getConfirmDeleteModal", function () {
      if (!_this.state.showConfirmDeleteModal) {
        return null;
      }

      var spacesManager = _this.props.spacesManager;
      return _react2.default.createElement(_confirm_delete_modal.ConfirmDeleteModal, {
        space: _this.props.space,
        spacesManager: spacesManager,
        onCancel: function onCancel() {
          _this.setState({
            showConfirmDeleteModal: false
          });
        },
        onConfirm: _this.deleteSpaces
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteSpaces",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, spacesManager, space, _ref2, _ref2$message, errorMessage, message;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, spacesManager = _this$props.spacesManager, space = _this$props.space;
              _context.prev = 1;
              _context.next = 4;
              return spacesManager.deleteSpace(space);

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              _ref2 = _context.t0.data || {}, _ref2$message = _ref2.message, errorMessage = _ref2$message === void 0 ? '' : _ref2$message;

              _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.spaces.management.deleteSpacesButton.deleteSpaceErrorTitle', {
                defaultMessage: 'Error deleting space: {errorMessage}',
                values: {
                  errorMessage: errorMessage
                }
              }));

            case 10:
              _this.setState({
                showConfirmDeleteModal: false
              });

              message = _i18n.i18n.translate('xpack.spaces.management.deleteSpacesButton.spaceSuccessfullyDeletedNotificationMessage', {
                defaultMessage: 'Deleted {spaceName} space.',
                values: {
                  spaceName: space.name
                }
              });

              _this.props.notifications.toasts.addSuccess(message);

              if (_this.props.onDelete) {
                _this.props.onDelete();
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 6]]);
    })));

    return _this;
  }

  _createClass(DeleteSpacesButton, [{
    key: "render",
    value: function render() {
      var buttonText = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.deleteSpacesButton.deleteSpaceButtonLabel",
        defaultMessage: "Delete space"
      });

      var ButtonComponent = _eui.EuiButton;
      var extraProps = {};

      if (this.props.style === 'icon') {
        ButtonComponent = _eui.EuiButtonIcon;
        extraProps.iconType = 'trash';
      }

      return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(ButtonComponent, _extends({
        color: 'danger',
        onClick: this.onDeleteClick,
        "aria-label": _i18n.i18n.translate('xpack.spaces.management.deleteSpacesButton.deleteSpaceAriaLabel', {
          defaultMessage: 'Delete this space'
        })
      }, extraProps), buttonText), this.getConfirmDeleteModal());
    }
  }]);

  return DeleteSpacesButton;
}(_react2.Component);

exports.DeleteSpacesButton = DeleteSpacesButton;