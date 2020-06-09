"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsListItemContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _mappings_state = require("../../../mappings_state");

var _fields_list_item = require("./fields_list_item");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldsListItemContainer = function FieldsListItemContainer(_ref) {
  var fieldId = _ref.fieldId,
      treeDepth = _ref.treeDepth,
      isLastItem = _ref.isLastItem;
  var dispatch = (0, _mappings_state.useDispatch)();
  var listElement = (0, _react.useRef)(null);

  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      _useMappingsState$doc = _useMappingsState.documentFields,
      status = _useMappingsState$doc.status,
      fieldToAddFieldTo = _useMappingsState$doc.fieldToAddFieldTo,
      fieldToEdit = _useMappingsState$doc.fieldToEdit,
      _useMappingsState$fie = _useMappingsState.fields,
      byId = _useMappingsState$fie.byId,
      maxNestedDepth = _useMappingsState$fie.maxNestedDepth;

  var getField = (0, _react.useCallback)(function (id) {
    return byId[id];
  }, [byId]);
  var field = getField(fieldId);
  var parentField = field.parentId === undefined ? undefined : getField(field.parentId);
  var childFields = field.childFields;
  var isHighlighted = fieldToEdit === fieldId;
  var isDimmed = status === 'editingField' && fieldToEdit !== fieldId;
  var isCreateFieldFormVisible = status === 'creatingField' && fieldToAddFieldTo === fieldId;
  var areActionButtonsVisible = status === 'idle';
  var isChainedMultifieldsWarningVisible = false; // We add "!Boolean(parentField?.hasMultiFields)" as we only want to show a callOut at the "root" of the nested multi-fields

  if (field.hasMultiFields && !Boolean(parentField === null || parentField === void 0 ? void 0 : parentField.hasMultiFields)) {
    isChainedMultifieldsWarningVisible = field.childFields.map(getField).some(function (childField) {
      return Boolean(childField === null || childField === void 0 ? void 0 : childField.hasMultiFields);
    });
  }

  var childFieldsArray = (0, _react.useMemo)(function () {
    return childFields !== undefined ? childFields.map(getField) : [];
  }, [childFields, getField]);
  var addField = (0, _react.useCallback)(function () {
    dispatch({
      type: 'documentField.createField',
      value: fieldId
    });
  }, [fieldId, dispatch]);
  var editField = (0, _react.useCallback)(function () {
    dispatch({
      type: 'documentField.editField',
      value: fieldId
    });
  }, [fieldId, dispatch]);
  var toggleExpand = (0, _react.useCallback)(function () {
    dispatch({
      type: 'field.toggleExpand',
      value: {
        fieldId: fieldId
      }
    });
  }, [fieldId, dispatch]);
  return _react.default.createElement(_fields_list_item.FieldsListItem, {
    ref: listElement,
    field: field,
    allFields: byId,
    treeDepth: treeDepth,
    isHighlighted: isHighlighted,
    isDimmed: isDimmed,
    isCreateFieldFormVisible: isCreateFieldFormVisible,
    areActionButtonsVisible: areActionButtonsVisible,
    isChainedMultifieldsWarningVisible: isChainedMultifieldsWarningVisible,
    isLastItem: isLastItem,
    childFieldsArray: childFieldsArray,
    maxNestedDepth: maxNestedDepth,
    addField: addField,
    editField: editField,
    toggleExpand: toggleExpand
  });
};

exports.FieldsListItemContainer = FieldsListItemContainer;