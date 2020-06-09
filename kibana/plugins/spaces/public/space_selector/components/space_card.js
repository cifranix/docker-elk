"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceCard = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _common = require("../../../common");

var _space_avatar = require("../../space_avatar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SpaceCard = function SpaceCard(props) {
  var serverBasePath = props.serverBasePath,
      space = props.space;
  return _react.default.createElement(_eui.EuiCard, {
    className: "spaceCard",
    "data-test-subj": "space-card-".concat(space.id),
    icon: renderSpaceAvatar(space),
    title: space.name,
    description: renderSpaceDescription(space),
    href: (0, _common.addSpaceIdToPath)(serverBasePath, space.id, _common.ENTER_SPACE_PATH)
  });
};

exports.SpaceCard = SpaceCard;

function renderSpaceAvatar(space) {
  // not announcing space name here because the title of the EuiCard that the SpaceAvatar lives in is already
  // announcing it. See https://github.com/elastic/kibana/issues/27748
  return _react.default.createElement(_space_avatar.SpaceAvatar, {
    space: space,
    size: 'l',
    announceSpaceName: false
  });
}

function renderSpaceDescription(space) {
  var description = space.description || '';
  var needsTruncation = description.length > 120;

  if (needsTruncation) {
    description = description.substr(0, 120) + '…';
  }

  return _react.default.createElement("span", {
    title: description,
    className: "eui-textBreakWord euiTextColor--subdued"
  }, description);
}