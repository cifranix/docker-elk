"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractMappingsDefinition = exports.doMappingsHaveType = void 0;

var _lodash = require("lodash");

var _mappings_validator = require("./mappings_validator");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var isMappingDefinition = function isMappingDefinition(obj) {
  var areAllKeysValid = Object.keys(obj).every(function (key) {
    return _mappings_validator.VALID_MAPPINGS_PARAMETERS.includes(key);
  });

  if (!areAllKeysValid) {
    return false;
  }

  var properties = obj.properties,
      dynamicTemplates = obj.dynamic_templates,
      mappingsConfiguration = _objectWithoutProperties(obj, ["properties", "dynamic_templates"]);

  var _validateMappingsConf = (0, _mappings_validator.validateMappingsConfiguration)(mappingsConfiguration),
      errors = _validateMappingsConf.errors;

  var isConfigurationValid = errors.length === 0;
  var isPropertiesValid = properties === undefined || (0, _lodash.isPlainObject)(properties);
  var isDynamicTemplatesValid = dynamicTemplates === undefined || Array.isArray(dynamicTemplates); // If the configuration, the properties and the dynamic templates are valid
  // we can assume that the mapping is declared at root level (no types)

  return isConfigurationValid && isPropertiesValid && isDynamicTemplatesValid;
};

var getMappingsDefinitionWithType = function getMappingsDefinitionWithType(mappings) {
  if (isMappingDefinition(mappings)) {
    // No need to go any further
    return [{
      mappings: mappings
    }];
  } // At this point there must be one or more type mappings


  var typedMappings = Object.entries(mappings).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        type = _ref2[0],
        value = _ref2[1];

    if (isMappingDefinition(value)) {
      acc.push({
        type: type,
        mappings: value
      });
    }

    return acc;
  }, []);
  return typedMappings;
};

var doMappingsHaveType = function doMappingsHaveType() {
  var mappings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return getMappingsDefinitionWithType(mappings).filter(function (_ref3) {
    var type = _ref3.type;
    return type !== undefined;
  }).length > 0;
};
/**
 * 5.x index templates can be created with multiple types.
 * e.g.
 ```
  const mappings = {
      type1: {
        properties: {
          name1: {
            type: 'keyword',
          },
        },
      },
      type2: {
        properties: {
          name2: {
            type: 'keyword',
          },
        },
      },
    };
 ```
 * A mappings can also be declared under an explicit "_doc" property.
 ```
 const mappings = {
    _doc: {
      _source: {
        "enabled": false
      },
      properties: {
        name1: {
          type: 'keyword',
        },
      },
    },
  };
 ```
 * This helpers parse the mappings provided an removes any possible mapping "type" declared
 *
 * @param mappings The mappings object to validate
 */


exports.doMappingsHaveType = doMappingsHaveType;

var extractMappingsDefinition = function extractMappingsDefinition() {
  var mappings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var typedMappings = getMappingsDefinitionWithType(mappings); // If there are no typed mappings found this means that one of the type must did not pass
  // the "isMappingDefinition()" validation.
  // In theory this should never happen but let's make sure the UI does not try to load an invalid mapping

  if (typedMappings.length === 0) {
    return null;
  } // If there's only one mapping type then we can consume it as if the type doesn't exist.


  if (typedMappings.length === 1) {
    return typedMappings[0];
  } // If there's more than one mapping type, then the mappings object isn't usable.


  return null;
};

exports.extractMappingsDefinition = extractMappingsDefinition;