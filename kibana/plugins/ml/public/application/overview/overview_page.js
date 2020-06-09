"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _check_privilege = require("../privilege/check_privilege");

var _check_ml_nodes = require("../ml_nodes_check/check_ml_nodes");

var _navigation_menu = require("../components/navigation_menu");

var _sidebar = require("./components/sidebar");

var _content = require("./components/content");

var _node_available_warning = require("../components/node_available_warning");

var _upgrade = require("../components/upgrade");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OverviewPage = function OverviewPage() {
  var disableCreateAnomalyDetectionJob = !(0, _check_privilege.checkPermission)('canCreateJob') || !(0, _check_ml_nodes.mlNodesAvailable)();
  var disableCreateAnalyticsButton = !(0, _check_ml_nodes.mlNodesAvailable)() || !(0, _check_privilege.checkPermission)('canCreateDataFrameAnalytics') || !(0, _check_privilege.checkPermission)('canStartStopDataFrameAnalytics');
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "overview"
  }), _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageOverview"
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_node_available_warning.NodeAvailableWarning, null), _react.default.createElement(_upgrade.UpgradeWarning, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_sidebar.OverviewSideBar, {
    createAnomalyDetectionJobDisabled: disableCreateAnomalyDetectionJob
  }), _react.default.createElement(_content.OverviewContent, {
    createAnomalyDetectionJobDisabled: disableCreateAnomalyDetectionJob,
    createAnalyticsJobDisabled: disableCreateAnalyticsButton
  })))));
};

exports.OverviewPage = OverviewPage;