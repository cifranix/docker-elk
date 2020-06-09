"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRowWrapper = exports.LogEntryRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _log_entry = require("../../../utils/log_entry");

var _source_configuration = require("../../../utils/source_configuration");

var _log_entry_column = require("./log_entry_column");

var _log_entry_field_column = require("./log_entry_field_column");

var _log_entry_icon_column = require("./log_entry_icon_column");

var _log_entry_message_column = require("./log_entry_message_column");

var _log_entry_timestamp_column = require("./log_entry_timestamp_column");

var _text_styles = require("./text_styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-items: stretch;\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  overflow: hidden;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var LogEntryRow = (0, _react.memo)(function (_ref) {
  var boundingBoxRef = _ref.boundingBoxRef,
      columnConfigurations = _ref.columnConfigurations,
      columnWidths = _ref.columnWidths,
      highlights = _ref.highlights,
      isActiveHighlight = _ref.isActiveHighlight,
      isHighlighted = _ref.isHighlighted,
      logEntry = _ref.logEntry,
      openFlyoutWithItem = _ref.openFlyoutWithItem,
      scale = _ref.scale,
      wrap = _ref.wrap;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHovered = _useState2[0],
      setIsHovered = _useState2[1];

  var setItemIsHovered = (0, _react.useCallback)(function () {
    setIsHovered(true);
  }, []);
  var setItemIsNotHovered = (0, _react.useCallback)(function () {
    setIsHovered(false);
  }, []);
  var openFlyout = (0, _react.useCallback)(function () {
    return openFlyoutWithItem === null || openFlyoutWithItem === void 0 ? void 0 : openFlyoutWithItem(logEntry.id);
  }, [openFlyoutWithItem, logEntry.id]);
  var logEntryColumnsById = (0, _react.useMemo)(function () {
    return logEntry.columns.reduce(function (columnsById, column) {
      return _objectSpread({}, columnsById, _defineProperty({}, column.columnId, column));
    }, {});
  }, [logEntry.columns]);
  var highlightsByColumnId = (0, _react.useMemo)(function () {
    return highlights.reduce(function (columnsById, highlight) {
      return highlight.columns.reduce(function (innerColumnsById, column) {
        return _objectSpread({}, innerColumnsById, _defineProperty({}, column.columnId, [].concat(_toConsumableArray(innerColumnsById[column.columnId] || []), [column])));
      }, columnsById);
    }, {});
  }, [highlights]);
  return _react.default.createElement(LogEntryRowWrapper, {
    "data-test-subj": "streamEntry logTextStreamEntry",
    ref:
    /* Workaround for missing RefObject support in styled-components */
    boundingBoxRef,
    onMouseEnter: setItemIsHovered,
    onMouseLeave: setItemIsNotHovered,
    scale: scale
  }, columnConfigurations.map(function (columnConfiguration) {
    if ((0, _source_configuration.isTimestampLogColumnConfiguration)(columnConfiguration)) {
      var column = logEntryColumnsById[columnConfiguration.timestampColumn.id];
      var columnWidth = columnWidths[columnConfiguration.timestampColumn.id];
      return _react.default.createElement(_log_entry_column.LogEntryColumn, _extends({
        "data-test-subj": "logColumn timestampLogColumn",
        key: columnConfiguration.timestampColumn.id
      }, columnWidth), (0, _log_entry.isTimestampColumn)(column) ? _react.default.createElement(_log_entry_timestamp_column.LogEntryTimestampColumn, {
        isHighlighted: isHighlighted,
        isHovered: isHovered,
        time: column.timestamp
      }) : null);
    } else if ((0, _source_configuration.isMessageLogColumnConfiguration)(columnConfiguration)) {
      var _column = logEntryColumnsById[columnConfiguration.messageColumn.id];
      var _columnWidth = columnWidths[columnConfiguration.messageColumn.id];
      return _react.default.createElement(_log_entry_column.LogEntryColumn, _extends({
        "data-test-subj": "logColumn messageLogColumn",
        key: columnConfiguration.messageColumn.id
      }, _columnWidth), _column ? _react.default.createElement(_log_entry_message_column.LogEntryMessageColumn, {
        columnValue: _column,
        highlights: highlightsByColumnId[_column.columnId] || [],
        isHighlighted: isHighlighted,
        isActiveHighlight: isActiveHighlight,
        isHovered: isHovered,
        wrapMode: wrap ? 'long' : 'pre-wrapped'
      }) : null);
    } else if ((0, _source_configuration.isFieldLogColumnConfiguration)(columnConfiguration)) {
      var _column2 = logEntryColumnsById[columnConfiguration.fieldColumn.id];
      var _columnWidth2 = columnWidths[columnConfiguration.fieldColumn.id];
      return _react.default.createElement(_log_entry_column.LogEntryColumn, _extends({
        "data-test-subj": "logColumn fieldLogColumn fieldLogColumn:".concat(columnConfiguration.fieldColumn.field),
        key: columnConfiguration.fieldColumn.id
      }, _columnWidth2), _column2 ? _react.default.createElement(_log_entry_field_column.LogEntryFieldColumn, {
        columnValue: _column2,
        highlights: highlightsByColumnId[_column2.columnId] || [],
        isActiveHighlight: isActiveHighlight,
        isHighlighted: isHighlighted,
        isHovered: isHovered,
        wrapMode: wrap ? 'long' : 'pre-wrapped'
      }) : null);
    }
  }), _react.default.createElement(_log_entry_column.LogEntryColumn, _extends({
    key: "logColumn iconLogColumn iconLogColumn:details"
  }, columnWidths[_log_entry_column.iconColumnId]), _react.default.createElement(_log_entry_icon_column.LogEntryDetailsIconColumn, {
    isHighlighted: isHighlighted,
    isHovered: isHovered,
    openFlyout: openFlyout
  })));
});
exports.LogEntryRow = LogEntryRow;

var LogEntryRowWrapper = _public.euiStyled.div.attrs(function () {
  return {
    role: 'row'
  };
})(_templateObject(), function (props) {
  return props.theme.eui.euiTextColor;
}, function (props) {
  return (0, _text_styles.monospaceTextStyle)(props.scale);
});

exports.LogEntryRowWrapper = LogEntryRowWrapper;