"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BetaBadge = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BetaBadge = function BetaBadge() {
  return _react.default.createElement(_eui.EuiBetaBadge, {
    "aria-label": betaBadgeLabel,
    label: betaBadgeLabel,
    tooltipContent: betaBadgeTooltipContent,
    className: "eui-alignMiddle"
  });
};

exports.BetaBadge = BetaBadge;

var betaBadgeLabel = _i18n.i18n.translate('xpack.infra.common.tabBetaBadgeLabel', {
  defaultMessage: 'Beta'
});

var betaBadgeTooltipContent = _i18n.i18n.translate('xpack.infra.common.tabBetaBadgeTooltipContent', {
  defaultMessage: 'This feature is under active development. Extra functionality is coming, and some functionality may change.'
});