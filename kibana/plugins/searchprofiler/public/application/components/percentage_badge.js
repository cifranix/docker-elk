"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentageBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * This component has IE specific provision for rendering the percentage portion of the badge correctly.
 *
 * This component uses CSS vars injected against the DOM element and resolves this in CSS to calculate
 * how far the percent bar should be drawn.
 */
var PercentageBadge = function PercentageBadge(_ref) {
  var timePercentage = _ref.timePercentage,
      label = _ref.label,
      _ref$valueType = _ref.valueType,
      valueType = _ref$valueType === void 0 ? 'percent' : _ref$valueType;
  return _react.default.createElement(_eui.EuiBadge, {
    className: (0, _classnames.default)({
      'prfDevTool__percentBadge__progress--percent': valueType === 'percent',
      'prfDevTool__percentBadge__progress--time': valueType === 'time',
      'euiTextAlign--center': true
    }),
    style: {
      '--prfDevToolProgressPercentage': timePercentage + '%'
    }
  }, _react.default.createElement("span", {
    className: "prfDevTool__progress--percent-ie",
    style: {
      width: timePercentage + '%'
    }
  }), _react.default.createElement("span", {
    className: "prfDevTool__progressText"
  }, label));
};

exports.PercentageBadge = PercentageBadge;