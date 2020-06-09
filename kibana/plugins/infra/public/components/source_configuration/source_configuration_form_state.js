"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSourceConfigurationFormState = void 0;

var _react = require("react");

var _indices_configuration_form_state = require("./indices_configuration_form_state");

var _log_columns_configuration_form_state = require("./log_columns_configuration_form_state");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useSourceConfigurationFormState = function useSourceConfigurationFormState(configuration) {
  var indicesConfigurationFormState = (0, _indices_configuration_form_state.useIndicesConfigurationFormState)({
    initialFormState: (0, _react.useMemo)(function () {
      return configuration ? {
        name: configuration.name,
        description: configuration.description,
        logAlias: configuration.logAlias,
        metricAlias: configuration.metricAlias,
        containerField: configuration.fields.container,
        hostField: configuration.fields.host,
        messageField: configuration.fields.message,
        podField: configuration.fields.pod,
        tiebreakerField: configuration.fields.tiebreaker,
        timestampField: configuration.fields.timestamp
      } : undefined;
    }, [configuration])
  });
  var logColumnsConfigurationFormState = (0, _log_columns_configuration_form_state.useLogColumnsConfigurationFormState)({
    initialFormState: (0, _react.useMemo)(function () {
      return configuration ? {
        logColumns: configuration.logColumns
      } : undefined;
    }, [configuration])
  });
  var errors = (0, _react.useMemo)(function () {
    return [].concat(_toConsumableArray(indicesConfigurationFormState.errors), _toConsumableArray(logColumnsConfigurationFormState.errors));
  }, [indicesConfigurationFormState.errors, logColumnsConfigurationFormState.errors]);
  var resetForm = (0, _react.useCallback)(function () {
    indicesConfigurationFormState.resetForm();
    logColumnsConfigurationFormState.resetForm();
  }, [indicesConfigurationFormState, logColumnsConfigurationFormState]);
  var isFormDirty = (0, _react.useMemo)(function () {
    return indicesConfigurationFormState.isFormDirty || logColumnsConfigurationFormState.isFormDirty;
  }, [indicesConfigurationFormState.isFormDirty, logColumnsConfigurationFormState.isFormDirty]);
  var isFormValid = (0, _react.useMemo)(function () {
    return indicesConfigurationFormState.isFormValid && logColumnsConfigurationFormState.isFormValid;
  }, [indicesConfigurationFormState.isFormValid, logColumnsConfigurationFormState.isFormValid]);
  var formState = (0, _react.useMemo)(function () {
    return {
      name: indicesConfigurationFormState.formState.name,
      description: indicesConfigurationFormState.formState.description,
      logAlias: indicesConfigurationFormState.formState.logAlias,
      metricAlias: indicesConfigurationFormState.formState.metricAlias,
      fields: {
        container: indicesConfigurationFormState.formState.containerField,
        host: indicesConfigurationFormState.formState.hostField,
        pod: indicesConfigurationFormState.formState.podField,
        tiebreaker: indicesConfigurationFormState.formState.tiebreakerField,
        timestamp: indicesConfigurationFormState.formState.timestampField
      },
      logColumns: logColumnsConfigurationFormState.formState.logColumns
    };
  }, [indicesConfigurationFormState.formState, logColumnsConfigurationFormState.formState]);
  var formStateChanges = (0, _react.useMemo)(function () {
    return {
      name: indicesConfigurationFormState.formStateChanges.name,
      description: indicesConfigurationFormState.formStateChanges.description,
      logAlias: indicesConfigurationFormState.formStateChanges.logAlias,
      metricAlias: indicesConfigurationFormState.formStateChanges.metricAlias,
      fields: {
        container: indicesConfigurationFormState.formStateChanges.containerField,
        host: indicesConfigurationFormState.formStateChanges.hostField,
        pod: indicesConfigurationFormState.formStateChanges.podField,
        tiebreaker: indicesConfigurationFormState.formStateChanges.tiebreakerField,
        timestamp: indicesConfigurationFormState.formStateChanges.timestampField
      },
      logColumns: logColumnsConfigurationFormState.formStateChanges.logColumns
    };
  }, [indicesConfigurationFormState.formStateChanges, logColumnsConfigurationFormState.formStateChanges]);
  return {
    addLogColumn: logColumnsConfigurationFormState.addLogColumn,
    moveLogColumn: logColumnsConfigurationFormState.moveLogColumn,
    errors: errors,
    formState: formState,
    formStateChanges: formStateChanges,
    isFormDirty: isFormDirty,
    isFormValid: isFormValid,
    indicesConfigurationProps: indicesConfigurationFormState.fieldProps,
    logColumnConfigurationProps: logColumnsConfigurationFormState.logColumnConfigurationProps,
    resetForm: resetForm
  };
};

exports.useSourceConfigurationFormState = useSourceConfigurationFormState;