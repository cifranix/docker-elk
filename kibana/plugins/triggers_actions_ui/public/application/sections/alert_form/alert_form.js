"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBaseProperties = validateBaseProperties;
exports.AlertForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _Option = require("fp-ts/lib/Option");

var _pipeable = require("fp-ts/lib/pipeable");

var _parse_duration = require("../../../../../alerting/common/parse_duration");

var _alert_api = require("../../lib/alert_api");

var _action_variables = require("../../lib/action_variables");

var _get_time_options = require("../../../common/lib/get_time_options");

var _alerts_context = require("../../context/alerts_context");

var _action_form = require("../action_connector_form/action_form");

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

function validateBaseProperties(alertObject) {
  var validationResult = {
    errors: {}
  };
  var errors = {
    name: new Array(),
    interval: new Array(),
    alertTypeId: new Array(),
    actionConnectors: new Array()
  };
  validationResult.errors = errors;

  if (!alertObject.name) {
    errors.name.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.error.requiredNameText', {
      defaultMessage: 'Name is required.'
    }));
  }

  if (alertObject.schedule.interval.length < 2) {
    errors.interval.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.error.requiredIntervalText', {
      defaultMessage: 'Check interval is required.'
    }));
  }

  if (!alertObject.alertTypeId) {
    errors.alertTypeId.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.error.requiredAlertTypeIdText', {
      defaultMessage: 'Alert trigger is required.'
    }));
  }

  return validationResult;
}

