"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStateValid = exports.canUseMappingsEditor = exports.shouldDeleteChildFieldsAfterTypeChange = exports.buildFieldTreeFromIds = exports.getMaxNestedDepth = exports.filterTypesForNonRootFields = exports.filterTypesForMultiField = exports.getFieldAncestors = exports.getAllDescendantAliases = exports.getAllChildFields = exports.updateFieldsPathAfterFieldNameChange = exports.deNormalize = exports.normalize = exports.getMainTypeFromSubType = exports.getFieldConfig = exports.getTypeLabelFromType = exports.getFieldMeta = exports.getUniqueId = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var getUniqueId = function getUniqueId() {
  return _uuid.default.v4();
};

exports.getUniqueId = getUniqueId;

var getChildFieldsName = function getChildFieldsName(dataType) {
  if (dataType === 'text' || dataType === 'keyword') {
    return 'fields';
  } else if (dataType === 'object' || dataType === 'nested') {
    return 'properties';
  }

  return undefined;
};

var getFieldMeta = function getFieldMeta(field, isMultiField) {
  var childFieldsName = getChildFieldsName(field.type);
  var canHaveChildFields = isMultiField ? false : childFieldsName === 'properties';
  var hasChildFields = isMultiField ? false : canHaveChildFields && Boolean(field[childFieldsName]) && Object.keys(field[childFieldsName]).length > 0;
  var canHaveMultiFields = childFieldsName === 'fields';
  var hasMultiFields = canHaveMultiFields && Boolean(field[childFieldsName]) && Object.keys(field[childFieldsName]).length > 0;
  return {
    childFieldsName: childFieldsName,
    canHaveChildFields: canHaveChildFields,
    hasChildFields: hasChildFields,
    canHaveMultiFields: canHaveMultiFields,
    hasMultiFields: hasMultiFields,
    isExpanded: false
  };
};

exports.getFieldMeta = getFieldMeta;

var getTypeLabelFromType = function getTypeLabelFromType(type) {
  return _constants.TYPE_DEFINITION[type] ? _constants.TYPE_DEFINITION[type].label : "".concat(_constants.TYPE_DEFINITION.other.label, ": ").concat(type);
};

exports.getTypeLabelFromType = getTypeLabelFromType;

var getFieldConfig = function getFieldConfig(param, prop) {
  var _ref;

  if (prop !== undefined) {
    var _props$prop;

    if (!_constants.PARAMETERS_DEFINITION[param].props || !_constants.PARAMETERS_DEFINITION[param].props[prop]) {
      throw new Error("No field config found for prop \"".concat(prop, "\" on param \"").concat(param, "\" "));
    }

    return ((_props$prop = _constants.PARAMETERS_DEFINITION[param].props[prop]) === null || _props$prop === void 0 ? void 0 : _props$prop.fieldConfig) || {};
  }

  return ((_ref = _constants.PARAMETERS_DEFINITION[param]) === null || _ref === void 0 ? void 0 : _ref.fieldConfig) || {};
};
/**
 * For "alias" field types, we work internaly by "id" references. When we normalize the fields, we need to
 * replace the actual "path" parameter with the field (internal) `id` the alias points to.
 * This method takes care of doing just that.
 *
 * @param byId The fields map by id
 */


exports.getFieldConfig = getFieldConfig;

var replaceAliasPathByAliasId = function replaceAliasPathByAliasId(byId) {
  var aliases = {};
  Object.entries(byId).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        field = _ref3[1];

    if (field.source.type === 'alias') {
      var aliasTargetField = Object.values(byId).find(function (_field) {
        return _field.path.join('.') === field.source.path;
      });

      if (aliasTargetField) {
        // we set the path to the aliasTargetField "id"
        field.source.path = aliasTargetField.id; // We add the alias field to our "aliases" map

        aliases[aliasTargetField.id] = aliases[aliasTargetField.id] || [];
        aliases[aliasTargetField.id].push(id);
      }
    }
  });
  return {
    aliases: aliases,
    byId: byId
  };
};

