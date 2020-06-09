"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_DATE_FORMAT_OPTIONS = exports.PARAMETERS_OPTIONS = exports.getSuperSelectOption = exports.FIELD_TYPES_OPTIONS = exports.TYPE_NOT_ALLOWED_MULTIFIELD = exports.TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _field_options_i18n = require("./field_options_i18n");

var _default_values = require("./default_values");

var _data_types_definition = require("./data_types_definition");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL = ['join'];
exports.TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL = TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL;
var TYPE_NOT_ALLOWED_MULTIFIELD = [].concat(TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL, ['object', 'nested', 'alias']);
exports.TYPE_NOT_ALLOWED_MULTIFIELD = TYPE_NOT_ALLOWED_MULTIFIELD;
var FIELD_TYPES_OPTIONS = Object.entries(_data_types_definition.MAIN_DATA_TYPE_DEFINITION).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      dataType = _ref2[0],
      label = _ref2[1].label;

  return {
    value: dataType,
    label: label
  };
});
exports.FIELD_TYPES_OPTIONS = FIELD_TYPES_OPTIONS;

var getSuperSelectOption = function getSuperSelectOption(title, description) {
  return {
    inputDisplay: title,
    dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, title), _react.default.createElement(_eui.EuiText, {
      size: "s",
      color: "subdued"
    }, _react.default.createElement("p", {
      className: "euiTextColor--subdued"
    }, description)))
  };
};

exports.getSuperSelectOption = getSuperSelectOption;

var getOptionTexts = function getOptionTexts(option) {
  return getSuperSelectOption(_field_options_i18n.FIELD_OPTIONS_TEXTS[option].title, _field_options_i18n.FIELD_OPTIONS_TEXTS[option].description);
};

