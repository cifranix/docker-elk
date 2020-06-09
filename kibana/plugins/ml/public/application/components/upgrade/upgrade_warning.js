"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpgradeWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _upgrade_service = require("../../services/upgrade_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UpgradeWarning = function UpgradeWarning() {
  if ((0, _upgrade_service.isUpgradeInProgress)() === true) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.upgrade.upgradeWarning.upgradeInProgressWarningTitle",
        defaultMessage: "Index migration in progress"
      }),
      color: "warning",
      iconType: "alert"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.upgrade.upgradeWarning.upgradeInProgressWarningDescription",
      defaultMessage: "Indices related to Machine Learning are currently being upgraded."
    }), _react.default.createElement("br", null), _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.upgrade.upgradeWarning.upgradeInProgressWarningDescriptionExtra",
      defaultMessage: "Some actions will not be available during this time."
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }));
  }

  return null;
};

exports.UpgradeWarning = UpgradeWarning;