"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NameParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

var _mappings_state = require("../../../mappings_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NameParameter = function NameParameter() {
  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      _useMappingsState$fie = _useMappingsState.fields,
      rootLevelFields = _useMappingsState$fie.rootLevelFields,
      byId = _useMappingsState$fie.byId,
      _useMappingsState$doc = _useMappingsState.documentFields,
      fieldToAddFieldTo = _useMappingsState$doc.fieldToAddFieldTo,
      fieldToEdit = _useMappingsState$doc.fieldToEdit;

  var _ref = _constants.PARAMETERS_DEFINITION.name.fieldConfig,
      validations = _ref.validations,
      rest = _objectWithoutProperties(_ref, ["validations"]);

  var initialName = fieldToEdit ? byId[fieldToEdit].source.name : undefined;
  var parentId = fieldToEdit ? byId[fieldToEdit].parentId : fieldToAddFieldTo;
  var uniqueNameValidator = (0, _lib.validateUniqueName)({
    rootLevelFields: rootLevelFields,
    byId: byId
  }, initialName, parentId);

  var nameConfig = _objectSpread({}, rest, {
    validations: [].concat(_toConsumableArray(validations), [{
      validator: uniqueNameValidator
    }])
  });

  return _react.default.createElement(_shared_imports.UseField, {
    path: "name",
    config: nameConfig,
    component: _shared_imports.TextField,
    componentProps: {
      euiFieldProps: {
        'data-test-subj': 'nameParameterInput'
      }
    }
  });
};

exports.NameParameter = NameParameter;