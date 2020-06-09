"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALID_MAPPINGS_PARAMETERS = exports.validateMappings = exports.validateMappingsConfiguration = exports.mappingsConfigurationSchema = exports.validateProperties = void 0;

var _lodash = require("lodash");

var t = _interopRequireWildcard(require("io-ts"));

var _Ord = require("fp-ts/lib/Ord");

var _Set = require("fp-ts/lib/Set");

var _Either = require("fp-ts/lib/Either");

var _error_reporter = require("./error_reporter");

var _constants = require("../constants");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ALLOWED_FIELD_PROPERTIES = [].concat(_toConsumableArray(Object.keys(_constants.PARAMETERS_DEFINITION)), ['type', 'properties', 'fields']);
var DEFAULT_FIELD_TYPE = 'object';

var validateFieldType = function validateFieldType(type) {
  if (typeof type !== 'string') {
    return false;
  }

  if (!_constants.ALL_DATA_TYPES.includes(type)) {
    return false;
  }

  return true;
};

var validateParameter = function validateParameter(parameter, value) {
  if (parameter === 'type') {
    return true;
  }

  if (parameter === 'name') {
    return false;
  }

  if (parameter === 'properties' || parameter === 'fields') {
    return (0, _lodash.isPlainObject)(value);
  }

  var parameterSchema = _constants.PARAMETERS_DEFINITION[parameter].schema;

  if (parameterSchema) {
    return (0, _Either.isRight)(parameterSchema.decode(value));
  } // Fallback, if no schema defined for the parameter (this should not happen in theory)


  return true;
};

var stripUnknownOrInvalidParameter = function stripUnknownOrInvalidParameter(field) {
  return Object.entries(field).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (!ALLOWED_FIELD_PROPERTIES.includes(key) || !validateParameter(key, value)) {
      acc.parametersRemoved.push(key);
    } else {
      var _acc$value;

      acc.value = (_acc$value = acc.value) !== null && _acc$value !== void 0 ? _acc$value : {};
      acc.value[key] = value;
    }

    return acc;
  }, {
    parametersRemoved: []
  });
};

var parseField = function parseField(field) {
  var _field$type;

  // Sanitize the input to make sure we are working with an object
  if (!(0, _lodash.isPlainObject)(field)) {
    return {
      parametersRemoved: []
    };
  } // Make sure the field "type" is valid


  if (!validateFieldType((_field$type = field.type) !== null && _field$type !== void 0 ? _field$type : DEFAULT_FIELD_TYPE)) {
    return {
      parametersRemoved: []
    };
  } // Filter out unknown or invalid "parameters"


  var fieldWithType = _objectSpread({
    type: DEFAULT_FIELD_TYPE
  }, field);

  var parsedField = stripUnknownOrInvalidParameter(fieldWithType);
  var meta = (0, _utils.getFieldMeta)(fieldWithType);
  return _objectSpread({}, parsedField, {
    meta: meta
  });
};

var parseFields = function parseFields(properties) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.entries(properties).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        fieldName = _ref4[0],
        unparsedField = _ref4[1];

    var fieldPath = [].concat(_toConsumableArray(path), [fieldName]).join('.');

    var _parseField = parseField(unparsedField),
        parsedField = _parseField.value,
        parametersRemoved = _parseField.parametersRemoved,
        meta = _parseField.meta;

    if (parsedField === undefined) {
      // Field has been stripped out because it was invalid
      acc.errors.push({
        code: 'ERR_FIELD',
        fieldPath: fieldPath
      });
    } else {
      if (meta.hasChildFields || meta.hasMultiFields) {
        // Recursively parse all the possible children ("properties" or "fields" for multi-fields)
        var parsedChildren = parseFields(parsedField[meta.childFieldsName], [].concat(_toConsumableArray(path), [fieldName]));
        parsedField[meta.childFieldsName] = parsedChildren.value;
        /**
         * If the children parsed have any error we concatenate them in our accumulator.
         */

        if (parsedChildren.errors) {
          acc.errors = [].concat(_toConsumableArray(acc.errors), _toConsumableArray(parsedChildren.errors));
        }
      }

      acc.value[fieldName] = parsedField;

      if (Boolean(parametersRemoved.length)) {
        acc.errors = [].concat(_toConsumableArray(acc.errors), _toConsumableArray(parametersRemoved.map(function (paramName) {
          return {
            code: 'ERR_PARAMETER',
            fieldPath: fieldPath,
            paramName: paramName
          };
        })));
      }
    }

    return acc;
  }, {
    value: {},
    errors: []
  });
};
/**
 * Utility function that reads a mappings "properties" object and validate its fields by
 * - Removing unknown field types
 * - Removing unknown field parameters or field parameters that don't have the correct format.
 *
 * This method does not mutate the original properties object. It returns an object with
 * the parsed properties and an array of field paths that have been removed.
 * This allows us to display a warning in the UI and let the user correct the fields that we
 * are about to remove.
 *
 * NOTE: The Joi Schema that we defined for each parameter (in "parameters_definition".tsx)
 * does not do an exhaustive validation of the parameter value.
 * It's main purpose is to prevent the UI from blowing up.
 *
 * @param properties A mappings "properties" object
 */


