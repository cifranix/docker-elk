"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _action_connector_api = require("../../lib/action_connector_api");

var _section_loading = require("../../components/section_loading");

var _connector_add_modal = require("./connector_add_modal");

var _action_type_compare = require("../../lib/action_type_compare");

var _check_action_type_enabled = require("../../lib/check_action_type_enabled");

var _constants = require("../../../common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionForm = function ActionForm(_ref) {
  var actions = _ref.actions,
      defaultActionGroupId = _ref.defaultActionGroupId,
      setActionIdByIndex = _ref.setActionIdByIndex,
      setAlertProperty = _ref.setAlertProperty,
      setActionParamsProperty = _ref.setActionParamsProperty,
      http = _ref.http,
      actionTypeRegistry = _ref.actionTypeRegistry,
      actionTypes = _ref.actionTypes,
      messageVariables = _ref.messageVariables,
      defaultActionMessage = _ref.defaultActionMessage,
      toastNotifications = _ref.toastNotifications,
      setHasActionsDisabled = _ref.setHasActionsDisabled;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      addModalVisible = _useState2[0],
      setAddModalVisibility = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      activeActionItem = _useState4[0],
      setActiveActionItem = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      isAddActionPanelOpen = _useState6[0],
      setIsAddActionPanelOpen = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      connectors = _useState8[0],
      setConnectors = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isLoadingConnectors = _useState10[0],
      setIsLoadingConnectors = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isLoadingActionTypes = _useState12[0],
      setIsLoadingActionTypes = _useState12[1];

  var _useState13 = (0, _react.useState)(undefined),
      _useState14 = _slicedToArray(_useState13, 2),
      actionTypesIndex = _useState14[0],
      setActionTypesIndex = _useState14[1];

  var _useState15 = (0, _react.useState)([]),
      _useState16 = _slicedToArray(_useState15, 2),
      emptyActionsIds = _useState16[0],
      setEmptyActionsIds = _useState16[1]; // load action types


  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var registeredActionTypes, _index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, actionTypeItem;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoadingActionTypes(true);

              if (!(actionTypes !== null && actionTypes !== void 0)) {
                _context.next = 6;
                break;
              }

              _context.t0 = actionTypes;
              _context.next = 9;
              break;

            case 6:
              _context.next = 8;
              return (0, _action_connector_api.loadActionTypes)({
                http: http
              });

            case 8:
              _context.t0 = _context.sent;

            case 9:
              _context.t1 = function (a, b) {
                return a.name.localeCompare(b.name);
              };

              registeredActionTypes = _context.t0.sort(_context.t1);
              _index = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 15;

              for (_iterator = registeredActionTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                actionTypeItem = _step.value;
                _index[actionTypeItem.id] = actionTypeItem;
              }

              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t2 = _context["catch"](15);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError) {
                _context.next = 29;
                break;
              }

              throw _iteratorError;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              setActionTypesIndex(_index);
              _context.next = 37;
              break;

            case 34:
              _context.prev = 34;
              _context.t3 = _context["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.unableToLoadActionTypesMessage', {
                  defaultMessage: 'Unable to load action types'
                })
              });

            case 37:
              _context.prev = 37;
              setIsLoadingActionTypes(false);
              return _context.finish(37);

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 34, 37, 40], [15, 19, 23, 31], [24,, 26, 30]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []); // load connectors

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var loadedConnectors;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setIsLoadingConnectors(true);
              _context2.next = 4;
              return (0, _action_connector_api.loadAllActions)({
                http: http
              });

            case 4:
              loadedConnectors = _context2.sent;
              setConnectors(loadedConnectors.data);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.unableToLoadActionsMessage', {
                  defaultMessage: 'Unable to load connectors'
                })
              });

            case 11:
              _context2.prev = 11;
              setIsLoadingConnectors(false);
              return _context2.finish(11);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8, 11, 14]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  (0, _react.useEffect)(function () {
    var setActionTypesAvalilability = function setActionTypesAvalilability() {
      var hasActionsDisabled = actions.some(function (action) {
        return actionTypesIndex && !actionTypesIndex[action.actionTypeId].enabled && !(0, _check_action_type_enabled.checkActionTypeEnabled)(actionTypesIndex[action.actionTypeId]).isEnabled;
      });

      if (setHasActionsDisabled) {
        setHasActionsDisabled(hasActionsDisabled);
      }
    };

    if (connectors.length > 0 && actionTypesIndex) {
      setActionTypesAvalilability();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [connectors, actionTypesIndex]);

  var getSelectedOptions = function getSelectedOptions(actionItemId) {
    var val = connectors.find(function (connector) {
      return connector.id === actionItemId;
    });

    if (!val) {
      return [];
    }

    return [{
      label: val.name,
      value: val.name,
      id: actionItemId,
      'data-test-subj': 'itemActionConnector'
    }];
  };

  var getActionTypeForm = function getActionTypeForm(actionItem, actionConnector, actionParamsErrors, index) {
    var optionsList = connectors.filter(function (connectorItem) {
      return connectorItem.actionTypeId === actionItem.actionTypeId;
    }).map(function (_ref4) {
      var name = _ref4.name,
          id = _ref4.id;
      return {
        label: "".concat(name),
        key: id,
        id: id
      };
    });
    var actionTypeRegistered = actionTypeRegistry.get(actionConnector.actionTypeId);
    if (!actionTypeRegistered || actionItem.group !== defaultActionGroupId) return null;
    var ParamsFieldsComponent = actionTypeRegistered.actionParamsFields;
    var checkEnabledResult = (0, _check_action_type_enabled.checkActionTypeEnabled)(actionTypesIndex && actionTypesIndex[actionConnector.actionTypeId]);
    var accordionContent = checkEnabledResult.isEnabled ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      component: "div"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
      fullWidth: true,
      label: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertForm.actionIdLabel",
        defaultMessage: "{connectorInstance} connector",
        values: {
          connectorInstance: actionTypesIndex ? actionTypesIndex[actionConnector.actionTypeId].name : actionConnector.actionTypeId
        }
      }),
      labelAppend: _react.default.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        "data-test-subj": "createActionConnectorButton",
        onClick: function onClick() {
          setActiveActionItem({
            actionTypeId: actionItem.actionTypeId,
            index: index
          });
          setAddModalVisibility(true);
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        defaultMessage: "Add new",
        id: "xpack.triggersActionsUI.sections.alertForm.addNewConnectorEmptyButton"
      }))
    }, _react.default.createElement(_eui.EuiComboBox, {
      fullWidth: true,
      singleSelection: {
        asPlainText: true
      },
      options: optionsList,
      id: "selectActionConnector-".concat(actionItem.id),
      "data-test-subj": "selectActionConnector",
      selectedOptions: getSelectedOptions(actionItem.id),
      onChange: function onChange(selectedOptions) {
        var _selectedOptions$0$id;

        setActionIdByIndex((_selectedOptions$0$id = selectedOptions[0].id) !== null && _selectedOptions$0$id !== void 0 ? _selectedOptions$0$id : '', index);
      },
      isClearable: false
    })))), _react.default.createElement(_eui.EuiSpacer, {
      size: "xl"
    }), ParamsFieldsComponent ? _react.default.createElement(ParamsFieldsComponent, {
      actionParams: actionItem.params,
      index: index,
      errors: actionParamsErrors.errors,
      editAction: setActionParamsProperty,
      messageVariables: messageVariables,
      defaultMessage: defaultActionMessage !== null && defaultActionMessage !== void 0 ? defaultActionMessage : undefined
    }) : null) : checkEnabledResult.messageCard;
    return _react.default.createElement(_eui.EuiAccordion, {
      initialIsOpen: true,
      key: index,
      id: index.toString(),
      className: "actAccordionActionForm",
      buttonContentClassName: "actAccordionActionForm__button",
      "data-test-subj": "alertActionAccordion-".concat(defaultActionGroupId),
      buttonContent: _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiIcon, {
        type: actionTypeRegistered.iconClass,
        size: "m"
      })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h5", null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_react2.FormattedMessage, {
        defaultMessage: "{actionConnectorName}",
        id: "xpack.triggersActionsUI.sections.alertForm.selectAlertActionTypeEditTitle",
        values: {
          actionConnectorName: actionConnector.name
        }
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, checkEnabledResult.isEnabled === false && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiIconTip, {
        type: "alert",
        color: "danger",
        content: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.actionDisabledTitle', {
          defaultMessage: 'This action is disabled'
        }),
        position: "right"
      })))))))),
      extraAction: _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "cross",
        color: "danger",
        className: "actAccordionActionForm__extraAction",
        "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.accordion.deleteIconAriaLabel', {
          defaultMessage: 'Delete'
        }),
        onClick: function onClick() {
          var updatedActions = actions.filter(function (_item, i) {
            return i !== index;
          });
          setAlertProperty(updatedActions);
          setIsAddActionPanelOpen(updatedActions.filter(function (item) {
            return item.id !== actionItem.id;
          }).length === 0);
          setActiveActionItem(undefined);
        }
      }),
      paddingSize: "l"
    }, accordionContent);
  };

  var getAddConnectorsForm = function getAddConnectorsForm(actionItem, index) {
    var actionTypeName = actionTypesIndex ? actionTypesIndex[actionItem.actionTypeId].name : actionItem.actionTypeId;
    var actionTypeRegistered = actionTypeRegistry.get(actionItem.actionTypeId);
    if (!actionTypeRegistered || actionItem.group !== defaultActionGroupId) return null;
    return _react.default.createElement(_eui.EuiAccordion, {
      initialIsOpen: true,
      key: index,
      id: index.toString(),
      className: "actAccordionActionForm",
      buttonContentClassName: "actAccordionActionForm__button",
      "data-test-subj": "alertActionAccordion-".concat(defaultActionGroupId),
      buttonContent: _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiIcon, {
        type: actionTypeRegistered.iconClass,
        size: "m"
      })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
        defaultMessage: "{actionConnectorName}",
        id: "xpack.triggersActionsUI.sections.alertForm.selectAlertActionTypeEditTitle",
        values: {
          actionConnectorName: actionTypeRegistered.actionTypeTitle
        }
      }))))),
      extraAction: _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "cross",
        color: "danger",
        className: "actAccordionActionForm__extraAction",
        "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.accordion.deleteIconAriaLabel', {
          defaultMessage: 'Delete'
        }),
        onClick: function onClick() {
          var updatedActions = actions.filter(function (_item, i) {
            return i !== index;
          });
          setAlertProperty(updatedActions);
          setIsAddActionPanelOpen(updatedActions.filter(function (item) {
            return item.id !== actionItem.id;
          }).length === 0);
          setActiveActionItem(undefined);
        }
      }),
      paddingSize: "l"
    }, _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: emptyActionsIds.find(function (emptyId) {
        return actionItem.id === emptyId;
      }) ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertForm.emptyConnectorsLabel",
        defaultMessage: "No {actionTypeName} connectors.",
        values: {
          actionTypeName: actionTypeName
        }
      }) : _react.default.createElement(_eui.EuiCallOut, {
        title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.unableToLoadConnectorTitle', {
          defaultMessage: 'Unable to load connector.'
        }),
        color: "warning"
      }),
      actions: [_react.default.createElement(_eui.EuiButton, {
        color: "primary",
        fill: true,
        "data-test-subj": "createActionConnectorButton",
        onClick: function onClick() {
          setActiveActionItem({
            actionTypeId: actionItem.actionTypeId,
            index: index
          });
          setAddModalVisibility(true);
        }
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertForm.addConnectorButtonLabel",
        defaultMessage: "Create a connector"
      }))]
    }));
  };

  function addActionType(actionTypeModel) {
    if (!defaultActionGroupId) {
      toastNotifications.addDanger({
        title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.unableToAddAction', {
          defaultMessage: 'Unable to add action, because default action group is not defined'
        })
      });
      return;
    }

    setIsAddActionPanelOpen(false);
    var actionTypeConnectors = connectors.filter(function (field) {
      return field.actionTypeId === actionTypeModel.id;
    });

    if (actionTypeConnectors.length > 0) {
      actions.push({
        id: '',
        actionTypeId: actionTypeModel.id,
        group: defaultActionGroupId,
        params: {}
      });
      setActionIdByIndex(actionTypeConnectors[0].id, actions.length - 1);
    }

    if (actionTypeConnectors.length === 0) {
      // if no connectors exists or all connectors is already assigned an action under current alert
      // set actionType as id to be able to create new connector within the alert form
      actions.push({
        id: '',
        actionTypeId: actionTypeModel.id,
        group: defaultActionGroupId,
        params: {}
      });
      setActionIdByIndex(actions.length.toString(), actions.length - 1);
      setEmptyActionsIds([].concat(_toConsumableArray(emptyActionsIds), [actions.length.toString()]));
    }
  }

  var actionTypeNodes = null;
  var hasDisabledByLicenseActionTypes = false;

  if (actionTypesIndex) {
    actionTypeNodes = actionTypeRegistry.list().filter(function (item) {
      return actionTypesIndex[item.id] && actionTypesIndex[item.id].enabledInConfig === true;
    }).sort(function (a, b) {
      return (0, _action_type_compare.actionTypeCompare)(actionTypesIndex[a.id], actionTypesIndex[b.id]);
    }).map(function (item, index) {
      var actionType = actionTypesIndex[item.id];
      var checkEnabledResult = (0, _check_action_type_enabled.checkActionTypeEnabled)(actionTypesIndex[item.id]);

      if (!actionType.enabledInLicense) {
        hasDisabledByLicenseActionTypes = true;
      }

      var keyPadItem = _react.default.createElement(_eui.EuiKeyPadMenuItem, {
        key: index,
        isDisabled: !checkEnabledResult.isEnabled,
        "data-test-subj": "".concat(item.id, "-ActionTypeSelectOption"),
        label: actionTypesIndex[item.id].name,
        onClick: function onClick() {
          return addActionType(item);
        }
      }, _react.default.createElement(_eui.EuiIcon, {
        size: "xl",
        type: item.iconClass
      }));

      return _react.default.createElement(_react.Fragment, {
        key: "keypad-".concat(item.id)
      }, checkEnabledResult.isEnabled && keyPadItem, checkEnabledResult.isEnabled === false && _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: checkEnabledResult.message
      }, keyPadItem));
    });
  }

  var alertActionsList = actions.map(function (actionItem, index) {
    var _actionTypeRegistry$g;

    var actionConnector = connectors.find(function (field) {
      return field.id === actionItem.id;
    }); // connectors doesn't exists

    if (!actionConnector) {
      return getAddConnectorsForm(actionItem, index);
    }

    var actionErrors = (_actionTypeRegistry$g = actionTypeRegistry.get(actionItem.actionTypeId)) === null || _actionTypeRegistry$g === void 0 ? void 0 : _actionTypeRegistry$g.validateParams(actionItem.params);
    return getActionTypeForm(actionItem, actionConnector, actionErrors, index);
  });
  return _react.default.createElement(_react.Fragment, null, isLoadingConnectors ? _react.default.createElement(_section_loading.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertForm.loadingConnectorsDescription",
    defaultMessage: "Loading connectors\u2026"
  })) : _react.default.createElement(_react.Fragment, null, alertActionsList, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), isAddActionPanelOpen === false ? _react.default.createElement(_eui.EuiButton, {
    iconType: "plusInCircle",
    "data-test-subj": "addAlertActionButton",
    onClick: function onClick() {
      return setIsAddActionPanelOpen(true);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertForm.addActionButtonLabel",
    defaultMessage: "Add action"
  })) : null, isAddActionPanelOpen ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    id: "alertActionTypeTitle",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Actions: Select an action type",
    id: "xpack.triggersActionsUI.sections.alertForm.selectAlertActionTypeTitle"
  })))), hasDisabledByLicenseActionTypes && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h5", null, _react.default.createElement(_eui.EuiLink, {
    href: _constants.VIEW_LICENSE_OPTIONS_LINK,
    target: "_blank",
    className: "actActionForm__getMoreActionsLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Get more actions",
    id: "xpack.triggersActionsUI.sections.actionForm.getMoreActionsTitle"
  })))))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    wrap: true
  }, isLoadingActionTypes ? _react.default.createElement(_section_loading.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertForm.loadingActionTypesDescription",
    defaultMessage: "Loading action types\u2026"
  })) : actionTypeNodes)) : null), actionTypesIndex && activeActionItem ? _react.default.createElement(_connector_add_modal.ConnectorAddModal, {
    key: activeActionItem.index,
    actionType: actionTypesIndex[activeActionItem.actionTypeId],
    addModalVisible: addModalVisible,
    setAddModalVisibility: setAddModalVisibility,
    postSaveEventHandler: function postSaveEventHandler(savedAction) {
      connectors.push(savedAction);
      setActionIdByIndex(savedAction.id, activeActionItem.index);
    },
    actionTypeRegistry: actionTypeRegistry,
    http: http,
    toastNotifications: toastNotifications
  }) : null);
};

exports.ActionForm = ActionForm;