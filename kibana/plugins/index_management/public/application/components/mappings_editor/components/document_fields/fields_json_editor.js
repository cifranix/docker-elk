"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentFieldsJsonEditor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _mappings_state = require("../../mappings_state");

var _shared_imports = require("../../shared_imports");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocumentFieldsJsonEditor = function DocumentFieldsJsonEditor(_ref) {
  var defaultValue = _ref.defaultValue;
  var dispatch = (0, _mappings_state.useDispatch)();
  var defaultValueRef = (0, _react.useRef)(defaultValue);
  var onUpdate = (0, _react.useCallback)(function (_ref2) {
    var data = _ref2.data,
        isValid = _ref2.isValid;
    return dispatch({
      type: 'fieldsJsonEditor.update',
      value: {
        json: data.format(),
        isValid: isValid
      }
    });
  }, [dispatch]);
  return _react.default.createElement(_shared_imports.JsonEditor, {
    onUpdate: onUpdate,
    defaultValue: defaultValueRef.current
  });
};

exports.DocumentFieldsJsonEditor = DocumentFieldsJsonEditor;