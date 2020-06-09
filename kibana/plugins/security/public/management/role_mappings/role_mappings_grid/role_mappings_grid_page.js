"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMappingsGridPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _empty_prompt = require("./empty_prompt");

var _components = require("../components");

var _management_urls = require("../../management_urls");

var _role_table_display = require("../../role_table_display");

var _badges = require("../../badges");

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

var RoleMappingsGridPage =
/*#__PURE__*/
function (_Component) {
  _inherits(RoleMappingsGridPage, _Component);

  function RoleMappingsGridPage(props) {
    var _this;

    _classCallCheck(this, RoleMappingsGridPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RoleMappingsGridPage).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "renderTable", function () {
      var _this$state = _this.state,
          roleMappings = _this$state.roleMappings,
          selectedItems = _this$state.selectedItems,
          loadState = _this$state.loadState;
      var message = loadState === 'loadingTable' ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roleMappings.roleMappingTableLoadingMessage",
        defaultMessage: "Loading role mappings\u2026"
      }) : undefined;
      var sorting = {
        sort: {
          field: 'name',
          direction: 'asc'
        }
      };
      var pagination = {
        initialPageSize: 20,
        pageSizeOptions: [10, 20, 50]
      };
      var selection = {
        onSelectionChange: function onSelectionChange(newSelectedItems) {
          _this.setState({
            selectedItems: newSelectedItems
          });
        }
      };
      var search = {
        toolsLeft: selectedItems.length ? _react.default.createElement(_components.DeleteProvider, {
          roleMappingsAPI: _this.props.roleMappingsAPI,
          notifications: _this.props.notifications
        }, function (deleteRoleMappingsPrompt) {
          return _react.default.createElement(_eui.EuiButton, {
            onClick: function onClick() {
              return deleteRoleMappingsPrompt(selectedItems, _this.onRoleMappingsDeleted);
            },
            color: "danger",
            "data-test-subj": "bulkDeleteActionButton"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.roleMappings.deleteRoleMappingButton",
            defaultMessage: "Delete {count, plural, one {role mapping} other {role mappings}}",
            values: {
              count: selectedItems.length
            }
          }));
        }) : undefined,
        toolsRight: _react.default.createElement(_eui.EuiButton, {
          color: "secondary",
          iconType: "refresh",
          onClick: function onClick() {
            return _this.reloadRoleMappings();
          },
          "data-test-subj": "reloadButton"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.roleMappings.reloadRoleMappingsButton",
          defaultMessage: "Reload"
        })),
        box: {
          incremental: true
        },
        filters: undefined
      };
      return _react.default.createElement(_eui.EuiInMemoryTable, {
        items: roleMappings,
        itemId: "name",
        columns: _this.getColumnConfig(),
        search: search,
        sorting: sorting,
        selection: selection,
        pagination: pagination,
        loading: loadState === 'loadingTable',
        message: message,
        isSelectable: true,
        rowProps: function rowProps() {
          return {
            'data-test-subj': 'roleMappingRow'
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnConfig", function () {
      var config = [{
        field: 'name',
        name: _i18n.i18n.translate('xpack.security.management.roleMappings.nameColumnName', {
          defaultMessage: 'Name'
        }),
        sortable: true,
        render: function render(roleMappingName) {
          return _react.default.createElement(_eui.EuiLink, {
            href: (0, _management_urls.getEditRoleMappingHref)(roleMappingName),
            "data-test-subj": "roleMappingName"
          }, roleMappingName);
        }
      }, {
        field: 'roles',
        name: _i18n.i18n.translate('xpack.security.management.roleMappings.rolesColumnName', {
          defaultMessage: 'Roles'
        }),
        sortable: true,
        render: function render(entry, record) {
          var _record$roles = record.roles,
              assignedRoleNames = _record$roles === void 0 ? [] : _record$roles,
              _record$role_template = record.role_templates,
              roleTemplates = _record$role_template === void 0 ? [] : _record$role_template;

          if (roleTemplates.length > 0) {
            return _react.default.createElement("span", {
              "data-test-subj": "roleMappingRoles"
            }, _i18n.i18n.translate('xpack.security.management.roleMappings.roleTemplates', {
              defaultMessage: '{templateCount, plural, one{# role template} other {# role templates}} defined',
              values: {
                templateCount: roleTemplates.length
              }
            }));
          }

          var roleLinks = assignedRoleNames.map(function (rolename, index) {
            var _ref, _this$state$roles;

            var role = (_ref = (_this$state$roles = _this.state.roles) === null || _this$state$roles === void 0 ? void 0 : _this$state$roles.find(function (r) {
              return r.name === rolename;
            })) !== null && _ref !== void 0 ? _ref : rolename;
            return _react.default.createElement(_role_table_display.RoleTableDisplay, {
              role: role,
              key: rolename
            });
          });
          return _react.default.createElement("div", {
            "data-test-subj": "roleMappingRoles"
          }, roleLinks);
        }
      }, {
        field: 'enabled',
        name: _i18n.i18n.translate('xpack.security.management.roleMappings.enabledColumnName', {
          defaultMessage: 'Enabled'
        }),
        sortable: true,
        render: function render(enabled) {
          if (enabled) {
            return _react.default.createElement(_badges.EnabledBadge, {
              "data-test-subj": "roleMappingEnabled"
            });
          }

          return _react.default.createElement(_badges.DisabledBadge, {
            "data-test-subj": "roleMappingEnabled"
          });
        }
      }, {
        name: _i18n.i18n.translate('xpack.security.management.roleMappings.actionsColumnName', {
          defaultMessage: 'Actions'
        }),
        actions: [{
          render: function render(record) {
            return _react.default.createElement(_eui.EuiToolTip, {
              content: _i18n.i18n.translate('xpack.security.management.roleMappings.actionEditTooltip', {
                defaultMessage: 'Edit'
              })
            }, _react.default.createElement(_eui.EuiButtonIcon, {
              "aria-label": _i18n.i18n.translate('xpack.security.management.roleMappings.actionEditAriaLabel', {
                defaultMessage: "Edit '{name}'",
                values: {
                  name: record.name
                }
              }),
              iconType: "pencil",
              color: "primary",
              "data-test-subj": "editRoleMappingButton-".concat(record.name),
              href: (0, _management_urls.getEditRoleMappingHref)(record.name)
            }));
          }
        }, {
          render: function render(record) {
            return _react.default.createElement(_eui.EuiFlexGroup, {
              gutterSize: "s"
            }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_components.DeleteProvider, {
              roleMappingsAPI: _this.props.roleMappingsAPI,
              notifications: _this.props.notifications
            }, function (deleteRoleMappingPrompt) {
              return _react.default.createElement(_eui.EuiToolTip, {
                content: _i18n.i18n.translate('xpack.security.management.roleMappings.actionDeleteTooltip', {
                  defaultMessage: 'Delete'
                })
              }, _react.default.createElement(_eui.EuiButtonIcon, {
                "aria-label": _i18n.i18n.translate('xpack.security.management.roleMappings.actionDeleteAriaLabel', {
                  defaultMessage: "Delete '{name}'",
                  values: {
                    name: name
                  }
                }),
                iconType: "trash",
                color: "danger",
                "data-test-subj": "deleteRoleMappingButton-".concat(record.name),
                onClick: function onClick() {
                  return deleteRoleMappingPrompt([record], _this.onRoleMappingsDeleted);
                }
              }));
            })));
          }
        }]
      }];
      return config;
    });

    _defineProperty(_assertThisInitialized(_this), "onRoleMappingsDeleted", function (roleMappings) {
      if (roleMappings.length) {
        _this.reloadRoleMappings();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "performInitialLoad",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref3, _ref4, roleMappings, roles;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Promise.all([_this.props.roleMappingsAPI.getRoleMappings(), _this.props.rolesAPIClient.getRoles()]);

            case 3:
              _ref3 = _context.sent;
              _ref4 = _slicedToArray(_ref3, 2);
              roleMappings = _ref4[0];
              roles = _ref4[1];

              _this.setState({
                roleMappings: roleMappings,
                roles: roles
              });

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);

              _this.setState({
                error: _context.t0
              });

            case 13:
              _this.setState({
                loadState: 'finished'
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "reloadRoleMappings", function () {
      _this.setState({
        roleMappings: [],
        loadState: 'loadingTable'
      });

      _this.loadRoleMappings();
    });

    _defineProperty(_assertThisInitialized(_this), "loadRoleMappings",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var roleMappings;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this.props.roleMappingsAPI.getRoleMappings();

            case 3:
              roleMappings = _context2.sent;

              _this.setState({
                roleMappings: roleMappings
              });

              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);

              _this.setState({
                error: _context2.t0
              });

            case 10:
              _this.setState({
                loadState: 'finished'
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    })));

    _this.state = {
      loadState: 'loadingApp',
      roleMappings: null,
      roles: null,
      hasCompatibleRealms: true,
      selectedItems: [],
      error: undefined
    };
    return _this;
  }

  _createClass(RoleMappingsGridPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkPrivileges();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          loadState = _this$state2.loadState,
          error = _this$state2.error,
          roleMappings = _this$state2.roleMappings;

      if (loadState === 'permissionDenied') {
        return _react.default.createElement(_components.PermissionDenied, null);
      }

      if (loadState === 'loadingApp') {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.roleMappings.loadingRoleMappingsDescription",
          defaultMessage: "Loading role mappings\u2026"
        })));
      }

      if (error) {
        var _error$body = error.body,
            errorTitle = _error$body.error,
            message = _error$body.message,
            statusCode = _error$body.statusCode;
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiCallOut, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.roleMappings.loadingRoleMappingsErrorTitle",
            defaultMessage: "Error loading Role mappings"
          }),
          color: "danger",
          iconType: "alert"
        }, statusCode, ": ", errorTitle, " - ", message));
      }

      if (loadState === 'finished' && roleMappings && roleMappings.length === 0) {
        return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_empty_prompt.EmptyPrompt, null));
      }

      return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roleMappings.roleMappingTitle",
        defaultMessage: "Role Mappings"
      }))), _react.default.createElement(_eui.EuiText, {
        color: "subdued",
        size: "s"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roleMappings.roleMappingDescription",
        defaultMessage: "Role mappings define which roles are assigned to users from an external identity provider. {learnMoreLink}",
        values: {
          learnMoreLink: _react.default.createElement(_eui.EuiLink, {
            href: this.props.docLinks.getRoleMappingDocUrl(),
            external: true,
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.management.roleMappings.learnMoreLinkText",
            defaultMessage: "Learn more."
          }))
        }
      })))), _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "createRoleMappingButton",
        href: (0, _management_urls.getCreateRoleMappingHref)()
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.roleMappings.createRoleMappingButtonLabel",
        defaultMessage: "Create role mapping"
      })))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_react.Fragment, null, !this.state.hasCompatibleRealms && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_components.NoCompatibleRealms, {
        docLinks: this.props.docLinks
      }), _react.default.createElement(_eui.EuiSpacer, null)), this.renderTable())));
    }
  }, {
    key: "checkPrivileges",
    value: function () {
      var _checkPrivileges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref6, canManageRoleMappings, hasCompatibleRealms;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.props.roleMappingsAPI.checkRoleMappingFeatures();

              case 3:
                _ref6 = _context3.sent;
                canManageRoleMappings = _ref6.canManageRoleMappings;
                hasCompatibleRealms = _ref6.hasCompatibleRealms;
                this.setState({
                  loadState: canManageRoleMappings ? this.state.loadState : 'permissionDenied',
                  hasCompatibleRealms: hasCompatibleRealms
                });

                if (canManageRoleMappings) {
                  this.performInitialLoad();
                }

                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                this.setState({
                  error: _context3.t0,
                  loadState: 'finished'
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function checkPrivileges() {
        return _checkPrivileges.apply(this, arguments);
      }

      return checkPrivileges;
    }()
  }]);

  return RoleMappingsGridPage;
}(_react.Component);

exports.RoleMappingsGridPage = RoleMappingsGridPage;