"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.addFieldToState = void 0;

var _lib = require("./lib");

var _constants = require("./constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addFieldToState = function addFieldToState(field, state) {
  var updatedFields = _objectSpread({}, state.fields);

  var id = (0, _lib.getUniqueId)();
  var fieldToAddFieldTo = state.documentFields.fieldToAddFieldTo;
  var addToRootLevel = fieldToAddFieldTo === undefined;
  var parentField = addToRootLevel ? undefined : updatedFields.byId[fieldToAddFieldTo];
  var isMultiField = parentField ? parentField.canHaveMultiFields : false;
  updatedFields.byId = _objectSpread({}, updatedFields.byId);
  updatedFields.rootLevelFields = addToRootLevel ? [].concat(_toConsumableArray(updatedFields.rootLevelFields), [id]) : updatedFields.rootLevelFields;
  var nestedDepth = parentField && (parentField.canHaveChildFields || parentField.canHaveMultiFields) ? parentField.nestedDepth + 1 : 0;
  updatedFields.maxNestedDepth = Math.max(updatedFields.maxNestedDepth, nestedDepth);
  var name = field.name;
  var path = parentField ? [].concat(_toConsumableArray(parentField.path), [name]) : [name];

  var newField = _objectSpread({
    id: id,
    parentId: fieldToAddFieldTo,
    isMultiField: isMultiField,
    source: field,
    path: path,
    nestedDepth: nestedDepth
  }, (0, _lib.getFieldMeta)(field, isMultiField));

  updatedFields.byId[id] = newField;

  if (parentField) {
    var childFields = parentField.childFields || []; // Update parent field with new children

    updatedFields.byId[fieldToAddFieldTo] = _objectSpread({}, parentField, {
      childFields: [].concat(_toConsumableArray(childFields), [id]),
      hasChildFields: parentField.canHaveChildFields,
      hasMultiFields: parentField.canHaveMultiFields,
      isExpanded: true
    });
  }

  if (newField.source.type === 'alias') {
    updatedFields.aliases = updateAliasesReferences(newField, updatedFields);
  }

  return _objectSpread({}, state, {
    isValid: (0, _lib.isStateValid)(state),
    fields: updatedFields
  });
};

exports.addFieldToState = addFieldToState;

var updateAliasesReferences = function updateAliasesReferences(field, _ref, previousTargetPath) {
  var aliases = _ref.aliases;

  var updatedAliases = _objectSpread({}, aliases);
  /**
   * If the field where the alias points to has changed, we need to remove the alias field id from the previous reference array.
   */


  if (previousTargetPath && updatedAliases[previousTargetPath]) {
    updatedAliases[previousTargetPath] = updatedAliases[previousTargetPath].filter(function (id) {
      return id !== field.id;
    });
  }

  var targetId = field.source.path;

  if (!updatedAliases[targetId]) {
    updatedAliases[targetId] = [];
  }

  updatedAliases[targetId] = [].concat(_toConsumableArray(updatedAliases[targetId]), [field.id]);
  return updatedAliases;
};
/**
 * Helper to remove a field from our map, in an immutable way.
 * When we remove a field we also need to update its parent "childFields" array, or
 * if there are no parent, we then need to update the "rootLevelFields" array.
 *
 * @param fieldId The field id that has been removed
 * @param byId The fields map by Id
 */


