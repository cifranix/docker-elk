"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common");

var _authorization = require("../../../../lib/authorization");

var _hooks = require("../../../../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StopAction = function StopAction(_ref) {
  var items = _ref.items,
      forceDisable = _ref.forceDisable;
  var isBulkAction = items.length > 1;
  var canStartStopTransform = (0, _react.useContext)(_authorization.AuthorizationContext).capabilities.canStartStopTransform;
  var stopTransforms = (0, _hooks.useStopTransforms)();

  var buttonStopText = _i18n.i18n.translate('xpack.transform.transformList.stopActionName', {
    defaultMessage: 'Stop'
  }); // Disable stop action if one of the transforms is stopped already


  var stoppedTransform = items.some(function (i) {
    return i.stats.state === _common.TRANSFORM_STATE.STOPPED;
  });
  var stoppedTransformMessage;

  if (isBulkAction === true) {
    stoppedTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.stoppedTransformBulkToolTip', {
      defaultMessage: 'One or more transforms are already stopped.'
    });
  } else {
    stoppedTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.stoppedTransformToolTip', {
      defaultMessage: '{transformId} is already stopped.',
      values: {
        transformId: items[0] && items[0].config.id
      }
    });
  }

  var handleStop = function handleStop() {
    stopTransforms(items);
  };

  var stopButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    disabled: forceDisable === true || !canStartStopTransform || stoppedTransform === true,
    iconType: "stop",
    onClick: handleStop,
    "aria-label": buttonStopText
  }, buttonStopText);

  if (!canStartStopTransform || stoppedTransform) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: !canStartStopTransform ? (0, _authorization.createCapabilityFailureMessage)('canStartStopTransform') : stoppedTransformMessage
    }, stopButton);
  }

  return stopButton;
};

exports.StopAction = StopAction;