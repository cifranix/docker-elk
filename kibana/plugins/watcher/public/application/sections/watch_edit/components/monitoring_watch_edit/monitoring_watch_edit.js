"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonitoringWatchEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _watch_context = require("../../watch_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MonitoringWatchEdit = function MonitoringWatchEdit(_ref) {
  var pageTitle = _ref.pageTitle;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch;

  var systemWatchTitle = _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.monitoring.edit.calloutTitleText",
    defaultMessage: "This watch cannot be edited."
  });

  var systemWatchMessage = _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.monitoring.edit.calloutDescriptionText",
    defaultMessage: "Watch '{watchName}' is a system watch and cannot be edited. {watchStatusLink}",
    values: {
      watchName: watch.name,
      watchStatusLink: _react.default.createElement(_eui.EuiLink, {
        href: "#/management/elasticsearch/watcher/watches/watch/".concat(watch.id, "/status")
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.monitoring.header.watchLinkTitle",
        defaultMessage: "View watch status."
      }))
    }
  });

  return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", null, pageTitle)))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCallOut, {
    title: systemWatchTitle,
    iconType: "pin"
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, systemWatchMessage))));
};

exports.MonitoringWatchEdit = MonitoringWatchEdit;