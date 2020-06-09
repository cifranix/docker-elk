"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentFieldsTreeEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _mappings_state = require("../../mappings_state");

var _fields = require("./fields");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocumentFieldsTreeEditor = function DocumentFieldsTreeEditor() {
  var dispatch = (0, _mappings_state.useDispatch)();

  var _useMappingsState = (0, _mappings_state.useMappingsState)(),
      _useMappingsState$fie = _useMappingsState.fields,
      byId = _useMappingsState$fie.byId,
      rootLevelFields = _useMappingsState$fie.rootLevelFields,
      _useMappingsState$doc = _useMappingsState.documentFields,
      status = _useMappingsState$doc.status,
      fieldToAddFieldTo = _useMappingsState$doc.fieldToAddFieldTo;

  var getField = (0, _react.useCallback)(function (fieldId) {
    return byId[fieldId];
  }, [byId]);
  var fields = (0, _react.useMemo)(function () {
    return rootLevelFields.map(getField);
  }, [rootLevelFields, getField]);
  var addField = (0, _react.useCallback)(function () {
    dispatch({
      type: 'documentField.createField'
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    /**
     * If there aren't any fields yet, we display the create field form
     */
    if (status === 'idle' && fields.length === 0) {
      addField();
    }
  }, [addField, fields, status]);

  var renderCreateField = function renderCreateField() {
    // The "fieldToAddFieldTo" is undefined when adding to the top level "properties" object.
    var isCreateFieldFormVisible = status === 'creatingField' && fieldToAddFieldTo === undefined;

    if (!isCreateFieldFormVisible) {
      return null;
    }

    return _react.default.createElement(_fields.CreateField, {
      isCancelable: fields.length > 0,
      allFields: byId,
      isRootLevelField: true
    });
  };

  var renderAddFieldButton = function renderAddFieldButton() {
    var isDisabled = status !== 'idle';
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiButtonEmpty, {
      disabled: isDisabled,
      onClick: addField,
      iconType: "plusInCircleFilled",
      "data-test-subj": "addFieldButton"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.addFieldButtonLabel', {
      defaultMessage: 'Add field'
    })));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_fields.FieldsList, {
    fields: fields
  }), renderCreateField(), renderAddFieldButton());
};

exports.DocumentFieldsTreeEditor = DocumentFieldsTreeEditor;