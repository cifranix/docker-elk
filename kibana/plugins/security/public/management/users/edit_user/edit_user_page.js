"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditUserPage = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../../../common/model");

var _management_urls = require("../../management_urls");

var _components = require("../components");

var _validate_user = require("./validate_user");

var _role_combo_box = require("../../role_combo_box");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function backToUserList() {
  window.location.hash = _management_urls.USERS_PATH;
}

var EditUserPage =
/*#__PURE__*/
function (_Component) {
  _inherits(EditUserPage, _Component);

  function EditUserPage(props) {
    var _this;

    _classCallCheck(this, EditUserPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditUserPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "validator", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function (usernames, errors) {
      if (errors.length === 0) {
        backToUserList();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveUser",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var result, userAPIClient, _this$state, user, isNewUser, selectedRoles, userToSave;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.validator.enableValidation();

              result = _this.validator.validateForSave(_this.state.user, _this.state.isNewUser);

              if (!result.isInvalid) {
                _context.next = 6;
                break;
              }

              _this.setState({
                formError: result
              });

              _context.next = 23;
              break;

            case 6:
              _this.setState({
                formError: null
              });

              userAPIClient = _this.props.userAPIClient;
              _this$state = _this.state, user = _this$state.user, isNewUser = _this$state.isNewUser, selectedRoles = _this$state.selectedRoles;
              userToSave = _objectSpread({}, user);

              if (!isNewUser) {
                delete userToSave.password;
              }

              delete userToSave.confirmPassword;
              userToSave.roles = _toConsumableArray(selectedRoles);
              _context.prev = 13;
              _context.next = 16;
              return userAPIClient.saveUser(userToSave);

            case 16:
              _this.props.notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.security.management.users.editUser.userSuccessfullySavedNotificationMessage', {
                defaultMessage: 'Saved user {message}',
                values: {
                  message: user.username
                }
              }));

              backToUserList();
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](13);

              _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.users.editUser.savingUserErrorMessage', {
                defaultMessage: 'Error saving user: {message}',
                values: {
                  message: (0, _lodash.get)(_context.t0, 'body.message', 'Unknown error')
                }
              }));

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[13, 20]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "passwordFields", function () {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, _extends({
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.passwordFormRowLabel', {
          defaultMessage: 'Password'
        })
      }, _this.validator.validatePassword(_this.state.user)), _react.default.createElement(_eui.EuiFieldText, {
        autoComplete: "new-password",
        "data-test-subj": "passwordInput",
        name: "password",
        type: "password",
        onChange: _this.onPasswordChange
      })), _react.default.createElement(_eui.EuiFormRow, _extends({
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.confirmPasswordFormRowLabel', {
          defaultMessage: 'Confirm password'
        })
      }, _this.validator.validateConfirmPassword(_this.state.user)), _react.default.createElement(_eui.EuiFieldText, {
        autoComplete: "new-password",
        "data-test-subj": "passwordConfirmationInput",
        onChange: _this.onConfirmPasswordChange,
        name: "confirm_password",
        type: "password"
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "changePasswordForm", function () {
      var _this$state2 = _this.state,
          showChangePasswordForm = _this$state2.showChangePasswordForm,
          user = _this$state2.user,
          currentUser = _this$state2.currentUser;
      var userIsLoggedInUser = Boolean(currentUser && user.username && user.username === currentUser.username);

      if (!showChangePasswordForm) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), user.username === 'kibana' ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _i18n.i18n.translate('xpack.security.management.users.editUser.changePasswordExtraStepTitle', {
          defaultMessage: 'Extra step needed'
        }),
        color: "warning",
        iconType: "help"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.changePasswordUpdateKibanaTitle",
        defaultMessage: "After you change the password for the kibana user, you must update the {kibana} file and restart Kibana.",
        values: {
          kibana: 'kibana.yml'
        }
      }))), _react.default.createElement(_eui.EuiSpacer, null)) : null, _react.default.createElement(_components.ChangePasswordForm, {
        user: _this.state.user,
        isUserChangingOwnPassword: userIsLoggedInUser,
        onChangePassword: _this.toggleChangePasswordForm,
        userAPIClient: _this.props.userAPIClient,
        notifications: _this.props.notifications
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "toggleChangePasswordForm", function () {
      var showChangePasswordForm = _this.state.showChangePasswordForm;

      _this.setState({
        showChangePasswordForm: !showChangePasswordForm
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onUsernameChange", function (e) {
      var user = _objectSpread({}, _this.state.user, {
        username: e.target.value || ''
      });

      var formError = _this.validator.validateForSave(user, _this.state.isNewUser);

      _this.setState({
        user: user,
        formError: formError
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onEmailChange", function (e) {
      var user = _objectSpread({}, _this.state.user, {
        email: e.target.value || ''
      });

      var formError = _this.validator.validateForSave(user, _this.state.isNewUser);

      _this.setState({
        user: user,
        formError: formError
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFullNameChange", function (e) {
      var user = _objectSpread({}, _this.state.user, {
        full_name: e.target.value || ''
      });

      var formError = _this.validator.validateForSave(user, _this.state.isNewUser);

      _this.setState({
        user: user,
        formError: formError
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPasswordChange", function (e) {
      var user = _objectSpread({}, _this.state.user, {
        password: e.target.value || ''
      });

      var formError = _this.validator.validateForSave(user, _this.state.isNewUser);

      _this.setState({
        user: user,
        formError: formError
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmPasswordChange", function (e) {
      var user = _objectSpread({}, _this.state.user, {
        confirmPassword: e.target.value || ''
      });

      var formError = _this.validator.validateForSave(user, _this.state.isNewUser);

      _this.setState({
        user: user,
        formError: formError
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRolesChange", function (selectedRoles) {
      _this.setState({
        selectedRoles: selectedRoles
      });
    });

    _defineProperty(_assertThisInitialized(_this), "cannotSaveUser", function () {
      var _this$state3 = _this.state,
          user = _this$state3.user,
          isNewUser = _this$state3.isNewUser;

      var result = _this.validator.validateForSave(user, isNewUser);

      return result.isInvalid;
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelDelete", function () {
      _this.setState({
        showDeleteConfirmation: false
      });
    });

    _this.validator = new _validate_user.UserValidator({
      shouldValidate: false
    });
    _this.state = {
      isLoaded: false,
      isNewUser: true,
      currentUser: null,
      showChangePasswordForm: false,
      showDeleteConfirmation: false,
      user: {
        email: '',
        username: '',
        full_name: '',
        roles: [],
        enabled: true,
        password: '',
        confirmPassword: ''
      },
      roles: [],
      selectedRoles: [],
      formError: null
    };
    return _this;
  }

  _createClass(EditUserPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.setCurrentUser();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(prevProps) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(prevProps.username !== this.props.username)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.setCurrentUser();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentDidUpdate(_x) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "setCurrentUser",
    value: function () {
      var _setCurrentUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this$props, username, userAPIClient, rolesAPIClient, notifications, authc, _this$state4, user, currentUser, roles;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props = this.props, username = _this$props.username, userAPIClient = _this$props.userAPIClient, rolesAPIClient = _this$props.rolesAPIClient, notifications = _this$props.notifications, authc = _this$props.authc;
                _this$state4 = this.state, user = _this$state4.user, currentUser = _this$state4.currentUser;

                if (!username) {
                  _context4.next = 20;
                  break;
                }

                _context4.prev = 3;
                _context4.t0 = _objectSpread;
                _context4.t1 = {};
                _context4.next = 8;
                return userAPIClient.getUser(username);

              case 8:
                _context4.t2 = _context4.sent;
                _context4.t3 = {
                  password: '',
                  confirmPassword: ''
                };
                user = (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t3);
                _context4.next = 13;
                return authc.getCurrentUser();

              case 13:
                currentUser = _context4.sent;
                _context4.next = 20;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t4 = _context4["catch"](3);
                notifications.toasts.addDanger({
                  title: _i18n.i18n.translate('xpack.security.management.users.editUser.errorLoadingUserTitle', {
                    defaultMessage: 'Error loading user'
                  }),
                  text: (0, _lodash.get)(_context4.t4, 'body.message') || _context4.t4.message
                });
                return _context4.abrupt("return", backToUserList());

              case 20:
                roles = [];
                _context4.prev = 21;
                _context4.next = 24;
                return rolesAPIClient.getRoles();

              case 24:
                roles = _context4.sent;
                _context4.next = 30;
                break;

              case 27:
                _context4.prev = 27;
                _context4.t5 = _context4["catch"](21);
                notifications.toasts.addDanger({
                  title: _i18n.i18n.translate('xpack.security.management.users.editUser.errorLoadingRolesTitle', {
                    defaultMessage: 'Error loading roles'
                  }),
                  text: (0, _lodash.get)(_context4.t5, 'body.message') || _context4.t5.message
                });

              case 30:
                this.setState({
                  isLoaded: true,
                  isNewUser: !username,
                  currentUser: currentUser,
                  user: user,
                  roles: roles,
                  selectedRoles: user.roles || []
                });

              case 31:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 16], [21, 27]]);
      }));

      function setCurrentUser() {
        return _setCurrentUser.apply(this, arguments);
      }

      return setCurrentUser;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state5 = this.state,
          user = _this$state5.user,
          selectedRoles = _this$state5.selectedRoles,
          roles = _this$state5.roles,
          showChangePasswordForm = _this$state5.showChangePasswordForm,
          isNewUser = _this$state5.isNewUser,
          showDeleteConfirmation = _this$state5.showDeleteConfirmation;
      var reserved = user.metadata && user.metadata._reserved;

      if (!user || !roles) {
        return null;
      }

      if (!this.state.isLoaded) {
        return null;
      }

      var hasAnyDeprecatedRolesAssigned = selectedRoles.some(function (selected) {
        var role = roles.find(function (r) {
          return r.name === selected;
        });
        return role && (0, _model.isRoleDeprecated)(role);
      });
      var roleHelpText = hasAnyDeprecatedRolesAssigned ? _react.default.createElement("span", {
        "data-test-subj": "hasDeprecatedRolesAssignedHelpText"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.deprecatedRolesAssignedWarning",
        defaultMessage: "This user is assigned a deprecated role. Please migrate to a supported role."
      })) : undefined;
      return _react.default.createElement("div", {
        className: "secUsersEditPage"
      }, _react.default.createElement(_eui.EuiPageContent, {
        className: "secUsersEditPage__content"
      }, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, isNewUser ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.newUserTitle",
        defaultMessage: "New user"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.editUserTitle",
        defaultMessage: "Edit {userName} user",
        values: {
          userName: user.username
        }
      })))), reserved && _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiIcon, {
        type: "lock",
        size: "l",
        color: "subdued"
      }))), _react.default.createElement(_eui.EuiPageContentBody, null, reserved && _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.modifyingReservedUsersDescription",
        defaultMessage: "Reserved users are built-in and cannot be removed or modified. Only the password may be changed."
      }))), showDeleteConfirmation ? _react.default.createElement(_components.ConfirmDeleteUsers, {
        onCancel: this.onCancelDelete,
        usersToDelete: [user.username],
        callback: this.handleDelete,
        userAPIClient: this.props.userAPIClient,
        notifications: this.props.notifications
      }) : null, _react.default.createElement(_eui.EuiForm, this.state.formError, _react.default.createElement(_eui.EuiFormRow, _extends({}, this.validator.validateUsername(this.state.user), {
        helpText: !isNewUser && !reserved ? _i18n.i18n.translate('xpack.security.management.users.editUser.changingUserNameAfterCreationDescription', {
          defaultMessage: "Usernames can't be changed after creation."
        }) : null,
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.usernameFormRowLabel', {
          defaultMessage: 'Username'
        })
      }), _react.default.createElement(_eui.EuiFieldText, {
        value: user.username || '',
        name: "username",
        "data-test-subj": "userFormUserNameInput",
        disabled: !isNewUser,
        onChange: this.onUsernameChange
      })), isNewUser ? this.passwordFields() : null, reserved ? null : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.fullNameFormRowLabel', {
          defaultMessage: 'Full name'
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        "data-test-subj": "userFormFullNameInput",
        name: "full_name",
        value: user.full_name || '',
        onChange: this.onFullNameChange
      })), _react.default.createElement(_eui.EuiFormRow, _extends({}, this.validator.validateEmail(this.state.user), {
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.emailAddressFormRowLabel', {
          defaultMessage: 'Email address'
        })
      }), _react.default.createElement(_eui.EuiFieldText, {
        "data-test-subj": "userFormEmailInput",
        name: "email",
        value: user.email || '',
        onChange: this.onEmailChange
      }))), _react.default.createElement(_eui.EuiFormRow, {
        label: _i18n.i18n.translate('xpack.security.management.users.editUser.rolesFormRowLabel', {
          defaultMessage: 'Roles'
        }),
        helpText: roleHelpText
      }, _react.default.createElement(_role_combo_box.RoleComboBox, {
        availableRoles: roles,
        selectedRoleNames: selectedRoles,
        onChange: this.onRolesChange,
        isDisabled: reserved
      })), isNewUser || showChangePasswordForm ? null : _react.default.createElement(_eui.EuiFormRow, {
        label: "Password"
      }, _react.default.createElement(_eui.EuiLink, {
        onClick: this.toggleChangePasswordForm
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.changePasswordButtonLabel",
        defaultMessage: "Change password"
      }))), this.changePasswordForm(), _react.default.createElement(_eui.EuiHorizontalRule, null), reserved && _react.default.createElement(_eui.EuiButton, {
        onClick: backToUserList
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.returnToUserListButtonLabel",
        defaultMessage: "Return to user list"
      })), reserved ? null : _react.default.createElement(_eui.EuiFlexGroup, {
        responsive: false
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButton, {
        disabled: this.cannotSaveUser(),
        fill: true,
        "data-test-subj": "userFormSaveButton",
        onClick: function onClick() {
          return _this2.saveUser();
        }
      }, isNewUser ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.createUserButtonLabel",
        defaultMessage: "Create user"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.updateUserButtonLabel",
        defaultMessage: "Update user"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        "data-test-subj": "userFormCancelButton",
        onClick: backToUserList
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.cancelButtonLabel",
        defaultMessage: "Cancel"
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }), isNewUser || reserved ? null : _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: function onClick() {
          _this2.setState({
            showDeleteConfirmation: true
          });
        },
        "data-test-subj": "userFormDeleteButton",
        color: "danger"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.editUser.deleteUserButtonLabel",
        defaultMessage: "Delete user"
      }))))))));
    }
  }]);

  return EditUserPage;
}(_react.Component);

exports.EditUserPage = EditUserPage;