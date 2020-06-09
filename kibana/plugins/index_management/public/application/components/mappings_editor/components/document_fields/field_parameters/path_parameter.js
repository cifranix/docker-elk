"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PathParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _constants = require("../../../constants");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var targetFieldTypeNotAllowed = _constants.PARAMETERS_DEFINITION.path.targetTypesNotAllowed;

var getSuggestedFields = function getSuggestedFields(allFields, currentField) {
  return Object.entries(allFields).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        id = _ref2[0],
        field = _ref2[1];

    if (currentField && id === currentField.id) {
      return false;
    } // An alias cannot point certain field types ("object", "nested", "alias")


    if (targetFieldTypeNotAllowed.includes(field.source.type)) {
      return false;
    }

    return true;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        id = _ref4[0],
        field = _ref4[1];

    return {
      id: id,
      label: field.path.join(' > ')
    };
  }).sort(function (a, b) {
    return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
  });
};

var getDeserializer = function getDeserializer(allFields) {
  return function (value) {
    if (typeof value === 'string' && Boolean(value)) {
      return [{
        id: value,
        label: allFields[value].path.join(' > ')
      }];
    }

    return [];
  };
};

var PathParameter = function PathParameter(_ref5) {
  var field = _ref5.field,
      allFields = _ref5.allFields;
  var suggestedFields = getSuggestedFields(allFields, field);
  return _react.default.createElement(_shared_imports.UseField, {
    path: "path",
    config: _objectSpread({}, (0, _lib.getFieldConfig)('path'), {
      deserializer: getDeserializer(allFields)
    })
  }, function (pathField) {
    var error = pathField.getErrorsMessages();
    var isInvalid = error ? Boolean(error.length) : false;
    return _react.default.createElement(_edit_field.EditFieldFormRow, {
      title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.aliasType.aliasTargetFieldTitle', {
        defaultMessage: 'Alias target'
      }),
      description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.aliasType.aliasTargetFieldDescription', {
        defaultMessage: 'Select the field you want your alias to point to. You will then be able to use the alias instead of the target field in search requests, and selected other APIs like field capabilities.'
      }),
      withToggle: false
    }, _react.default.createElement(_react.default.Fragment, null, !Boolean(suggestedFields.length) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      color: "warning"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.aliasType.noFieldsAddedWarningMessage', {
      defaultMessage: 'You need to add at least one field before creating an alias.'
    }))), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFormRow, {
      label: pathField.label,
      helpText: pathField.helpText,
      error: error,
      isInvalid: isInvalid,
      fullWidth: true
    }, _react.default.createElement(_eui.EuiComboBox, {
      placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.aliasType.pathPlaceholderLabel', {
        defaultMessage: 'Select a field'
      }),
      singleSelection: {
        asPlainText: true
      },
      options: suggestedFields,
      selectedOptions: pathField.value,
      onChange: function onChange(value) {
        return pathField.setValue(value);
      },
      isClearable: false,
      fullWidth: true
    }))));
  });
};

exports.PathParameter = PathParameter;