var getMainTypeFromSubType = function getMainTypeFromSubType(subType) {
  var _SUB_TYPE_MAP_TO_MAIN;

  return (_SUB_TYPE_MAP_TO_MAIN = _constants.SUB_TYPE_MAP_TO_MAIN[subType]) !== null && _SUB_TYPE_MAP_TO_MAIN !== void 0 ? _SUB_TYPE_MAP_TO_MAIN : 'other';
};
/**
 * In order to better work with the recursive pattern of the mappings `properties`, this method flatten the fields
 * to a `byId` object where the key is the **path** to the field and the value is a `NormalizedField`.
 * The `NormalizedField` contains the field data under `source` and meta information about the capability of the field.
 *
 * @example

// original
{
  myObject: {
    type: 'object',
    properties: {
      name: {
        type: 'text'
      }
    }
  }
}

// normalized
{
  rootLevelFields: ['_uniqueId123'],
  byId: {
    '_uniqueId123': {
      source: { type: 'object' },
      id: '_uniqueId123',
      parentId: undefined,
      hasChildFields: true,
      childFieldsName: 'properties', // "object" type have their child fields under "properties"
      canHaveChildFields: true,
      childFields: ['_uniqueId456'],
    },
    '_uniqueId456': {
      source: { type: 'text' },
      id: '_uniqueId456',
      parentId: '_uniqueId123',
      hasChildFields: false,
      childFieldsName: 'fields', // "text" type have their child fields under "fields"
      canHaveChildFields: true,
      childFields: undefined,
    },
  },
}
 *
 * @param fieldsToNormalize The "properties" object from the mappings (or "fields" object for `text` and `keyword` types)
 */


exports.getMainTypeFromSubType = getMainTypeFromSubType;

var normalize = function normalize(fieldsToNormalize) {
  var maxNestedDepth = 0;

  var normalizeFields = function normalizeFields(props, to, paths, arrayToKeepRef, nestedDepth) {
    var isMultiField = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var parentId = arguments.length > 6 ? arguments[6] : undefined;
    return Object.entries(props).sort(function (_ref4, _ref5) {
      var _ref6 = _slicedToArray(_ref4, 1),
          a = _ref6[0];

      var _ref7 = _slicedToArray(_ref5, 1),
          b = _ref7[0];

      return a > b ? 1 : a < b ? -1 : 0;
    }).reduce(function (acc, _ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          propName = _ref9[0],
          value = _ref9[1];

      var id = getUniqueId();
      arrayToKeepRef.push(id);

      var field = _objectSpread({
        name: propName
      }, value); // In some cases for object, the "type" is not defined but the field
      // has properties defined. The mappings editor requires a "type" to be defined
      // so we add it here.


      if (field.type === undefined && field.properties !== undefined) {
        field.type = 'object';
      }

      var meta = getFieldMeta(field, isMultiField);
      var childFieldsName = meta.childFieldsName,
          hasChildFields = meta.hasChildFields,
          hasMultiFields = meta.hasMultiFields;

      if (hasChildFields || hasMultiFields) {
        var nextDepth = meta.canHaveChildFields || meta.canHaveMultiFields ? nestedDepth + 1 : nestedDepth;
        meta.childFields = [];
        maxNestedDepth = Math.max(maxNestedDepth, nextDepth);
        normalizeFields(field[childFieldsName], to, [].concat(_toConsumableArray(paths), [propName]), meta.childFields, nextDepth, meta.canHaveMultiFields, id);
      }

      var properties = field.properties,
          fields = field.fields,
          rest = _objectWithoutProperties(field, ["properties", "fields"]);

      var normalizedField = _objectSpread({
        id: id,
        parentId: parentId,
        nestedDepth: nestedDepth,
        isMultiField: isMultiField,
        path: paths.length ? [].concat(_toConsumableArray(paths), [propName]) : [propName],
        source: rest
      }, meta);

      acc[id] = normalizedField;
      return acc;
    }, to);
  };

  var rootLevelFields = [];

  var _replaceAliasPathByAl = replaceAliasPathByAliasId(normalizeFields(fieldsToNormalize, {}, [], rootLevelFields, 0)),
      byId = _replaceAliasPathByAl.byId,
      aliases = _replaceAliasPathByAl.aliases;

  return {
    byId: byId,
    aliases: aliases,
    rootLevelFields: rootLevelFields,
    maxNestedDepth: maxNestedDepth
  };
};
/**
 * The alias "path" value internally point to a field "id" (not its path). When we deNormalize the fields,
 * we need to replace the target field "id" by its actual "path", making sure to not mutate our state "fields" object.
 *
 * @param aliases The aliases map
 * @param byId The fields map by id
 */


