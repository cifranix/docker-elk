"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryFieldColumn = void 0;

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _log_entry = require("../../../utils/log_entry");

var _highlighting = require("./highlighting");

var _log_entry_column = require("./log_entry_column");

var _text_styles = require("./text_styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  text-overflow: ellipsis;\n\n  ", ";\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline;\n  &:not(:last-child) {\n    margin-right: 1ex;\n    &::after {\n      content: ',';\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LogEntryFieldColumn = function LogEntryFieldColumn(_ref) {
  var columnValue = _ref.columnValue,
      _ref$highlights = _slicedToArray(_ref.highlights, 1),
      firstHighlight = _ref$highlights[0],
      isActiveHighlight = _ref.isActiveHighlight,
      isHighlighted = _ref.isHighlighted,
      isHovered = _ref.isHovered,
      wrapMode = _ref.wrapMode;

  var value = (0, _react.useMemo)(function () {
    if ((0, _log_entry.isFieldColumn)(columnValue)) {
      return columnValue.value;
    }

    return null;
  }, [columnValue]);
  var formattedValue = Array.isArray(value) ? _react.default.createElement("ul", null, value.map(function (entry, i) {
    return _react.default.createElement(CommaSeparatedLi, {
      key: "LogEntryFieldColumn-".concat(i)
    }, (0, _highlighting.highlightFieldValue)(entry, (0, _log_entry.isHighlightFieldColumn)(firstHighlight) ? firstHighlight.highlights : [], isActiveHighlight ? _highlighting.ActiveHighlightMarker : _highlighting.HighlightMarker));
  })) : (0, _highlighting.highlightFieldValue)(typeof value === 'string' ? value : (0, _jsonStableStringify.default)(value), (0, _log_entry.isHighlightFieldColumn)(firstHighlight) ? firstHighlight.highlights : [], isActiveHighlight ? _highlighting.ActiveHighlightMarker : _highlighting.HighlightMarker);
  return _react.default.createElement(FieldColumnContent, {
    isHighlighted: isHighlighted,
    isHovered: isHovered,
    wrapMode: wrapMode
  }, formattedValue);
};

exports.LogEntryFieldColumn = LogEntryFieldColumn;

var CommaSeparatedLi = _public.euiStyled.li(_templateObject());

var FieldColumnContent = (0, _public.euiStyled)(_log_entry_column.LogEntryColumnContent)(_templateObject2(), function (props) {
  return props.isHovered || props.isHighlighted ? _text_styles.hoveredContentStyle : '';
}, function (props) {
  return props.wrapMode === 'long' ? _text_styles.longWrappedContentStyle : props.wrapMode === 'pre-wrapped' ? _text_styles.preWrappedContentStyle : _text_styles.unwrappedContentStyle;
});