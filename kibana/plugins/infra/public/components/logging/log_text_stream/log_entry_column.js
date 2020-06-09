"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useColumnWidths = exports.getColumnWidths = exports.iconColumnId = exports.LogEntryColumnContent = exports.LogEntryColumn = void 0;

var _react = require("react");

var _public = require("../../../../../observability/public");

var _source_configuration = require("../../../utils/source_configuration");

var _formatted_time = require("../../formatted_time");

var _text_styles = require("./text_styles");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  padding: 2px ", "px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-items: stretch;\n  display: flex;\n  flex-basis: ", ";\n  flex-direction: row;\n  flex-grow: ", ";\n  flex-shrink: ", ";\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DATE_COLUMN_SLACK_FACTOR = 1.1;
var FIELD_COLUMN_MIN_WIDTH_CHARACTERS = 10;
var DETAIL_FLYOUT_ICON_MIN_WIDTH = 32;
var COLUMN_PADDING = 8;

var LogEntryColumn = _public.euiStyled.div.attrs(function () {
  return {
    role: 'cell'
  };
})(_templateObject(), function (props) {
  return props.baseWidth || '0%';
}, function (props) {
  return props.growWeight || 0;
}, function (props) {
  return props.shrinkWeight || 0;
});

exports.LogEntryColumn = LogEntryColumn;

var LogEntryColumnContent = _public.euiStyled.div(_templateObject2(), COLUMN_PADDING);

exports.LogEntryColumnContent = LogEntryColumnContent;
var iconColumnId = Symbol('iconColumnId');
exports.iconColumnId = iconColumnId;

var getColumnWidths = function getColumnWidths(columns, characterWidth, formattedDateWidth) {
  return columns.reduce(function (columnWidths, column) {
    if ((0, _source_configuration.isTimestampLogColumnConfiguration)(column)) {
      return _objectSpread({}, columnWidths, _defineProperty({}, column.timestampColumn.id, {
        growWeight: 0,
        shrinkWeight: 0,
        baseWidth: "".concat(Math.ceil(characterWidth * formattedDateWidth * DATE_COLUMN_SLACK_FACTOR) + 2 * COLUMN_PADDING, "px")
      }));
    } else if ((0, _source_configuration.isMessageLogColumnConfiguration)(column)) {
      return _objectSpread({}, columnWidths, _defineProperty({}, column.messageColumn.id, {
        growWeight: 5,
        shrinkWeight: 0,
        baseWidth: '0%'
      }));
    } else {
      return _objectSpread({}, columnWidths, _defineProperty({}, column.fieldColumn.id, {
        growWeight: 1,
        shrinkWeight: 0,
        baseWidth: "".concat(Math.ceil(characterWidth * FIELD_COLUMN_MIN_WIDTH_CHARACTERS) + 2 * COLUMN_PADDING, "px")
      }));
    }
  }, _defineProperty({}, iconColumnId, {
    growWeight: 0,
    shrinkWeight: 0,
    baseWidth: "".concat(DETAIL_FLYOUT_ICON_MIN_WIDTH + 2 * COLUMN_PADDING, "px")
  }));
};
/**
 * This hook calculates the column widths based on the given configuration. It
 * depends on the `CharacterDimensionsProbe` it returns being rendered so it can
 * measure the monospace character size.
 */


exports.getColumnWidths = getColumnWidths;

var useColumnWidths = function useColumnWidths(_ref) {
  var columnConfigurations = _ref.columnConfigurations,
      scale = _ref.scale,
      _ref$timeFormat = _ref.timeFormat,
      timeFormat = _ref$timeFormat === void 0 ? 'time' : _ref$timeFormat;

  var _useMeasuredCharacter = (0, _text_styles.useMeasuredCharacterDimensions)(scale),
      CharacterDimensionsProbe = _useMeasuredCharacter.CharacterDimensionsProbe,
      dimensions = _useMeasuredCharacter.dimensions;

  var referenceTime = (0, _react.useMemo)(function () {
    return Date.now();
  }, []);
  var formattedCurrentDate = (0, _formatted_time.useFormattedTime)(referenceTime, {
    format: timeFormat
  });
  var columnWidths = (0, _react.useMemo)(function () {
    return getColumnWidths(columnConfigurations, dimensions.width, formattedCurrentDate.length);
  }, [columnConfigurations, dimensions.width, formattedCurrentDate]);
  return (0, _react.useMemo)(function () {
    return {
      columnWidths: columnWidths,
      CharacterDimensionsProbe: CharacterDimensionsProbe
    };
  }, [columnWidths, CharacterDimensionsProbe]);
};

exports.useColumnWidths = useColumnWidths;