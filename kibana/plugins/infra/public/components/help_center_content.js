"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpCenterContent = void 0;

var _react = require("react");

var _public = require("../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HelpCenterContent = function HelpCenterContent(_ref) {
  var feedbackLink = _ref.feedbackLink,
      appName = _ref.appName;
  var chrome = (0, _public.useKibana)().services.chrome;
  (0, _react.useEffect)(function () {
    return chrome === null || chrome === void 0 ? void 0 : chrome.setHelpExtension({
      appName: appName,
      links: [{
        linkType: 'discuss',
        href: feedbackLink
      }]
    });
  }, [feedbackLink, appName, chrome]);
  return null;
};

exports.HelpCenterContent = HelpCenterContent;