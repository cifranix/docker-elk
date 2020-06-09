"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsConnectorsList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _app_context = require("../../../app_context");

var _action_connector_api = require("../../../lib/action_connector_api");

var _action_connector_form = require("../../action_connector_form");

var _capabilities = require("../../../lib/capabilities");

var _delete_modal_confirmation = require("../../../components/delete_modal_confirmation");

var _actions_connectors_context = require("../../../context/actions_connectors_context");

var _check_action_type_enabled = require("../../../lib/check_action_type_enabled");

require("./actions_connectors_list.scss");

var _empty_connectors_prompt = require("../../../components/prompts/empty_connectors_prompt");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionsConnectorsList = function ActionsConnectorsList() {
  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      http = _useAppDependencies.http,
      toastNotifications = _useAppDependencies.toastNotifications,
      capabilities = _useAppDependencies.capabilities,
      actionTypeRegistry = _useAppDependencies.actionTypeRegistry;

  var canDelete = (0, _capabilities.hasDeleteActionsCapability)(capabilities);
  var canSave = (0, _capabilities.hasSaveActionsCapability)(capabilities);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      actionTypesIndex = _useState2[0],
      setActionTypesIndex = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      actions = _useState4[0],
      setActions = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedItems = _useState8[0],
      setSelectedItems = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isLoadingActionTypes = _useState10[0],
      setIsLoadingActionTypes = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isLoadingActions = _useState12[0],
      setIsLoadingActions = _useState12[1];

  var _useState13 = (0, _react.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      editFlyoutVisible = _useState14[0],
      setEditFlyoutVisibility = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      addFlyoutVisible = _useState16[0],
      setAddFlyoutVisibility = _useState16[1];

  var _useState17 = (0, _react.useState)([]),
      _useState18 = _slicedToArray(_useState17, 2),
      actionTypesList = _useState18[0],
      setActionTypesList = _useState18[1];

  var _useState19 = (0, _react.useState)(undefined),
      _useState20 = _slicedToArray(_useState19, 2),
      editedConnectorItem = _useState20[0],
      setEditedConnectorItem = _useState20[1];

  var _useState21 = (0, _react.useState)([]),
      _useState22 = _slicedToArray(_useState21, 2),
      connectorsToDelete = _useState22[0],
      setConnectorsToDelete = _useState22[1];

  (0, _react.useEffect)(function () {
    loadActions(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var actionTypes, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, actionTypeItem;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoadingActionTypes(true);
              _context.next = 4;
              return (0, _action_connector_api.loadActionTypes)({
                http: http
              });

            case 4:
              actionTypes = _context.sent;
              index = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;

              for (_iterator = actionTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                actionTypeItem = _step.value;
                index[actionTypeItem.id] = actionTypeItem;
              }

              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](9);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 17:
              _context.prev = 17;
              _context.prev = 18;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 20:
              _context.prev = 20;

              if (!_didIteratorError) {
                _context.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return _context.finish(20);

            case 24:
              return _context.finish(17);

            case 25:
              setActionTypesIndex(index);
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.unableToLoadActionTypesMessage', {
                  defaultMessage: 'Unable to load action types'
                })
              });

            case 31:
              _context.prev = 31;
              setIsLoadingActionTypes(false);
              return _context.finish(31);

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 28, 31, 34], [9, 13, 17, 25], [18,, 20, 24]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react.useEffect)(function () {
    // Avoid flickering before action types load
    if (typeof actionTypesIndex === 'undefined') {
      return;
    } // Update the data for the table


    var updatedData = actions.map(function (action) {
      return _objectSpread({}, action, {
        actionType: actionTypesIndex[action.actionTypeId] ? actionTypesIndex[action.actionTypeId].name : action.actionTypeId
      });
    });
    setData(updatedData); // Update the action types list for the filter

    var actionTypes = Object.values(actionTypesIndex).map(function (actionType) {
      return {
        value: actionType.id,
        name: "".concat(actionType.name, " (").concat(getActionsCountByActionType(actions, actionType.id), ")")
      };
    }).sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    setActionTypesList(actionTypes);
  }, [actions, actionTypesIndex]);

  function loadActions() {
    return _loadActions.apply(this, arguments);
  }

  function _loadActions() {
    _loadActions = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var actionsResponse;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setIsLoadingActions(true);
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _action_connector_api.loadAllActions)({
                http: http
              });

            case 4:
              actionsResponse = _context4.sent;
              setActions(actionsResponse.data);
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.unableToLoadActionsMessage', {
                  defaultMessage: 'Unable to load connectors'
                })
              });

            case 11:
              _context4.prev = 11;
              setIsLoadingActions(false);
              return _context4.finish(11);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 8, 11, 14]]);
    }));
    return _loadActions.apply(this, arguments);
  }

  function editItem(_x) {
    return _editItem.apply(this, arguments);
  }

  function _editItem() {
    _editItem = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(connectorTableItem) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setEditedConnectorItem(connectorTableItem);
              setEditFlyoutVisibility(true);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _editItem.apply(this, arguments);
  }

  var actionsTableColumns = [{
    field: 'name',
    'data-test-subj': 'connectorsTableCell-name',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.nameTitle', {
      defaultMessage: 'Name'
    }),
    sortable: false,
    truncateText: true,
    render: function render(value, item) {
      var checkEnabledResult = (0, _check_action_type_enabled.checkActionTypeEnabled)(actionTypesIndex && actionTypesIndex[item.actionTypeId]);

      var link = _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "edit".concat(item.id),
        onClick: function onClick() {
          return editItem(item);
        },
        key: item.id,
        disabled: actionTypesIndex ? !actionTypesIndex[item.actionTypeId].enabled : true
      }, value);

      return checkEnabledResult.isEnabled ? link : _react.default.createElement(_react.Fragment, null, link, _react.default.createElement(_eui.EuiIconTip, {
        type: "questionInCircle",
        content: checkEnabledResult.message,
        position: "right"
      }));
    }
  }, {
    field: 'actionType',
    'data-test-subj': 'connectorsTableCell-actionType',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.actionTypeTitle', {
      defaultMessage: 'Type'
    }),
    sortable: false,
    truncateText: true
  }, {
    field: 'referencedByCount',
    'data-test-subj': 'connectorsTableCell-referencedByCount',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.referencedByCountTitle', {
      defaultMessage: 'Actions'
    }),
    sortable: false,
    truncateText: true,
    render: function render(value, item) {
      return _react.default.createElement(_eui.EuiBadge, {
        color: "hollow",
        key: item.id
      }, value);
    }
  }, {
    field: '',
    name: '',
    actions: [{
      enabled: function enabled() {
        return canDelete;
      },
      'data-test-subj': 'deleteConnector',
      name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.actions.deleteActionName', {
        defaultMessage: 'Delete'
      }),
      description: canDelete ? _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.actions.deleteActionDescription', {
        defaultMessage: 'Delete this connector'
      }) : _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.connectorsListTable.columns.actions.deleteActionDisabledDescription', {
        defaultMessage: 'Unable to delete connectors'
      }),
      type: 'icon',
      icon: 'trash',
      color: 'danger',
      onClick: function onClick(item) {
        return setConnectorsToDelete([item.id]);
      }
    }]
  }];

  var table = _react.default.createElement(_eui.EuiInMemoryTable, {
    loading: isLoadingActions || isLoadingActionTypes,
    items: data,
    sorting: true,
    itemId: "id",
    columns: actionsTableColumns,
    rowProps: function rowProps(item) {
      return {
        className: !actionTypesIndex || !actionTypesIndex[item.actionTypeId].enabled ? 'actConnectorsList__tableRowDisabled' : '',
        'data-test-subj': 'connectors-row'
      };
    },
    cellProps: function cellProps(item) {
      return {
        'data-test-subj': 'cell',
        className: !actionTypesIndex || !actionTypesIndex[item.actionTypeId].enabled ? 'actConnectorsList__tableCellDisabled' : ''
      };
    },
    "data-test-subj": "actionsTable",
    pagination: true,
    selection: canDelete ? {
      onSelectionChange: function onSelectionChange(updatedSelectedItemsList) {
        setSelectedItems(updatedSelectedItemsList);
      }
    } : undefined,
    search: {
      filters: [{
        type: 'field_value_selection',
        field: 'actionTypeId',
        name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.filters.actionTypeIdName', {
          defaultMessage: 'Type'
        }),
        multiSelect: 'or',
        options: actionTypesList
      }],
      toolsLeft: selectedItems.length === 0 || !canDelete ? [] : [_react.default.createElement(_eui.EuiButton, {
        key: "delete",
        iconType: "trash",
        color: "danger",
        "data-test-subj": "bulkDelete",
        onClick: function onClick() {
          setConnectorsToDelete(selectedItems.map(function (selected) {
            return selected.id;
          }));
        },
        title: canDelete ? undefined : _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.buttons.deleteDisabledTitle', {
          defaultMessage: 'Unable to delete connectors'
        })
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.actionsConnectorsList.buttons.deleteLabel",
        defaultMessage: "Delete {count}",
        values: {
          count: selectedItems.length
        }
      }))],
      toolsRight: [_react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "createActionButton",
        key: "create-action",
        fill: true,
        iconType: "plusInCircle",
        iconSide: "left",
        onClick: function onClick() {
          return setAddFlyoutVisibility(true);
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.actionsConnectorsList.addActionButtonLabel",
        defaultMessage: "Create connector"
      }))]
    }
  });

  var noPermissionPrompt = _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionsConnectorsList.noPermissionToCreateTitle",
    defaultMessage: "No permissions to create connector"
  }));

  return _react.default.createElement("section", {
    "data-test-subj": "actionsList"
  }, _react.default.createElement(_delete_modal_confirmation.DeleteModalConfirmation, {
    onDeleted: function onDeleted(deleted) {
      if (selectedItems.length === 0 || selectedItems.length === deleted.length) {
        var updatedActions = actions.filter(function (action) {
          return action.id && !connectorsToDelete.includes(action.id);
        });
        setActions(updatedActions);
        setSelectedItems([]);
      }

      setConnectorsToDelete([]);
    },
    onErrors:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return loadActions();

            case 2:
              setConnectorsToDelete([]);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })),
    onCancel:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setConnectorsToDelete([]);

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })),
    apiDeleteCall: _action_connector_api.deleteActions,
    idsToDelete: connectorsToDelete,
    singleTitle: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.singleTitle', {
      defaultMessage: 'connector'
    }),
    multipleTitle: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.multipleTitle', {
      defaultMessage: 'connectors'
    })
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), (isLoadingActions || isLoadingActionTypes) && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }))), data.length !== 0 && table, data.length === 0 && canSave && !isLoadingActions && !isLoadingActionTypes && _react.default.createElement(_empty_connectors_prompt.EmptyConnectorsPrompt, {
    onCTAClicked: function onCTAClicked() {
      return setAddFlyoutVisibility(true);
    }
  }), data.length === 0 && !canSave && noPermissionPrompt, _react.default.createElement(_actions_connectors_context.ActionsConnectorsContextProvider, {
    value: {
      actionTypeRegistry: actionTypeRegistry,
      http: http,
      capabilities: capabilities,
      toastNotifications: toastNotifications,
      reloadConnectors: loadActions
    }
  }, _react.default.createElement(_action_connector_form.ConnectorAddFlyout, {
    addFlyoutVisible: addFlyoutVisible,
    setAddFlyoutVisibility: setAddFlyoutVisibility
  }), editedConnectorItem ? _react.default.createElement(_action_connector_form.ConnectorEditFlyout, {
    key: editedConnectorItem.id,
    initialConnector: editedConnectorItem,
    editFlyoutVisible: editFlyoutVisible,
    setEditFlyoutVisibility: setEditFlyoutVisibility
  }) : null));
};

exports.ActionsConnectorsList = ActionsConnectorsList;

function getActionsCountByActionType(actions, actionTypeId) {
  return actions.filter(function (action) {
    return action.actionTypeId === actionTypeId;
  }).length;
}