var validateProperties = function validateProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Sanitize the input to make sure we are working with an object
  if (!(0, _lodash.isPlainObject)(properties)) {
    return {
      value: {},
      errors: []
    };
  }

  return parseFields(properties);
};
/**
 * Single source of truth to validate the *configuration* of the mappings.
 * Whenever a user loads a JSON object it will be validate against this Joi schema.
 */


exports.validateProperties = validateProperties;
var mappingsConfigurationSchema = t.exact(t.partial({
  dynamic: t.union([t.literal(true), t.literal(false), t.literal('strict')]),
  date_detection: t.boolean,
  numeric_detection: t.boolean,
  dynamic_date_formats: t.array(t.string),
  _source: t.exact(t.partial({
    enabled: t.boolean,
    includes: t.array(t.string),
    excludes: t.array(t.string)
  })),
  _meta: t.UnknownRecord,
  _routing: t.interface({
    required: t.boolean
  })
}));
exports.mappingsConfigurationSchema = mappingsConfigurationSchema;
var mappingsConfigurationSchemaKeys = Object.keys(mappingsConfigurationSchema.type.props);
var sourceConfigurationSchemaKeys = Object.keys(mappingsConfigurationSchema.type.props._source.type.props);

var validateMappingsConfiguration = function validateMappingsConfiguration(mappingsConfiguration) {
  // Set to keep track of invalid configuration parameters.
  var configurationRemoved = new Set();

  var copyOfMappingsConfig = _objectSpread({}, mappingsConfiguration);

  var result = mappingsConfigurationSchema.decode(mappingsConfiguration);
  var isSchemaInvalid = (0, _Either.isLeft)(result);
  var unknownConfigurationParameters = Object.keys(mappingsConfiguration).filter(function (key) {
    return mappingsConfigurationSchemaKeys.includes(key) === false;
  });
  var unknownSourceConfigurationParameters = mappingsConfiguration._source !== undefined ? Object.keys(mappingsConfiguration._source).filter(function (key) {
    return sourceConfigurationSchemaKeys.includes(key) === false;
  }) : [];

  if (isSchemaInvalid) {
    /**
     * To keep the logic simple we will strip out the parameters that contain errors
     */
    var _errors = _error_reporter.errorReporter.report(result);

    _errors.forEach(function (error) {
      var configurationName = error.path[0];
      configurationRemoved.add(configurationName);
      delete copyOfMappingsConfig[configurationName];
    });
  }

  if (unknownConfigurationParameters.length > 0) {
    unknownConfigurationParameters.forEach(function (configName) {
      return configurationRemoved.add(configName);
    });
  }

  if (unknownSourceConfigurationParameters.length > 0) {
    configurationRemoved.add('_source');
    delete copyOfMappingsConfig._source;
  }

  copyOfMappingsConfig = (0, _lodash.pick)(copyOfMappingsConfig, mappingsConfigurationSchemaKeys);
  var errors = (0, _Set.toArray)(_Ord.ordString)(configurationRemoved).map(function (configName) {
    return {
      code: 'ERR_CONFIG',
      configName: configName
    };
  }).sort(function (a, b) {
    return a.configName.localeCompare(b.configName);
  });
  return {
    value: copyOfMappingsConfig,
    errors: errors
  };
};

exports.validateMappingsConfiguration = validateMappingsConfiguration;

var validateMappings = function validateMappings() {
  var mappings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(0, _lodash.isPlainObject)(mappings)) {
    return {
      value: {}
    };
  }

  var properties = mappings.properties,
      dynamicTemplates = mappings.dynamic_templates,
      mappingsConfiguration = _objectWithoutProperties(mappings, ["properties", "dynamic_templates"]);

  var _validateMappingsConf = validateMappingsConfiguration(mappingsConfiguration),
      parsedConfiguration = _validateMappingsConf.value,
      configurationErrors = _validateMappingsConf.errors;

  var _validateProperties = validateProperties(properties),
      parsedProperties = _validateProperties.value,
      propertiesErrors = _validateProperties.errors;

  var errors = [].concat(_toConsumableArray(configurationErrors), _toConsumableArray(propertiesErrors));
  return {
    value: _objectSpread({}, parsedConfiguration, {
      properties: parsedProperties,
      dynamic_templates: dynamicTemplates !== null && dynamicTemplates !== void 0 ? dynamicTemplates : []
    }),
    errors: errors.length ? errors : undefined
  };
};

exports.validateMappings = validateMappings;
var VALID_MAPPINGS_PARAMETERS = [].concat(_toConsumableArray(mappingsConfigurationSchemaKeys), ['dynamic_templates', 'properties']);
exports.VALID_MAPPINGS_PARAMETERS = VALID_MAPPINGS_PARAMETERS;