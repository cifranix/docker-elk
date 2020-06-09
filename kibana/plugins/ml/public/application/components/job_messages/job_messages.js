"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobMessages = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _format = require("@elastic/eui/lib/services/format");

var _i18n = require("@kbn/i18n");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _job_message_icon = require("../job_message_icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * Component for rendering job messages for anomaly detection
 * and data frame analytics jobs.
 */
var JobMessages = function JobMessages(_ref) {
  var messages = _ref.messages,
      loading = _ref.loading,
      error = _ref.error;
  var columns = [{
    name: '',
    render: function render(message) {
      return _react.default.createElement(_job_message_icon.JobIcon, {
        message: message
      });
    },
    width: "".concat(_eui_theme_light.default.euiSizeL)
  }, {
    field: 'timestamp',
    name: _i18n.i18n.translate('xpack.ml.jobMessages.timeLabel', {
      defaultMessage: 'Time'
    }),
    render: function render(timestamp) {
      return (0, _format.formatDate)(timestamp, TIME_FORMAT);
    },
    width: '120px',
    sortable: true
  }, {
    field: 'node_name',
    name: _i18n.i18n.translate('xpack.ml.jobMessages.nodeLabel', {
      defaultMessage: 'Node'
    }),
    width: '150px'
  }, {
    field: 'message',
    name: _i18n.i18n.translate('xpack.ml.jobMessages.messageLabel', {
      defaultMessage: 'Message'
    }),
    width: '50%'
  }];
  var defaultSorting = {
    sort: {
      field: 'timestamp',
      direction: 'asc'
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiInMemoryTable, {
    className: "job-messages-table",
    items: messages,
    columns: columns,
    sorting: defaultSorting,
    compressed: true,
    loading: loading,
    error: error
  }));
};

exports.JobMessages = JobMessages;