"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeCustomMetrics = exports.changeRegion = exports.changeAccount = exports.changeAutoBounds = exports.changeBoundsOverride = exports.changeView = exports.changeNodeType = exports.changeCustomOptions = exports.changeGroupBy = exports.changeMetric = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/infra/local/waffle_options');
var changeMetric = actionCreator('CHANGE_METRIC');
exports.changeMetric = changeMetric;
var changeGroupBy = actionCreator('CHANGE_GROUP_BY');
exports.changeGroupBy = changeGroupBy;
var changeCustomOptions = actionCreator('CHANGE_CUSTOM_OPTIONS');
exports.changeCustomOptions = changeCustomOptions;
var changeNodeType = actionCreator('CHANGE_NODE_TYPE');
exports.changeNodeType = changeNodeType;
var changeView = actionCreator('CHANGE_VIEW');
exports.changeView = changeView;
var changeBoundsOverride = actionCreator('CHANGE_BOUNDS_OVERRIDE');
exports.changeBoundsOverride = changeBoundsOverride;
var changeAutoBounds = actionCreator('CHANGE_AUTO_BOUNDS');
exports.changeAutoBounds = changeAutoBounds;
var changeAccount = actionCreator('CHANGE_ACCOUNT');
exports.changeAccount = changeAccount;
var changeRegion = actionCreator('CHANGE_REGION');
exports.changeRegion = changeRegion;
var changeCustomMetrics = actionCreator('CHANGE_CUSTOM_METRICS');
exports.changeCustomMetrics = changeCustomMetrics;