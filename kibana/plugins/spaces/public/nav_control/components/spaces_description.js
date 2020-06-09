"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpacesDescription = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _manage_spaces_button = require("./manage_spaces_button");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SpacesDescription = function SpacesDescription(props) {
  var panelProps = {
    id: props.id,
    className: 'spcDescription',
    title: 'Spaces'
  };
  return _react.default.createElement(_eui.EuiContextMenuPanel, panelProps, _react.default.createElement(_eui.EuiText, {
    className: "spcDescription__text"
  }, _react.default.createElement("p", null, (0, _constants.getSpacesFeatureDescription)())), _react.default.createElement("div", {
    key: "manageSpacesButton",
    className: "spcDescription__manageButtonWrapper"
  }, _react.default.createElement(_manage_spaces_button.ManageSpacesButton, {
    size: "s",
    style: {
      width: "100%"
    },
    onClick: props.onManageSpacesClick,
    capabilities: props.capabilities,
    navigateToApp: props.navigateToApp
  })));
};

exports.SpacesDescription = SpacesDescription;