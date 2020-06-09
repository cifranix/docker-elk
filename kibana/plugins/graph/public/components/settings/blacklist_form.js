"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlacklistForm = BlacklistForm;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _legacy_icon = require("../legacy_icon");

var _use_list_keys = require("./use_list_keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function BlacklistForm(_ref) {
  var blacklistedNodes = _ref.blacklistedNodes,
      unblacklistNode = _ref.unblacklistNode;
  var getListKey = (0, _use_list_keys.useListKeys)(blacklistedNodes || []);
  return _react.default.createElement(_react.default.Fragment, null, blacklistedNodes && blacklistedNodes.length > 0 ? _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.graph.settings.blacklist.blacklistHelpText', {
    defaultMessage: 'These terms are not allowed in the graph.'
  })) : _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.graph.blacklist.noEntriesDescription",
      defaultMessage: "You don't have any blocked terms. Select vertices and click {stopSign} in the control panel on the right to block them. Documents that match blocked terms are no longer explored and relationships to them are hidden.",
      values: {
        stopSign: _react.default.createElement("span", {
          className: "kuiIcon fa-ban"
        })
      }
    })
  }), _react.default.createElement(_eui.EuiSpacer, null), blacklistedNodes && unblacklistNode && blacklistedNodes.length > 0 && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiListGroup, {
    bordered: true,
    maxWidth: false
  }, blacklistedNodes.map(function (node) {
    return _react.default.createElement(_eui.EuiListGroupItem, {
      icon: _react.default.createElement(_legacy_icon.LegacyIcon, {
        icon: node.icon,
        asListIcon: true
      }),
      key: getListKey(node),
      label: node.label,
      extraAction: {
        iconType: 'trash',
        'aria-label': _i18n.i18n.translate('xpack.graph.blacklist.removeButtonAriaLabel', {
          defaultMessage: 'Delete'
        }),
        title: _i18n.i18n.translate('xpack.graph.blacklist.removeButtonAriaLabel', {
          defaultMessage: 'Delete'
        }),
        color: 'danger',
        onClick: function onClick() {
          unblacklistNode(node);
        }
      }
    });
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "graphUnblacklistAll",
    color: "danger",
    iconType: "trash",
    size: "s",
    fill: true,
    onClick: function onClick() {
      blacklistedNodes.forEach(function (node) {
        unblacklistNode(node);
      });
    }
  }, _i18n.i18n.translate('xpack.graph.settings.blacklist.clearButtonLabel', {
    defaultMessage: 'Delete all'
  }))));
}