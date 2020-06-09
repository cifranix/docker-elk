"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentFields = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _mappings_state = require("../../mappings_state");

var _lib = require("../../lib");

var _fields = require("./fields");

var _document_fields_header = require("./document_fields_header");

var _fields_json_editor = require("./fields_json_editor");

var _fields_tree_editor = require("./fields_tree_editor");

var _search_fields = require("./search_fields");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocumentFields = _react.default.memo(function () {
  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      fields = _useMappingsState.fields,
      search = _useMappingsState.search,
      documentFields = _useMappingsState.documentFields;

  var dispatch = (0, _mappings_state.useDispatch)();
  var status = documentFields.status,
      fieldToEdit = documentFields.fieldToEdit,
      editorType = documentFields.editor;
  var jsonEditorDefaultValue = (0, _react.useMemo)(function () {
    if (editorType === 'json') {
      return (0, _lib.deNormalize)(fields);
    }
  }, [editorType, fields]);
  var editor = editorType === 'json' ? _react.default.createElement(_fields_json_editor.DocumentFieldsJsonEditor, {
    defaultValue: jsonEditorDefaultValue
  }) : _react.default.createElement(_fields_tree_editor.DocumentFieldsTreeEditor, null);

  var renderEditField = function renderEditField() {
    if (status !== 'editingField') {
      return null;
    }

    var field = fields.byId[fieldToEdit];
    return _react.default.createElement(_fields.EditFieldContainer, {
      field: field,
      allFields: fields.byId
    });
  };

  var onSearchChange = (0, _react.useCallback)(function (value) {
    dispatch({
      type: 'search:update',
      value: value
    });
  }, [dispatch]);
  var searchTerm = search.term.trim();
  return _react.default.createElement("div", {
    "data-test-subj": "documentFields"
  }, _react.default.createElement(_document_fields_header.DocumentFieldsHeader, {
    searchValue: search.term,
    onSearchChange: onSearchChange
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), searchTerm !== '' ? _react.default.createElement(_search_fields.SearchResult, {
    result: search.result,
    documentFieldsState: documentFields
  }) : editor, renderEditField());
});

exports.DocumentFields = DocumentFields;