"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemas = exports.nameConfigWithoutValidations = exports.nameConfig = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _shared_imports = require("../../../shared_imports");

var _constants = require("../../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyField = _shared_imports.fieldValidators.emptyField,
    containsCharsField = _shared_imports.fieldValidators.containsCharsField,
    startsWithField = _shared_imports.fieldValidators.startsWithField,
    indexPatternField = _shared_imports.fieldValidators.indexPatternField,
    lowerCaseStringField = _shared_imports.fieldValidators.lowerCaseStringField;
var toInt = _shared_imports.fieldFormatters.toInt;

var indexPatternInvalidCharacters = _constants.INVALID_INDEX_PATTERN_CHARS.join(' ');

var nameConfig = {
  type: _shared_imports.FIELD_TYPES.TEXT,
  label: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.fieldNameLabel', {
    defaultMessage: 'Name'
  }),
  validations: [{
    validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNameRequiredError', {
      defaultMessage: 'A template name is required.'
    }))
  }, {
    validator: containsCharsField({
      chars: ' ',
      message: _i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNameSpacesError', {
        defaultMessage: 'Spaces are not allowed in a template name.'
      })
    })
  }, {
    validator: startsWithField({
      char: '_',
      message: _i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNameUnderscoreError', {
        defaultMessage: 'A template name must not start with an underscore.'
      })
    })
  }, {
    validator: startsWithField({
      char: '.',
      message: _i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNamePeriodError', {
        defaultMessage: 'A template name must not start with a period.'
      })
    })
  }, {
    validator: containsCharsField({
      chars: _constants.INVALID_TEMPLATE_NAME_CHARS,
      message: function message(_ref) {
        var charsFound = _ref.charsFound;
        return _i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNameInvalidaCharacterError', {
          defaultMessage: 'A template name must not contain the character "{invalidChar}"',
          values: {
            invalidChar: charsFound[0]
          }
        });
      }
    })
  }, {
    validator: lowerCaseStringField(_i18n.i18n.translate('xpack.idxMgmt.templateValidation.templateNameLowerCaseRequiredError', {
      defaultMessage: 'The template name must be in lowercase.'
    }))
  }]
};
exports.nameConfig = nameConfig;

var nameConfigWithoutValidations = _objectSpread({}, nameConfig, {
  validations: []
});

exports.nameConfigWithoutValidations = nameConfigWithoutValidations;
var schemas = {
  logistics: {
    name: nameConfig,
    indexPatterns: {
      type: _shared_imports.FIELD_TYPES.COMBO_BOX,
      defaultValue: [],
      label: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.fieldIndexPatternsLabel', {
        defaultMessage: 'Index patterns'
      }),
      helpText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.idxMgmt.templateForm.stepLogistics.fieldIndexPatternsHelpText",
        defaultMessage: "Spaces and the characters {invalidCharactersList} are not allowed.",
        values: {
          invalidCharactersList: _react.default.createElement("strong", null, indexPatternInvalidCharacters)
        }
      }),
      validations: [{
        validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.templateValidation.indexPatternsRequiredError', {
          defaultMessage: 'At least one index pattern is required.'
        }))
      }, {
        validator: indexPatternField(_i18n.i18n),
        type: _shared_imports.VALIDATION_TYPES.ARRAY_ITEM
      }]
    },
    order: {
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.fieldOrderLabel', {
        defaultMessage: 'Order (optional)'
      }),
      formatters: [toInt]
    },
    version: {
      type: _shared_imports.FIELD_TYPES.NUMBER,
      label: _i18n.i18n.translate('xpack.idxMgmt.templateForm.stepLogistics.fieldVersionLabel', {
        defaultMessage: 'Version (optional)'
      }),
      formatters: [toInt]
    }
  }
};
exports.schemas = schemas;