"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultEmailTo = exports.setDefaultEmailTo = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultEmailTo;

var setDefaultEmailTo = function setDefaultEmailTo(emailTo) {
  defaultEmailTo = emailTo;
};

exports.setDefaultEmailTo = setDefaultEmailTo;

var getDefaultEmailTo = function getDefaultEmailTo() {
  return defaultEmailTo;
};

exports.getDefaultEmailTo = getDefaultEmailTo;