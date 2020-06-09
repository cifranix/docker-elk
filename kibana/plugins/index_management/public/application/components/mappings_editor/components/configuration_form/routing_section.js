"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutingSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../services/documentation");

var _shared_imports = require("../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RoutingSection = function RoutingSection() {
  return _react.default.createElement(_shared_imports.FormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.routingTitle', {
      defaultMessage: '_routing'
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.routingDescription",
      defaultMessage: "A document can be routed to a particular shard in an index. When using custom routing, it is important to provide the routing value whenever indexing a document as otherwise this could lead to a document being indexed on more than one shard. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getRoutingLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.routingDocumentionLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "_routing.required",
    component: _shared_imports.ToggleField
  }));
};

exports.RoutingSection = RoutingSection;