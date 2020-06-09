"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFieldContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _shared_imports = require("../../../../shared_imports");

var _mappings_state = require("../../../../mappings_state");

var _lib = require("../../../../lib");

var _edit_field = require("./edit_field");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditFieldContainer = _react.default.memo(function (_ref) {
  var field = _ref.field,
      allFields = _ref.allFields;
  var dispatch = (0, _mappings_state.useDispatch)();

  var _useForm = (0, _shared_imports.useForm)({
    defaultValue: _objectSpread({}, field.source),
    serializer: _lib.fieldSerializer,
    deserializer: _lib.fieldDeserializer,
    options: {
      stripEmptyFields: false
    }
  }),
      form = _useForm.form;

  (0, _react.useEffect)(function () {
    var subscription = form.subscribe(function (updatedFieldForm) {
      dispatch({
        type: 'fieldForm.update',
        value: updatedFieldForm
      });
    });
    return subscription.unsubscribe;
  }, [form, dispatch]);
  var exitEdit = (0, _react.useCallback)(function () {
    dispatch({
      type: 'documentField.changeStatus',
      value: 'idle'
    });
  }, [dispatch]);
  return _react.default.createElement(_edit_field.EditField, {
    form: form,
    field: field,
    allFields: allFields,
    exitEdit: exitEdit
  });
});

exports.EditFieldContainer = EditFieldContainer;