exports.normalize = normalize;

var replaceAliasIdByAliasPath = function replaceAliasIdByAliasPath(aliases, byId) {
  var updatedById = _objectSpread({}, byId);

  Object.entries(aliases).forEach(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
        targetId = _ref11[0],
        aliasesIds = _ref11[1];

    var path = updatedById[targetId] ? updatedById[targetId].path.join('.') : '';
    aliasesIds.forEach(function (id) {
      var aliasField = updatedById[id];

      if (!aliasField) {
        return;
      }

      var fieldWithUpdatedPath = _objectSpread({}, aliasField, {
        source: _objectSpread({}, aliasField.source, {
          path: path
        })
      });

      updatedById[id] = fieldWithUpdatedPath;
    });
  });
  return updatedById;
};

var deNormalize = function deNormalize(_ref12) {
  var rootLevelFields = _ref12.rootLevelFields,
      byId = _ref12.byId,
      aliases = _ref12.aliases;
  var serializedFieldsById = replaceAliasIdByAliasPath(aliases, byId);

  var deNormalizePaths = function deNormalizePaths(ids) {
    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    ids.forEach(function (id) {
      var _serializedFieldsById = serializedFieldsById[id],
          source = _serializedFieldsById.source,
          childFields = _serializedFieldsById.childFields,
          childFieldsName = _serializedFieldsById.childFieldsName;

      var name = source.name,
          normalizedField = _objectWithoutProperties(source, ["name"]);

      var field = normalizedField;
      to[name] = field;

      if (childFields) {
        field[childFieldsName] = {};
        return deNormalizePaths(childFields, field[childFieldsName]);
      }
    });
    return to;
  };

  return deNormalizePaths(rootLevelFields);
};
/**
 * If we change the "name" of a field, we need to update its `path` and the
 * one of **all** of its child properties or multi-fields.
 *
 * @param field The field who's name has changed
 * @param byId The map of all the document fields
 */


exports.deNormalize = deNormalize;

var updateFieldsPathAfterFieldNameChange = function updateFieldsPathAfterFieldNameChange(field, byId) {
  var updatedById = _objectSpread({}, byId);

  var paths = field.parentId ? byId[field.parentId].path : [];

  var updateFieldPath = function updateFieldPath(_field, _paths) {
    var name = _field.source.name;
    var path = _paths.length === 0 ? [name] : [].concat(_toConsumableArray(_paths), [name]);
    updatedById[_field.id] = _objectSpread({}, _field, {
      path: path
    });

    if (_field.hasChildFields || _field.hasMultiFields) {
      _field.childFields.map(function (fieldId) {
        return byId[fieldId];
      }).forEach(function (childField) {
        updateFieldPath(childField, [].concat(_toConsumableArray(_paths), [name]));
      });
    }
  };

  updateFieldPath(field, paths);
  return {
    updatedFieldPath: updatedById[field.id].path,
    updatedById: updatedById
  };
};
/**
 * Retrieve recursively all the children fields of a field
 *
 * @param field The field to return the children from
 * @param byId Map of all the document fields
 */


exports.updateFieldsPathAfterFieldNameChange = updateFieldsPathAfterFieldNameChange;

var getAllChildFields = function getAllChildFields(field, byId) {
  var getChildFields = function getChildFields(_field) {
    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (_field.hasChildFields || _field.hasMultiFields) {
      _field.childFields.map(function (fieldId) {
        return byId[fieldId];
      }).forEach(function (childField) {
        to.push(childField);
        getChildFields(childField, to);
      });
    }

    return to;
  };

  return getChildFields(field);
};
/**
 * If we delete an object with child fields or a text/keyword with multi-field,
 * we need to know if any of its "child" fields has an `alias` that points to it.
 * This method traverse the field descendant tree and returns all the aliases found
 * on the field and its possible children.
 */


exports.getAllChildFields = getAllChildFields;

