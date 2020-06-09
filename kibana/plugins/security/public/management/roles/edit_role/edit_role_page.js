"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditRolePage = void 0;

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _model = require("../../../../common/model");

var _management_urls = require("../../management_urls");

var _validate_role = require("./validate_role");

var _delete_role_button = require("./delete_role_button");

var _privileges2 = require("./privileges");

var _reserved_role_badge = require("./reserved_role_badge");

var _model2 = require("../model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useRunAsUsers(userAPIClient, fatalErrors) {
  var _useState = (0, _react2.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      userNames = _useState2[0],
      setUserNames = _useState2[1];

  (0, _react2.useEffect)(function () {
    userAPIClient.getUsers().then(function (users) {
      return setUserNames(users.map(function (user) {
        return user.username;
      }));
    }, function (err) {
      return fatalErrors.add(err);
    });
  }, [fatalErrors, userAPIClient]);
  return userNames;
}

function useIndexPatternsTitles(indexPatterns, fatalErrors, notifications) {
  var _useState3 = (0, _react2.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      indexPatternsTitles = _useState4[0],
      setIndexPatternsTitles = _useState4[1];

  (0, _react2.useEffect)(function () {
    indexPatterns.getTitles().catch(function (err) {
      var _err$response;

      // If user doesn't have access to the index patterns they still should be able to create new
      // or edit existing role.
      if (((_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 403) {
        notifications.toasts.addDanger({
          title: _i18n.i18n.translate('xpack.security.management.roles.noIndexPatternsPermission', {
            defaultMessage: 'You need permission to access the list of available index patterns.'
          })
        });
        return [];
      }

      fatalErrors.add(err);
      throw err;
    }).then(setIndexPatternsTitles);
  }, [fatalErrors, indexPatterns, notifications]);
  return indexPatternsTitles;
}

function usePrivileges(privilegesAPIClient, fatalErrors) {
  var _useState5 = (0, _react2.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      privileges = _useState6[0],
      setPrivileges = _useState6[1];

  (0, _react2.useEffect)(function () {
    Promise.all([privilegesAPIClient.getAll({
      includeActions: true
    }), privilegesAPIClient.getBuiltIn()]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          kibanaPrivileges = _ref2[0],
          builtInESPrivileges = _ref2[1];

      return setPrivileges([kibanaPrivileges, builtInESPrivileges]);
    }, function (err) {
      return fatalErrors.add(err);
    });
  }, [privilegesAPIClient, fatalErrors]);
  return privileges;
}

function useRole(rolesAPIClient, fatalErrors, notifications, license, action, roleName) {
  var _useState7 = (0, _react2.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      role = _useState8[0],
      setRole = _useState8[1];

  (0, _react2.useEffect)(function () {
    var rolePromise = roleName ? rolesAPIClient.getRole(roleName) : Promise.resolve({
      name: '',
      elasticsearch: {
        cluster: [],
        indices: [],
        run_as: []
      },
      kibana: [],
      _unrecognized_applications: []
    });
    rolePromise.then(function (fetchedRole) {
      if (action === 'clone' && (0, _model.isRoleReserved)(fetchedRole)) {
        backToRoleList();
        return;
      }

      if (fetchedRole.elasticsearch.indices.length === 0) {
        var emptyOption = {
          names: [],
          privileges: []
        };

        var _license$getFeatures = license.getFeatures(),
            allowRoleDocumentLevelSecurity = _license$getFeatures.allowRoleDocumentLevelSecurity,
            allowRoleFieldLevelSecurity = _license$getFeatures.allowRoleFieldLevelSecurity;

        if (allowRoleFieldLevelSecurity) {
          emptyOption.field_security = {
            grant: ['*'],
            except: []
          };
        }

        if (allowRoleDocumentLevelSecurity) {
          emptyOption.query = '';
        }

        fetchedRole.elasticsearch.indices.push(emptyOption);
      }

      setRole(action === 'clone' ? (0, _model.prepareRoleClone)(fetchedRole) : (0, _model.copyRole)(fetchedRole));
    }).catch(function (err) {
      var _err$response2;

      if (((_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status) === 404) {
        notifications.toasts.addDanger({
          title: _i18n.i18n.translate('xpack.security.management.roles.roleNotFound', {
            defaultMessage: 'No "{roleName}" role found.',
            values: {
              roleName: roleName
            }
          })
        });
        backToRoleList();
      } else {
        fatalErrors.add(err);
      }
    });
  }, [roleName, action, fatalErrors, rolesAPIClient, notifications, license]);
  return [role, setRole];
}

function useSpaces(http, fatalErrors, spacesEnabled) {
  var _useState9 = (0, _react2.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      spaces = _useState10[0],
      setSpaces = _useState10[1];

  (0, _react2.useEffect)(function () {
    (spacesEnabled ? http.get('/api/spaces/space') : Promise.resolve([])).then(function (fetchedSpaces) {
      return setSpaces(fetchedSpaces);
    }, function (err) {
      return fatalErrors.add(err);
    });
  }, [http, fatalErrors, spacesEnabled]);
  return spaces;
}

function useFeatures(getFeatures, fatalErrors) {
  var _useState11 = (0, _react2.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      features = _useState12[0],
      setFeatures = _useState12[1];

  (0, _react2.useEffect)(function () {
    getFeatures().catch(function (err) {
      var _err$response3;

      // Currently, the `/api/features` endpoint effectively requires the "Global All" kibana privilege (e.g., what
      // the `kibana_user` grants), because it returns information about all registered features (#35841). It's
      // possible that a user with `manage_security` will attempt to visit the role management page without the
      // correct Kibana privileges. If that's the case, then they receive a partial view of the role, and the UI does
      // not allow them to make changes to that role's kibana privileges. When this user visits the edit role page,
      // this API endpoint will throw a 404, which causes view to fail completely. So we instead attempt to detect the
      // 404 here, and respond in a way that still allows the UI to render itself.
      var unauthorizedForFeatures = ((_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.status) === 404;

      if (unauthorizedForFeatures) {
        return [];
      }

      fatalErrors.add(err);
    }).then(function (retrievedFeatures) {
      setFeatures(retrievedFeatures);
    });
  }, [fatalErrors, getFeatures]);
  return features;
}

function backToRoleList() {
  window.location.hash = _management_urls.ROLES_PATH;
}

var EditRolePage = function EditRolePage(_ref3) {
  var userAPIClient = _ref3.userAPIClient,
      indexPatterns = _ref3.indexPatterns,
      rolesAPIClient = _ref3.rolesAPIClient,
      indicesAPIClient = _ref3.indicesAPIClient,
      privilegesAPIClient = _ref3.privilegesAPIClient,
      getFeatures = _ref3.getFeatures,
      http = _ref3.http,
      roleName = _ref3.roleName,
      action = _ref3.action,
      fatalErrors = _ref3.fatalErrors,
      spacesEnabled = _ref3.spacesEnabled,
      license = _ref3.license,
      docLinks = _ref3.docLinks,
      uiCapabilities = _ref3.uiCapabilities,
      notifications = _ref3.notifications;

  // We should keep the same mutable instance of Validator for every re-render since we'll
  // eventually enable validation after the first time user tries to save a role.
  var _useRef = (0, _react2.useRef)(new _validate_role.RoleValidator({
    shouldValidate: false
  })),
      validator = _useRef.current;

  var _useState13 = (0, _react2.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      formError = _useState14[0],
      setFormError = _useState14[1];

  var runAsUsers = useRunAsUsers(userAPIClient, fatalErrors);
  var indexPatternsTitles = useIndexPatternsTitles(indexPatterns, fatalErrors, notifications);
  var privileges = usePrivileges(privilegesAPIClient, fatalErrors);
  var spaces = useSpaces(http, fatalErrors, spacesEnabled);
  var features = useFeatures(getFeatures, fatalErrors);

  var _useRole = useRole(rolesAPIClient, fatalErrors, notifications, license, action, roleName),
      _useRole2 = _slicedToArray(_useRole, 2),
      role = _useRole2[0],
      setRole = _useRole2[1];

  if (!role || !runAsUsers || !indexPatternsTitles || !privileges || !spaces || !features) {
    return null;
  }

  var isEditingExistingRole = !!roleName && action === 'edit';
  var isRoleReadOnly = (0, _model.isRoleReadOnly)(role);
  var isRoleReserved = (0, _model.isRoleReserved)(role);
  var isDeprecatedRole = (0, _model.isRoleDeprecated)(role);

  var _privileges = _slicedToArray(privileges, 2),
      kibanaPrivileges = _privileges[0],
      builtInESPrivileges = _privileges[1];

  var getFormTitle = function getFormTitle() {
    var titleText;
    var props = {
      tabIndex: 0
    };

    if (isRoleReserved) {
      titleText = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.viewingRoleTitle",
        defaultMessage: "Viewing role"
      });
      props['aria-describedby'] = 'reservedRoleDescription';
    } else if (isEditingExistingRole) {
      titleText = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.editRoleTitle",
        defaultMessage: "Edit role"
      });
    } else {
      titleText = _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.createRoleTitle",
        defaultMessage: "Create role"
      });
    }

    return _react2.default.createElement(_eui.EuiTitle, {
      size: "l"
    }, _react2.default.createElement("h1", props, titleText, " ", _react2.default.createElement(_reserved_role_badge.ReservedRoleBadge, {
      role: role
    })));
  };

  var getActionButton = function getActionButton() {
    if (isEditingExistingRole && !isRoleReadOnly) {
      return _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_delete_role_button.DeleteRoleButton, {
        canDelete: true,
        onDelete: handleDeleteRole
      }));
    }

    return null;
  };

  var getRoleName = function getRoleName() {
    return _react2.default.createElement(_eui.EuiPanel, null, _react2.default.createElement(_eui.EuiFormRow, _extends({
      label: _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.roleNameFormRowTitle",
        defaultMessage: "Role name"
      }),
      helpText: !isRoleReserved && isEditingExistingRole ? _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.management.editRole.roleNameFormRowHelpText",
        defaultMessage: "A role's name cannot be changed once it has been created."
      }) : undefined
    }, validator.validateRoleName(role)), _react2.default.createElement(_eui.EuiFieldText, {
      name: 'name',
      value: role.name || '',
      onChange: onNameChange,
      "data-test-subj": 'roleFormNameInput',
      readOnly: isRoleReserved || isEditingExistingRole
    })));
  };

  var onNameChange = function onNameChange(e) {
    return setRole(_objectSpread({}, role, {
      name: e.target.value.replace(/\s/g, '_')
    }));
  };

  var getElasticsearchPrivileges = function getElasticsearchPrivileges() {
    return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_privileges2.ElasticsearchPrivileges, {
      role: role,
      editable: !isRoleReadOnly,
      indicesAPIClient: indicesAPIClient,
      onChange: onRoleChange,
      runAsUsers: runAsUsers,
      validator: validator,
      indexPatterns: indexPatternsTitles,
      builtinESPrivileges: builtInESPrivileges,
      license: license,
      docLinks: docLinks
    }));
  };

  var onRoleChange = function onRoleChange(newRole) {
    return setRole(newRole);
  };

  var getKibanaPrivileges = function getKibanaPrivileges() {
    return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_privileges2.KibanaPrivilegesRegion, {
      kibanaPrivileges: new _model2.KibanaPrivileges(kibanaPrivileges, features),
      spaces: spaces,
      spacesEnabled: spacesEnabled,
      uiCapabilities: uiCapabilities,
      canCustomizeSubFeaturePrivileges: license.getFeatures().allowSubFeaturePrivileges,
      editable: !isRoleReadOnly,
      role: role,
      onChange: onRoleChange,
      validator: validator
    }));
  };

  var getFormButtons = function getFormButtons() {
    if (isRoleReadOnly) {
      return getReturnToRoleListButton();
    }

    return _react2.default.createElement(_eui.EuiFlexGroup, {
      responsive: false
    }, _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, getSaveButton()), _react2.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, getCancelButton()), _react2.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }), getActionButton());
  };

  var getReturnToRoleListButton = function getReturnToRoleListButton() {
    return _react2.default.createElement(_eui.EuiButton, {
      onClick: backToRoleList,
      "data-test-subj": "roleFormReturnButton"
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.editRole.returnToRoleListButtonLabel",
      defaultMessage: "Return to role list"
    }));
  };

  var getSaveButton = function getSaveButton() {
    var saveText = isEditingExistingRole ? _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.editRole.updateRoleText",
      defaultMessage: "Update role"
    }) : _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.editRole.createRoleText",
      defaultMessage: "Create role"
    });
    return _react2.default.createElement(_eui.EuiButton, {
      "data-test-subj": "roleFormSaveButton",
      fill: true,
      onClick: saveRole,
      disabled: isRoleReserved
    }, saveText);
  };

  var getCancelButton = function getCancelButton() {
    return _react2.default.createElement(_eui.EuiButtonEmpty, {
      "data-test-subj": "roleFormCancelButton",
      onClick: backToRoleList
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.security.management.editRole.cancelButtonLabel",
      defaultMessage: "Cancel"
    }));
  };

  var saveRole =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              validator.enableValidation();
              result = validator.validateForSave(role);

              if (!result.isInvalid) {
                _context.next = 6;
                break;
              }

              setFormError(result);
              _context.next = 18;
              break;

            case 6:
              setFormError(null);
              _context.prev = 7;
              _context.next = 10;
              return rolesAPIClient.saveRole({
                role: role,
                spacesEnabled: spacesEnabled
              });

            case 10:
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](7);
              notifications.toasts.addDanger((0, _lodash.get)(_context.t0, 'data.message'));
              return _context.abrupt("return");

            case 16:
              notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.security.management.editRole.roleSuccessfullySavedNotificationMessage', {
                defaultMessage: 'Saved role'
              }));
              backToRoleList();

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 12]]);
    }));

    return function saveRole() {
      return _ref4.apply(this, arguments);
    };
  }();

  var handleDeleteRole =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return rolesAPIClient.deleteRole(role.name);

            case 3:
              _context2.next = 9;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              notifications.toasts.addDanger((0, _lodash.get)(_context2.t0, 'data.message'));
              return _context2.abrupt("return");

            case 9:
              notifications.toasts.addSuccess(_i18n.i18n.translate('xpack.security.management.editRole.roleSuccessfullyDeletedNotificationMessage', {
                defaultMessage: 'Deleted role'
              }));
              backToRoleList();

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 5]]);
    }));

    return function handleDeleteRole() {
      return _ref5.apply(this, arguments);
    };
  }();

  var description = spacesEnabled ? _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.security.management.editRole.setPrivilegesToKibanaSpacesDescription",
    defaultMessage: "Set privileges on your Elasticsearch data and control access to your Kibana spaces."
  }) : _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.security.management.editRole.setPrivilegesToKibanaDescription",
    defaultMessage: "Set privileges on your Elasticsearch data and control access to Kibana."
  });
  return _react2.default.createElement("div", {
    className: "editRolePage"
  }, _react2.default.createElement(_eui.EuiForm, formError, getFormTitle(), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, description), isRoleReserved && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react2.default.createElement("p", {
    id: "reservedRoleDescription",
    tabIndex: 0
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.security.management.editRole.modifyingReversedRolesDescription",
    defaultMessage: "Reserved roles are built-in and cannot be removed or modified."
  })))), isDeprecatedRole && _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiCallOut, {
    title: (0, _model.getExtendedRoleDeprecationNotice)(role),
    color: "warning",
    iconType: "alert"
  })), _react2.default.createElement(_eui.EuiSpacer, null), getRoleName(), getElasticsearchPrivileges(), getKibanaPrivileges(), _react2.default.createElement(_eui.EuiSpacer, null), getFormButtons()));
};

exports.EditRolePage = EditRolePage;