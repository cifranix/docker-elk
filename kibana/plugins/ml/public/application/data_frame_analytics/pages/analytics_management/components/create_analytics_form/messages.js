"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Messages = function Messages(_ref) {
  var messages = _ref.messages;
  return _react.default.createElement(_react.default.Fragment, null, messages.map(function (requestMessage, i) {
    return _react.default.createElement(_react.Fragment, {
      key: i
    }, _react.default.createElement(_eui.EuiCallOut, {
      title: requestMessage.message,
      color: requestMessage.error !== undefined ? 'danger' : 'primary',
      iconType: requestMessage.error !== undefined ? 'alert' : 'checkInCircleFilled',
      size: "s"
    }, requestMessage.error !== undefined && _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      fontSize: "s",
      paddingSize: "s",
      isCopyable: true
    }, requestMessage.error)), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }));
  }));
};

exports.Messages = Messages;