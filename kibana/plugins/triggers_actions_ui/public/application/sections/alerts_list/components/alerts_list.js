"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsList = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _alerts_context = require("../../../context/alerts_context");

var _app_context = require("../../../app_context");

var _alert_form = require("../../alert_form");

var _bulk_operation_popover = require("../../common/components/bulk_operation_popover");

var _alert_quick_edit_buttons = require("../../common/components/alert_quick_edit_buttons");

var _collapsed_item_actions = require("./collapsed_item_actions");

var _type_filter = require("./type_filter");

var _action_type_filter = require("./action_type_filter");

var _alert_api = require("../../../lib/alert_api");

var _action_connector_api = require("../../../lib/action_connector_api");

var _capabilities = require("../../../lib/capabilities");

var _constants = require("../../../constants");

var _delete_modal_confirmation = require("../../../components/delete_modal_confirmation");

var _empty_prompt = require("../../../components/prompts/empty_prompt");

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

var ENTER_KEY = 13;

var AlertsList = function AlertsList() {
  var history = (0, _reactRouterDom.useHistory)();

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      http = _useAppDependencies.http,
      toastNotifications = _useAppDependencies.toastNotifications,
      capabilities = _useAppDependencies.capabilities,
      alertTypeRegistry = _useAppDependencies.alertTypeRegistry,
      actionTypeRegistry = _useAppDependencies.actionTypeRegistry,
      uiSettings = _useAppDependencies.uiSettings,
      docLinks = _useAppDependencies.docLinks,
      charts = _useAppDependencies.charts,
      dataPlugin = _useAppDependencies.dataPlugin;

  var canDelete = (0, _capabilities.hasDeleteAlertsCapability)(capabilities);
  var canSave = (0, _capabilities.hasSaveAlertsCapability)(capabilities);

  var _useState = (0, _react2.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      actionTypes = _useState2[0],
      setActionTypes = _useState2[1];

  var _useState3 = (0, _react2.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedIds = _useState4[0],
      setSelectedIds = _useState4[1];

  var _useState5 = (0, _react2.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isPerformingAction = _useState6[0],
      setIsPerformingAction = _useState6[1];

  var _useState7 = (0, _react2.useState)({
    index: 0,
    size: _constants.DEFAULT_SEARCH_PAGE_SIZE
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      page = _useState8[0],
      setPage = _useState8[1];

  var _useState9 = (0, _react2.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      searchText = _useState10[0],
      setSearchText = _useState10[1];

  var _useState11 = (0, _react2.useState)(),
      _useState12 = _slicedToArray(_useState11, 2),
      inputText = _useState12[0],
      setInputText = _useState12[1];

  var _useState13 = (0, _react2.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      typesFilter = _useState14[0],
      setTypesFilter = _useState14[1];

  var _useState15 = (0, _react2.useState)([]),
      _useState16 = _slicedToArray(_useState15, 2),
      actionTypesFilter = _useState16[0],
      setActionTypesFilter = _useState16[1];

  var _useState17 = (0, _react2.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      alertFlyoutVisible = _useState18[0],
      setAlertFlyoutVisibility = _useState18[1];

  var _useState19 = (0, _react2.useState)({
    isLoading: false,
    isInitialized: false,
    data: {}
  }),
      _useState20 = _slicedToArray(_useState19, 2),
      alertTypesState = _useState20[0],
      setAlertTypesState = _useState20[1];

  var _useState21 = (0, _react2.useState)({
    isLoading: false,
    data: [],
    totalItemCount: 0
  }),
      _useState22 = _slicedToArray(_useState21, 2),
      alertsState = _useState22[0],
      setAlertsState = _useState22[1];

  var _useState23 = (0, _react2.useState)(undefined),
      _useState24 = _slicedToArray(_useState23, 2),
      editedAlertItem = _useState24[0],
      setEditedAlertItem = _useState24[1];

  var _useState25 = (0, _react2.useState)(false),
      _useState26 = _slicedToArray(_useState25, 2),
      editFlyoutVisible = _useState26[0],
      setEditFlyoutVisibility = _useState26[1];

  var _useState27 = (0, _react2.useState)([]),
      _useState28 = _slicedToArray(_useState27, 2),
      alertsToDelete = _useState28[0],
      setAlertsToDelete = _useState28[1];

  (0, _react2.useEffect)(function () {
    loadAlertsData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, typesFilter, actionTypesFilter]);
  (0, _react2.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var alertTypes, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, alertType;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setAlertTypesState(_objectSpread({}, alertTypesState, {
                isLoading: true
              }));
              _context.next = 4;
              return (0, _alert_api.loadAlertTypes)({
                http: http
              });

            case 4:
              alertTypes = _context.sent;
              index = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;

              for (_iterator = alertTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                alertType = _step.value;
                index[alertType.id] = alertType;
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
              setAlertTypesState({
                isLoading: false,
                data: index,
                isInitialized: true
              });
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.unableToLoadAlertTypesMessage', {
                  defaultMessage: 'Unable to load alert types'
                })
              });
              setAlertTypesState(_objectSpread({}, alertTypesState, {
                isLoading: false
              }));

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 28], [9, 13, 17, 25], [18,, 20, 24]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react2.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _action_connector_api.loadActionTypes)({
                http: http
              });

            case 3:
              result = _context2.sent;
              setActionTypes(result.filter(function (actionType) {
                return actionTypeRegistry.has(actionType.id);
              }));
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.unableToLoadActionTypesMessage', {
                  defaultMessage: 'Unable to load action types'
                })
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  function loadAlertsData() {
    return _loadAlertsData.apply(this, arguments);
  }

  function _loadAlertsData() {
    _loadAlertsData = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var alertsResponse;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setAlertsState(_objectSpread({}, alertsState, {
                isLoading: true
              }));
              _context5.prev = 1;
              _context5.next = 4;
              return (0, _alert_api.loadAlerts)({
                http: http,
                page: page,
                searchText: searchText,
                typesFilter: typesFilter,
                actionTypesFilter: actionTypesFilter
              });

            case 4:
              alertsResponse = _context5.sent;
              setAlertsState({
                isLoading: false,
                data: alertsResponse.data,
                totalItemCount: alertsResponse.total
              });
              _context5.next = 12;
              break;

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](1);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.unableToLoadAlertsMessage', {
                  defaultMessage: 'Unable to load alerts'
                })
              });
              setAlertsState(_objectSpread({}, alertsState, {
                isLoading: false
              }));

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 8]]);
    }));
    return _loadAlertsData.apply(this, arguments);
  }

  function editItem(_x) {
    return _editItem.apply(this, arguments);
  }

  function _editItem() {
    _editItem = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(alertTableItem) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              setEditedAlertItem(alertTableItem);
              setEditFlyoutVisibility(true);

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return _editItem.apply(this, arguments);
  }

  var alertsTableColumns = [{
    field: 'name',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.alertsListTable.columns.nameTitle', {
      defaultMessage: 'Name'
    }),
    sortable: false,
    truncateText: true,
    'data-test-subj': 'alertsTableCell-name',
    render: function render(name, alert) {
      return _react2.default.createElement(_eui.EuiLink, {
        title: name,
        onClick: function onClick() {
          history.push(_constants.routeToAlertDetails.replace(":alertId", alert.id));
        }
      }, name);
    }
  }, {
    field: 'tagsText',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.alertsListTable.columns.tagsText', {
      defaultMessage: 'Tags'
    }),
    sortable: false,
    'data-test-subj': 'alertsTableCell-tagsText'
  }, {
    field: 'alertType',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.alertsListTable.columns.alertTypeTitle', {
      defaultMessage: 'Type'
    }),
    sortable: false,
    truncateText: true,
    'data-test-subj': 'alertsTableCell-alertType'
  }, {
    field: 'schedule.interval',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.alertsListTable.columns.intervalTitle', {
      defaultMessage: 'Runs every'
    }),
    sortable: false,
    truncateText: false,
    'data-test-subj': 'alertsTableCell-interval'
  }, {
    name: '',
    width: '50px',
    render: function render(item) {
      if (!canSave || !alertTypeRegistry.has(item.alertTypeId)) {
        return;
      }

      return _react2.default.createElement(_eui.EuiLink, {
        "data-test-subj": "alertsTableCell-editLink",
        color: "primary",
        onClick: function onClick() {
          return editItem(item);
        }
      }, _react2.default.createElement(_react.FormattedMessage, {
        defaultMessage: "Edit",
        id: "xpack.triggersActionsUI.sections.alertsList.alertsListTable.columns.editLinkTitle"
      }));
    }
  }, {
    name: '',
    width: '40px',
    render: function render(item) {
      return _react2.default.createElement(_collapsed_item_actions.CollapsedItemActionsWithApi, {
        key: item.id,
        item: item,
        onAlertChanged: function onAlertChanged() {
          return loadAlertsData();
        },
        setAlertsToDelete: setAlertsToDelete
      });
    }
  }];
  var toolsRight = [_react2.default.createElement(_type_filter.TypeFilter, {
    key: "type-filter",
    onChange: function onChange(types) {
      return setTypesFilter(types);
    },
    options: Object.values(alertTypesState.data).map(function (alertType) {
      return {
        value: alertType.id,
        name: alertType.name
      };
    }).sort(function (a, b) {
      return a.name.localeCompare(b.name);
    })
  }), _react2.default.createElement(_action_type_filter.ActionTypeFilter, {
    key: "action-type-filter",
    actionTypes: actionTypes,
    onChange: function onChange(ids) {
      return setActionTypesFilter(ids);
    }
  })];

  if (canSave) {
    toolsRight.push(_react2.default.createElement(_eui.EuiButton, {
      key: "create-alert",
      "data-test-subj": "createAlertButton",
      fill: true,
      iconType: "plusInCircle",
      iconSide: "left",
      onClick: function onClick() {
        return setAlertFlyoutVisibility(true);
      }
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertsList.addActionButtonLabel",
      defaultMessage: "Create alert"
    })));
  }

  var table = _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, selectedIds.length > 0 && canDelete && _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_bulk_operation_popover.BulkOperationPopover, null, _react2.default.createElement(_alert_quick_edit_buttons.AlertQuickEditButtonsWithApi, {
    selectedItems: convertAlertsToTableItems(filterAlertsById(alertsState.data, selectedIds), alertTypesState.data),
    onPerformingAction: function onPerformingAction() {
      return setIsPerformingAction(true);
    },
    onActionPerformed: function onActionPerformed() {
      loadAlertsData();
      setIsPerformingAction(false);
    },
    setAlertsToDelete: setAlertsToDelete
  }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    "data-test-subj": "alertSearchField",
    prepend: _react2.default.createElement(_eui.EuiIcon, {
      type: "search"
    }),
    onChange: function onChange(e) {
      return setInputText(e.target.value);
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === ENTER_KEY) {
        setSearchText(inputText);
      }
    },
    placeholder: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.searchPlaceholderTitle', {
      defaultMessage: 'Search'
    })
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, toolsRight.map(function (tool, index) {
    return _react2.default.createElement(_eui.EuiFlexItem, {
      key: index,
      grow: false
    }, tool);
  })))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react2.default.createElement(_eui.EuiBasicTable, {
    loading: alertsState.isLoading || alertTypesState.isLoading || isPerformingAction
    /* Don't display alerts until we have the alert types initialized */
    ,
    items: alertTypesState.isInitialized === false ? [] : convertAlertsToTableItems(alertsState.data, alertTypesState.data),
    itemId: "id",
    columns: alertsTableColumns,
    rowProps: function rowProps() {
      return {
        'data-test-subj': 'alert-row'
      };
    },
    cellProps: function cellProps() {
      return {
        'data-test-subj': 'cell'
      };
    },
    "data-test-subj": "alertsList",
    pagination: {
      pageIndex: page.index,
      pageSize: page.size,

      /* Don't display alert count until we have the alert types initialized */
      totalItemCount: alertTypesState.isInitialized === false ? 0 : alertsState.totalItemCount
    },
    selection: canDelete ? {
      onSelectionChange: function onSelectionChange(updatedSelectedItemsList) {
        setSelectedIds(updatedSelectedItemsList.map(function (item) {
          return item.id;
        }));
      }
    } : undefined,
    onChange: function onChange(_ref3) {
      var changedPage = _ref3.page;
      setPage(changedPage);
    }
  }));

  var loadedItems = convertAlertsToTableItems(alertsState.data, alertTypesState.data);
  var isFilterApplied = !((0, _lodash.isEmpty)(searchText) && (0, _lodash.isEmpty)(typesFilter) && (0, _lodash.isEmpty)(actionTypesFilter));
  return _react2.default.createElement("section", {
    "data-test-subj": "alertsList"
  }, _react2.default.createElement(_delete_modal_confirmation.DeleteModalConfirmation, {
    onDeleted: function onDeleted(deleted) {
      if (selectedIds.length === 0 || selectedIds.length === deleted.length) {
        var updatedAlerts = alertsState.data.filter(function (alert) {
          return alert.id && !alertsToDelete.includes(alert.id);
        });
        setAlertsState({
          isLoading: false,
          data: updatedAlerts,
          totalItemCount: alertsState.totalItemCount - deleted.length
        });
        setSelectedIds([]);
      }

      setAlertsToDelete([]);
    },
    onErrors:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return loadAlertsData();

            case 2:
              setAlertsToDelete([]);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })),
    onCancel:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              setAlertsToDelete([]);

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })),
    apiDeleteCall: _alert_api.deleteAlerts,
    idsToDelete: alertsToDelete,
    singleTitle: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.singleTitle', {
      defaultMessage: 'alert'
    }),
    multipleTitle: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.multipleTitle', {
      defaultMessage: 'alerts'
    })
  }), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), loadedItems.length || isFilterApplied ? table : alertTypesState.isLoading || alertsState.isLoading ? _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }))) : _react2.default.createElement(_empty_prompt.EmptyPrompt, {
    onCTAClicked: function onCTAClicked() {
      return setAlertFlyoutVisibility(true);
    }
  }), _react2.default.createElement(_alerts_context.AlertsContextProvider, {
    value: {
      reloadAlerts: loadAlertsData,
      http: http,
      actionTypeRegistry: actionTypeRegistry,
      alertTypeRegistry: alertTypeRegistry,
      toastNotifications: toastNotifications,
      uiSettings: uiSettings,
      docLinks: docLinks,
      charts: charts,
      dataFieldsFormats: dataPlugin.fieldFormats
    }
  }, _react2.default.createElement(_alert_form.AlertAdd, {
    consumer: 'alerting',
    addFlyoutVisible: alertFlyoutVisible,
    setAddFlyoutVisibility: setAlertFlyoutVisibility
  }), editFlyoutVisible && editedAlertItem ? _react2.default.createElement(_alert_form.AlertEdit, {
    key: editedAlertItem.id,
    initialAlert: editedAlertItem,
    editFlyoutVisible: editFlyoutVisible,
    setEditFlyoutVisibility: setEditFlyoutVisibility
  }) : null));
};

exports.AlertsList = AlertsList;

function filterAlertsById(alerts, ids) {
  return alerts.filter(function (alert) {
    return ids.includes(alert.id);
  });
}

function convertAlertsToTableItems(alerts, alertTypesIndex) {
  return alerts.map(function (alert) {
    var _ref6, _alertTypesIndex$aler;

    return _objectSpread({}, alert, {
      tagsText: alert.tags.join(', '),
      alertType: (_ref6 = (_alertTypesIndex$aler = alertTypesIndex[alert.alertTypeId]) === null || _alertTypesIndex$aler === void 0 ? void 0 : _alertTypesIndex$aler.name) !== null && _ref6 !== void 0 ? _ref6 : alert.alertTypeId
    });
  });
}