var removeFieldFromMap = function removeFieldFromMap(fieldId, fields) {
  var rootLevelFields = fields.rootLevelFields;

  var updatedById = _objectSpread({}, fields.byId);

  var parentId = updatedById[fieldId].parentId; // Remove the field from the map

  delete updatedById[fieldId];

  if (parentId) {
    var parentField = updatedById[parentId];

    if (parentField) {
      // If the parent exist, update its childFields Array
      var childFields = parentField.childFields.filter(function (childId) {
        return childId !== fieldId;
      });
      updatedById[parentId] = _objectSpread({}, parentField, {
        childFields: childFields,
        hasChildFields: parentField.canHaveChildFields && Boolean(childFields.length),
        hasMultiFields: parentField.canHaveMultiFields && Boolean(childFields.length),
        isExpanded: !parentField.hasChildFields && !parentField.hasMultiFields ? false : parentField.isExpanded
      });
    }
  } else {
    // If there are no parentId it means that we have deleted a top level field
    // We need to update the root level fields Array
    rootLevelFields = rootLevelFields.filter(function (childId) {
      return childId !== fieldId;
    });
  }

  var updatedFields = _objectSpread({}, fields, {
    rootLevelFields: rootLevelFields,
    byId: updatedById
  });

  if (updatedFields.aliases[fieldId]) {
    // Recursively remove all the alias fields pointing to this field being removed.
    updatedFields = updatedFields.aliases[fieldId].reduce(function (_updatedFields, aliasId) {
      return removeFieldFromMap(aliasId, _updatedFields);
    }, updatedFields);

    var upddatedAliases = _objectSpread({}, updatedFields.aliases);

    delete upddatedAliases[fieldId];
    return _objectSpread({}, updatedFields, {
      aliases: upddatedAliases
    });
  }

  return updatedFields;
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'editor.replaceMappings':
      {
        return _objectSpread({}, state, {
          fieldForm: undefined,
          fields: action.value.fields,
          configuration: _objectSpread({}, state.configuration, {
            defaultValue: action.value.configuration
          }),
          templates: _objectSpread({}, state.templates, {
            defaultValue: action.value.templates
          }),
          documentFields: _objectSpread({}, state.documentFields, {
            status: 'idle',
            fieldToAddFieldTo: undefined,
            fieldToEdit: undefined
          }),
          search: {
            term: '',
            result: []
          }
        });
      }

    case 'configuration.update':
      {
        var nextState = _objectSpread({}, state, {
          configuration: _objectSpread({}, state.configuration, {}, action.value)
        });

        var _isValid = (0, _lib.isStateValid)(nextState);

        nextState.isValid = _isValid;
        return nextState;
      }

    case 'configuration.save':
      {
        var _state$configuration$ = state.configuration.data,
            raw = _state$configuration$.raw,
            _format = _state$configuration$.format;

        var configurationData = _format();

        return _objectSpread({}, state, {
          configuration: {
            isValid: true,
            defaultValue: configurationData,
            data: {
              raw: raw,
              format: function format() {
                return configurationData;
              }
            },
            validate: function () {
              var _validate = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", true);

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              function validate() {
                return _validate.apply(this, arguments);
              }

              return validate;
            }()
          }
        });
      }

    case 'templates.update':
      {
        var _nextState = _objectSpread({}, state, {
          templates: _objectSpread({}, state.templates, {}, action.value)
        });

        var _isValid2 = (0, _lib.isStateValid)(_nextState);

        _nextState.isValid = _isValid2;
        return _nextState;
      }

    case 'templates.save':
      {
        var _state$templates$data = state.templates.data,
            _raw = _state$templates$data.raw,
            _format2 = _state$templates$data.format;

        var templatesData = _format2();

        return _objectSpread({}, state, {
          templates: {
            isValid: true,
            defaultValue: templatesData,
            data: {
              raw: _raw,
              format: function format() {
                return templatesData;
              }
            },
            validate: function () {
              var _validate2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", true);

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              function validate() {
                return _validate2.apply(this, arguments);
              }

              return validate;
            }()
          }
        });
      }

    case 'fieldForm.update':
      {
        var _nextState2 = _objectSpread({}, state, {
          fieldForm: action.value
        });

        var _isValid3 = (0, _lib.isStateValid)(_nextState2);

        _nextState2.isValid = _isValid3;
        return _nextState2;
      }

    case 'documentField.createField':
      {
        return _objectSpread({}, state, {
          documentFields: _objectSpread({}, state.documentFields, {
            fieldToAddFieldTo: action.value,
            status: 'creatingField'
          })
        });
      }

    case 'documentField.editField':
      {
        return _objectSpread({}, state, {
          documentFields: _objectSpread({}, state.documentFields, {
            status: 'editingField',
            fieldToEdit: action.value
          })
        });
      }

    case 'documentField.changeStatus':
      var isValid = action.value === 'idle' ? state.configuration.isValid : state.isValid;
      return _objectSpread({}, state, {
        isValid: isValid,
        fieldForm: undefined,
        documentFields: _objectSpread({}, state.documentFields, {
          status: action.value,
          fieldToAddFieldTo: undefined,
          fieldToEdit: undefined
        })
      });

    case 'documentField.changeEditor':
      {
        var switchingToDefault = action.value === 'default';
        var fields = switchingToDefault ? (0, _lib.normalize)(state.fieldsJsonEditor.format()) : state.fields;
        return _objectSpread({}, state, {
          fields: fields,
          fieldForm: undefined,
          documentFields: _objectSpread({}, state.documentFields, {
            status: 'idle',
            fieldToAddFieldTo: undefined,
            fieldToEdit: undefined,
            editor: action.value
          })
        });
      }

    case 'field.add':
      {
        return addFieldToState(action.value, state);
      }

    case 'field.remove':
      {
        var field = state.fields.byId[action.value];
        var id = field.id,
            hasChildFields = field.hasChildFields,
            hasMultiFields = field.hasMultiFields; // Remove the field

        var updatedFields = removeFieldFromMap(id, state.fields);

        if (hasChildFields || hasMultiFields) {
          var allChildFields = (0, _lib.getAllChildFields)(field, state.fields.byId); // Remove all of its children

          allChildFields.forEach(function (childField) {
            updatedFields = removeFieldFromMap(childField.id, updatedFields);
          });
        } // Handle Alias


        if (field.source.type === 'alias' && field.source.path) {
          /**
           * If we delete an alias field, we need to remove its id from the reference Array
           */
          var targetId = field.source.path;
          updatedFields.aliases = _objectSpread({}, updatedFields.aliases, _defineProperty({}, targetId, updatedFields.aliases[targetId].filter(function (aliasId) {
            return aliasId !== id;
          })));
        }

        updatedFields.maxNestedDepth = (0, _lib.getMaxNestedDepth)(updatedFields.byId);
        return _objectSpread({}, state, {
          fields: updatedFields,
          // If we have a search in progress, we reexecute the search to update our result array
          search: Boolean(state.search.term) ? _objectSpread({}, state.search, {
            result: (0, _lib.searchFields)(state.search.term, updatedFields.byId)
          }) : state.search
        });
      }

    case 'field.edit':
      {
        var _updatedFields2 = _objectSpread({}, state.fields);

        var fieldToEdit = state.documentFields.fieldToEdit;
        var previousField = _updatedFields2.byId[fieldToEdit];

        var newField = _objectSpread({}, previousField, {
          source: action.value
        });

        if (newField.source.type === 'alias') {
          _updatedFields2.aliases = updateAliasesReferences(newField, _updatedFields2, previousField.source.path);
        }

        var nameHasChanged = newField.source.name !== previousField.source.name;
        var typeHasChanged = newField.source.type !== previousField.source.type;

        if (nameHasChanged) {
          // If the name has changed, we need to update the `path` of the field and recursively
          // the paths of all its "descendant" fields (child or multi-field)
          var _updateFieldsPathAfte = (0, _lib.updateFieldsPathAfterFieldNameChange)(newField, _updatedFields2.byId),
              updatedFieldPath = _updateFieldsPathAfte.updatedFieldPath,
              updatedById = _updateFieldsPathAfte.updatedById;

          newField.path = updatedFieldPath;
          _updatedFields2.byId = updatedById;
        }

        _updatedFields2.byId[fieldToEdit] = newField;

        if (typeHasChanged) {
          // The field `type` has changed, we need to update its meta information
          // and delete all its children fields.
          var shouldDeleteChildFields = (0, _lib.shouldDeleteChildFieldsAfterTypeChange)(previousField.source.type, newField.source.type);

          if (previousField.source.type === 'alias' && previousField.source.path) {
            // The field was previously an alias, now that it is not an alias anymore
            // We need to remove its reference from our state.aliases map
            _updatedFields2.aliases = _objectSpread({}, _updatedFields2.aliases, _defineProperty({}, previousField.source.path, _updatedFields2.aliases[previousField.source.path].filter(function (aliasId) {
              return aliasId !== fieldToEdit;
            })));
          } else {
            var nextTypeCanHaveAlias = !_constants.PARAMETERS_DEFINITION.path.targetTypesNotAllowed.includes(newField.source.type);

            if (!nextTypeCanHaveAlias && _updatedFields2.aliases[fieldToEdit]) {
              _updatedFields2.aliases[fieldToEdit].forEach(function (aliasId) {
                _updatedFields2 = removeFieldFromMap(aliasId, _updatedFields2);
              });

              delete _updatedFields2.aliases[fieldToEdit];
            }
          }

          if (shouldDeleteChildFields && previousField.childFields) {
            var _allChildFields = (0, _lib.getAllChildFields)(previousField, _updatedFields2.byId);

            _allChildFields.forEach(function (childField) {
              _updatedFields2 = removeFieldFromMap(childField.id, _updatedFields2);
            });
          }

          newField = _objectSpread({}, newField, {}, (0, _lib.getFieldMeta)(action.value, newField.isMultiField), {
            childFields: shouldDeleteChildFields ? undefined : previousField.childFields,
            hasChildFields: shouldDeleteChildFields ? false : previousField.hasChildFields,
            hasMultiFields: shouldDeleteChildFields ? false : previousField.hasMultiFields,
            isExpanded: shouldDeleteChildFields ? false : previousField.isExpanded
          });
          _updatedFields2.byId[fieldToEdit] = newField;
        }

        _updatedFields2.maxNestedDepth = (0, _lib.getMaxNestedDepth)(_updatedFields2.byId);
        return _objectSpread({}, state, {
          isValid: (0, _lib.isStateValid)(state),
          fieldForm: undefined,
          fields: _updatedFields2,
          documentFields: _objectSpread({}, state.documentFields, {
            fieldToEdit: undefined,
            status: 'idle'
          }),
          // If we have a search in progress, we reexecute the search to update our result array
          search: Boolean(state.search.term) ? _objectSpread({}, state.search, {
            result: (0, _lib.searchFields)(state.search.term, _updatedFields2.byId)
          }) : state.search
        });
      }

    case 'field.toggleExpand':
      {
        var _action$value = action.value,
            fieldId = _action$value.fieldId,
            isExpanded = _action$value.isExpanded;
        var _previousField = state.fields.byId[fieldId];

        var nextField = _objectSpread({}, _previousField, {
          isExpanded: isExpanded === undefined ? !_previousField.isExpanded : isExpanded
        });

        return _objectSpread({}, state, {
          fields: _objectSpread({}, state.fields, {
            byId: _objectSpread({}, state.fields.byId, _defineProperty({}, fieldId, nextField))
          })
        });
      }

    case 'fieldsJsonEditor.update':
      {
        var _nextState3 = _objectSpread({}, state, {
          fieldsJsonEditor: {
            format: function format() {
              return action.value.json;
            },
            isValid: action.value.isValid
          }
        });

        _nextState3.isValid = (0, _lib.isStateValid)(_nextState3);
        return _nextState3;
      }

    case 'search:update':
      {
        return _objectSpread({}, state, {
          search: {
            term: action.value,
            result: (0, _lib.searchFields)(action.value, state.fields.byId)
          }
        });
      }

    default:
      throw new Error("Action \"".concat(action.type, "\" not recognized."));
  }
};

exports.reducer = reducer;