var AlertForm = function AlertForm(_ref) {
  var alert = _ref.alert,
      _ref$canChangeTrigger = _ref.canChangeTrigger,
      canChangeTrigger = _ref$canChangeTrigger === void 0 ? true : _ref$canChangeTrigger,
      dispatch = _ref.dispatch,
      errors = _ref.errors,
      setHasActionsDisabled = _ref.setHasActionsDisabled;
  var alertsContext = (0, _alerts_context.useAlertsContext)();
  var http = alertsContext.http,
      toastNotifications = alertsContext.toastNotifications,
      alertTypeRegistry = alertsContext.alertTypeRegistry,
      actionTypeRegistry = alertsContext.actionTypeRegistry;

  var _useState = (0, _react.useState)(alert.alertTypeId ? alertTypeRegistry.get(alert.alertTypeId) : null),
      _useState2 = _slicedToArray(_useState, 2),
      alertTypeModel = _useState2[0],
      setAlertTypeModel = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      alertTypesIndex = _useState4[0],
      setAlertTypesIndex = _useState4[1];

  var _useState5 = (0, _react.useState)(alert.schedule.interval ? (0, _parse_duration.getDurationNumberInItsUnit)(alert.schedule.interval) : undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      alertInterval = _useState6[0],
      setAlertInterval = _useState6[1];

  var _useState7 = (0, _react.useState)(alert.schedule.interval ? (0, _parse_duration.getDurationUnitValue)(alert.schedule.interval) : 'm'),
      _useState8 = _slicedToArray(_useState7, 2),
      alertIntervalUnit = _useState8[0],
      setAlertIntervalUnit = _useState8[1];

  var _useState9 = (0, _react.useState)(alert.throttle ? (0, _parse_duration.getDurationNumberInItsUnit)(alert.throttle) : null),
      _useState10 = _slicedToArray(_useState9, 2),
      alertThrottle = _useState10[0],
      setAlertThrottle = _useState10[1];

  var _useState11 = (0, _react.useState)(alert.throttle ? (0, _parse_duration.getDurationUnitValue)(alert.throttle) : 'm'),
      _useState12 = _slicedToArray(_useState11, 2),
      alertThrottleUnit = _useState12[0],
      setAlertThrottleUnit = _useState12[1];

  var _useState13 = (0, _react.useState)(undefined),
      _useState14 = _slicedToArray(_useState13, 2),
      defaultActionGroupId = _useState14[0],
      setDefaultActionGroupId = _useState14[1]; // load alert types


  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var alertTypes, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, alertTypeItem;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _alert_api.loadAlertTypes)({
                http: http
              });

            case 3:
              alertTypes = _context.sent;
              index = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;

              for (_iterator = alertTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                alertTypeItem = _step.value;
                index[alertTypeItem.id] = alertTypeItem;
              }

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 16:
              _context.prev = 16;
              _context.prev = 17;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 19:
              _context.prev = 19;

              if (!_didIteratorError) {
                _context.next = 22;
                break;
              }

              throw _iteratorError;

            case 22:
              return _context.finish(19);

            case 23:
              return _context.finish(16);

            case 24:
              if (alert.alertTypeId && index[alert.alertTypeId]) {
                setDefaultActionGroupId(index[alert.alertTypeId].defaultActionGroupId);
              }

              setAlertTypesIndex(index);
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](0);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.unableToLoadAlertTypesMessage', {
                  defaultMessage: 'Unable to load alert types'
                })
              });

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 28], [8, 12, 16, 24], [17,, 19, 23]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var _setAlertProperty = function setAlertProperty(key, value) {
    dispatch({
      command: {
        type: 'setProperty'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var setAlertParams = function setAlertParams(key, value) {
    dispatch({
      command: {
        type: 'setAlertParams'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var setScheduleProperty = function setScheduleProperty(key, value) {
    dispatch({
      command: {
        type: 'setScheduleProperty'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var setActionProperty = function setActionProperty(key, value, index) {
    dispatch({
      command: {
        type: 'setAlertActionProperty'
      },
      payload: {
        key: key,
        value: value,
        index: index
      }
    });
  };

  var _setActionParamsProperty = function setActionParamsProperty(key, value, index) {
    dispatch({
      command: {
        type: 'setAlertActionParams'
      },
      payload: {
        key: key,
        value: value,
        index: index
      }
    });
  };

  var tagsOptions = alert.tags ? alert.tags.map(function (label) {
    return {
      label: label
    };
  }) : [];
  var AlertParamsExpressionComponent = alertTypeModel ? alertTypeModel.alertParamsExpression : null;
  var alertTypeNodes = alertTypeRegistry.list().map(function (item, index) {
    return _react.default.createElement(_eui.EuiKeyPadMenuItem, {
      key: index,
      "data-test-subj": "".concat(item.id, "-SelectOption"),
      label: item.name,
      onClick: function onClick() {
        _setAlertProperty('alertTypeId', item.id);

        setAlertTypeModel(item);

        _setAlertProperty('params', {});

        if (alertTypesIndex && alertTypesIndex[item.id]) {
          setDefaultActionGroupId(alertTypesIndex[item.id].defaultActionGroupId);
        }
      }
    }, _react.default.createElement(_eui.EuiIcon, {
      size: "xl",
      type: item.iconClass
    }));
  });

  var alertTypeDetails = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s",
    "data-test-subj": "selectedAlertTypeTitle"
  }, _react.default.createElement("h5", {
    id: "selectedAlertTypeTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "{alertType}",
    id: "xpack.triggersActionsUI.sections.alertForm.selectedAlertTypeTitle",
    values: {
      alertType: alertTypeModel ? alertTypeModel.name : ''
    }
  })))), canChangeTrigger ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "cross",
    color: "danger",
    "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.changeAlertTypeAriaLabel', {
      defaultMessage: 'Delete'
    }),
    onClick: function onClick() {
      _setAlertProperty('alertTypeId', null);

      setAlertTypeModel(null);

      _setAlertProperty('params', {});
    }
  })) : null), AlertParamsExpressionComponent ? _react.default.createElement(AlertParamsExpressionComponent, {
    alertParams: alert.params,
    alertInterval: "".concat(alertInterval !== null && alertInterval !== void 0 ? alertInterval : 1).concat(alertIntervalUnit),
    errors: errors,
    setAlertParams: setAlertParams,
    setAlertProperty: _setAlertProperty,
    alertsContext: alertsContext
  }) : null, defaultActionGroupId ? _react.default.createElement(_action_form.ActionForm, {
    actions: alert.actions,
    setHasActionsDisabled: setHasActionsDisabled,
    messageVariables: alertTypesIndex && alertTypesIndex[alert.alertTypeId] ? (0, _action_variables.actionVariablesFromAlertType)(alertTypesIndex[alert.alertTypeId]).map(function (av) {
      return av.name;
    }) : undefined,
    defaultActionGroupId: defaultActionGroupId,
    setActionIdByIndex: function setActionIdByIndex(id, index) {
      return setActionProperty('id', id, index);
    },
    setAlertProperty: function setAlertProperty(updatedActions) {
      return _setAlertProperty('actions', updatedActions);
    },
    setActionParamsProperty: function setActionParamsProperty(key, value, index) {
      return _setActionParamsProperty(key, value, index);
    },
    http: http,
    actionTypeRegistry: actionTypeRegistry,
    defaultActionMessage: alertTypeModel === null || alertTypeModel === void 0 ? void 0 : alertTypeModel.defaultActionMessage,
    toastNotifications: toastNotifications
  }) : null);

  var labelForAlertChecked = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertForm.checkFieldLabel",
    defaultMessage: "Check every"
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    type: "questionInCircle",
    content: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.checkWithTooltip', {
      defaultMessage: 'Define how often to evaluate the condition.'
    })
  }));

  var labelForAlertRenotify = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertForm.renotifyFieldLabel",
    defaultMessage: "Notify every"
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    type: "questionInCircle",
    content: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.renotifyWithTooltip', {
      defaultMessage: 'Define how often to repeat the action while the alert is active.'
    })
  }));

  return _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 2
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    id: "alertName",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertForm.alertNameLabel",
      defaultMessage: "Name"
    }),
    isInvalid: errors.name.length > 0 && alert.name !== undefined,
    error: errors.name
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    autoFocus: true,
    isInvalid: errors.name.length > 0 && alert.name !== undefined,
    compressed: true,
    name: "name",
    "data-test-subj": "alertNameInput",
    value: alert.name || '',
    onChange: function onChange(e) {
      _setAlertProperty('name', e.target.value);
    },
    onBlur: function onBlur() {
      if (!alert.name) {
        _setAlertProperty('name', '');
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionAdd.indexAction.indexTextFieldLabel', {
      defaultMessage: 'Tags (optional)'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    fullWidth: true,
    compressed: true,
    "data-test-subj": "tagsComboBox",
    selectedOptions: tagsOptions,
    onCreateOption: function onCreateOption(searchValue) {
      var newOptions = [].concat(_toConsumableArray(tagsOptions), [{
        label: searchValue
      }]);

      _setAlertProperty('tags', newOptions.map(function (newOption) {
        return newOption.label;
      }));
    },
    onChange: function onChange(selectedOptions) {
      _setAlertProperty('tags', selectedOptions.map(function (selectedOption) {
        return selectedOption.label;
      }));
    },
    onBlur: function onBlur() {
      if (!alert.tags) {
        _setAlertProperty('tags', []);
      }
    }
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 2
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    compressed: true,
    label: labelForAlertChecked,
    isInvalid: errors.interval.length > 0,
    error: errors.interval
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    isInvalid: errors.interval.length > 0,
    compressed: true,
    value: alertInterval || '',
    name: "interval",
    "data-test-subj": "intervalInput",
    onChange: function onChange(e) {
      var interval = e.target.value !== '' ? parseInt(e.target.value, 10) : undefined;
      setAlertInterval(interval);
      setScheduleProperty('interval', "".concat(e.target.value).concat(alertIntervalUnit));
    }
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    fullWidth: true,
    compressed: true,
    value: alertIntervalUnit,
    options: (0, _get_time_options.getTimeOptions)(alertInterval !== null && alertInterval !== void 0 ? alertInterval : 1),
    onChange: function onChange(e) {
      setAlertIntervalUnit(e.target.value);
      setScheduleProperty('interval', "".concat(alertInterval).concat(e.target.value));
    }
  }))))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: labelForAlertRenotify
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    fullWidth: true,
    min: 1,
    compressed: true,
    value: alertThrottle || '',
    name: "throttle",
    "data-test-subj": "throttleInput",
    onChange: function onChange(e) {
      (0, _pipeable.pipe)((0, _Option.some)(e.target.value.trim()), (0, _Option.filter)(function (value) {
        return value !== '';
      }), (0, _Option.map)(function (value) {
        return parseInt(value, 10);
      }), (0, _Option.filter)(function (value) {
        return !isNaN(value);
      }), (0, _Option.fold)(function () {
        // unset throttle
        setAlertThrottle(null);

        _setAlertProperty('throttle', null);
      }, function (throttle) {
        setAlertThrottle(throttle);

        _setAlertProperty('throttle', "".concat(throttle).concat(alertThrottleUnit));
      }));
    }
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    value: alertThrottleUnit,
    options: (0, _get_time_options.getTimeOptions)(alertThrottle !== null && alertThrottle !== void 0 ? alertThrottle : 1),
    onChange: function onChange(e) {
      setAlertThrottleUnit(e.target.value);

      if (alertThrottle) {
        _setAlertProperty('throttle', "".concat(alertThrottle).concat(e.target.value));
      }
    }
  })))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), alertTypeModel ? _react.default.createElement(_react.Fragment, null, alertTypeDetails) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", {
    id: "alertTypeTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Select a trigger type",
    id: "xpack.triggersActionsUI.sections.alertForm.selectAlertTypeTitle"
  }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    wrap: true
  }, alertTypeNodes)));
};

exports.AlertForm = AlertForm;