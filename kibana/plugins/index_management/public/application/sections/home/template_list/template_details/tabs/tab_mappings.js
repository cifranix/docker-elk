"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabMappings = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TabMappings = function TabMappings(_ref) {
  var templateDetails = _ref.templateDetails;
  var mappings = templateDetails.mappings;

  if (mappings && Object.keys(mappings).length) {
    return _react.default.createElement("div", {
      "data-test-subj": "mappingsTab"
    }, _react.default.createElement(_eui.EuiCodeBlock, {
      lang: "json"
    }, JSON.stringify(mappings, null, 2)));
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateDetails.mappingsTab.noMappingsTitle",
      defaultMessage: "No mappings defined."
    }),
    iconType: "pin",
    "data-test-subj": "noMappingsCallout"
  });
};

exports.TabMappings = TabMappings;