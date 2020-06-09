"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusBreadcrumb = exports.editBreadcrumb = exports.createBreadcrumb = exports.listBreadcrumb = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var listBreadcrumb = {
  text: _i18n.i18n.translate('xpack.watcher.breadcrumb.listLabel', {
    defaultMessage: 'Watcher'
  }),
  href: '#/management/elasticsearch/watcher/watches/'
};
exports.listBreadcrumb = listBreadcrumb;
var createBreadcrumb = {
  text: _i18n.i18n.translate('xpack.watcher.breadcrumb.createLabel', {
    defaultMessage: 'Create'
  })
};
exports.createBreadcrumb = createBreadcrumb;
var editBreadcrumb = {
  text: _i18n.i18n.translate('xpack.watcher.breadcrumb.editLabel', {
    defaultMessage: 'Edit'
  })
};
exports.editBreadcrumb = editBreadcrumb;
var statusBreadcrumb = {
  text: _i18n.i18n.translate('xpack.watcher.breadcrumb.statusLabel', {
    defaultMessage: 'Status'
  })
};
exports.statusBreadcrumb = statusBreadcrumb;