"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryMessageColumn = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _public = require("../../../../../observability/public");

var _log_entry = require("../../../utils/log_entry");

var _highlighting = require("./highlighting");

var _log_entry_column = require("./log_entry_column");

var _text_styles = require("./text_styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  text-overflow: ellipsis;\n\n  ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogEntryMessageColumn = (0, _react.memo)(function (_ref) {
  var columnValue = _ref.columnValue,
      highlights = _ref.highlights,
      isActiveHighlight = _ref.isActiveHighlight,
      isHighlighted = _ref.isHighlighted,
      isHovered = _ref.isHovered,
      wrapMode = _ref.wrapMode;
  var message = (0, _react.useMemo)(function () {
    return (0, _log_entry.isMessageColumn)(columnValue) ? formatMessageSegments(columnValue.message, highlights, isActiveHighlight) : null;
  }, [columnValue, highlights, isActiveHighlight]);
  return _react.default.createElement(MessageColumnContent, {
    isHighlighted: isHighlighted,
    isHovered: isHovered,
    wrapMode: wrapMode
  }, message);
});
exports.LogEntryMessageColumn = LogEntryMessageColumn;
var MessageColumnContent = (0, _public.euiStyled)(_log_entry_column.LogEntryColumnContent)(_templateObject(), function (props) {
  return props.isHovered || props.isHighlighted ? _text_styles.hoveredContentStyle : '';
}, function (props) {
  return props.wrapMode === 'long' ? _text_styles.longWrappedContentStyle : props.wrapMode === 'pre-wrapped' ? _text_styles.preWrappedContentStyle : _text_styles.unwrappedContentStyle;
});

var formatMessageSegments = function formatMessageSegments(messageSegments, highlights, isActiveHighlight) {
  return messageSegments.map(function (messageSegment, index) {
    return formatMessageSegment(messageSegment, highlights.map(function (highlight) {
      if ((0, _log_entry.isHighlightMessageColumn)(highlight)) {
        var segment = highlight.message[index];

        if ((0, _log_entry.isHighlightFieldSegment)(segment)) {
          return segment.highlights;
        }
      }

      return [];
    }), isActiveHighlight);
  });
};

var formatMessageSegment = function formatMessageSegment(messageSegment, _ref2, isActiveHighlight) {
  var _ref3 = _slicedToArray(_ref2, 1),
      _ref3$ = _ref3[0],
      firstHighlight = _ref3$ === void 0 ? [] : _ref3$;

  if ((0, _log_entry.isFieldSegment)(messageSegment)) {
    var value = typeof messageSegment.value === 'string' ? messageSegment.value : (0, _jsonStableStringify.default)(messageSegment.value);
    return (0, _highlighting.highlightFieldValue)(value, firstHighlight, isActiveHighlight ? _highlighting.ActiveHighlightMarker : _highlighting.HighlightMarker);
  } else if ((0, _log_entry.isConstantSegment)(messageSegment)) {
    return messageSegment.constant;
  }

  return 'failed to format message';
};