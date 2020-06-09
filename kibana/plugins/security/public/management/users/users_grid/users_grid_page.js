"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersGridPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _components = require("../components");

var _user_utils = require("../user_utils");

var _badges = require("../../badges");

var _role_table_display = require("../../role_table_display");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var UsersGridPage =
/*#__PURE__*/
function (_Component) {
  _inherits(UsersGridPage, _Component);

  function UsersGridPage(props) {
    var _this;

    _classCallCheck(this, UsersGridPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UsersGridPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function (usernames, errors) {
      var users = _this.state.users;

      _this.setState({
        selection: [],
        showDeleteConfirmation: false,
        users: users.filter(function (_ref) {
          var username = _ref.username;
          return !usernames.includes(username) || errors.includes(username);
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getVisibleUsers", function (users, filter, includeReservedUsers) {
      return users.filter(function (_ref2) {
        var username = _ref2.username,
            userRoles = _ref2.roles,
            _ref2$full_name = _ref2.full_name,
            fullName = _ref2$full_name === void 0 ? '' : _ref2$full_name,
            _ref2$email = _ref2.email,
            email = _ref2$email === void 0 ? '' : _ref2$email,
            _ref2$metadata = _ref2.metadata,
            metadata = _ref2$metadata === void 0 ? {} : _ref2$metadata;
        var normalized = "".concat(username, " ").concat(userRoles.join(' '), " ").concat(fullName, " ").concat(email).toLowerCase();
        var normalizedQuery = filter.toLowerCase();
        return normalized.indexOf(normalizedQuery) !== -1 && (includeReservedUsers || !metadata._reserved);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onIncludeReservedUsersChange", function (e) {
      _this.setState({
        includeReservedUsers: e.target.checked,
        visibleUsers: _this.getVisibleUsers(_this.state.users, _this.state.filter, e.target.checked)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getUserStatusBadges", function (user) {
      var enabled = user.enabled;
      var reserved = (0, _user_utils.isUserReserved)(user);
      var badges = [];

      if (!enabled) {
        badges.push(_react.default.createElement(_badges.DisabledBadge, {
          "data-test-subj": "userDisabled"
        }));
      }

      if (reserved) {
        badges.push(_react.default.createElement(_badges.ReservedBadge, {
          "data-test-subj": "userReserved",
          tooltipContent: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.users.reservedUserBadgeTooltip",
            defaultMessage: "Reserved users are built-in and cannot be edited or removed."
          })
        }));
      }

      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s"
      }, badges.map(function (badge, index) {
        return _react.default.createElement(_eui.EuiFlexItem, {
          key: index,
          grow: false
        }, badge);
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelDelete", function () {
      _this.setState({
        showDeleteConfirmation: false
      });
    });

    _this.state = {
      users: [],
      visibleUsers: [],
      roles: [],
      selection: [],
      showDeleteConfirmation: false,
      permissionDenied: false,
      filter: '',
      includeReservedUsers: true
    };
    return _this;
  }

  _createClass(UsersGridPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadUsersAndRoles();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          users = _this$state.users,
          roles = _this$state.roles,
          permissionDenied = _this$state.permissionDenied,
          showDeleteConfirmation = _this$state.showDeleteConfirmation,
          selection = _this$state.selection;

      if (permissionDenied) {
        return _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "none"
        }, _react.default.createElement(_eui.EuiPageContent, {
          horizontalPosition: "center"
        }, _react.default.createElement(_eui.EuiEmptyPrompt, {
          iconType: "securityApp",
          title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.users.deniedPermissionTitle",
            defaultMessage: "You need permission to manage users"
          })),
          body: _react.default.createElement("p", {
            "data-test-subj": "permissionDeniedMessage"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.users.permissionDeniedToManageUsersDescription",
            defaultMessage: "Contact your system administrator."
          }))
        })));
      }

      var path = '#/management/security/';
      var columns = [{
        field: 'username',
        name: _i18n.i18n.translate('xpack.security.management.users.userNameColumnName', {
          defaultMessage: 'User Name'
        }),
        sortable: true,
        truncateText: true,
        render: function render(username) {
          return _react.default.createElement(_eui.EuiLink, {
            "data-test-subj": "userRowUserName",
            href: "".concat(path, "users/edit/").concat(username)
          }, username);
        }
      }, {
        field: 'full_name',
        name: _i18n.i18n.translate('xpack.security.management.users.fullNameColumnName', {
          defaultMessage: 'Full Name'
        }),
        sortable: true,
        truncateText: true,
        render: function render(fullName) {
          return _react.default.createElement("div", {
            "data-test-subj": "userRowFullName"
          }, fullName);
        }
      }, {
        field: 'email',
        name: _i18n.i18n.translate('xpack.security.management.users.emailAddressColumnName', {
          defaultMessage: 'Email Address'
        }),
        sortable: true,
        truncateText: true,
        render: function render(email) {
          return _react.default.createElement("div", {
            "data-test-subj": "userRowEmail"
          }, email);
        }
      }, {
        field: 'roles',
        name: _i18n.i18n.translate('xpack.security.management.users.rolesColumnName', {
          defaultMessage: 'Roles'
        }),
        width: '30%',
        render: function render(rolenames) {
          var roleLinks = rolenames.map(function (rolename, index) {
            var _ref3;

            var roleDefinition = (_ref3 = roles === null || roles === void 0 ? void 0 : roles.find(function (role) {
              return role.name === rolename;
            })) !== null && _ref3 !== void 0 ? _ref3 : rolename;
            return _react.default.createElement(_role_table_display.RoleTableDisplay, {
              role: roleDefinition,
              key: rolename
            });
          });
          return _react.default.createElement("div", {
            "data-test-subj": "userRowRoles"
          }, roleLinks);
        }
      }, {
        field: 'metadata',
        name: _i18n.i18n.translate('xpack.security.management.users.statusColumnName', {
          defaultMessage: 'Status'
        }),
        width: '10%',
        sortable: function sortable(_ref4) {
          var metadata = _ref4.metadata;
          return Boolean(metadata && metadata._reserved);
        },
        description: _i18n.i18n.translate('xpack.security.management.users.reservedColumnDescription', {
          defaultMessage: 'Reserved users are built-in and cannot be removed. Only the password can be changed.'
        }),
        render: function render(metadata, record) {
          return _this2.getUserStatusBadges(record);
        }
      }];
      var pagination = {
        initialPageSize: 20,
        pageSizeOptions: [10, 20, 50, 100]
      };
      var selectionConfig = {
        itemId: 'username',
        selectable: function selectable(user) {
          return !(user.metadata && user.metadata._reserved);
        },
        selectableMessage: function selectableMessage(selectable) {
          return !selectable ? 'User is a system user' : '';
        },
        onSelectionChange: function onSelectionChange(updatedSelection) {
          return _this2.setState({
            selection: updatedSelection
          });
        }
      };
      var search = {
        toolsLeft: this.renderToolsLeft(),
        toolsRight: this.renderToolsRight(),
        box: {
          incremental: true
        },
        onChange: function onChange(query) {
          _this2.setState({
            filter: query.queryText,
            visibleUsers: _this2.getVisibleUsers(_this2.state.users, query.queryText, _this2.state.includeReservedUsers)
          });
        }
      };
      var sorting = {
        sort: {
          field: 'username',
          direction: 'asc'
        }
      };

      var rowProps = function rowProps() {
        return {
          'data-test-subj': 'userRow'
        };
      };

      return _react.default.createElement("div", {
        className: "secUsersListingPage"
      }, _react.default.createElement(_eui.EuiPageContent, {
        className: "secUsersListingPage__content"
      }, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.usersTitle",
        defaultMessage: "Users"
      })))), _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "createUserButton",
        href: "#/management/security/users/edit"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.createNewUserButtonLabel",
        defaultMessage: "Create user"
      })))), _react.default.createElement(_eui.EuiPageContentBody, null, showDeleteConfirmation ? _react.default.createElement(_components.ConfirmDeleteUsers, {
        onCancel: this.onCancelDelete,
        usersToDelete: selection.map(function (user) {
          return user.username;
        }),
        callback: this.handleDelete,
        userAPIClient: this.props.userAPIClient,
        notifications: this.props.notifications
      }) : null, _react.default.createElement(_eui.EuiInMemoryTable, {
        itemId: "username",
        columns: columns,
        selection: selectionConfig,
        pagination: pagination,
        items: this.state.visibleUsers,
        loading: users.length === 0,
        search: search,
        sorting: sorting,
        rowProps: rowProps,
        isSelectable: true
      }))));
    }
  }, {
    key: "loadUsersAndRoles",
    value: function () {
      var _loadUsersAndRoles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref5, _ref6, users, roles;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Promise.all([this.props.userAPIClient.getUsers(), this.props.rolesAPIClient.getRoles()]);

              case 3:
                _ref5 = _context.sent;
                _ref6 = _slicedToArray(_ref5, 2);
                users = _ref6[0];
                roles = _ref6[1];
                this.setState({
                  users: users,
                  roles: roles,
                  visibleUsers: this.getVisibleUsers(users, this.state.filter, this.state.includeReservedUsers)
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (_context.t0.body.statusCode === 403) {
                  this.setState({
                    permissionDenied: true
                  });
                } else {
                  this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.users.fetchingUsersErrorMessage', {
                    defaultMessage: 'Error fetching users: {message}',
                    values: {
                      message: _context.t0.body.message
                    }
                  }));
                }

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function loadUsersAndRoles() {
        return _loadUsersAndRoles.apply(this, arguments);
      }

      return loadUsersAndRoles;
    }()
  }, {
    key: "renderToolsLeft",
    value: function renderToolsLeft() {
      var _this3 = this;

      var selection = this.state.selection;

      if (selection.length === 0) {
        return;
      }

      var numSelected = selection.length;
      return _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "deleteUserButton",
        color: "danger",
        onClick: function onClick() {
          return _this3.setState({
            showDeleteConfirmation: true
          });
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.users.deleteUsersButtonLabel",
        defaultMessage: "Delete {numSelected} user{numSelected, plural, one { } other {s}}",
        values: {
          numSelected: numSelected
        }
      }));
    }
  }, {
    key: "renderToolsRight",
    value: function renderToolsRight() {
      return _react.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "showReservedUsersSwitch",
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.users.showReservedUsersLabel",
          defaultMessage: "Show reserved users"
        }),
        checked: this.state.includeReservedUsers,
        onChange: this.onIncludeReservedUsersChange
      });
    }
  }]);

  return UsersGridPage;
}(_react.Component);

exports.UsersGridPage = UsersGridPage;