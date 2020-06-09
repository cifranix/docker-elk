"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservedSpaceBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _common = require("../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ReservedSpaceBadge = function ReservedSpaceBadge(props) {
  var space = props.space;

  if (space && (0, _common.isReservedSpace)(space)) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.reversedSpaceBadge.reversedSpacesCanBePartiallyModifiedTooltip",
        defaultMessage: "Reserved spaces are built-in and can only be partially modified."
      })
    }, _react.default.createElement(_eui.EuiIcon, {
      style: {
        verticalAlign: 'super'
      },
      type: 'lock'
    }));
  }

  return null;
};

exports.ReservedSpaceBadge = ReservedSpaceBadge;