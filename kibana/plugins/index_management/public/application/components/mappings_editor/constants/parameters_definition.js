"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAMETERS_DEFINITION = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var t = _interopRequireWildcard(require("io-ts"));

var _eui = require("@elastic/eui");

var _shared_imports = require("../shared_imports");

var _documentation = require("../../../services/documentation");

var _default_values = require("./default_values");

var _data_types_definition = require("./data_types_definition");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toInt = _shared_imports.fieldFormatters.toInt;
var emptyField = _shared_imports.fieldValidators.emptyField,
    containsCharsField = _shared_imports.fieldValidators.containsCharsField,
    numberGreaterThanField = _shared_imports.fieldValidators.numberGreaterThanField;
var commonErrorMessages = {
  smallerThanZero: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.smallerZeroErrorMessage', {
    defaultMessage: 'The value must be greater or equal to 0.'
  }),
  spacesNotAllowed: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.spacesNotAllowedErrorMessage', {
    defaultMessage: 'Spaces are not allowed.'
  }),
  analyzerIsRequired: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.analyzerIsRequiredErrorMessage', {
    defaultMessage: 'Specify the custom analyzer name or choose a built-in analyzer.'
  })
};

var nullValueLabel = _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nullValueFieldLabel', {
  defaultMessage: 'Null value'
});

var nullValueValidateEmptyField = emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.nullValueIsRequiredErrorMessage', {
  defaultMessage: 'Null value is required.'
}));
var mapIndexToValue = ['true', true, 'false', false];
var indexOptionsConfig = {
  label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.indexOptionsLabel', {
    defaultMessage: 'Index options'
  }),
  helpText: function helpText() {
    return _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.indexOptionsHelpText",
      defaultMessage: "Information to store in the index. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getIndexOptionsLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.configuration.indexOptionsdDocumentationLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    });
  },
  type: _shared_imports.FIELD_TYPES.SUPER_SELECT
};
var fielddataFrequencyFilterParam = {
  fieldConfig: {
    defaultValue: {}
  },
  // Needed for "FieldParams" type
  props: {
    min_segment_size: {
      fieldConfig: {
        type: _shared_imports.FIELD_TYPES.NUMBER,
        label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.minSegmentSizeFieldLabel', {
          defaultMessage: 'Minimum segment size'
        }),
        defaultValue: 50,
        formatters: [toInt]
      }
    }
  },
  schema: t.record(t.union([t.literal('min'), t.literal('max'), t.literal('min_segment_size')]), t.number)
};
var analyzerValidations = [{
  validator: emptyField(commonErrorMessages.analyzerIsRequired)
}, {
  validator: containsCharsField({
    chars: ' ',
    message: commonErrorMessages.spacesNotAllowed
  })
}];
/**
 * Single source of truth for the parameters a user can change on _any_ field type.
 * It is also the single source of truth for the parameters default values.
 *
 * As a consequence, if a parameter is *not* declared here, we won't be able to declare it in the Json editor.
 */

