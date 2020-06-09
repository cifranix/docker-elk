"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpaceColumnHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../../spaces/public");

var _privilege_utils = require("../../../privilege_utils");

var _spaces_popover_list = require("../../../spaces_popover_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SPACES_DISPLAY_COUNT = 4;

var SpaceColumnHeader = function SpaceColumnHeader(props) {
  var isGlobal = (0, _privilege_utils.isGlobalPrivilegeDefinition)(props.entry);
  var entrySpaces = props.entry.spaces.map(function (spaceId) {
    var _props$spaces$find;

    return (_props$spaces$find = props.spaces.find(function (s) {
      return s.id === spaceId;
    })) !== null && _props$spaces$find !== void 0 ? _props$spaces$find : {
      id: spaceId,
      name: spaceId,
      disabledFeatures: []
    };
  });
  return _react.default.createElement("div", null, entrySpaces.slice(0, SPACES_DISPLAY_COUNT).map(function (space) {
    return _react.default.createElement("span", {
      key: space.id
    }, _react.default.createElement(_public.SpaceAvatar, {
      size: "s",
      space: space
    }), ' ', isGlobal && _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRole.spacePrivilegeMatrix.globalSpaceName",
      defaultMessage: "Global"
    }), _react.default.createElement("br", null), _react.default.createElement(_spaces_popover_list.SpacesPopoverList, {
      spaces: props.spaces.filter(function (s) {
        return s.id !== '*';
      }),
      buttonText: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeMatrix.showAllSpacesLink', {
        defaultMessage: '(all spaces)'
      })
    })));
  }), entrySpaces.length > SPACES_DISPLAY_COUNT && _react.default.createElement(_react.Fragment, null, _react.default.createElement("br", null), _react.default.createElement(_spaces_popover_list.SpacesPopoverList, {
    spaces: entrySpaces,
    buttonText: _i18n.i18n.translate('xpack.security.management.editRole.spacePrivilegeMatrix.showNMoreSpacesLink', {
      defaultMessage: '+{count} more',
      values: {
        count: entrySpaces.length - SPACES_DISPLAY_COUNT
      }
    })
  })));
};

exports.SpaceColumnHeader = SpaceColumnHeader;