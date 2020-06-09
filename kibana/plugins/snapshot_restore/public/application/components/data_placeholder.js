"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataPlaceholder = void 0;

var _react = _interopRequireDefault(require("react"));

var _app_context = require("../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DataPlaceholder = function DataPlaceholder(_ref) {
  var data = _ref.data,
      children = _ref.children;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  if (data != null) {
    return children;
  }

  return _react.default.createElement(_react.default.Fragment, null, i18n.translate('xpack.snapshotRestore.dataPlaceholderLabel', {
    defaultMessage: '-'
  }));
};

exports.DataPlaceholder = DataPlaceholder;