"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonWatchEditSimulate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _watch_history_item = require("../../../../models/watch_history_item");

var _constants = require("../../../../../../common/constants");

var _execute_details = require("../../../../models/execute_details");

var _form_errors = require("../../../../components/form_errors");

var _api = require("../../../../lib/api");

var _watch_context = require("../../watch_context");

var _json_watch_edit_simulate_results = require("./json_watch_edit_simulate_results");

var _get_time_unit_label = require("../../../../lib/get_time_unit_label");

var _app_context = require("../../../../app_context");

var _use_x_json_mode = require("./use_x_json_mode");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var actionModeOptions = Object.keys(_constants.ACTION_MODES).map(function (mode) {
  return {
    text: _constants.ACTION_MODES[mode],
    value: _constants.ACTION_MODES[mode]
  };
});

var getScheduleTimeOptions = function getScheduleTimeOptions() {
  var unitSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
  return Object.entries(_constants.TIME_UNITS).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];

    return key !== _constants.TIME_UNITS.DAY;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        _key = _ref4[0],
        value = _ref4[1];

    return {
      text: (0, _get_time_unit_label.getTimeUnitLabel)(value, unitSize),
      value: value
    };
  });
};

var JsonWatchEditSimulate = function JsonWatchEditSimulate(_ref5) {
  var executeWatchErrors = _ref5.executeWatchErrors,
      hasExecuteWatchErrors = _ref5.hasExecuteWatchErrors,
      executeDetails = _ref5.executeDetails,
      setExecuteDetails = _ref5.setExecuteDetails,
      watchActions = _ref5.watchActions;

  var _useAppContext = (0, _app_context.useAppContext)(),
      executeWatchApiUrl = _useAppContext.links.executeWatchApiUrl;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch; // hooks


  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      executeResults = _useState2[0],
      setExecuteResults = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isExecuting = _useState4[0],
      setIsExecuting = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      executeResultsError = _useState6[0],
      setExecuteResultsError = _useState6[1];

  var _watch$validate = watch.validate(),
      watchErrors = _watch$validate.errors;

  var hasWatchJsonError = watchErrors.json.length >= 1;
  var actionModes = executeDetails.actionModes,
      scheduledTimeValue = executeDetails.scheduledTimeValue,
      scheduledTimeUnit = executeDetails.scheduledTimeUnit,
      triggeredTimeValue = executeDetails.triggeredTimeValue,
      alternativeInput = executeDetails.alternativeInput,
      ignoreCondition = executeDetails.ignoreCondition;

  var _useXJsonMode = (0, _use_x_json_mode.useXJsonMode)(alternativeInput),
      setXJson = _useXJsonMode.setXJson,
      convertToJson = _useXJsonMode.convertToJson,
      xJsonMode = _useXJsonMode.xJsonMode,
      xJson = _useXJsonMode.xJson;

  var columns = [{
    field: 'actionId',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.table.idColumnLabel', {
      defaultMessage: 'ID'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: 'type',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.table.typeColumnLabel', {
      defaultMessage: 'Type'
    }),
    truncateText: true
  }, {
    field: 'actionMode',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.table.modeColumnLabel', {
      defaultMessage: 'Mode'
    }),
    render: function render(_ref6, row) {
      _objectDestructuringEmpty(_ref6);

      return _react.default.createElement(_eui.EuiSelect, {
        options: actionModeOptions,
        value: actionModes[row.actionId],
        "data-test-subj": "actionModesSelect",
        onChange: function onChange(e) {
          setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
            actionModes: _objectSpread({}, actionModes, _defineProperty({}, row.actionId, e.target.value))
          })));
        },
        "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.table.modeSelectLabel', {
          defaultMessage: 'Action modes'
        })
      });
    }
  }];
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_json_watch_edit_simulate_results.JsonWatchEditSimulateResults, {
    executeResults: executeResults,
    executeDetails: executeDetails,
    error: executeResultsError,
    onCloseFlyout: function onCloseFlyout() {
      setExecuteResults(null);
      setExecuteResultsError(null);
    }
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.pageDescription', {
    defaultMessage: 'Use the simulator to override the watch schedule, condition, actions, and input results.'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiForm, {
    "data-test-subj": "jsonWatchSimulateForm"
  }, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.triggerOverridesTitle', {
      defaultMessage: 'Trigger'
    })),
    description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.triggerOverridesDescription', {
      defaultMessage: 'Set the time and date for starting the watch.'
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.scheduledTimeFieldLabel', {
      defaultMessage: 'Schedule every'
    })
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    value: scheduledTimeValue == null || scheduledTimeValue === '' ? scheduledTimeValue : parseInt(scheduledTimeValue, 10),
    min: 0,
    "data-test-subj": "scheduledTimeInput",
    onChange: function onChange(e) {
      var value = e.target.value;
      setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
        scheduledTimeValue: value === '' ? value : parseInt(value, 10)
      })));
    }
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSelect, {
    value: scheduledTimeUnit,
    options: getScheduleTimeOptions(scheduledTimeValue),
    onChange: function onChange(e) {
      setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
        scheduledTimeUnit: e.target.value
      })));
    }
  })))), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.triggeredTimeFieldLabel', {
      defaultMessage: 'Trigger after'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: triggeredTimeValue == null || triggeredTimeValue === '' ? triggeredTimeValue : parseInt(triggeredTimeValue, 10),
    min: 0,
    "data-test-subj": "triggeredTimeInput",
    append: _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, (0, _get_time_unit_label.getTimeUnitLabel)(_constants.TIME_UNITS.SECOND, triggeredTimeValue)),
    onChange: function onChange(e) {
      var value = e.target.value;
      setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
        triggeredTimeValue: value === '' ? value : parseInt(value, 10),
        triggeredTimeUnit: _constants.TIME_UNITS.SECOND
      })));
    }
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.conditionOverridesTitle', {
      defaultMessage: 'Condition'
    })),
    description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.conditionOverridesDescription', {
      defaultMessage: 'Execute the watch when the condition is met. Otherwise, ignore the condition and run the watch on a fixed schedule.'
    })
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.ignoreConditionFieldLabel', {
      defaultMessage: 'Ignore condition'
    }),
    checked: ignoreCondition,
    "data-test-subj": "ignoreConditionSwitch",
    onChange: function onChange(e) {
      setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
        ignoreCondition: e.target.checked
      })));
    }
  })), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.actionOverridesTitle', {
      defaultMessage: 'Actions'
    })),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.simulate.form.actionOverridesDescription",
      defaultMessage: "Allow the watch to execute or skip actions. {actionsLink}",
      values: {
        actionsLink: _react.default.createElement(_eui.EuiLink, {
          href: executeWatchApiUrl,
          target: "_blank"
        }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.actionOverridesDescription.linkLabel', {
          defaultMessage: 'Learn about actions.'
        }))
      }
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.actionModesFieldLabel', {
      defaultMessage: 'Action modes'
    }),
    fullWidth: true
  }, _react.default.createElement(_eui.EuiBasicTable, {
    items: watchActions,
    itemId: "simulateExecutionActionModesTable",
    columns: columns
  }))), _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.inputOverridesTitle', {
      defaultMessage: 'Input'
    })),
    description: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.inputOverridesDescription', {
      defaultMessage: 'Enter JSON data to override the watch payload that comes from running the input.'
    })
  }, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "executeWatchJson",
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.alternativeInputFieldLabel', {
      defaultMessage: 'Alternative input'
    }),
    errorKey: "json",
    isShowingErrors: hasExecuteWatchErrors,
    fullWidth: true,
    errors: executeWatchErrors
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: xJsonMode,
    width: "100%",
    height: "200px",
    theme: "textmate",
    "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.alternativeInputAriaLabel', {
      defaultMessage: 'Code editor'
    }),
    value: xJson,
    onChange: function onChange(xjson) {
      setXJson(xjson);
      setExecuteDetails(new _execute_details.ExecuteDetails(_objectSpread({}, executeDetails, {
        alternativeInput: convertToJson(xjson)
      })));
    }
  }))), _react.default.createElement(_eui.EuiButton, {
    iconType: "play",
    "data-test-subj": "simulateWatchButton",
    fill: true,
    type: "submit",
    isLoading: isExecuting,
    isDisabled: hasExecuteWatchErrors || hasWatchJsonError,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref8, data, error, formattedResults;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsExecuting(true);
              _context.next = 3;
              return (0, _api.executeWatch)(executeDetails, watch);

            case 3:
              _ref8 = _context.sent;
              data = _ref8.data;
              error = _ref8.error;
              setIsExecuting(false);

              if (!error) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", setExecuteResultsError(error));

            case 9:
              formattedResults = _watch_history_item.WatchHistoryItem.fromUpstreamJson(data.watchHistoryItem);
              setExecuteResults(formattedResults);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.simulate.form.saveButtonLabel', {
    defaultMessage: 'Simulate watch'
  }))));
};

exports.JsonWatchEditSimulate = JsonWatchEditSimulate;