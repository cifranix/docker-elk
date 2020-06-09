"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTableDisplay = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _model = require("../../../common/model");

var _management_urls = require("../management_urls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RoleTableDisplay = function RoleTableDisplay(_ref) {
  var role = _ref.role;
  var content;
  var href;

  if (typeof role === 'string') {
    content = _react.default.createElement("div", null, role);
    href = (0, _management_urls.getEditRoleHref)(role);
  } else if ((0, _model.isRoleDeprecated)(role)) {
    content = _react.default.createElement(_eui.EuiToolTip, {
      content: (0, _model.getExtendedRoleDeprecationNotice)(role),
      "data-test-subj": "roleDeprecationTooltip"
    }, _react.default.createElement("div", null, role.name, " ", _react.default.createElement(_eui.EuiIcon, {
      type: "alert",
      color: "warning",
      size: "s",
      className: 'eui-alignTop'
    })));
    href = (0, _management_urls.getEditRoleHref)(role.name);
  } else {
    content = _react.default.createElement("div", null, role.name);
    href = (0, _management_urls.getEditRoleHref)(role.name);
  }

  return _react.default.createElement(_eui.EuiLink, {
    href: href
  }, content);
};

exports.RoleTableDisplay = RoleTableDisplay;