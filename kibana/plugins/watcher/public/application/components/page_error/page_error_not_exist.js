"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageErrorNotExist = PageErrorNotExist;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function PageErrorNotExist(_ref) {
  var id = _ref.id;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "search",
    iconColor: "primary",
    title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.pageErrorNotExist.title",
      defaultMessage: "Couldn't find watch"
    })),
    body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.pageErrorNotExist.description",
      defaultMessage: "A watch with ID '{id}' could not be found.",
      values: {
        id: id
      }
    }))
  });
}