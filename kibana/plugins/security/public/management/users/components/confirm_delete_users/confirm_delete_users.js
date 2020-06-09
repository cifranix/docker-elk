"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDeleteUsers = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

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

var ConfirmDeleteUsers =
/*#__PURE__*/
function (_Component) {
  _inherits(ConfirmDeleteUsers, _Component);

  function ConfirmDeleteUsers() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConfirmDeleteUsers);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConfirmDeleteUsers)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "deleteUsers", function () {
      var _this$props = _this.props,
          usersToDelete = _this$props.usersToDelete,
          callback = _this$props.callback,
          userAPIClient = _this$props.userAPIClient,
          notifications = _this$props.notifications;
      var errors = [];
      usersToDelete.forEach(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(username) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return userAPIClient.deleteUser(username);

                case 3:
                  notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.security.management.users.confirmDelete.userSuccessfullyDeletedNotificationMessage', {
                    defaultMessage: 'Deleted user {username}',
                    values: {
                      username: username
                    }
                  }));
                  _context.next = 10;
                  break;

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  errors.push(username);
                  notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.users.confirmDelete.userDeletingErrorNotificationMessage', {
                    defaultMessage: 'Error deleting user {username}',
                    values: {
                      username: username
                    }
                  }));

                case 10:
                  if (callback) {
                    callback(usersToDelete, errors);
                  }

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 6]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    });

    return _this;
  }

  _createClass(ConfirmDeleteUsers, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          usersToDelete = _this$props2.usersToDelete,
          onCancel = _this$props2.onCancel;
      var moreThanOne = usersToDelete.length > 1;
      var title = moreThanOne ? _i18n.i18n.translate('xpack.security.management.users.confirmDelete.deleteMultipleUsersTitle', {
        defaultMessage: 'Delete {userLength} users',
        values: {
          userLength: usersToDelete.length
        }
      }) : _i18n.i18n.translate('xpack.security.management.users.confirmDelete.deleteOneUserTitle', {
        defaultMessage: 'Delete user {userLength}',
        values: {
          userLength: usersToDelete[0]
        }
      });
      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
        title: title,
        onCancel: onCancel,
        onConfirm: this.deleteUsers,
        cancelButtonText: _i18n.i18n.translate('xpack.security.management.users.confirmDelete.cancelButtonLabel', {
          defaultMessage: 'Cancel'
        }),
        confirmButtonText: _i18n.i18n.translate('xpack.security.management.users.confirmDelete.confirmButtonLabel', {
          defaultMessage: 'Delete'
        }),
        buttonColor: "danger"
      }, _react.default.createElement("div", null, moreThanOne ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.confirmDelete.removingUsersDescription",
        defaultMessage: "You are about to delete these users:"
      })), _react.default.createElement("ul", null, usersToDelete.map(function (username) {
        return _react.default.createElement("li", {
          key: username
        }, username);
      }))) : null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.confirmDelete.removingUsersWarningMessage",
        defaultMessage: "This operation cannot be undone."
      })))));
    }
  }]);

  return ConfirmDeleteUsers;
}(_react.Component);

exports.ConfirmDeleteUsers = ConfirmDeleteUsers;