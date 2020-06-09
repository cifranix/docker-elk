"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoMatch = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoMatch = function NoMatch() {
  return _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.noMatch.noIndicesDescription",
    defaultMessage: "No indices to show"
  }));
};

exports.NoMatch = NoMatch;