"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _license = require("../../license");

var _top_nav = require("./top_nav");

var _main_tabs = require("./main_tabs");

var _tabs = require("./tabs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var tabSupport = {
  overview: null,
  jobs: 'anomaly_detection',
  settings: 'anomaly_detection',
  data_frame_analytics: null,
  datavisualizer: null,
  filedatavisualizer: null,
  timeseriesexplorer: 'anomaly_detection',
  'access-denied': null,
  explorer: 'anomaly_detection'
};

var NavigationMenu = function NavigationMenu(_ref) {
  var tabId = _ref.tabId;
  var disableLinks = (0, _license.isFullLicense)() === false;
  var showTabs = typeof tabSupport[tabId] !== 'undefined';
  var mainTabId = tabSupport[tabId] || tabId; // show horizontal rule if there are no subtabs

  var showHorizontalRule = tabSupport[tabId] === null;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, showTabs && _react.default.createElement(_main_tabs.MainTabs, {
    tabId: mainTabId,
    disableLinks: disableLinks
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_top_nav.TopNav, null))), showHorizontalRule && _react.default.createElement(_eui.EuiHorizontalRule, {
    className: "mlNavHorizontalRule"
  }), showTabs && _react.default.createElement(_tabs.Tabs, {
    tabId: tabId,
    mainTabId: mainTabId,
    disableLinks: disableLinks
  }));
};

exports.NavigationMenu = NavigationMenu;