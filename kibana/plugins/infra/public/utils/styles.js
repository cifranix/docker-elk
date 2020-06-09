"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clampValue = exports.transparentize = exports.chooseLightOrDarkColor = exports.getContrast = exports.tintOrShade = exports.ifProp = exports.switchProp = void 0;

var _lodash = require("lodash");

var _polished = require("polished");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var asPropReader = function asPropReader(reader) {
  return typeof reader === 'function' ? reader : function (props, defaultValue) {
    return (0, _lodash.get)(props, reader, defaultValue);
  };
};

var switchProp = Object.assign(function (propName, options) {
  return function (props) {
    var propValue = asPropReader(propName)(props, switchProp.default);

    if (typeof propValue === 'undefined') {
      return;
    }

    return options instanceof Map ? options.get(propValue) : (0, _lodash.get)(options, propValue);
  };
}, {
  default: Symbol('default')
});
exports.switchProp = switchProp;

var ifProp = function ifProp(propName, pass, fail) {
  return function (props) {
    return asPropReader(propName)(props) ? pass : fail;
  };
};

exports.ifProp = ifProp;

var tintOrShade = function tintOrShade(textColor, color, tintFraction, shadeFraction) {
  if ((0, _polished.parseToHsl)(textColor).lightness > 0.5) {
    return (0, _polished.shade)(1 - shadeFraction, color);
  } else {
    return (0, _polished.tint)(1 - tintFraction, color);
  }
};

exports.tintOrShade = tintOrShade;

var getContrast = function getContrast(color1, color2) {
  var luminance1 = (0, _polished.getLuminance)(color1);
  var luminance2 = (0, _polished.getLuminance)(color2);
  return parseFloat((luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)).toFixed(2));
};

exports.getContrast = getContrast;

var chooseLightOrDarkColor = function chooseLightOrDarkColor(backgroundColor, lightColor, darkColor) {
  if (getContrast(backgroundColor, lightColor) > getContrast(backgroundColor, darkColor)) {
    return lightColor;
  } else {
    return darkColor;
  }
};

exports.chooseLightOrDarkColor = chooseLightOrDarkColor;

var transparentize = function transparentize(amount, color) {
  if (color === 'transparent') {
    return color;
  }

  var parsedColor = (0, _polished.parseToRgb)(color);
  var alpha = 'alpha' in parsedColor && typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = _objectSpread({}, parsedColor, {
    alpha: clampValue((alpha * 100 - amount * 100) / 100, 0, 1)
  });

  return (0, _polished.rgba)(colorWithAlpha);
};

exports.transparentize = transparentize;

var clampValue = function clampValue(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
};

exports.clampValue = clampValue;