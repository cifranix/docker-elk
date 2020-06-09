"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../triggers_actions_ui/public");

var _triggers_actions_context = require("../../../utils/triggers_actions_context");

var _public2 = require("../../../../../../../src/plugins/kibana_react/public");

var _types = require("../../../../server/lib/alerting/metric_threshold/types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
var AlertFlyout = function AlertFlyout(props) {
  var _services$notificatio;

  var _useContext = (0, _react.useContext)(_triggers_actions_context.TriggerActionsContext),
      triggersActionsUI = _useContext.triggersActionsUI;

  var _useKibana = (0, _public2.useKibana)(),
      services = _useKibana.services;

  return _react.default.createElement(_react.default.Fragment, null, triggersActionsUI && _react.default.createElement(_public.AlertsContextProvider, {
    value: {
      metadata: {
        currentOptions: props.options,
        series: props.series
      },
      toastNotifications: (_services$notificatio = services.notifications) === null || _services$notificatio === void 0 ? void 0 : _services$notificatio.toasts,
      http: services.http,
      docLinks: services.docLinks,
      actionTypeRegistry: triggersActionsUI.actionTypeRegistry,
      alertTypeRegistry: triggersActionsUI.alertTypeRegistry
    }
  }, _react.default.createElement(_public.AlertAdd, {
    addFlyoutVisible: props.visible,
    setAddFlyoutVisibility: props.setVisible,
    alertTypeId: _types.METRIC_THRESHOLD_ALERT_TYPE_ID,
    canChangeTrigger: false,
    consumer: 'metrics'
  })));
};

exports.AlertFlyout = AlertFlyout;