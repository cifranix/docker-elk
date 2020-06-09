"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpaceColor = getSpaceColor;
exports.getSpaceInitials = getSpaceInitials;
exports.getSpaceImageUrl = getSpaceImageUrl;

var _eui = require("@elastic/eui");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// code point for lowercase "a"
var FALLBACK_CODE_POINT = 97;
/**
 * Determines the color for the provided space.
 * If a color is present on the Space itself, then that is used.
 * Otherwise, a color is provided from EUI's Visualization Colors based on the space name.
 *
 * @param {Space} space
 */

function getSpaceColor() {
  var space = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var color = space.color,
      _space$name = space.name,
      name = _space$name === void 0 ? '' : _space$name;

  if (color) {
    return color;
  }

  var firstCodePoint = name.codePointAt(0) || FALLBACK_CODE_POINT;
  return _eui.VISUALIZATION_COLORS[firstCodePoint % _eui.VISUALIZATION_COLORS.length];
}
/**
 * Determines the initials for the provided space.
 * If initials are present on the Space itself, then that is used.
 * Otherwise, the initials are calculated based off the words in the space name, with a max length of 2 characters.
 *
 * @param {Space} space
 */


function getSpaceInitials() {
  var space = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initials = space.initials,
      _space$name2 = space.name,
      name = _space$name2 === void 0 ? '' : _space$name2;

  if (initials) {
    return initials;
  }

  var words = name.split(' ');
  var numInitials = Math.min(_common.MAX_SPACE_INITIALS, words.length);
  words.splice(numInitials, words.length);
  return words.map(function (word) {
    return word.substring(0, 1);
  }).join('');
}
/**
 * Determines the avatar image for the provided space.
 *
 * @param {Space} space
 */


function getSpaceImageUrl() {
  var space = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var imageUrl = space.imageUrl;

  if (imageUrl) {
    return imageUrl;
  }

  return '';
}