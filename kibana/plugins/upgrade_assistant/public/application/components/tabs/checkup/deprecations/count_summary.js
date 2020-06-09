"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecationCountSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DeprecationCountSummary = function DeprecationCountSummary(_ref) {
  var deprecations = _ref.deprecations,
      allDeprecations = _ref.allDeprecations;
  return _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, allDeprecations.length ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.numDeprecationsShownLabel",
    defaultMessage: "Showing {numShown} of {total}",
    values: {
      numShown: deprecations.length,
      total: allDeprecations.length
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.noDeprecationsLabel",
    defaultMessage: "No deprecations"
  }), deprecations.length !== allDeprecations.length && _react.default.createElement(_react.Fragment, null, '. ', _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.changeFiltersShowMoreLabel",
    description: "Explains how to show all deprecations if there are more available.",
    defaultMessage: "Change filter to show more."
  })));
};

exports.DeprecationCountSummary = DeprecationCountSummary;