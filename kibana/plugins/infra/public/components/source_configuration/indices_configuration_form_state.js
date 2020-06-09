"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIndicesConfigurationFormState = void 0;

var _react = require("react");

var _input_fields = require("./input_fields");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useIndicesConfigurationFormState = function useIndicesConfigurationFormState(_ref) {
  var _ref$initialFormState = _ref.initialFormState,
      initialFormState = _ref$initialFormState === void 0 ? defaultFormState : _ref$initialFormState;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      formStateChanges = _useState2[0],
      setFormStateChanges = _useState2[1];

  var resetForm = (0, _react.useCallback)(function () {
    return setFormStateChanges({});
  }, []);
  var formState = (0, _react.useMemo)(function () {
    return _objectSpread({}, initialFormState, {}, formStateChanges);
  }, [initialFormState, formStateChanges]);
  var nameFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.name),
      name: 'name',
      onChange: function onChange(name) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            name: name
          });
        });
      },
      value: formState.name
    });
  }, [formState.name]);
  var logAliasFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.logAlias),
      name: 'logAlias',
      onChange: function onChange(logAlias) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            logAlias: logAlias
          });
        });
      },
      value: formState.logAlias
    });
  }, [formState.logAlias]);
  var metricAliasFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.metricAlias),
      name: 'metricAlias',
      onChange: function onChange(metricAlias) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            metricAlias: metricAlias
          });
        });
      },
      value: formState.metricAlias
    });
  }, [formState.metricAlias]);
  var containerFieldFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.containerField),
      name: "containerField",
      onChange: function onChange(containerField) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            containerField: containerField
          });
        });
      },
      value: formState.containerField
    });
  }, [formState.containerField]);
  var hostFieldFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.hostField),
      name: "hostField",
      onChange: function onChange(hostField) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            hostField: hostField
          });
        });
      },
      value: formState.hostField
    });
  }, [formState.hostField]);
  var podFieldFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.podField),
      name: "podField",
      onChange: function onChange(podField) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            podField: podField
          });
        });
      },
      value: formState.podField
    });
  }, [formState.podField]);
  var tiebreakerFieldFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.tiebreakerField),
      name: "tiebreakerField",
      onChange: function onChange(tiebreakerField) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            tiebreakerField: tiebreakerField
          });
        });
      },
      value: formState.tiebreakerField
    });
  }, [formState.tiebreakerField]);
  var timestampFieldFieldProps = (0, _react.useMemo)(function () {
    return (0, _input_fields.createInputFieldProps)({
      errors: (0, _input_fields.validateInputFieldNotEmpty)(formState.timestampField),
      name: "timestampField",
      onChange: function onChange(timestampField) {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            timestampField: timestampField
          });
        });
      },
      value: formState.timestampField
    });
  }, [formState.timestampField]);
  var fieldProps = (0, _react.useMemo)(function () {
    return {
      name: nameFieldProps,
      logAlias: logAliasFieldProps,
      metricAlias: metricAliasFieldProps,
      containerField: containerFieldFieldProps,
      hostField: hostFieldFieldProps,
      podField: podFieldFieldProps,
      tiebreakerField: tiebreakerFieldFieldProps,
      timestampField: timestampFieldFieldProps
    };
  }, [nameFieldProps, logAliasFieldProps, metricAliasFieldProps, containerFieldFieldProps, hostFieldFieldProps, podFieldFieldProps, tiebreakerFieldFieldProps, timestampFieldFieldProps]);
  var errors = (0, _react.useMemo)(function () {
    return Object.values(fieldProps).reduce(function (accumulatedErrors, _ref2) {
      var error = _ref2.error;
      return [].concat(_toConsumableArray(accumulatedErrors), _toConsumableArray(error));
    }, []);
  }, [fieldProps]);
  var isFormValid = (0, _react.useMemo)(function () {
    return errors.length <= 0;
  }, [errors]);
  var isFormDirty = (0, _react.useMemo)(function () {
    return Object.keys(formStateChanges).length > 0;
  }, [formStateChanges]);
  return {
    errors: errors,
    fieldProps: fieldProps,
    formState: formState,
    formStateChanges: formStateChanges,
    isFormDirty: isFormDirty,
    isFormValid: isFormValid,
    resetForm: resetForm
  };
};

exports.useIndicesConfigurationFormState = useIndicesConfigurationFormState;
var defaultFormState = {
  name: '',
  description: '',
  logAlias: '',
  metricAlias: '',
  containerField: '',
  hostField: '',
  messageField: [],
  podField: '',
  tiebreakerField: '',
  timestampField: ''
};