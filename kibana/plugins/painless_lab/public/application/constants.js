"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exampleScript = exports.painlessContextOptions = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultLabel = _i18n.i18n.translate('xpack.painlessLab.contextDefaultLabel', {
  defaultMessage: 'Basic'
});

var filterLabel = _i18n.i18n.translate('xpack.painlessLab.contextFilterLabel', {
  defaultMessage: 'Filter'
});

var scoreLabel = _i18n.i18n.translate('xpack.painlessLab.contextScoreLabel', {
  defaultMessage: 'Score'
});

var painlessContextOptions = [{
  value: 'painless_test',
  inputDisplay: defaultLabel,
  dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, defaultLabel), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", {
    className: "euiTextColor--subdued"
  }, _i18n.i18n.translate('xpack.painlessLab.context.defaultLabel', {
    defaultMessage: 'The script result will be converted to a string'
  }))))
}, {
  value: 'filter',
  inputDisplay: filterLabel,
  dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, filterLabel), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", {
    className: "euiTextColor--subdued"
  }, _i18n.i18n.translate('xpack.painlessLab.context.filterLabel', {
    defaultMessage: "Use the context of a filter's script query"
  }))))
}, {
  value: 'score',
  inputDisplay: scoreLabel,
  dropdownDisplay: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("strong", null, scoreLabel), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement("p", {
    className: "euiTextColor--subdued"
  }, _i18n.i18n.translate('xpack.painlessLab.context.scoreLabel', {
    defaultMessage: 'Use the context of a script_score function in function_score query'
  }))))
}]; // Render a smiley face as an example.

exports.painlessContextOptions = painlessContextOptions;
var exampleScript = "boolean isInCircle(def posX, def posY, def circleX, def circleY, def radius) {\n  double distanceFromCircleCenter = Math.sqrt(Math.pow(circleX - posX, 2) + Math.pow(circleY - posY, 2));\n  return distanceFromCircleCenter <= radius;\n}\n\nboolean isOnCircle(def posX, def posY, def circleX, def circleY, def radius, def thickness, def squashY) {\n  double distanceFromCircleCenter = Math.sqrt(Math.pow(circleX - posX, 2) + Math.pow((circleY - posY) / squashY, 2));\n  return (\n    distanceFromCircleCenter >= radius - thickness\n    && distanceFromCircleCenter <= radius + thickness\n  );\n}\n\ndef result = '';\nint charCount = 0;\n\n// Canvas dimensions\nint width = 31;\nint height = 31;\ndouble halfWidth = Math.floor(width * 0.5);\ndouble halfHeight = Math.floor(height * 0.5);\n\n// Style constants\ndouble strokeWidth = 0.6;\n\n// Smiley face configuration\nint headSize = 13;\ndouble headSquashY = 0.78;\nint eyePositionX = 10;\nint eyePositionY = 12;\nint eyeSize = 1;\nint mouthSize = 15;\nint mouthPositionX = width / 2;\nint mouthPositionY = 5;\nint mouthOffsetY = 11;\n\nfor (int y = 0; y < height; y++) {\n  for (int x = 0; x < width; x++) {\n    boolean isHead = isOnCircle(x, y, halfWidth, halfHeight, headSize, strokeWidth, headSquashY);\n    boolean isLeftEye = isInCircle(x, y, eyePositionX, eyePositionY, eyeSize);\n    boolean isRightEye = isInCircle(x, y, width - eyePositionX - 1, eyePositionY, eyeSize);\n    boolean isMouth = isOnCircle(x, y, mouthPositionX, mouthPositionY, mouthSize, strokeWidth, 1) && y > mouthPositionY + mouthOffsetY;\n\n    if (isLeftEye || isRightEye || isMouth || isHead) {\n      result += \"*\";\n    } else {\n      result += \".\";\n    }\n\n    result += \" \";\n\n    // Make sure the smiley face doesn't deform as the container changes width.\n    charCount++;\n    if (charCount % width === 0) {\n      result += \"\\\\n\";\n    }\n  }\n}\n\nreturn result;";
exports.exampleScript = exampleScript;