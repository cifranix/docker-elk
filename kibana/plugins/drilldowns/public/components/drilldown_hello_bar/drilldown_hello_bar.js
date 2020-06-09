"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrilldownHelloBar = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * @todo https://github.com/elastic/kibana/issues/55311
 */
var DrilldownHelloBar = function DrilldownHelloBar(_ref) {
  var docsLink = _ref.docsLink;
  return _react.default.createElement("div", null, _react.default.createElement("p", null, "Drilldowns provide the ability to define a new behavior when interacting with a panel. You can add multiple options or simply override the default filtering behavior."), _react.default.createElement("a", {
    href: docsLink
  }, "View docs"));
};

exports.DrilldownHelloBar = DrilldownHelloBar;