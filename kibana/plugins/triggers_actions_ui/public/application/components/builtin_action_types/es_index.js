"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _get_time_options = require("../../../common/lib/get_time_options");

var _index_controls = require("../../../common/index_controls");

var _use_x_json_mode = require("../../lib/use_x_json_mode");

var _add_message_variables = require("../add_message_variables");

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

function getActionType() {
  return {
    id: '.index',
    iconClass: 'indexOpen',
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.selectMessageText', {
      defaultMessage: 'Index data into Elasticsearch.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.actionTypeTitle', {
      defaultMessage: 'Index data'
    }),
    validateConnector: function validateConnector(action) {
      var validationResult = {
        errors: {}
      };
      var errors = {
        index: new Array()
      };
      validationResult.errors = errors;

      if (!action.config.index) {
        errors.index.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.error.requiredIndexText', {
          defaultMessage: 'Index is required.'
        }));
      }

      return validationResult;
    },
    actionConnectorFields: IndexActionConnectorFields,
    actionParamsFields: IndexParamsFields,
    validateParams: function validateParams() {
      return {
        errors: {}
      };
    }
  };
}

var IndexActionConnectorFields = function IndexActionConnectorFields(_ref) {
  var action = _ref.action,
      editActionConfig = _ref.editActionConfig,
      errors = _ref.errors,
      http = _ref.http;
  var _action$config = action.config,
      index = _action$config.index,
      refresh = _action$config.refresh,
      executionTimeField = _action$config.executionTimeField;

  var _useState = (0, _react.useState)(executionTimeField != null),
      _useState2 = _slicedToArray(_useState, 2),
      hasTimeFieldCheckbox = _useState2[0],
      setTimeFieldCheckboxState = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      indexPatterns = _useState4[0],
      setIndexPatterns = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      indexOptions = _useState6[0],
      setIndexOptions = _useState6[1];

  var _useState7 = (0, _react.useState)([_index_controls.firstFieldOption]),
      _useState8 = _slicedToArray(_useState7, 2),
      timeFieldOptions = _useState8[0],
      setTimeFieldOptions = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isIndiciesLoading = _useState10[0],
      setIsIndiciesLoading = _useState10[1];

  (0, _react.useEffect)(function () {
    var indexPatternsFunction =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var currentEsFields, timeFields;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = setIndexPatterns;
                _context.next = 3;
                return (0, _index_controls.getIndexPatterns)();

              case 3:
                _context.t1 = _context.sent;
                (0, _context.t0)(_context.t1);

                if (!index) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return (0, _index_controls.getFields)(http, [index]);

              case 8:
                currentEsFields = _context.sent;
                timeFields = (0, _get_time_options.getTimeFieldOptions)(currentEsFields);
                setTimeFieldOptions([_index_controls.firstFieldOption].concat(_toConsumableArray(timeFields)));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function indexPatternsFunction() {
        return _ref2.apply(this, arguments);
      };
    }();

    indexPatternsFunction(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Write to index",
    id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.connectorSectionTitle"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormRow, {
    id: "indexConnectorSelectSearchBox",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.indicesToQueryLabel",
      defaultMessage: "Index"
    }),
    isInvalid: errors.index.length > 0 && index !== undefined,
    error: errors.index,
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.howToBroadenSearchQueryDescription",
      defaultMessage: "Use * to broaden your query."
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    singleSelection: {
      asPlainText: true
    },
    async: true,
    isLoading: isIndiciesLoading,
    isInvalid: errors.index.length > 0 && index !== undefined,
    noSuggestions: !indexOptions.length,
    options: indexOptions,
    "data-test-subj": "connectorIndexesComboBox",
    selectedOptions: index ? [{
      value: index,
      label: index
    }] : [],
    onChange:
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(selected) {
        var indices, currentEsFields, timeFields;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                editActionConfig('index', selected.length > 0 ? selected[0].value : '');
                indices = selected.map(function (s) {
                  return s.value;
                }); // reset time field and expression fields if indices are deleted

                if (!(indices.length === 0)) {
                  _context2.next = 5;
                  break;
                }

                setTimeFieldOptions([]);
                return _context2.abrupt("return");

              case 5:
                _context2.next = 7;
                return (0, _index_controls.getFields)(http, indices);

              case 7:
                currentEsFields = _context2.sent;
                timeFields = (0, _get_time_options.getTimeFieldOptions)(currentEsFields);
                setTimeFieldOptions([_index_controls.firstFieldOption].concat(_toConsumableArray(timeFields)));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(),
    onSearchChange:
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(search) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                setIsIndiciesLoading(true);
                _context3.t0 = setIndexOptions;
                _context3.next = 4;
                return (0, _index_controls.getIndexOptions)(http, search, indexPatterns);

              case 4:
                _context3.t1 = _context3.sent;
                (0, _context3.t0)(_context3.t1);
                setIsIndiciesLoading(false);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(),
    onBlur: function onBlur() {
      if (!index) {
        editActionConfig('index', '');
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiSwitch, {
    "data-test-subj": "indexRefreshCheckbox",
    checked: refresh || false,
    onChange: function onChange(e) {
      editActionConfig('refresh', e.target.checked);
    },
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.refreshLabel",
      defaultMessage: "Refresh index"
    }), ' ', _react.default.createElement(_eui.EuiIconTip, {
      position: "right",
      type: "questionInCircle",
      content: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.refreshTooltip', {
        defaultMessage: 'Refresh the affected shards to make this operation visible to search.'
      })
    }))
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiSwitch, {
    "data-test-subj": "hasTimeFieldCheckbox",
    checked: hasTimeFieldCheckbox || false,
    onChange: function onChange() {
      setTimeFieldCheckboxState(!hasTimeFieldCheckbox); // if changing from checked to not checked (hasTimeField === true),
      // set time field to null

      if (hasTimeFieldCheckbox) {
        editActionConfig('executionTimeField', null);
      }
    },
    label: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.defineTimeFieldLabel",
      defaultMessage: "Define time field for each document"
    }), _react.default.createElement(_eui.EuiIconTip, {
      position: "right",
      type: "questionInCircle",
      content: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.definedateFieldTooltip', {
        defaultMessage: "Automatically add a time field to each document when it's indexed."
      })
    }))
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), hasTimeFieldCheckbox ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "executionTimeField",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.indexAction.executionTimeFieldLabel",
      defaultMessage: "Time field"
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: timeFieldOptions,
    fullWidth: true,
    name: "executionTimeField",
    "data-test-subj": "executionTimeFieldSelect",
    value: executionTimeField !== null && executionTimeField !== void 0 ? executionTimeField : '',
    onChange: function onChange(e) {
      editActionConfig('executionTimeField', nullableString(e.target.value));
    },
    onBlur: function onBlur() {
      if (executionTimeField === undefined) {
        editActionConfig('executionTimeField', null);
      }
    }
  }))) : null);
};

