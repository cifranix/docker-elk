"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegularExpressionRepresentation = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  font-weight: bold;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  word-break: break-all;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RegularExpressionRepresentation = (0, _react.memo)(function (_ref) {
  var _ref$maximumSegmentCo = _ref.maximumSegmentCount,
      maximumSegmentCount = _ref$maximumSegmentCo === void 0 ? 30 : _ref$maximumSegmentCo,
      regularExpression = _ref.regularExpression;
  var segments = regularExpression.split(collapsedRegularExpressionCharacters);
  return _react.default.createElement(CategoryPattern, null, segments.slice(0, maximumSegmentCount).map(function (segment, segmentIndex) {
    return [segmentIndex > 0 ? _react.default.createElement(CategoryPatternWildcard, {
      key: "wildcard-".concat(segmentIndex)
    }, "\u2055") : null, _react.default.createElement(CategoryPatternSegment, {
      key: "segment-".concat(segmentIndex)
    }, segment.replace(escapedRegularExpressionCharacters, '$1'))];
  }), segments.length > maximumSegmentCount ? _react.default.createElement(CategoryPatternWildcard, {
    title: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.truncatedPatternSegmentDescription', {
      defaultMessage: '{extraSegmentCount, plural, one {one more segment} other {# more segments}}',
      values: {
        extraSegmentCount: segments.length - maximumSegmentCount
      }
    })
  }, "\u2026") : null);
});
exports.RegularExpressionRepresentation = RegularExpressionRepresentation;

var CategoryPattern = _public.euiStyled.span(_templateObject(), function (props) {
  return props.theme.eui.euiCodeFontFamily;
});

var CategoryPatternWildcard = _public.euiStyled.span(_templateObject2(), function (props) {
  return props.theme.eui.euiColorMediumShade;
});

var CategoryPatternSegment = _public.euiStyled.span(_templateObject3());

var collapsedRegularExpressionCharacters = /\.[+*]\??/g;
var escapedRegularExpressionCharacters = /\\([\\^$*+?.()\[\]])/g;