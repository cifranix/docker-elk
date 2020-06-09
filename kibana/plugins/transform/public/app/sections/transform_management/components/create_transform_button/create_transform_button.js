"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTransformButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _authorization = require("../../../../lib/authorization");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateTransformButton = function CreateTransformButton(_ref) {
  var onClick = _ref.onClick;

  var _useContext = (0, _react.useContext)(_authorization.AuthorizationContext),
      capabilities = _useContext.capabilities;

  var disabled = !capabilities.canCreateTransform || !capabilities.canPreviewTransform || !capabilities.canStartStopTransform;

  var createTransformButton = _react.default.createElement(_eui.EuiButton, {
    disabled: disabled,
    fill: true,
    onClick: onClick,
    iconType: "plusInCircle",
    "data-test-subj": "transformButtonCreate"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.transform.transformList.createTransformButton",
    defaultMessage: "Create a transform"
  }));

  if (disabled) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: (0, _authorization.createCapabilityFailureMessage)('canCreateTransform')
    }, createTransformButton);
  }

  return createTransformButton;
};

exports.CreateTransformButton = CreateTransformButton;