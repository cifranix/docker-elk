"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightDetailsFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _utils = require("../../utils");

var _highlight_details_table = require("./highlight_details_table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FlyoutEntry = function FlyoutEntry(_ref) {
  var title = _ref.title,
      body = _ref.body;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("dt", null, title), _react.default.createElement("dd", null, body));
};

var HighlightDetailsFlyout = function HighlightDetailsFlyout(_ref2) {
  var indexName = _ref2.indexName,
      operation = _ref2.operation,
      shardName = _ref2.shardName,
      _onClose = _ref2.onClose;
  return _react.default.createElement(_eui.EuiFlyout, {
    className: "prfDevTool__details",
    onClose: function onClose() {
      return _onClose();
    }
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, indexName), _react.default.createElement(_eui.EuiText, null, shardName)), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("dl", null, _react.default.createElement(FlyoutEntry, {
    title: _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.typeTitle', {
      defaultMessage: 'Type'
    }),
    body: operation.query_type
  }), _react.default.createElement(FlyoutEntry, {
    title: _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.descriptionTitle', {
      defaultMessage: 'Description'
    }),
    body: _react.default.createElement(_eui.EuiCodeBlock, {
      paddingSize: "s"
    }, operation.lucene)
  }), _react.default.createElement(FlyoutEntry, {
    title: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.totalTimeTitle', {
      defaultMessage: 'Total time'
    }), ' ', _react.default.createElement(_eui.EuiIconTip, {
      type: "iInCircle",
      color: "subdued",
      content: _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.totalTimeTooltip', {
        defaultMessage: 'The total time spent at this query component, inclusive of children'
      })
    })),
    body: (0, _utils.msToPretty)(operation.time, 3)
  }), _react.default.createElement(FlyoutEntry, {
    title: _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.selfTimeTitle', {
      defaultMessage: 'Self time'
    }), ' ', _react.default.createElement(_eui.EuiIconTip, {
      type: "iInCircle",
      color: "subdued",
      content: _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.selfTimeTooltip', {
        defaultMessage: 'The time spent by this query component alone, exclusive of children'
      })
    })),
    body: (0, _utils.msToPretty)(operation.selfTime || 0, 3)
  }), _react.default.createElement(FlyoutEntry, {
    title: _i18n.i18n.translate('xpack.searchProfiler.highlightDetails.timingBreakdownTitle', {
      defaultMessage: 'Timing breakdown'
    }),
    body: _react.default.createElement(_highlight_details_table.HighlightDetailsTable, {
      breakdown: operation.breakdown
    })
  })))));
};

exports.HighlightDetailsFlyout = HighlightDetailsFlyout;