var getAllDescendantAliases = function getAllDescendantAliases(field, fields) {
  var aliasesIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var hasAliases = fields.aliases[field.id] && Boolean(fields.aliases[field.id].length);

  if (!hasAliases && !field.hasChildFields && !field.hasMultiFields) {
    return aliasesIds;
  }

  if (hasAliases) {
    fields.aliases[field.id].forEach(function (id) {
      aliasesIds.push(id);
    });
  }

  if (field.childFields) {
    field.childFields.forEach(function (id) {
      if (!fields.byId[id]) {
        return;
      }

      getAllDescendantAliases(fields.byId[id], fields, aliasesIds);
    });
  }

  return aliasesIds;
};
/**
 * Helper to retrieve a map of all the ancestors of a field
 *
 * @param fieldId The field id
 * @param byId A map of all the fields by Id
 */


exports.getAllDescendantAliases = getAllDescendantAliases;

var getFieldAncestors = function getFieldAncestors(fieldId, byId) {
  var ancestors = {};
  var currentField = byId[fieldId];
  var parent = currentField.parentId === undefined ? undefined : byId[currentField.parentId];

  while (parent) {
    ancestors[parent.id] = true;
    parent = parent.parentId === undefined ? undefined : byId[parent.parentId];
  }

  return ancestors;
};

exports.getFieldAncestors = getFieldAncestors;

var filterTypesForMultiField = function filterTypesForMultiField(options) {
  return options.filter(function (option) {
    return _constants.TYPE_NOT_ALLOWED_MULTIFIELD.includes(option.value) === false;
  });
};

exports.filterTypesForMultiField = filterTypesForMultiField;

var filterTypesForNonRootFields = function filterTypesForNonRootFields(options) {
  return options.filter(function (option) {
    return _constants.TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL.includes(option.value) === false;
  });
};
/**
 * Return the max nested depth of the document fields
 *
 * @param byId Map of all the document fields
 */


exports.filterTypesForNonRootFields = filterTypesForNonRootFields;

var getMaxNestedDepth = function getMaxNestedDepth(byId) {
  return Object.values(byId).reduce(function (maxDepth, field) {
    return Math.max(maxDepth, field.nestedDepth);
  }, 0);
};
/**
 * Create a nested array of fields and its possible children
 * to render a Tree view of them.
 */


exports.getMaxNestedDepth = getMaxNestedDepth;

var buildFieldTreeFromIds = function buildFieldTreeFromIds(fieldsIds, byId, render) {
  return fieldsIds.map(function (id) {
    var field = byId[id];
    var children = field.childFields ? buildFieldTreeFromIds(field.childFields, byId, render) : undefined;
    return {
      label: render(field),
      children: children
    };
  });
};
/**
 * When changing the type of a field, in most cases we want to delete all its child fields.
 * There are some exceptions, when changing from "text" to "keyword" as both have the same "fields" property.
 */


exports.buildFieldTreeFromIds = buildFieldTreeFromIds;

var shouldDeleteChildFieldsAfterTypeChange = function shouldDeleteChildFieldsAfterTypeChange(oldType, newType) {
  if (oldType === 'text' && newType !== 'keyword') {
    return true;
  } else if (oldType === 'keyword' && newType !== 'text') {
    return true;
  } else if (oldType === 'object' && newType !== 'nested') {
    return true;
  } else if (oldType === 'nested' && newType !== 'object') {
    return true;
  }

  return false;
};

exports.shouldDeleteChildFieldsAfterTypeChange = shouldDeleteChildFieldsAfterTypeChange;

var canUseMappingsEditor = function canUseMappingsEditor(maxNestedDepth) {
  return maxNestedDepth < _constants.MAX_DEPTH_DEFAULT_EDITOR;
};

exports.canUseMappingsEditor = canUseMappingsEditor;
var stateWithValidity = ['configuration', 'fieldsJsonEditor', 'fieldForm'];

var isStateValid = function isStateValid(state) {
  return Object.entries(state).filter(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 1),
        key = _ref14[0];

    return stateWithValidity.includes(key);
  }).reduce(function (isValid, _ref15) {
    var value = _ref15[1];

    if (value === undefined) {
      return isValid;
    } // If one section validity of the state is "undefined", the mappings validity is also "undefined"


    if (isValid === undefined || value.isValid === undefined) {
      return undefined;
    }

    return isValid && value.isValid;
  }, true);
};

exports.isStateValid = isStateValid;