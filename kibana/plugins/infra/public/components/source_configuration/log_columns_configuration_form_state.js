"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogColumnsConfigurationFormState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _source_configuration = require("../../utils/source_configuration");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var useLogColumnsConfigurationFormState = function useLogColumnsConfigurationFormState(_ref) {
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
  var logColumnConfigurationProps = (0, _react.useMemo)(function () {
    return formState.logColumns.map(function (logColumn) {
      var remove = function remove() {
        return setFormStateChanges(function (changes) {
          return _objectSpread({}, changes, {
            logColumns: formState.logColumns.filter(function (item) {
              return item !== logColumn;
            })
          });
        });
      };

      if ((0, _source_configuration.isTimestampLogColumnConfiguration)(logColumn)) {
        return {
          logColumnConfiguration: logColumn.timestampColumn,
          remove: remove,
          type: 'timestamp'
        };
      } else if ((0, _source_configuration.isMessageLogColumnConfiguration)(logColumn)) {
        return {
          logColumnConfiguration: logColumn.messageColumn,
          remove: remove,
          type: 'message'
        };
      } else {
        return {
          logColumnConfiguration: logColumn.fieldColumn,
          remove: remove,
          type: 'field'
        };
      }
    });
  }, [formState.logColumns]);
  var addLogColumn = (0, _react.useCallback)(function (logColumnConfiguration) {
    return setFormStateChanges(function (changes) {
      return _objectSpread({}, changes, {
        logColumns: [].concat(_toConsumableArray(formState.logColumns), [logColumnConfiguration])
      });
    });
  }, [formState.logColumns]);
  var moveLogColumn = (0, _react.useCallback)(function (sourceIndex, destinationIndex) {
    if (destinationIndex >= 0 && sourceIndex <= formState.logColumns.length - 1) {
      var newLogColumns = _toConsumableArray(formState.logColumns);

      newLogColumns.splice(destinationIndex, 0, newLogColumns.splice(sourceIndex, 1)[0]);
      setFormStateChanges(function (changes) {
        return _objectSpread({}, changes, {
          logColumns: newLogColumns
        });
      });
    }
  }, [formState.logColumns]);
  var errors = (0, _react.useMemo)(function () {
    return logColumnConfigurationProps.length <= 0 ? [_react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.sourceConfiguration.logColumnListEmptyErrorMessage",
      defaultMessage: "The log column list must not be empty."
    })] : [];
  }, [logColumnConfigurationProps]);
  var isFormValid = (0, _react.useMemo)(function () {
    return errors.length <= 0 ? true : false;
  }, [errors]);
  var isFormDirty = (0, _react.useMemo)(function () {
    return Object.keys(formStateChanges).length > 0;
  }, [formStateChanges]);
  return {
    addLogColumn: addLogColumn,
    moveLogColumn: moveLogColumn,
    errors: errors,
    logColumnConfigurationProps: logColumnConfigurationProps,
    formState: formState,
    formStateChanges: formStateChanges,
    isFormDirty: isFormDirty,
    isFormValid: isFormValid,
    resetForm: resetForm
  };
};

exports.useLogColumnsConfigurationFormState = useLogColumnsConfigurationFormState;
var defaultFormState = {
  logColumns: []
};