"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _react = require("react");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Header = function Header(_ref) {
  var _ref$breadcrumbs = _ref.breadcrumbs,
      breadcrumbs = _ref$breadcrumbs === void 0 ? [] : _ref$breadcrumbs,
      _ref$readOnlyBadge = _ref.readOnlyBadge,
      readOnlyBadge = _ref$readOnlyBadge === void 0 ? false : _ref$readOnlyBadge;
  var chrome = (0, _public.useKibana)().services.chrome;
  var badge = readOnlyBadge ? {
    text: _i18n.i18n.translate('xpack.infra.header.badge.readOnly.text', {
      defaultMessage: 'Read only'
    }),
    tooltip: _i18n.i18n.translate('xpack.infra.header.badge.readOnly.tooltip', {
      defaultMessage: 'Unable to change source configuration'
    }),
    iconType: 'glasses'
  } : undefined;
  var setBreadcrumbs = (0, _react.useCallback)(function () {
    return chrome === null || chrome === void 0 ? void 0 : chrome.setBreadcrumbs(breadcrumbs || []);
  }, [breadcrumbs, chrome]);
  var setBadge = (0, _react.useCallback)(function () {
    return chrome === null || chrome === void 0 ? void 0 : chrome.setBadge(badge);
  }, [badge, chrome]);
  (0, _react.useEffect)(function () {
    setBreadcrumbs();
    setBadge();
  }, [setBreadcrumbs, setBadge]);
  (0, _react.useEffect)(function () {
    setBreadcrumbs();
  }, [breadcrumbs, setBreadcrumbs]);
  (0, _react.useEffect)(function () {
    setBadge();
  }, [badge, setBadge]);
  return null;
};

exports.Header = Header;