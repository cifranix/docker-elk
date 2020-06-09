"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetadataContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetadataContext = _react.default.createContext(null);

exports.MetadataContext = MetadataContext;