var IndexParamsFields = function IndexParamsFields(_ref5) {
  var actionParams = _ref5.actionParams,
      index = _ref5.index,
      editAction = _ref5.editAction,
      messageVariables = _ref5.messageVariables;
  var documents = actionParams.documents;

  var _useXJsonMode = (0, _use_x_json_mode.useXJsonMode)(documents && documents.length > 0 ? documents[0] : null),
      xJsonMode = _useXJsonMode.xJsonMode,
      convertToJson = _useXJsonMode.convertToJson,
      setXJson = _useXJsonMode.setXJson,
      xJson = _useXJsonMode.xJson;

  var onSelectMessageVariable = function onSelectMessageVariable(variable) {
    var value = (xJson !== null && xJson !== void 0 ? xJson : '').concat(" {{".concat(variable, "}}"));
    setXJson(value); // Keep the documents in sync with the editor content

    onDocumentsChange(convertToJson(value));
  };

  function onDocumentsChange(updatedDocuments) {
    try {
      var documentsJSON = JSON.parse(updatedDocuments);
      editAction('documents', [documentsJSON], index); // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.documentsFieldLabel', {
      defaultMessage: 'Document to index'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable(variable);
      },
      paramsProperty: "documents"
    })
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: xJsonMode,
    width: "100%",
    height: "200px",
    theme: "github",
    "data-test-subj": "actionIndexDoc",
    "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.jsonDocAriaLabel', {
      defaultMessage: 'Code editor'
    }),
    value: xJson,
    onChange: function onChange(xjson) {
      setXJson(xjson); // Keep the documents in sync with the editor content

      onDocumentsChange(convertToJson(xjson));
    }
  })));
}; // if the string == null or is empty, return null, else return string


function nullableString(str) {
  if (str == null || str.trim() === '') return null;
  return str;
}