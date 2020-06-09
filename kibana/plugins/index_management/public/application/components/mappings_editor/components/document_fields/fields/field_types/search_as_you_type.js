"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchAsYouType = void 0;

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'similarity':
    case 'term_vector':
    case 'max_shingle_size':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'analyzers':
      {
        return field.search_analyzer !== undefined && field.search_analyzer !== field.analyzer;
      }

    default:
      return false;
  }
};

var SearchAsYouType = _react.default.memo(function (_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    config: _objectSpread({}, (0, _lib.getFieldConfig)('index_options'), {
      defaultValue: 'positions'
    })
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.AnalyzersParameter, {
    field: field,
    withSearchQuoteAnalyzer: true
  }), _react.default.createElement(_field_parameters.MaxShingleSizeParameter, {
    defaultToggleValue: getDefaultToggleValue('max_shingle_size', field.source)
  }), _react.default.createElement(_field_parameters.NormsParameter, null), _react.default.createElement(_field_parameters.SimilarityParameter, {
    defaultToggleValue: getDefaultToggleValue('similarity', field.source)
  }), _react.default.createElement(_field_parameters.TermVectorParameter, {
    field: field,
    defaultToggleValue: getDefaultToggleValue('term_vector', field.source)
  }), _react.default.createElement(_field_parameters.StoreParameter, null)));
});

exports.SearchAsYouType = SearchAsYouType;