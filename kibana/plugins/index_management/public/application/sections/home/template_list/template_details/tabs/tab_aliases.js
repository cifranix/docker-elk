"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabAliases = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabAliases = function TabAliases(_ref) {
  var templateDetails = _ref.templateDetails;
  var aliases = templateDetails.aliases;

  if (aliases && Object.keys(aliases).length) {
    return _react.default.createElement("div", {
      "data-test-subj": "aliasesTab"
    }, _react.default.createElement(_eui.EuiCodeBlock, {
      lang: "json"
    }, JSON.stringify(aliases, null, 2)));
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.aliasesTab.noAliasesTitle",
      defaultMessage: "No aliases defined."
    }),
    iconType: "pin",
    "data-test-subj": "noAliasesCallout"
  });
};

exports.TabAliases = TabAliases;