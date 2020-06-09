"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryTimestampColumn = void 0;

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _formatted_time = require("../../formatted_time");

var _log_entry_column = require("./log_entry_column");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  overflow: hidden;\n  text-overflow: clip;\n  white-space: pre;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-color: ", ";\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogEntryTimestampColumn = (0, _react.memo)(function (_ref) {
  var _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'time' : _ref$format,
      isHighlighted = _ref.isHighlighted,
      isHovered = _ref.isHovered,
      time = _ref.time;
  var formattedTime = (0, _formatted_time.useFormattedTime)(time, {
    format: format
  });
  return _react.default.createElement(TimestampColumnContent, {
    isHovered: isHovered,
    isHighlighted: isHighlighted
  }, formattedTime);
});
exports.LogEntryTimestampColumn = LogEntryTimestampColumn;
var hoveredContentStyle = (0, _public.css)(_templateObject(), function (props) {
  return props.theme.darkMode ? (0, _polished.transparentize)(0.9, (0, _polished.darken)(0.05, props.theme.eui.euiColorHighlight)) : (0, _polished.darken)(0.05, props.theme.eui.euiColorHighlight);
}, function (props) {
  return props.theme.darkMode ? (0, _polished.transparentize)(0.7, (0, _polished.darken)(0.2, props.theme.eui.euiColorHighlight)) : (0, _polished.darken)(0.2, props.theme.eui.euiColorHighlight);
}, function (props) {
  return props.theme.eui.euiColorFullShade;
});
var TimestampColumnContent = (0, _public.euiStyled)(_log_entry_column.LogEntryColumnContent)(_templateObject2(), function (props) {
  return props.theme.eui.euiColorDarkShade;
}, function (props) {
  return props.isHovered || props.isHighlighted ? hoveredContentStyle : '';
});