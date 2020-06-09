"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobsListBreadcrumbs = getJobsListBreadcrumbs;

var _i18n = require("@kbn/i18n");

var _management_urls = require("./management_urls");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getJobsListBreadcrumbs() {
  return [{
    text: _i18n.i18n.translate('xpack.ml.jobsList.breadcrumb', {
      defaultMessage: 'Jobs'
    }),
    href: "#".concat(_management_urls.JOBS_LIST_PATH)
  }];
}