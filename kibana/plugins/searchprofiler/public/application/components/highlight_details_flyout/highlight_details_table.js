"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightDetailsTable = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _utils = require("../../utils");

var _percentage_badge = require("../percentage_badge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HighlightDetailsTable = function HighlightDetailsTable(_ref) {
  var breakdown = _ref.breakdown;
  var columns = [{
    name: 'Description',
    render: function render(item) {
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "left",
        content: item.tip
      }, _react.default.createElement("span", null, item.key));
    }
  }, {
    name: 'Time',
    render: function render(item) {
      return _react.default.createElement(_eui.EuiBadge, {
        style: {
          backgroundColor: item.color
        }
      }, _react.default.createElement("span", null, (0, _utils.nsToPretty)(item.time, 1)));
    }
  }, {
    name: 'Percentage',
    render: function render(item) {
      return _react.default.createElement(_percentage_badge.PercentageBadge, {
        timePercentage: String(item.relative),
        label: item.relative + '%'
      });
    }
  }];
  return _react.default.createElement(_eui.EuiBasicTable, {
    items: breakdown,
    columns: columns
  });
};

exports.HighlightDetailsTable = HighlightDetailsTable;