"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolesGridPage = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../../../common/model");

var _confirm_delete = require("./confirm_delete");

var _permission_denied = require("./permission_denied");

var _badges = require("../../badges");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var getRoleManagementHref = function getRoleManagementHref(action, roleName) {
  return "#/management/security/roles/".concat(action).concat(roleName ? "/".concat(roleName) : '');
};

var RolesGridPage =
/*#__PURE__*/
function (_Component) {
  _inherits(RolesGridPage, _Component);

  function RolesGridPage(props) {
    var _this;

    _classCallCheck(this, RolesGridPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RolesGridPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getPageContent", function () {
      var roles = _this.state.roles;
      return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.roleTitle",
        defaultMessage: "Roles"
      }))), _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.subtitle",
        defaultMessage: "Apply roles to groups of users and manage permissions across the stack."
      })))), _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "createRoleButton",
        href: getRoleManagementHref('edit')
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.createRoleButtonLabel",
        defaultMessage: "Create role"
      })))), _react.default.createElement(_eui.EuiPageContentBody, null, _this.state.showDeleteConfirmation ? _react.default.createElement(_confirm_delete.ConfirmDelete, {
        onCancel: _this.onCancelDelete,
        rolesToDelete: _this.state.selection.map(function (role) {
          return role.name;
        }),
        callback: _this.handleDelete,
        notifications: _this.props.notifications,
        rolesAPIClient: _this.props.rolesAPIClient
      }) : null, _react.default.createElement(_eui.EuiInMemoryTable, {
        itemId: "name",
        responsive: false,
        columns: _this.getColumnConfig(),
        hasActions: true,
        selection: {
          selectable: function selectable(role) {
            return !role.metadata || !role.metadata._reserved;
          },
          selectableMessage: function selectableMessage(selectable) {
            return !selectable ? 'Role is reserved' : '';
          },
          onSelectionChange: function onSelectionChange(selection) {
            return _this.setState({
              selection: selection
            });
          }
        },
        pagination: {
          initialPageSize: 20,
          pageSizeOptions: [10, 20, 30, 50, 100]
        },
        items: _this.state.visibleRoles,
        loading: roles.length === 0,
        search: {
          toolsLeft: _this.renderToolsLeft(),
          toolsRight: _this.renderToolsRight(),
          box: {
            incremental: true
          },
          onChange: function onChange(query) {
            _this.setState({
              filter: query.queryText,
              visibleRoles: _this.getVisibleRoles(_this.state.roles, query.queryText, _this.state.includeReservedRoles)
            });
          }
        },
        sorting: {
          sort: {
            field: 'name',
            direction: 'asc'
          }
        },
        rowProps: function rowProps() {
          return {
            'data-test-subj': 'roleRow'
          };
        },
        isSelectable: true
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnConfig", function () {
      return [{
        field: 'name',
        name: _i18n.i18n.translate('xpack.security.management.roles.nameColumnName', {
          defaultMessage: 'Role'
        }),
        sortable: true,
        truncateText: true,
        render: function render(name, record) {
          return _react.default.createElement(_eui.EuiText, {
            color: "subdued",
            size: "s"
          }, _react.default.createElement(_eui.EuiLink, {
            "data-test-subj": "roleRowName",
            href: getRoleManagementHref('edit', name)
          }, name));
        }
      }, {
        field: 'metadata',
        name: _i18n.i18n.translate('xpack.security.management.roles.statusColumnName', {
          defaultMessage: 'Status'
        }),
        sortable: function sortable(role) {
          return (0, _model.isRoleEnabled)(role) && !(0, _model.isRoleDeprecated)(role);
        },
        render: function render(metadata, record) {
          return _this.getRoleStatusBadges(record);
        }
      }, {
        name: _i18n.i18n.translate('xpack.security.management.roles.actionsColumnName', {
          defaultMessage: 'Actions'
        }),
        width: '150px',
        actions: [{
          available: function available(role) {
            return !(0, _model.isRoleReadOnly)(role);
          },
          render: function render(role) {
            var title = _i18n.i18n.translate('xpack.security.management.roles.editRoleActionName', {
              defaultMessage: "Edit {roleName}",
              values: {
                roleName: role.name
              }
            });

            return _react.default.createElement(_eui.EuiButtonIcon, {
              "aria-label": title,
              "data-test-subj": "edit-role-action-".concat(role.name),
              title: title,
              color: 'primary',
              iconType: 'pencil',
              href: getRoleManagementHref('edit', role.name)
            });
          }
        }, {
          available: function available(role) {
            return !(0, _model.isRoleReserved)(role);
          },
          render: function render(role) {
            var title = _i18n.i18n.translate('xpack.security.management.roles.cloneRoleActionName', {
              defaultMessage: "Clone {roleName}",
              values: {
                roleName: role.name
              }
            });

            return _react.default.createElement(_eui.EuiButtonIcon, {
              "aria-label": title,
              "data-test-subj": "clone-role-action-".concat(role.name),
              title: title,
              color: 'primary',
              iconType: 'copy',
              href: getRoleManagementHref('clone', role.name)
            });
          }
        }]
      }];
    });

    _defineProperty(_assertThisInitialized(_this), "getVisibleRoles", function (roles, filter, includeReservedRoles) {
      return roles.filter(function (role) {
        var normalized = "".concat(role.name).toLowerCase();
        var normalizedQuery = filter.toLowerCase();
        return normalized.indexOf(normalizedQuery) !== -1 && (includeReservedRoles || !(0, _model.isRoleReserved)(role));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onIncludeReservedRolesChange", function (e) {
      _this.setState({
        includeReservedRoles: e.target.checked,
        visibleRoles: _this.getVisibleRoles(_this.state.roles, _this.state.filter, e.target.checked)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRoleStatusBadges", function (role) {
      var enabled = (0, _model.isRoleEnabled)(role);
      var deprecated = (0, _model.isRoleDeprecated)(role);
      var reserved = (0, _model.isRoleReserved)(role);
      var badges = [];

      if (!enabled) {
        badges.push(_react.default.createElement(_badges.DisabledBadge, {
          "data-test-subj": "roleDisabled"
        }));
      }

      if (reserved) {
        badges.push(_react.default.createElement(_badges.ReservedBadge, {
          "data-test-subj": "roleReserved",
          tooltipContent: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.roles.reservedRoleBadgeTooltip",
            defaultMessage: "Reserved roles are built-in and cannot be edited or removed."
          })
        }));
      }

      if (deprecated) {
        badges.push(_react.default.createElement(_badges.DeprecatedBadge, {
          "data-test-subj": "roleDeprecated",
          tooltipContent: (0, _model.getExtendedRoleDeprecationNotice)(role)
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

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function () {
      _this.setState({
        selection: [],
        showDeleteConfirmation: false
      });

      _this.loadRoles();
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelDelete", function () {
      _this.setState({
        showDeleteConfirmation: false
      });
    });

    _this.state = {
      roles: [],
      visibleRoles: [],
      selection: [],
      filter: '',
      showDeleteConfirmation: false,
      permissionDenied: false,
      includeReservedRoles: true
    };
    return _this;
  }

  _createClass(RolesGridPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadRoles();
    }
  }, {
    key: "render",
    value: function render() {
      var permissionDenied = this.state.permissionDenied;
      return permissionDenied ? _react.default.createElement(_permission_denied.PermissionDenied, null) : this.getPageContent();
    }
  }, {
    key: "loadRoles",
    value: function () {
      var _loadRoles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var roles;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.props.rolesAPIClient.getRoles();

              case 3:
                roles = _context.sent;
                this.setState({
                  roles: roles,
                  visibleRoles: this.getVisibleRoles(roles, this.state.filter, this.state.includeReservedRoles)
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (_lodash.default.get(_context.t0, 'body.statusCode') === 403) {
                  this.setState({
                    permissionDenied: true
                  });
                } else {
                  this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.roles.fetchingRolesErrorMessage', {
                    defaultMessage: 'Error fetching roles: {message}',
                    values: {
                      message: _lodash.default.get(_context.t0, 'body.message', '')
                    }
                  }));
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function loadRoles() {
        return _loadRoles.apply(this, arguments);
      }

      return loadRoles;
    }()
  }, {
    key: "renderToolsLeft",
    value: function renderToolsLeft() {
      var _this2 = this;

      var selection = this.state.selection;

      if (selection.length === 0) {
        return;
      }

      var numSelected = selection.length;
      return _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "deleteRoleButton",
        color: "danger",
        onClick: function onClick() {
          return _this2.setState({
            showDeleteConfirmation: true
          });
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roles.deleteSelectedRolesButtonLabel",
        defaultMessage: "Delete {numSelected} role{numSelected, plural, one { } other {s}}",
        values: {
          numSelected: numSelected
        }
      }));
    }
  }, {
    key: "renderToolsRight",
    value: function renderToolsRight() {
      return _react.default.createElement(_eui.EuiSwitch, {
        "data-test-subj": "showReservedRolesSwitch",
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.roles.showReservedRolesLabel",
          defaultMessage: "Show reserved roles"
        }),
        checked: this.state.includeReservedRoles,
        onChange: this.onIncludeReservedRolesChange
      });
    }
  }]);

  return RolesGridPage;
}(_react.Component);

exports.RolesGridPage = RolesGridPage;