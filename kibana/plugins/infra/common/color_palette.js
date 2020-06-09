"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleColor = exports.colorTransformer = exports.createPaletteTransformer = exports.defaultPalette = exports.MetricsExplorerColor = void 0;

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let MetricsExplorerColor;
exports.MetricsExplorerColor = MetricsExplorerColor;

(function (MetricsExplorerColor) {
  MetricsExplorerColor["color0"] = "color0";
  MetricsExplorerColor["color1"] = "color1";
  MetricsExplorerColor["color2"] = "color2";
  MetricsExplorerColor["color3"] = "color3";
  MetricsExplorerColor["color4"] = "color4";
  MetricsExplorerColor["color5"] = "color5";
  MetricsExplorerColor["color6"] = "color6";
  MetricsExplorerColor["color7"] = "color7";
  MetricsExplorerColor["color8"] = "color8";
  MetricsExplorerColor["color9"] = "color9";
})(MetricsExplorerColor || (exports.MetricsExplorerColor = MetricsExplorerColor = {}));

const euiPalette = (0, _eui.euiPaletteColorBlind)();
const defaultPalette = {
  [MetricsExplorerColor.color0]: euiPalette[1],
  // (blue)
  [MetricsExplorerColor.color1]: euiPalette[2],
  // (pink)
  [MetricsExplorerColor.color2]: euiPalette[0],
  // (green-ish)
  [MetricsExplorerColor.color3]: euiPalette[3],
  // (purple)
  [MetricsExplorerColor.color4]: euiPalette[4],
  // (light pink)
  [MetricsExplorerColor.color5]: euiPalette[5],
  // (yellow)
  [MetricsExplorerColor.color6]: euiPalette[6],
  // (tan)
  [MetricsExplorerColor.color7]: euiPalette[7],
  // (orange)
  [MetricsExplorerColor.color8]: euiPalette[8],
  // (brown)
  [MetricsExplorerColor.color9]: euiPalette[9] // (red)

};
exports.defaultPalette = defaultPalette;

const createPaletteTransformer = palette => color => palette[color];

exports.createPaletteTransformer = createPaletteTransformer;
const colorTransformer = createPaletteTransformer(defaultPalette);
exports.colorTransformer = colorTransformer;

const sampleColor = (usedColors = []) => {
  const available = (0, _lodash.difference)((0, _lodash.values)(MetricsExplorerColor), usedColors);
  return (0, _lodash.first)(available) || MetricsExplorerColor.color0;
};

exports.sampleColor = sampleColor;