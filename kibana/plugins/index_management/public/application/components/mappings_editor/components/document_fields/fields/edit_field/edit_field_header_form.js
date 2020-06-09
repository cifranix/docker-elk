"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFieldHeaderForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

var _constants = require("../../../../constants");

var _field_parameters = require("../../field_parameters");

var _field_description_section = require("./field_description_section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EditFieldHeaderForm = _react.default.memo(function (_ref) {
  var _typeDefinition$descr;

  var type = _ref.type,
      defaultValue = _ref.defaultValue,
      isRootLevelField = _ref.isRootLevelField,
      isMultiField = _ref.isMultiField;
  var typeDefinition = _constants.TYPE_DEFINITION[type];
  var hasSubType = typeDefinition.subTypes !== undefined;
  var form = (0, _shared_imports.useFormContext)();
  var subTypeOptions = hasSubType ? typeDefinition.subTypes.types.map(function (_subType) {
    return _constants.TYPE_DEFINITION[_subType];
  }).map(function (_subType) {
    return {
      value: _subType.value,
      label: _subType.label
    };
  }) : undefined;
  var defaultValueSubType = hasSubType ? typeDefinition.subTypes.types.includes(defaultValue.type) ? defaultValue.type // we use the default value provided
  : typeDefinition.subTypes.types[0] // we set the first item from the subType array
  : undefined;

  var onTypeChange = function onTypeChange(value) {
    if (value.length) {
      form.setFieldValue('type', value);
      var nextTypeDefinition = _constants.TYPE_DEFINITION[value[0].value];

      if (nextTypeDefinition.subTypes !== undefined) {
        /**
         * We need to manually set the subType field value because if we edit a field type that already has a subtype
         * (e.g. "numeric" with subType "float"), and we change the type to another one that also has subTypes (e.g. "range"),
         * the old value would be kept on the subType.
         */
        var subTypeValue = nextTypeDefinition.subTypes.types[0];
        form.setFieldValue('subType', [_constants.TYPE_DEFINITION[subTypeValue]]);
      }
    }
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.NameParameter, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.TypeParameter, {
    isRootLevelField: isRootLevelField,
    isMultiField: isMultiField,
    onTypeChange: onTypeChange
  })), type === 'other' && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_field_parameters.OtherTypeNameParameter, null)), hasSubType && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_shared_imports.UseField, {
    path: "subType",
    config: _objectSpread({}, (0, _lib.getFieldConfig)('type'), {
      label: typeDefinition.subTypes.label,
      defaultValue: defaultValueSubType
    })
  }, function (subTypeField) {
    return _react.default.createElement(_eui.EuiFormRow, {
      label: subTypeField.label
    }, _react.default.createElement(_eui.EuiComboBox, {
      placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.subTypeField.placeholderLabel', {
        defaultMessage: 'Select a type'
      }),
      singleSelection: {
        asPlainText: true
      },
      options: isMultiField ? (0, _lib.filterTypesForMultiField)(subTypeOptions) : isRootLevelField ? subTypeOptions : (0, _lib.filterTypesForNonRootFields)(subTypeOptions),
      selectedOptions: subTypeField.value,
      onChange: function onChange(subType) {
        return subTypeField.setValue(subType);
      },
      isClearable: false
    }));
  }))), _react.default.createElement(_field_description_section.FieldDescriptionSection, {
    isMultiField: isMultiField
  }, hasSubType ? _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "subType"
  }, function (formData) {
    if (formData.subType) {
      var _ref2, _subTypeDefinition$de;

      var subTypeDefinition = _constants.TYPE_DEFINITION[formData.subType];
      return (_ref2 = subTypeDefinition === null || subTypeDefinition === void 0 ? void 0 : (_subTypeDefinition$de = subTypeDefinition.description) === null || _subTypeDefinition$de === void 0 ? void 0 : _subTypeDefinition$de.call(subTypeDefinition)) !== null && _ref2 !== void 0 ? _ref2 : null;
    }

    return null;
  }) : (_typeDefinition$descr = typeDefinition.description) === null || _typeDefinition$descr === void 0 ? void 0 : _typeDefinition$descr.call(typeDefinition)));
});

exports.EditFieldHeaderForm = EditFieldHeaderForm;