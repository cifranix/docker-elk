"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeAvailableWarning = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _ml_nodes_check = require("../../ml_nodes_check");

var _ml_server_info = require("../../services/ml_server_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NodeAvailableWarning = function NodeAvailableWarning() {
  if ((0, _ml_nodes_check.mlNodesAvailable)() === true || (0, _ml_nodes_check.permissionToViewMlNodeCount)() === false) {
    return null;
  }

  var id = (0, _ml_server_info.getCloudDeploymentId)();
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.jobsList.nodeAvailableWarning.noMLNodesAvailableTitle",
      defaultMessage: "No ML nodes available"
    }),
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.jobsList.nodeAvailableWarning.noMLNodesAvailableDescription",
    defaultMessage: "There are no ML nodes available."
  })), _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.jobsList.nodeAvailableWarning.unavailableCreateOrRunJobsDescription",
    defaultMessage: "You will not be able to create or run jobs."
  })), _ml_server_info.isCloud && id !== null && _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.jobsList.nodeAvailableWarning.linkToCloudDescription",
    defaultMessage: "Please edit your {link}. You may enable a free 1GB machine learning node or expand your existing ML configuration.",
    values: {
      link: _react.default.createElement(_eui.EuiLink, {
        href: "https://cloud.elastic.co/deployments?q=".concat(id)
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.jobsList.nodeAvailableWarning.linkToCloud.hereLinkText",
        defaultMessage: "Elastic Cloud deployment"
      }))
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
};

exports.NodeAvailableWarning = NodeAvailableWarning;