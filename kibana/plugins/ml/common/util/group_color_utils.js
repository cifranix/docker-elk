"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabColor = tabColor;

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const COLORS = [_eui_theme_dark.default.euiColorVis0, _eui_theme_dark.default.euiColorVis1, _eui_theme_dark.default.euiColorVis2, _eui_theme_dark.default.euiColorVis3, // euiVars.euiColorVis4, // light pink, too hard to read with white text
_eui_theme_dark.default.euiColorVis5, _eui_theme_dark.default.euiColorVis6, _eui_theme_dark.default.euiColorVis7, _eui_theme_dark.default.euiColorVis8, _eui_theme_dark.default.euiColorVis9, _eui_theme_dark.default.euiColorDarkShade, _eui_theme_dark.default.euiColorPrimary];
const colorMap = {};

function tabColor(name) {
  if (colorMap[name] === undefined) {
    const n = stringHash(name);
    const color = COLORS[n % COLORS.length];
    colorMap[name] = color;
    return color;
  } else {
    return colorMap[name];
  }
}

function stringHash(str) {
  let hash = 0;
  let chr = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr; // eslint-disable-line no-bitwise

    hash |= 0; // eslint-disable-line no-bitwise
  }

  return hash < 0 ? hash * -2 : hash;
}