var PARAMETERS_DEFINITION = {
  name: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nameFieldLabel', {
        defaultMessage: 'Field name'
      }),
      defaultValue: '',
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.nameIsRequiredErrorMessage', {
          defaultMessage: 'Give a name to the field.'
        }))
      }]
    }
  },
  type: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.typeFieldLabel', {
        defaultMessage: 'Field type'
      }),
      defaultValue: 'text',
      deserializer: function deserializer(fieldType) {
        if (typeof fieldType === 'string' && Boolean(fieldType)) {
          return [{
            label: _data_types_definition.TYPE_DEFINITION[fieldType] ? _data_types_definition.TYPE_DEFINITION[fieldType].label : fieldType,
            value: fieldType
          }];
        }

        return [];
      },
      serializer: function serializer(fieldType) {
        return fieldType && fieldType.length ? fieldType[0].value : fieldType;
      },
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.typeIsRequiredErrorMessage', {
          defaultMessage: 'Specify a field type.'
        }))
      }]
    },
    schema: t.string
  },
  store: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.CHECKBOX,
      defaultValue: false
    },
    schema: t.boolean
  },
  index: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.CHECKBOX,
      defaultValue: true
    },
    schema: t.boolean
  },
  doc_values: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  doc_values_binary: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  fielddata: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.CHECKBOX,
      defaultValue: false
    },
    schema: t.boolean
  },
  fielddata_frequency_filter: fielddataFrequencyFilterParam,
  fielddata_frequency_filter_percentage: _objectSpread({}, fielddataFrequencyFilterParam, {
    props: {
      min: {
        fieldConfig: {
          defaultValue: 0.01,
          serializer: function serializer(value) {
            return value === '' ? '' : toInt(value) / 100;
          },
          deserializer: function deserializer(value) {
            return Math.round(value * 100);
          }
        }
      },
      max: {
        fieldConfig: {
          defaultValue: 1,
          serializer: function serializer(value) {
            return value === '' ? '' : toInt(value) / 100;
          },
          deserializer: function deserializer(value) {
            return Math.round(value * 100);
          }
        }
      }
    }
  }),
  fielddata_frequency_filter_absolute: _objectSpread({}, fielddataFrequencyFilterParam, {
    props: {
      min: {
        fieldConfig: {
          defaultValue: 2,
          validations: [{
            validator: numberGreaterThanField({
              than: 1,
              message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.fieldDataFrequency.numberGreaterThanOneErrorMessage', {
                defaultMessage: 'Value must be greater than one.'
              })
            })
          }],
          formatters: [toInt]
        }
      },
      max: {
        fieldConfig: {
          defaultValue: 5,
          validations: [{
            validator: numberGreaterThanField({
              than: 1,
              message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.fieldDataFrequency.numberGreaterThanOneErrorMessage', {
                defaultMessage: 'Value must be greater than one.'
              })
            })
          }],
          formatters: [toInt]
        }
      }
    }
  }),
  coerce: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  coerce_shape: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  ignore_malformed: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  null_value: {
    fieldConfig: {
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.TEXT,
      label: nullValueLabel
    }
  },
  null_value_ip: {
    fieldConfig: {
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.TEXT,
      label: nullValueLabel,
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.nullValueIpHelpText', {
        defaultMessage: 'Accepts an IP address.'
      })
    }
  },
  null_value_numeric: {
    fieldConfig: {
      defaultValue: '',
      // Needed for FieldParams typing
      label: nullValueLabel,
      formatters: [toInt],
      validations: [{
        validator: nullValueValidateEmptyField
      }]
    },
    schema: t.number
  },
  null_value_boolean: {
    fieldConfig: {
      defaultValue: false,
      label: nullValueLabel,
      deserializer: function deserializer(value) {
        return mapIndexToValue.indexOf(value);
      },
      serializer: function serializer(value) {
        return mapIndexToValue[value];
      }
    },
    schema: t.union([t.literal(true), t.literal(false), t.literal('true'), t.literal('false')])
  },
  null_value_geo_point: {
    fieldConfig: {
      defaultValue: '',
      // Needed for FieldParams typing
      label: nullValueLabel,
      helpText: function helpText() {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.parameters.geoPointNullValueHelpText",
          defaultMessage: "Geo-points can be expressed as an object, string, geohash, array or {docsLink} POINT.",
          values: {
            docsLink: _react.default.createElement(_eui.EuiLink, {
              href: _documentation.documentationService.getWellKnownTextLink(),
              target: "_blank"
            }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.wellKnownTextDocumentationLink', {
              defaultMessage: 'Well-Known Text'
            }))
          }
        });
      },
      validations: [{
        validator: nullValueValidateEmptyField
      }],
      deserializer: function deserializer(value) {
        if (value === '') {
          return value;
        }

        return JSON.stringify(value);
      },
      serializer: function serializer(value) {
        try {
          return JSON.parse(value);
        } catch (error) {
          // swallow error and return non-parsed value;
          return value;
        }
      }
    },
    schema: t.any
  },
  copy_to: {
    fieldConfig: {
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.TEXT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.copyToLabel', {
        defaultMessage: 'Group field name'
      }),
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.copyToIsRequiredErrorMessage', {
          defaultMessage: 'Group field name is required.'
        }))
      }]
    },
    schema: t.string
  },
  max_input_length: {
    fieldConfig: {
      defaultValue: 50,
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.maxInputLengthLabel', {
        defaultMessage: 'Max input length'
      }),
      formatters: [toInt],
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.maxInputLengthFieldRequiredErrorMessage', {
          defaultMessage: 'Specify a max input length.'
        }))
      }]
    },
    schema: t.number
  },
  locale: {
    fieldConfig: {
      defaultValue: 'ROOT',
      type: _shared_imports.FIELD_TYPES.TEXT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.localeLabel', {
        defaultMessage: 'Locale'
      }),
      helpText: function helpText() {
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.idxMgmt.mappingsEditor.parameters.localeHelpText",
          defaultMessage: "Separate the language, country, and variant, use {hyphen} or {underscore}. A maximum of 2 separators is allowed. Example: {locale}.",
          values: {
            locale: _react.default.createElement(_eui.EuiCode, null, "en-US"),
            hyphen: _react.default.createElement(_eui.EuiCode, null, "-"),
            underscore: _react.default.createElement(_eui.EuiCode, null, "_")
          }
        });
      },
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.localeFieldRequiredErrorMessage', {
          defaultMessage: 'Specify a locale.'
        }))
      }]
    },
    schema: t.string
  },
  orientation: {
    fieldConfig: {
      defaultValue: 'ccw',
      type: _shared_imports.FIELD_TYPES.SUPER_SELECT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.orientationLabel', {
        defaultMessage: 'Orientation'
      })
    },
    schema: t.string
  },
  boost: {
    fieldConfig: {
      defaultValue: 1.0,
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.boostLabel', {
        defaultMessage: 'Boost level'
      }),
      formatters: [toInt],
      validations: [{
        validator: function validator(_ref) {
          var value = _ref.value;

          if (value < 0) {
            return {
              message: commonErrorMessages.smallerThanZero
            };
          }
        }
      }]
    },
    schema: t.number
  },
  scaling_factor: {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.scalingFactorFieldTitle', {
      defaultMessage: 'Scaling factor'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.scalingFactorFieldDescription', {
      defaultMessage: 'Values will be multiplied by this factor at index time and rounded to the closest long value. High factor values improve accuracy, but also increase space requirements.'
    }),
    fieldConfig: {
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.NUMBER,
      deserializer: function deserializer(value) {
        return value === '' ? value : +value;
      },
      formatters: [toInt],
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.scalingFactorLabel', {
        defaultMessage: 'Scaling factor'
      }),
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.scalingFactorIsRequiredErrorMessage', {
          defaultMessage: 'A scaling factor is required.'
        }))
      }, {
        validator: function validator(_ref2) {
          var value = _ref2.value;

          if (value <= 0) {
            return {
              message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.greaterThanZeroErrorMessage', {
                defaultMessage: 'The scaling factor must be greater than 0.'
              })
            };
          }
        }
      }],
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.scalingFactorHelpText', {
        defaultMessage: 'Value must be greater than 0.'
      })
    },
    schema: t.number
  },
  dynamic: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.union([t.boolean, t.literal('strict')])
  },
  dynamic_toggle: {
    fieldConfig: {
      defaultValue: true
    }
  },
  dynamic_strict: {
    fieldConfig: {
      defaultValue: false,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicStrictParameter.fieldTitle', {
        defaultMessage: 'Throw an exception when the object contains an unmapped property'
      }),
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dynamicStrictParameter.fieldHelpText', {
        defaultMessage: 'By default, unmapped properties will be silently ignored when dynamic mapping is disabled. Optionally, you can choose to throw an exception when an object contains an unmapped property.'
      })
    }
  },
  enabled: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  format: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.formatFieldLabel', {
        defaultMessage: 'Format'
      }),
      defaultValue: 'strict_date_optional_time||epoch_millis',
      serializer: function serializer(format) {
        return format.length ? format.map(function (_ref3) {
          var label = _ref3.label;
          return label;
        }).join('||') : undefined;
      },
      deserializer: function deserializer(formats) {
        return formats.split('||').map(function (format) {
          return {
            label: format
          };
        });
      },
      helpText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.mappingsEditor.formatHelpText",
        defaultMessage: "Specify custom formats using {dateSyntax} syntax.",
        values: {
          dateSyntax: _react.default.createElement(_eui.EuiCode, null, "yyyy/MM/dd")
        }
      })
    },
    schema: t.string
  },
  analyzer: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.analyzerFieldLabel', {
        defaultMessage: 'Analyzer'
      }),
      defaultValue: _default_values.INDEX_DEFAULT,
      validations: analyzerValidations
    },
    schema: t.string
  },
  search_analyzer: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.searchAnalyzerFieldLabel', {
        defaultMessage: 'Search analyzer'
      }),
      defaultValue: _default_values.INDEX_DEFAULT,
      validations: analyzerValidations
    },
    schema: t.string
  },
  search_quote_analyzer: {
    fieldConfig: {
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.searchQuoteAnalyzerFieldLabel', {
        defaultMessage: 'Search quote analyzer'
      }),
      defaultValue: _default_values.INDEX_DEFAULT,
      validations: analyzerValidations
    },
    schema: t.string
  },
  normalizer: {
    fieldConfig: {
      label: 'Normalizer',
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.TEXT,
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.normalizerIsRequiredErrorMessage', {
          defaultMessage: 'Normalizer name is required.'
        }))
      }, {
        validator: containsCharsField({
          chars: ' ',
          message: commonErrorMessages.spacesNotAllowed
        })
      }],
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.normalizerHelpText', {
        defaultMessage: "The name of a normalizer defined in the index's settings."
      })
    },
    schema: t.string
  },
  index_options: {
    fieldConfig: _objectSpread({}, indexOptionsConfig, {
      defaultValue: 'positions'
    }),
    schema: t.string
  },
  index_options_keyword: {
    fieldConfig: _objectSpread({}, indexOptionsConfig, {
      defaultValue: 'docs'
    }),
    schema: t.string
  },
  index_options_flattened: {
    fieldConfig: _objectSpread({}, indexOptionsConfig, {
      defaultValue: 'docs'
    }),
    schema: t.string
  },
  eager_global_ordinals: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  eager_global_ordinals_join: {
    fieldConfig: {
      defaultValue: true
    }
  },
  index_phrases: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  preserve_separators: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  preserve_position_increments: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  ignore_z_value: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  points_only: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  norms: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  norms_keyword: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  term_vector: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.SUPER_SELECT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.termVectorLabel', {
        defaultMessage: 'Set term vector'
      }),
      defaultValue: 'no'
    },
    schema: t.string
  },
  path: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.COMBO_BOX,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.pathLabel', {
        defaultMessage: 'Field path'
      }),
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.pathHelpText', {
        defaultMessage: 'The absolute path from the root to the target field.'
      }),
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.pathIsRequiredErrorMessage', {
          defaultMessage: 'Select a field to point the alias to.'
        }))
      }],
      serializer: function serializer(value) {
        return value.length === 0 ? '' : value[0].id;
      }
    },
    targetTypesNotAllowed: ['object', 'nested', 'alias'],
    schema: t.string
  },
  position_increment_gap: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.positionIncrementGapLabel', {
        defaultMessage: 'Position increment gap'
      }),
      defaultValue: 100,
      formatters: [toInt],
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.positionIncrementGapIsRequiredErrorMessage', {
          defaultMessage: 'Set a position increment gap value'
        }))
      }, {
        validator: function (_ref4) {
          var value = _ref4.value;

          if (value < 0) {
            return {
              message: commonErrorMessages.smallerThanZero
            };
          }
        }
      }]
    },
    schema: t.number
  },
  index_prefixes: {
    fieldConfig: {
      defaultValue: {}
    },
    // Needed for FieldParams typing
    props: {
      min_chars: {
        fieldConfig: {
          type: _shared_imports.FIELD_TYPES.NUMBER,
          defaultValue: 2,
          serializer: function serializer(value) {
            return value === '' ? '' : toInt(value);
          }
        }
      },
      max_chars: {
        fieldConfig: {
          type: _shared_imports.FIELD_TYPES.NUMBER,
          defaultValue: 5,
          serializer: function serializer(value) {
            return value === '' ? '' : toInt(value);
          }
        }
      }
    },
    schema: t.partial({
      min_chars: t.number,
      max_chars: t.number
    })
  },
  similarity: {
    fieldConfig: {
      defaultValue: 'BM25',
      type: _shared_imports.FIELD_TYPES.SUPER_SELECT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.similarityLabel', {
        defaultMessage: 'Similarity algorithm'
      })
    },
    schema: t.string
  },
  split_queries_on_whitespace: {
    fieldConfig: {
      defaultValue: false
    },
    schema: t.boolean
  },
  ignore_above: {
    fieldConfig: {
      // Protects against Lucene’s term byte-length limit of 32766. UTF-8 characters may occupy at
      // most 4 bytes, so 32766 / 4 = 8191 characters.
      defaultValue: 8191,
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoreAboveFieldLabel', {
        defaultMessage: 'Character length limit'
      }),
      formatters: [toInt],
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.ignoreAboveIsRequiredErrorMessage', {
          defaultMessage: 'Character length limit is required.'
        }))
      }, {
        validator: function (_ref5) {
          var value = _ref5.value;

          if (value < 0) {
            return {
              message: commonErrorMessages.smallerThanZero
            };
          }
        }
      }]
    },
    schema: t.number
  },
  enable_position_increments: {
    fieldConfig: {
      defaultValue: true
    },
    schema: t.boolean
  },
  depth_limit: {
    fieldConfig: {
      defaultValue: 20,
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.depthLimitFieldLabel', {
        defaultMessage: 'Nested object depth limit'
      }),
      formatters: [toInt],
      validations: [{
        validator: function (_ref6) {
          var value = _ref6.value;

          if (value < 0) {
            return {
              message: commonErrorMessages.smallerThanZero
            };
          }
        }
      }]
    },
    schema: t.number
  },
  dims: {
    fieldConfig: {
      defaultValue: '',
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dimsFieldLabel', {
        defaultMessage: 'Dimensions'
      }),
      helpText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.dimsHelpTextDescription', {
        defaultMessage: 'The number of dimensions in the vector.'
      }),
      formatters: [toInt],
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.dimsIsRequiredErrorMessage', {
          defaultMessage: 'Specify a dimension.'
        }))
      }]
    },
    schema: t.string
  },
  relations: {
    fieldConfig: {
      defaultValue: [] // Needed for FieldParams typing

    },
    schema: t.record(t.string, t.union([t.string, t.array(t.string)]))
  },
  max_shingle_size: {
    fieldConfig: {
      type: _shared_imports.FIELD_TYPES.SELECT,
      label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.largestShingleSizeFieldLabel', {
        defaultMessage: 'Max shingle size'
      }),
      defaultValue: 3,
      formatters: [toInt]
    },
    schema: t.union([t.literal(2), t.literal(3), t.literal(4)])
  }
};
exports.PARAMETERS_DEFINITION = PARAMETERS_DEFINITION;