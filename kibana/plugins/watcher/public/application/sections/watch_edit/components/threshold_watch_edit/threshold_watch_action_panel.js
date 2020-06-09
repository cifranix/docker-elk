"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchActionsPanel = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _api = require("../../../../lib/api");

var _threshold_watch_action_dropdown = require("./threshold_watch_action_dropdown");

var _threshold_watch_action_accordion = require("./threshold_watch_action_accordion");

var _watch_context = require("../../watch_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WatchActionsPanel = function WatchActionsPanel(_ref) {
  var actionErrors = _ref.actionErrors;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch;

  var _useLoadSettings = (0, _api.useLoadSettings)(),
      settings = _useLoadSettings.data,
      isLoading = _useLoadSettings.isLoading;

  return _react.default.createElement("div", {
    "data-test-subj": "watchActionsPanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.watcher.sections.watchEdit.actions.title', {
    defaultMessage: 'Perform {watchActionsCount, plural, one{# action} other {# actions}} when condition is met',
    values: {
      watchActionsCount: watch.actions.length
    }
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    className: "watcherThresholdWatchActionDropdownContainer"
  }, _react.default.createElement(_threshold_watch_action_dropdown.WatchActionsDropdown, {
    settings: settings,
    isLoading: isLoading
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_threshold_watch_action_accordion.WatchActionsAccordion, {
    settings: settings,
    actionErrors: actionErrors
  }));
};

exports.WatchActionsPanel = WatchActionsPanel;