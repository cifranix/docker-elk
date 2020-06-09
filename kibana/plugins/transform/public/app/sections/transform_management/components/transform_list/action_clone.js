"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloneAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _authorization = require("../../../../lib/authorization");

var _constants = require("../../../../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CloneAction = function CloneAction(_ref) {
  var itemId = _ref.itemId;
  var history = (0, _reactRouterDom.useHistory)();
  var canCreateTransform = (0, _react.useContext)(_authorization.AuthorizationContext).capabilities.canCreateTransform;

  var buttonCloneText = _i18n.i18n.translate('xpack.transform.transformList.cloneActionName', {
    defaultMessage: 'Clone'
  });

  function clickHandler() {
    history.push("".concat(_constants.CLIENT_BASE_PATH).concat(_constants.SECTION_SLUG.CLONE_TRANSFORM, "/").concat(itemId));
  }

  var cloneButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    disabled: !canCreateTransform,
    iconType: "copy",
    onClick: clickHandler,
    "aria-label": buttonCloneText
  }, buttonCloneText);

  if (!canCreateTransform) {
    var content = (0, _authorization.createCapabilityFailureMessage)('canStartStopTransform');
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: content
    }, cloneButton);
  }

  return _react.default.createElement(_react.default.Fragment, null, cloneButton);
};

exports.CloneAction = CloneAction;