var PARAMETERS_OPTIONS = {
  index_options: [_objectSpread({
    value: 'docs'
  }, getOptionTexts('indexOptions.docs')), _objectSpread({
    value: 'freqs'
  }, getOptionTexts('indexOptions.freqs')), _objectSpread({
    value: 'positions'
  }, getOptionTexts('indexOptions.positions')), _objectSpread({
    value: 'offsets'
  }, getOptionTexts('indexOptions.offsets'))],
  index_options_flattened: [_objectSpread({
    value: 'docs'
  }, getOptionTexts('indexOptions.docs')), _objectSpread({
    value: 'freqs'
  }, getOptionTexts('indexOptions.freqs'))],
  index_options_keyword: [_objectSpread({
    value: 'docs'
  }, getOptionTexts('indexOptions.docs')), _objectSpread({
    value: 'freqs'
  }, getOptionTexts('indexOptions.freqs'))],
  analyzer: [_objectSpread({
    value: _default_values.INDEX_DEFAULT
  }, getOptionTexts('analyzer.indexDefault')), _objectSpread({
    value: _default_values.STANDARD
  }, getOptionTexts('analyzer.standard')), _objectSpread({
    value: 'simple'
  }, getOptionTexts('analyzer.simple')), _objectSpread({
    value: 'whitespace'
  }, getOptionTexts('analyzer.whitespace')), _objectSpread({
    value: 'stop'
  }, getOptionTexts('analyzer.stop')), _objectSpread({
    value: 'keyword'
  }, getOptionTexts('analyzer.keyword')), _objectSpread({
    value: 'pattern'
  }, getOptionTexts('analyzer.pattern')), _objectSpread({
    value: 'fingerprint'
  }, getOptionTexts('analyzer.fingerprint')), _objectSpread({
    value: 'language'
  }, getOptionTexts('analyzer.language'))],
  languageAnalyzer: Object.entries(_field_options_i18n.LANGUAGE_OPTIONS_TEXT).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        value = _ref4[0],
        text = _ref4[1];

    return {
      value: value,
      text: text
    };
  }),
  similarity: [_objectSpread({
    value: 'BM25'
  }, getOptionTexts('similarity.bm25')), _objectSpread({
    value: 'boolean'
  }, getOptionTexts('similarity.boolean'))],
  term_vector: [_objectSpread({
    value: 'no'
  }, getOptionTexts('termVector.no')), _objectSpread({
    value: 'yes'
  }, getOptionTexts('termVector.yes')), _objectSpread({
    value: 'with_positions'
  }, getOptionTexts('termVector.withPositions')), _objectSpread({
    value: 'with_offsets'
  }, getOptionTexts('termVector.withOffsets')), _objectSpread({
    value: 'with_positions_offsets'
  }, getOptionTexts('termVector.withPositionsOffsets')), _objectSpread({
    value: 'with_positions_payloads'
  }, getOptionTexts('termVector.withPositionsPayloads')), _objectSpread({
    value: 'with_positions_offsets_payloads'
  }, getOptionTexts('termVector.withPositionsOffsetsPayloads'))],
  orientation: [_objectSpread({
    value: 'ccw'
  }, getOptionTexts('orientation.counterclockwise')), _objectSpread({
    value: 'cw'
  }, getOptionTexts('orientation.clockwise'))]
};
exports.PARAMETERS_OPTIONS = PARAMETERS_OPTIONS;
var DATE_FORMATS = [{
  label: 'epoch_millis'
}, {
  label: 'epoch_second'
}, {
  label: 'date_optional_time',
  strict: true
}, {
  label: 'basic_date'
}, {
  label: 'basic_date_time'
}, {
  label: 'basic_date_time_no_millis'
}, {
  label: 'basic_ordinal_date'
}, {
  label: 'basic_ordinal_date_time'
}, {
  label: 'basic_ordinal_date_time_no_millis'
}, {
  label: 'basic_time'
}, {
  label: 'basic_time_no_millis'
}, {
  label: 'basic_t_time'
}, {
  label: 'basic_t_time_no_millis'
}, {
  label: 'basic_week_date',
  strict: true
}, {
  label: 'basic_week_date_time',
  strict: true
}, {
  label: 'basic_week_date_time_no_millis',
  strict: true
}, {
  label: 'date',
  strict: true
}, {
  label: 'date_hour',
  strict: true
}, {
  label: 'date_hour_minute',
  strict: true
}, {
  label: 'date_hour_minute_second',
  strict: true
}, {
  label: 'date_hour_minute_second_fraction',
  strict: true
}, {
  label: 'date_hour_minute_second_millis',
  strict: true
}, {
  label: 'date_time',
  strict: true
}, {
  label: 'date_time_no_millis',
  strict: true
}, {
  label: 'hour',
  strict: true
}, {
  label: 'hour_minute ',
  strict: true
}, {
  label: 'hour_minute_second',
  strict: true
}, {
  label: 'hour_minute_second_fraction',
  strict: true
}, {
  label: 'hour_minute_second_millis',
  strict: true
}, {
  label: 'ordinal_date',
  strict: true
}, {
  label: 'ordinal_date_time',
  strict: true
}, {
  label: 'ordinal_date_time_no_millis',
  strict: true
}, {
  label: 'time',
  strict: true
}, {
  label: 'time_no_millis',
  strict: true
}, {
  label: 't_time',
  strict: true
}, {
  label: 't_time_no_millis',
  strict: true
}, {
  label: 'week_date',
  strict: true
}, {
  label: 'week_date_time',
  strict: true
}, {
  label: 'week_date_time_no_millis',
  strict: true
}, {
  label: 'weekyear',
  strict: true
}, {
  label: 'weekyear_week',
  strict: true
}, {
  label: 'weekyear_week_day',
  strict: true
}, {
  label: 'year',
  strict: true
}, {
  label: 'year_month',
  strict: true
}, {
  label: 'year_month_day',
  strict: true
}];
var STRICT_DATE_FORMAT_OPTIONS = DATE_FORMATS.filter(function (format) {
  return format.strict;
}).map(function (_ref5) {
  var label = _ref5.label;
  return {
    label: "strict_".concat(label)
  };
});
var DATE_FORMAT_OPTIONS = DATE_FORMATS.map(function (_ref6) {
  var label = _ref6.label;
  return {
    label: label
  };
});
var ALL_DATE_FORMAT_OPTIONS = [].concat(_toConsumableArray(DATE_FORMAT_OPTIONS), _toConsumableArray(STRICT_DATE_FORMAT_OPTIONS));
exports.ALL_DATE_FORMAT_OPTIONS = ALL_DATE_FORMAT_OPTIONS;