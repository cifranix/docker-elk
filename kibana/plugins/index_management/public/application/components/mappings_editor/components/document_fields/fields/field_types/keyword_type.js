"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeywordType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../../services/documentation");

var _shared_imports = require("../../../../shared_imports");

var _lib = require("../../../../lib");

var _constants = require("../../../../constants");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'boost':
    case 'similarity':
    case 'ignore_above':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'normalizer':
    case 'copy_to':
    case 'null_value':
      {
        return field[param] !== undefined;
      }

    default:
      return false;
  }
};

var KeywordType = function KeywordType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    config: _objectSpread({}, (0, _lib.getFieldConfig)('index_options_keyword')),
    indexOptions: _constants.PARAMETERS_OPTIONS.index_options_keyword
  }), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.normalizerFieldTitle', {
      defaultMessage: 'Use normalizer'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.normalizerFieldDescription', {
      defaultMessage: 'Process the keyword prior to indexing.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.normalizerDocLinkText', {
        defaultMessage: 'Normalizer documentation'
      }),
      href: _documentation.documentationService.getNormalizerLink()
    },
    defaultToggleValue: getDefaultToggleValue('normalizer', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "normalizer",
    config: (0, _lib.getFieldConfig)('normalizer'),
    component: _shared_imports.Field
  }))), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.EagerGlobalOrdinalsParameter, null), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.lengthLimitFieldTitle', {
      defaultMessage: 'Set length limit'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.lengthLimitFieldDescription', {
      defaultMessage: 'Strings longer than this value will not be indexed. This is useful for protecting against Lucene’s term character-length limit of 8,191 UTF-8 characters.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.ignoreAboveDocLinkText', {
        defaultMessage: 'Ignore above documentation'
      }),
      href: _documentation.documentationService.getIgnoreAboveLink()
    },
    defaultToggleValue: getDefaultToggleValue('ignore_above', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "ignore_above",
    config: (0, _lib.getFieldConfig)('ignore_above'),
    component: _shared_imports.Field
  })), _react.default.createElement(_field_parameters.NormsParameter, {
    configPath: "norms_keyword"
  }), _react.default.createElement(_field_parameters.SimilarityParameter, {
    defaultToggleValue: getDefaultToggleValue('similarity', field.source)
  }), _react.default.createElement(_field_parameters.SplitQueriesOnWhitespaceParameter, null), _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.CopyToParameter, {
    defaultToggleValue: getDefaultToggleValue('copy_to', field.source)
  }), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source)
  }), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.KeywordType = KeywordType;