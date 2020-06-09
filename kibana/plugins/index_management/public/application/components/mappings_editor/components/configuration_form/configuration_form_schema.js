"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurationFormSchema = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../services/documentation");

var _shared_imports = require("../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var containsCharsField = _shared_imports.fieldValidators.containsCharsField,
    isJsonField = _shared_imports.fieldValidators.isJsonField;
var fieldPathComboBoxConfig = {
  helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.sourceFieldPathComboBoxHelpText', {
    defaultMessage: 'Accepts a path to the field, including wildcards.'
  }),
  type: _shared_imports.FIELD_TYPES.COMBO_BOX,
  defaultValue: [],
  serializer: function serializer(options) {
    return options.map(function (_ref) {
      var label = _ref.label;
      return label;
    });
  },
  deserializer: function deserializer(values) {
    return values.map(function (value) {
      return {
        label: value
      };
    });
  }
};
var configurationFormSchema = {
  metaField: {
    label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.metaFieldEditorLabel', {
      defaultMessage: '_meta field data'
    }),
    helpText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.configuration.metaFieldEditorHelpText",
      defaultMessage: "Use JSON format: {code}",
      values: {
        code: _react.default.createElement(_eui.EuiCode, null, JSON.stringify({
          arbitrary_data: 'anything_goes'
        }))
      }
    }),
    validations: [{
      validator: isJsonField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.metaFieldEditorJsonError', {
        defaultMessage: 'The _meta field JSON is not valid.'
      }))
    }]
  },
  sourceField: {
    enabled: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.sourceFieldLabel', {
        defaultMessage: 'Enable _source field'
      }),
      type: _shared_imports.FIELD_TYPES.TOGGLE,
      defaultValue: true
    },
    includes: _objectSpread({
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.includeSourceFieldsLabel', {
        defaultMessage: 'Include fields'
      })
    }, fieldPathComboBoxConfig),
    excludes: _objectSpread({
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.excludeSourceFieldsLabel', {
        defaultMessage: 'Exclude fields'
      })
    }, fieldPathComboBoxConfig)
  },
  dynamicMapping: {
    enabled: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.enableDynamicMappingsLabel', {
        defaultMessage: 'Enable dynamic mapping'
      }),
      type: _shared_imports.FIELD_TYPES.TOGGLE,
      defaultValue: true
    },
    throwErrorsForUnmappedFields: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.throwErrorsForUnmappedFieldsLabel', {
        defaultMessage: 'Throw an exception when a document contains an unmapped field'
      }),
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.dynamicMappingStrictHelpText', {
        defaultMessage: 'By default, unmapped fields will be silently ignored when dynamic mapping is disabled. Optionally, you can choose to throw an exception when a document contains an unmapped field.'
      }),
      type: _shared_imports.FIELD_TYPES.CHECKBOX,
      defaultValue: false
    },
    numeric_detection: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.numericFieldLabel', {
        defaultMessage: 'Map numeric strings as numbers'
      }),
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.numericFieldDescription', {
        defaultMessage: 'For example, "1.0" would be mapped as a float and "1" would be mapped as an integer.'
      }),
      type: _shared_imports.FIELD_TYPES.TOGGLE,
      defaultValue: false
    },
    date_detection: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.dateDetectionFieldLabel', {
        defaultMessage: 'Map date strings as dates'
      }),
      type: _shared_imports.FIELD_TYPES.TOGGLE,
      defaultValue: true
    },
    dynamic_date_formats: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.dynamicDatesFieldLabel', {
        defaultMessage: 'Date formats'
      }),
      helpText: function helpText() {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.configuration.dynamicDatesFieldHelpText",
          defaultMessage: "Strings in these formats will be mapped as dates. You can use built-in formats or custom formats. {docsLink}",
          values: {
            docsLink: _react.default.createElement(_eui.EuiLink, {
              href: _documentation.documentationService.getDateFormatLink(),
              target: "_blank"
            }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.dynamicDatesFieldDocumentionLink', {
              defaultMessage: 'Learn more.'
            }))
          }
        });
      },
      type: _shared_imports.FIELD_TYPES.COMBO_BOX,
      defaultValue: ['strict_date_optional_time', 'yyyy/MM/dd HH:mm:ss Z||yyyy/MM/dd Z'],
      validations: [{
        validator: containsCharsField({
          message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.dynamicDatesFieldValidationErrorMessage', {
            defaultMessage: 'Spaces are not allowed.'
          }),
          chars: ' '
        }),
        type: _shared_imports.VALIDATION_TYPES.ARRAY_ITEM
      }]
    }
  },
  _routing: {
    required: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.routingLabel', {
        defaultMessage: 'Require _routing value for CRUD operations'
      }),
      defaultValue: false
    }
  }
};
exports.configurationFormSchema = configurationFormSchema;