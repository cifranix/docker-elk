"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceConfigurationSettings = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _source = require("../../containers/source");

var _fields_configuration_panel = require("./fields_configuration_panel");

var _indices_configuration_panel = require("./indices_configuration_panel");

var _name_configuration_panel = require("./name_configuration_panel");

var _log_columns_configuration_panel = require("./log_columns_configuration_panel");

var _source_configuration_form_state = require("./source_configuration_form_state");

var _source_loading_page = require("../source_loading_page");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var SourceConfigurationSettings = function SourceConfigurationSettings(_ref) {
  var shouldAllowEdit = _ref.shouldAllowEdit,
      displaySettings = _ref.displaySettings;

  var _useContext = (0, _react2.useContext)(_source.Source.Context),
      createSourceConfiguration = _useContext.createSourceConfiguration,
      source = _useContext.source,
      sourceExists = _useContext.sourceExists,
      isLoading = _useContext.isLoading,
      isUninitialized = _useContext.isUninitialized,
      updateSourceConfiguration = _useContext.updateSourceConfiguration;

  var availableFields = (0, _react2.useMemo)(function () {
    return source && source.status ? source.status.indexFields.map(function (field) {
      return field.name;
    }) : [];
  }, [source]);

  var _useSourceConfigurati = (0, _source_configuration_form_state.useSourceConfigurationFormState)(source && source.configuration),
      addLogColumn = _useSourceConfigurati.addLogColumn,
      moveLogColumn = _useSourceConfigurati.moveLogColumn,
      indicesConfigurationProps = _useSourceConfigurati.indicesConfigurationProps,
      logColumnConfigurationProps = _useSourceConfigurati.logColumnConfigurationProps,
      errors = _useSourceConfigurati.errors,
      resetForm = _useSourceConfigurati.resetForm,
      isFormDirty = _useSourceConfigurati.isFormDirty,
      isFormValid = _useSourceConfigurati.isFormValid,
      formState = _useSourceConfigurati.formState,
      formStateChanges = _useSourceConfigurati.formStateChanges;

  var persistUpdates = (0, _react2.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!sourceExists) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return updateSourceConfiguration(formStateChanges);

          case 3:
            _context.next = 7;
            break;

          case 5:
            _context.next = 7;
            return createSourceConfiguration(formState);

          case 7:
            resetForm();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [sourceExists, updateSourceConfiguration, createSourceConfiguration, resetForm, formState, formStateChanges]);
  var isWriteable = (0, _react2.useMemo)(function () {
    return shouldAllowEdit && source && source.origin !== 'internal';
  }, [shouldAllowEdit, source]);

  if ((isLoading || isUninitialized) && !source) {
    return _react2.default.createElement(_source_loading_page.SourceLoadingPage, null);
  }

  if (!(source === null || source === void 0 ? void 0 : source.configuration)) {
    return null;
  }

  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiPage, null, _react2.default.createElement(_eui.EuiPageBody, {
    className: "eui-displayBlock",
    restrictWidth: true,
    "data-test-subj": "sourceConfigurationContent"
  }, _react2.default.createElement(_reactRouterDom.Prompt, {
    when: isFormDirty,
    message: _i18n.i18n.translate('xpack.infra.sourceConfiguration.unsavedFormPrompt', {
      defaultMessage: 'Are you sure you want to leave? Changes will be lost'
    })
  }), _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "l"
  }, _react2.default.createElement(_name_configuration_panel.NameConfigurationPanel, {
    isLoading: isLoading,
    nameFieldProps: indicesConfigurationProps.name,
    readOnly: !isWriteable
  })), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "l"
  }, _react2.default.createElement(_indices_configuration_panel.IndicesConfigurationPanel, {
    isLoading: isLoading,
    logAliasFieldProps: indicesConfigurationProps.logAlias,
    metricAliasFieldProps: indicesConfigurationProps.metricAlias,
    readOnly: !isWriteable,
    displaySettings: displaySettings
  })), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "l"
  }, _react2.default.createElement(_fields_configuration_panel.FieldsConfigurationPanel, {
    containerFieldProps: indicesConfigurationProps.containerField,
    hostFieldProps: indicesConfigurationProps.hostField,
    isLoading: isLoading,
    podFieldProps: indicesConfigurationProps.podField,
    readOnly: !isWriteable,
    tiebreakerFieldProps: indicesConfigurationProps.tiebreakerField,
    timestampFieldProps: indicesConfigurationProps.timestampField,
    displaySettings: displaySettings
  })), _react2.default.createElement(_eui.EuiSpacer, null), displaySettings === 'logs' && _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "l"
  }, _react2.default.createElement(_log_columns_configuration_panel.LogColumnsConfigurationPanel, {
    addLogColumn: addLogColumn,
    moveLogColumn: moveLogColumn,
    availableFields: availableFields,
    isLoading: isLoading,
    logColumnConfiguration: logColumnConfigurationProps
  })), errors.length > 0 ? _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiCallOut, {
    color: "danger"
  }, _react2.default.createElement("ul", null, errors.map(function (error, errorIndex) {
    return _react2.default.createElement("li", {
      key: errorIndex
    }, error);
  }))), _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })) : null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiFlexGroup, null, isWriteable && _react2.default.createElement(_eui.EuiFlexItem, null, isLoading ? _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    color: "primary",
    isLoading: true,
    fill: true
  }, "Loading"))) : _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    "data-test-subj": "discardSettingsButton",
    color: "danger",
    iconType: "cross",
    isDisabled: isLoading || !isFormDirty,
    onClick: function onClick() {
      resetForm();
    }
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.discardSettingsButtonLabel",
    defaultMessage: "Discard"
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    "data-test-subj": "applySettingsButton",
    color: "primary",
    isDisabled: !isFormDirty || !isFormValid,
    fill: true,
    onClick: persistUpdates
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.applySettingsButtonLabel",
    defaultMessage: "Apply"
  }))))))))));
};

exports.SourceConfigurationSettings = SourceConfigurationSettings;