"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenCountType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../../services/documentation");

var _lib = require("../../../../lib");

var _constants = require("../../../../constants");

var _shared_imports = require("../../../../shared_imports");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'analyzer':
    case 'boost':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'null_value':
      {
        return field.null_value !== undefined && field.null_value !== '';
      }

    default:
      return false;
  }
};

var TokenCountType = function TokenCountType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.analyzerSectionTitle', {
      defaultMessage: 'Analyzer'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.analyzerLinkText', {
        defaultMessage: 'Analyzer documentation'
      }),
      href: _documentation.documentationService.getAnalyzerLink()
    },
    withToggle: false
  }, _react.default.createElement(_field_parameters.AnalyzerParameter, {
    path: "analyzer",
    config: _objectSpread({}, (0, _lib.getFieldConfig)('analyzer'), {
      defaultValue: _constants.STANDARD
    }) // If "field.source.analyzer" is undefined, defaults to "standard" analyzer
    ,
    defaultValue: field.source.analyzer,
    allowsIndexDefaultOption: false
  })), _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.enablePositionIncrementsFieldTitle', {
      defaultMessage: 'Enable position increments'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.enablePositionIncrementsFieldDescription', {
      defaultMessage: 'Whether to count position increments.'
    }),
    formFieldPath: "enable_position_increments"
  }), _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.tokenCount.nullValueFieldDescription', {
      defaultMessage: 'Accepts a numeric value of the same type as the field which is substituted for any explicit null values.'
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    component: _shared_imports.NumericField,
    config: (0, _lib.getFieldConfig)('null_value_numeric')
  })), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.TokenCountType = TokenCountType;