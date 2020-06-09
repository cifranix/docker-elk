"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatsBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _stat = require("./stat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StatsBar = function StatsBar(_ref) {
  var stats = _ref.stats,
      dataTestSub = _ref.dataTestSub;
  var statsList = Object.keys(stats).map(function (k) {
    return stats[k];
  });
  return _react.default.createElement("div", {
    className: "transformStatsBar",
    "data-test-subj": dataTestSub
  }, statsList.filter(function (s) {
    return s.show;
  }).map(function (s) {
    return _react.default.createElement(_stat.Stat, {
      key: s.label,
      stat: s
    });
  }));
};

exports.StatsBar = StatsBar;