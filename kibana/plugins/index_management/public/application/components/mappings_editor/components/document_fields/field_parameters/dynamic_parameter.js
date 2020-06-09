"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicParameter = exports.dynamicDeserializer = exports.dynamicSerializer = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../services/documentation");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Export custom serializer to be used when we need to serialize the form data to be sent to ES
 * @param field The field to be serialized
 */
var dynamicSerializer = function dynamicSerializer(field) {
  if (field.dynamic_toggle === undefined) {
    return field;
  }

  var dynamic = field.dynamic_toggle === true ? true : field.dynamic_strict === true ? 'strict' : false;

  var dynamic_toggle = field.dynamic_toggle,
      dynamic_strict = field.dynamic_strict,
      rest = _objectWithoutProperties(field, ["dynamic_toggle", "dynamic_strict"]);

  return _objectSpread({}, rest, {
    dynamic: dynamic
  });
};
/**
 * Export custom deserializer to be used when we need to deserialize the data coming from ES
 * @param field The field to be serialized
 */


exports.dynamicSerializer = dynamicSerializer;

var dynamicDeserializer = function dynamicDeserializer(field) {
  if (field.dynamic === undefined) {
    return field;
  }

  var dynamicToggleValue = field.dynamic === true;
  var dynamicStrictValue = field.dynamic === 'strict';
  return _objectSpread({}, field, {
    dynamic_toggle: dynamicToggleValue,
    dynamic_strict: dynamicStrictValue
  });
};

exports.dynamicDeserializer = dynamicDeserializer;

var DynamicParameter = function DynamicParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicPropertyMappingParameter.fieldTitle', {
      defaultMessage: 'Dynamic property mapping'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicPropertyMappingParameter.fieldDescription', {
      defaultMessage: 'By default, properties can be added dynamically to objects within a document, just by indexing a document with the object containing the new property.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicDocLinkText', {
        defaultMessage: 'Dynamic documentation'
      }),
      href: _documentation.documentationService.getDynamicLink()
    },
    formFieldPath: "dynamic_toggle",
    defaultToggleValue: defaultToggleValue
  }, function (isOn) {
    return isOn === false ? _react.default.createElement(_shared_imports.UseField, {
      path: "dynamic_strict",
      config: (0, _lib.getFieldConfig)('dynamic_strict'),
      component: _shared_imports.CheckBoxField
    }) : null;
  });
};

exports.DynamicParameter = DynamicParameter;