"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchActionsAccordion = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _action = require("../../../../models/action");

var _watch_history_item = require("../../../../models/watch_history_item");

var _threshold_watch = require("../../../../models/watch/threshold_watch");

var _execute_details = require("../../../../models/execute_details");

var _constants = require("../../../../../../common/constants");

var _watch_context = require("../../watch_context");

var _action_fields = require("./action_fields");

var _api = require("../../../../lib/api");

var _components = require("../../../../components");

var _app_context = require("../../../../app_context");

var _actionFieldsComponen;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionFieldsComponentMap = (_actionFieldsComponen = {}, _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.LOGGING, _action_fields.LoggingActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.SLACK, _action_fields.SlackActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.EMAIL, _action_fields.EmailActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.INDEX, _action_fields.IndexActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.WEBHOOK, _action_fields.WebhookActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.PAGERDUTY, _action_fields.PagerDutyActionFields), _defineProperty(_actionFieldsComponen, _constants.ACTION_TYPES.JIRA, _action_fields.JiraActionFields), _actionFieldsComponen);

var WatchActionsAccordion = function WatchActionsAccordion(_ref) {
  var settings = _ref.settings,
      actionErrors = _ref.actionErrors;

  var _useAppContext = (0, _app_context.useAppContext)(),
      watchActionsConfigurationMap = _useAppContext.links.watchActionsConfigurationMap,
      toasts = _useAppContext.toasts;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch,
      setWatchProperty = _useContext.setWatchProperty;

  var actions = watch.actions;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      isExecuting = _useState2[0],
      setIsExecuting = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      executeResultsError = _useState4[0],
      setExecuteResultsError = _useState4[1];

  if (actions && actions.length >= 1) {
    return actions.map(function (action) {
      var FieldsComponent = actionFieldsComponentMap[action.type];
      var errors = actionErrors[action.id];
      var hasErrors = !!Object.keys(errors).find(function (errorKey) {
        return errors[errorKey].length >= 1;
      });
      return _react.default.createElement(_eui.EuiAccordion, {
        initialIsOpen: action.isNew || hasErrors // If an action contains errors in edit mode, we want the accordion open so the user is aware
        ,
        key: action.id,
        id: action.id,
        className: "euiAccordionForm",
        buttonContentClassName: "euiAccordionForm__button",
        "data-test-subj": "watchActionAccordion",
        buttonContent: _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "s",
          alignItems: "center"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiIcon, {
          type: action.iconClass,
          size: "m"
        })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
          size: "s",
          className: "euiAccordionForm__title"
        }, _react.default.createElement("h6", null, action.typeName)))),
        extraAction: _react.default.createElement(_eui.EuiButtonIcon, {
          iconType: "cross",
          color: "danger",
          className: "euiAccordionForm__extraAction",
          "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.accordion.deleteIconAriaLabel', {
            defaultMessage: 'Delete'
          }),
          onClick: function onClick() {
            var updatedActions = actions.filter(function (actionItem) {
              return actionItem.id !== action.id;
            });
            setWatchProperty('actions', updatedActions);
          }
        }),
        paddingSize: "l"
      }, executeResultsError && executeResultsError[action.id] && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_components.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.watcher.sections.watchEdit.threshold.accordion.simulateResultsErrorTitle",
          defaultMessage: "Error testing action"
        }),
        error: executeResultsError[action.id]
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      })), _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(FieldsComponent, {
        action: action,
        errors: errors,
        hasErrors: hasErrors,
        editAction: function editAction(changedProperty) {
          var updatedActions = actions.map(function (actionItem) {
            if (actionItem.id === action.id) {
              var ActionTypes = _action.Action.getActionTypes();

              var ActionTypeModel = ActionTypes[action.type];
              var _key = changedProperty.key,
                  value = changedProperty.value;
              return new ActionTypeModel(_objectSpread({}, action, _defineProperty({}, _key, value)));
            }

            return actionItem;
          });
          setWatchProperty('actions', updatedActions);
        }
      }, settings && settings.actionTypes[action.type].enabled === false ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
        title: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.actions.actionConfigurationWarningTitleText', {
          defaultMessage: 'Account may not be configured'
        }),
        color: "warning",
        iconType: "help"
      }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.threshold.actions.actionConfigurationWarningDescriptionText",
        defaultMessage: "To create this action, you must configure at least one {accountType} account. {docLink}",
        values: {
          accountType: action.typeName,
          docLink: _react.default.createElement(_eui.EuiLink, {
            href: watchActionsConfigurationMap[action.type],
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.watcher.sections.watchEdit.threshold.actions.actionConfigurationWarningHelpLinkText",
            defaultMessage: "Learn more."
          }))
        }
      })))), _react.default.createElement(_eui.EuiSpacer, null)) : null), _react.default.createElement(_eui.EuiButton, {
        type: "submit",
        isDisabled: hasErrors,
        isLoading: isExecuting[action.id],
        "data-test-subj": "simulateActionButton",
        onClick:
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var selectedWatchAction, executeDetails, newExecuteWatch, _ref3, data, error, formattedResults, actionStatuses, actionStatus, message;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  selectedWatchAction = watch.actions.filter(function (watchAction) {
                    return watchAction.id === action.id;
                  });
                  executeDetails = new _execute_details.ExecuteDetails({
                    ignoreCondition: true,
                    recordExecution: false,
                    actionModes: _defineProperty({}, action.id, _constants.ACTION_MODES.FORCE_EXECUTE)
                  });
                  newExecuteWatch = new _threshold_watch.ThresholdWatch(_objectSpread({}, watch, {
                    actions: selectedWatchAction
                  }));
                  setIsExecuting(_defineProperty({}, action.id, true));
                  setExecuteResultsError(null);
                  _context.next = 7;
                  return (0, _api.executeWatch)(executeDetails, newExecuteWatch);

                case 7:
                  _ref3 = _context.sent;
                  data = _ref3.data;
                  error = _ref3.error;
                  setIsExecuting(_defineProperty({}, action.id, false));

                  if (!error) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt("return", setExecuteResultsError(_defineProperty({}, action.id, error)));

                case 13:
                  formattedResults = _watch_history_item.WatchHistoryItem.fromUpstreamJson(data.watchHistoryItem);
                  actionStatuses = formattedResults.watchStatus.actionStatuses;
                  actionStatus = actionStatuses.find(function (actionItem) {
                    return actionItem.id === action.id;
                  });

                  if (!(actionStatus && actionStatus.lastExecutionSuccessful === false)) {
                    _context.next = 19;
                    break;
                  }

                  message = actionStatus.lastExecutionReason || action.simulateFailMessage;
                  return _context.abrupt("return", toasts.addDanger(message));

                case 19:
                  return _context.abrupt("return", toasts.addSuccess(action.simulateMessage));

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))
      }, action.simulatePrompt)));
    });
  }

  return null;
};

exports.WatchActionsAccordion = WatchActionsAccordion;