"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldDeserializer = exports.fieldSerializer = void 0;

var _field_parameters = require("../components/document_fields/field_parameters");

var _constants = require("../constants");

var _utils = require("./utils");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sanitizeField = function sanitizeField(field) {
  return Object.entries(field) // If a parameter value is "index_default", we remove it
  .filter(function (_ref) {
    var value = _ref[1];
    return value !== _constants.INDEX_DEFAULT;
  }).reduce(function (acc, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        param = _ref3[0],
        value = _ref3[1];

    return _objectSpread({}, acc, _defineProperty({}, param, value));
  }, {});
};
/**
 * Run custom parameter serializers on field.
 * Each serializer takes the field as single argument and returns it serialized in an immutable way.
 * @param field The field we are serializing
 */


var runParametersSerializers = function runParametersSerializers(field) {
  return _field_parameters.PARAMETER_SERIALIZERS.reduce(function (fieldSerialized, serializer) {
    return serializer(fieldSerialized);
  }, field);
};
/**
 * Run custom parameter deserializers on field.
 * Each deserializer takes the field as single argument and returns it deserialized in an immutable way.
 * @param field The field we are deserializing
 */


var runParametersDeserializers = function runParametersDeserializers(field) {
  return _field_parameters.PARAMETER_DESERIALIZERS.reduce(function (fieldDeserialized, serializer) {
    return serializer(fieldDeserialized);
  }, field);
};

var fieldSerializer = function fieldSerializer(field) {
  var otherTypeJson = field.otherTypeJson,
      rest = _objectWithoutProperties(field, ["otherTypeJson"]);

  var updatedField = Boolean(otherTypeJson) ? _objectSpread({}, otherTypeJson, {}, rest) : _objectSpread({}, rest); // If a subType is present, use it as type for ES

  if ({}.hasOwnProperty.call(updatedField, 'subType')) {
    updatedField.type = updatedField.subType;
    delete updatedField.subType;
  } // Delete temp fields


  delete updatedField.useSameAnalyzerForSearch;
  return sanitizeField(runParametersSerializers(updatedField));
};

exports.fieldSerializer = fieldSerializer;

var fieldDeserializer = function fieldDeserializer(field) {
  if (!_constants.MAIN_DATA_TYPE_DEFINITION[field.type]) {
    // IF the type if not one of the main one, it is then probably a "sub" type.
    var type = (0, _utils.getMainTypeFromSubType)(field.type);

    if (!type) {
      throw new Error("Property type \"".concat(field.type, "\" not recognized and no subType was found for it."));
    }

    field.subType = field.type;
    field.type = type;
  }

  if (field.type === 'other') {
    var _type = field.type,
        subType = field.subType,
        name = field.name,
        otherTypeJson = _objectWithoutProperties(field, ["type", "subType", "name"]);
    /**
     * For "other" type (type we don't support through a form)
     * we grab all the parameters and put them in the "otherTypeJson" object
     * that we will render in a JSON editor.
     */


    field.otherTypeJson = otherTypeJson;
  } else {
    field.useSameAnalyzerForSearch = {}.hasOwnProperty.call(field, 'search_analyzer') === false;
  }

  return runParametersDeserializers(field);
};

exports.fieldDeserializer = fieldDeserializer;