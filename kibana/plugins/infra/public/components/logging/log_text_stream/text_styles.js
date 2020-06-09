"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMeasuredCharacterDimensions = exports.unwrappedContentStyle = exports.preWrappedContentStyle = exports.longWrappedContentStyle = exports.hoveredContentStyle = exports.monospaceTextStyle = void 0;

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  visibility: hidden;\n  position: absolute;\n  height: auto;\n  width: auto;\n  padding: 0;\n  margin: 0;\n\n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  white-space: nowrap;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  white-space: pre;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  overflow: visible;\n  white-space: pre-wrap;\n  word-break: break-all;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  font-size: ", ";\n  line-height: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var monospaceTextStyle = function monospaceTextStyle(scale) {
  return (0, _public.css)(_templateObject(), function (props) {
    return props.theme.eui.euiCodeFontFamily;
  }, function (props) {
    switch (scale) {
      case 'large':
        return props.theme.eui.euiFontSizeM;

      case 'medium':
        return props.theme.eui.euiFontSizeS;

      case 'small':
        return props.theme.eui.euiFontSizeXS;

      default:
        return props.theme.eui.euiFontSize;
    }
  }, function (props) {
    return props.theme.eui.euiLineHeight;
  });
};

exports.monospaceTextStyle = monospaceTextStyle;
var hoveredContentStyle = (0, _public.css)(_templateObject2(), function (props) {
  return props.theme.darkMode ? (0, _polished.transparentize)(0.9, (0, _polished.darken)(0.05, props.theme.eui.euiColorHighlight)) : (0, _polished.darken)(0.05, props.theme.eui.euiColorHighlight);
});
exports.hoveredContentStyle = hoveredContentStyle;
var longWrappedContentStyle = (0, _public.css)(_templateObject3());
exports.longWrappedContentStyle = longWrappedContentStyle;
var preWrappedContentStyle = (0, _public.css)(_templateObject4());
exports.preWrappedContentStyle = preWrappedContentStyle;
var unwrappedContentStyle = (0, _public.css)(_templateObject5());
exports.unwrappedContentStyle = unwrappedContentStyle;

var useMeasuredCharacterDimensions = function useMeasuredCharacterDimensions(scale) {
  var _useState = (0, _react.useState)({
    height: 0,
    width: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  var measureElement = (0, _react.useCallback)(function (element) {
    if (!element) {
      return;
    }

    var boundingBox = element.getBoundingClientRect();
    setDimensions({
      height: boundingBox.height,
      width: boundingBox.width
    });
  }, []);
  var CharacterDimensionsProbe = (0, _react.useMemo)(function () {
    return function () {
      return _react.default.createElement(MonospaceCharacterDimensionsProbe, {
        scale: scale,
        ref: measureElement
      }, "X");
    };
  }, [measureElement, scale]);
  return {
    CharacterDimensionsProbe: CharacterDimensionsProbe,
    dimensions: dimensions
  };
};

exports.useMeasuredCharacterDimensions = useMeasuredCharacterDimensions;

var MonospaceCharacterDimensionsProbe = _public.euiStyled.div.attrs(function () {
  return {
    'aria-hidden': true
  };
})(_templateObject6(), function (props) {
  return monospaceTextStyle(props.scale);
});