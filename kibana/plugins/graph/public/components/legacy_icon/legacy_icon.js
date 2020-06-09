"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegacyIcon = LegacyIcon;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function LegacyIcon(props) {
  var icon = _react.default.createElement("i", {
    className: (0, _classnames.default)('fa', props.className, 'gphLegacyIcon', {
      'gphLegacyIcon--selected': props.selected,
      'gphLegacyIcon--pickable': !!props.onClick,
      'gphLegacyIcon--list': props.asListIcon
    }),
    "aria-label": props.icon.label
  }, props.icon.code);

  if (props.onClick) {
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      role: "option",
      "aria-selected": props.selected,
      color: props.selected ? 'primary' : 'text',
      onClick: props.onClick
    }, icon);
  } else {
    return icon;
  }
}