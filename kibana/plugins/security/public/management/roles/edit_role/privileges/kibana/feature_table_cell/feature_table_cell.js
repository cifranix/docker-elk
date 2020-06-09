"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureTableCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FeatureTableCell = function FeatureTableCell(_ref) {
  var feature = _ref.feature;
  var tooltipElement = null;

  if (feature.getPrivilegesTooltip()) {
    var tooltipContent = _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, feature.getPrivilegesTooltip()));

    tooltipElement = _react.default.createElement(_eui.EuiIconTip, {
      iconProps: {
        className: 'eui-alignTop'
      },
      type: 'iInCircle',
      color: 'subdued',
      content: tooltipContent
    });
  }

  return _react.default.createElement("span", null, _react.default.createElement(_eui.EuiIcon, {
    size: "m",
    type: feature.icon,
    className: "secPrivilegeFeatureIcon"
  }), feature.name, " ", tooltipElement);
};

exports.FeatureTableCell = FeatureTableCell;