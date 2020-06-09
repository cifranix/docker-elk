"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBreadcrumb = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var setBreadcrumb = function setBreadcrumb(section) {
  return function (dispatch, getState, _ref) {
    var breadcrumbService = _ref.breadcrumbService;
    breadcrumbService.setBreadcrumbs(section);
  };
};

exports.setBreadcrumb = setBreadcrumb;