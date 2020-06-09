"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChainedMultifieldsWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ChainedMultifieldsWarning = function ChainedMultifieldsWarning() {
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.nestedMultifieldsDeprecatedCallOutTitle', {
      defaultMessage: 'Chained multi-fields are deprecated'
    }),
    iconType: "alert",
    color: "warning",
    "data-test-subj": "nestedMultifieldsDeprecatedCallout"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.mappingsEditor.nestedMultifieldsDeprecatedCallOutDescription",
    defaultMessage: "Defining chained multi-fields was deprecated in 7.3 and is now no longer supported. Consider flattening the chained fields blocks into a single level, or switching to {copyTo} if appropriate.",
    values: {
      copyTo: _react.default.createElement(_eui.EuiCode, null, "copy_to")
    }
  })));
};

exports.ChainedMultifieldsWarning = ChainedMultifieldsWarning;