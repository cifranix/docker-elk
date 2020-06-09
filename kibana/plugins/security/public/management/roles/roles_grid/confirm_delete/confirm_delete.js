"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDelete = void 0;

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

var ConfirmDelete =
/*#__PURE__*/
function (_Component) {
  _inherits(ConfirmDelete, _Component);

  function ConfirmDelete(props) {
    var _this;

    _classCallCheck(this, ConfirmDelete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfirmDelete).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onConfirmDelete", function () {
      _this.setState({
        deleteInProgress: true
      }, function () {
        _this.deleteRoles();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteRoles",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _this$props, rolesToDelete, callback, rolesAPIClient, notifications, errors, deleteOperations;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props = _this.props, rolesToDelete = _this$props.rolesToDelete, callback = _this$props.callback, rolesAPIClient = _this$props.rolesAPIClient, notifications = _this$props.notifications;
              errors = [];
              deleteOperations = rolesToDelete.map(function (roleName) {
                var deleteRoleTask =
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return rolesAPIClient.deleteRole(roleName);

                          case 3:
                            notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.security.management.roles.confirmDelete.roleSuccessfullyDeletedNotificationMessage', {
                              defaultMessage: 'Deleted role {roleName}',
                              values: {
                                roleName: roleName
                              }
                            }));
                            _context.next = 10;
                            break;

                          case 6:
                            _context.prev = 6;
                            _context.t0 = _context["catch"](0);
                            errors.push(roleName);
                            notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.roles.confirmDelete.roleDeletingErrorNotificationMessage', {
                              defaultMessage: 'Error deleting role {roleName}',
                              values: {
                                roleName: roleName
                              }
                            }));

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 6]]);
                  }));

                  return function deleteRoleTask() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                return deleteRoleTask();
              });
              _context2.next = 5;
              return Promise.all(deleteOperations);

            case 5:
              callback(rolesToDelete, errors);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _this.state = {
      deleteInProgress: false
    };
    return _this;
  }

  _createClass(ConfirmDelete, [{
    key: "render",
    value: function render() {
      var rolesToDelete = this.props.rolesToDelete;
      var moreThanOne = rolesToDelete.length > 1;

      var title = _i18n.i18n.translate('xpack.security.management.roles.deleteRoleTitle', {
        defaultMessage: 'Delete role{value, plural, one {{roleName}} other {s}}',
        values: {
          value: rolesToDelete.length,
          roleName: " ".concat(rolesToDelete[0])
        }
      }); // This is largely the same as the built-in EuiConfirmModal component, but we needed the ability
      // to disable the buttons since this could be a long-running operation


      return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
        onClose: this.props.onCancel
      }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, {
        "data-test-subj": "confirmModalTitleText"
      }, title)), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiText, null, moreThanOne ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.confirmDelete.removingRolesDescription",
        defaultMessage: "You are about to delete these roles:"
      })), _react.default.createElement("ul", null, rolesToDelete.map(function (roleName) {
        return _react.default.createElement("li", {
          key: roleName
        }, roleName);
      }))) : null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.deletingRolesWarningMessage",
        defaultMessage: "You can't undo this operation."
      })))), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "confirmModalCancelButton",
        onClick: this.props.onCancel,
        isDisabled: this.state.deleteInProgress
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.confirmDelete.cancelButtonLabel",
        defaultMessage: "Cancel"
      })), _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "confirmModalConfirmButton",
        onClick: this.onConfirmDelete,
        fill: true,
        color: 'danger',
        isLoading: this.state.deleteInProgress
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.confirmDelete.deleteButtonLabel",
        defaultMessage: "Delete"
      })))));
    }
  }]);

  return ConfirmDelete;
}(_react.Component);

exports.ConfirmDelete = ConfirmDelete;