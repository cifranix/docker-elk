"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkActionTypeEnabled = checkActionTypeEnabled;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../common/constants");

require("./check_action_type_enabled.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function checkActionTypeEnabled(actionType) {
  if ((actionType === null || actionType === void 0 ? void 0 : actionType.enabledInLicense) === false) {
    return {
      isEnabled: false,
      message: _i18n.i18n.translate('xpack.triggersActionsUI.checkActionTypeEnabled.actionTypeDisabledByLicenseMessage', {
        defaultMessage: 'This connector requires a {minimumLicenseRequired} license.',
        values: {
          minimumLicenseRequired: (0, _lodash.capitalize)(actionType.minimumLicenseRequired)
        }
      }),
      messageCard: _react.default.createElement(_eui.EuiCard, {
        titleSize: "xs",
        title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.actionTypeDisabledByLicenseMessageTitle', {
          defaultMessage: 'This feature requires a {minimumLicenseRequired} license.',
          values: {
            minimumLicenseRequired: (0, _lodash.capitalize)(actionType.minimumLicenseRequired)
          }
        }) // The "re-enable" terminology is used here because this message is used when an alert
        // action was previously enabled and needs action to be re-enabled.
        ,
        description: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.actionTypeDisabledByLicenseMessageDescription', {
          defaultMessage: 'To re-enable this action, please upgrade your license.'
        }),
        className: "actCheckActionTypeEnabled__disabledActionWarningCard",
        children: _react.default.createElement(_eui.EuiLink, {
          href: _constants.VIEW_LICENSE_OPTIONS_LINK,
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          defaultMessage: "View license options",
          id: "xpack.triggersActionsUI.sections.alertForm.actionTypeDisabledByLicenseLinkTitle"
        }))
      })
    };
  }

  if ((actionType === null || actionType === void 0 ? void 0 : actionType.enabledInConfig) === false) {
    return {
      isEnabled: false,
      message: _i18n.i18n.translate('xpack.triggersActionsUI.checkActionTypeEnabled.actionTypeDisabledByConfigMessage', {
        defaultMessage: 'This connector is disabled by the Kibana configuration.'
      }),
      messageCard: _react.default.createElement(_eui.EuiCard, {
        title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertForm.actionTypeDisabledByConfigMessageTitle', {
          defaultMessage: 'This feature is disabled by the Kibana configuration.'
        }),
        description: "",
        className: "actCheckActionTypeEnabled__disabledActionWarningCard"
      })
    };
  }

  return {
    isEnabled: true
  };
}