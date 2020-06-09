"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlightFieldValue = exports.HighlightMarker = exports.ActiveHighlightMarker = void 0;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../observability/public");

var _styles = require("../../../utils/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background-color: ", ";\n  outline: 1px solid ", ";\n  };\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background-color: ", ";\n  outline: 1px solid ", ";\n  };\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ActiveHighlightMarker = _public.euiStyled.mark(_templateObject(), function (props) {
  return (0, _styles.chooseLightOrDarkColor)(props.theme.eui.euiColorAccent, props.theme.eui.euiColorEmptyShade, props.theme.eui.euiColorDarkestShade);
}, function (props) {
  return props.theme.eui.euiColorAccent;
}, function (props) {
  return props.theme.eui.euiColorAccent;
});

exports.ActiveHighlightMarker = ActiveHighlightMarker;

var HighlightMarker = _public.euiStyled.mark(_templateObject2(), function (props) {
  return (0, _styles.chooseLightOrDarkColor)((0, _styles.tintOrShade)(props.theme.eui.euiTextColor, props.theme.eui.euiColorAccent, 0.7, 0.5), props.theme.eui.euiColorEmptyShade, props.theme.eui.euiColorDarkestShade);
}, function (props) {
  return (0, _styles.tintOrShade)(props.theme.eui.euiTextColor, props.theme.eui.euiColorAccent, 0.7, 0.5);
}, function (props) {
  return (0, _styles.tintOrShade)(props.theme.eui.euiTextColor, props.theme.eui.euiColorAccent, 0.7, 0.5);
});

exports.HighlightMarker = HighlightMarker;

var highlightFieldValue = function highlightFieldValue(value, highlightTerms, HighlightComponent) {
  return highlightTerms.reduce(function (fragments, highlightTerm, index) {
    var lastFragment = fragments[fragments.length - 1];

    if (typeof lastFragment !== 'string') {
      return fragments;
    }

    var highlightTermPosition = lastFragment.indexOf(highlightTerm);

    if (highlightTermPosition > -1) {
      return [].concat(_toConsumableArray(fragments.slice(0, fragments.length - 1)), [lastFragment.slice(0, highlightTermPosition), _react.default.createElement(HighlightComponent, {
        key: "highlight-".concat(highlightTerm, "-").concat(index)
      }, highlightTerm), lastFragment.slice(highlightTermPosition + highlightTerm.length)]);
    } else {
      return fragments;
    }
  }, [value]);
};

exports.highlightFieldValue = highlightFieldValue;