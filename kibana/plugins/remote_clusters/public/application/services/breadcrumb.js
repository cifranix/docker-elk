"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.setBreadcrumbs = setBreadcrumbs;

var _i18n = require("@kbn/i18n");

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var _setBreadcrumbs;

var _breadcrumbs;

function init(setGlobalBreadcrumbs) {
  _setBreadcrumbs = setGlobalBreadcrumbs;
  _breadcrumbs = {
    home: {
      text: _i18n.i18n.translate('xpack.remoteClusters.listBreadcrumbTitle', {
        defaultMessage: 'Remote Clusters'
      }),
      href: "#".concat(_constants.CRUD_APP_BASE_PATH, "/list")
    },
    add: {
      text: _i18n.i18n.translate('xpack.remoteClusters.addBreadcrumbTitle', {
        defaultMessage: 'Add'
      })
    },
    edit: {
      text: _i18n.i18n.translate('xpack.remoteClusters.editBreadcrumbTitle', {
        defaultMessage: 'Edit'
      })
    }
  };
}

function setBreadcrumbs(type, queryParams) {
  if (!_breadcrumbs[type]) {
    return;
  }

  if (type === 'home') {
    _setBreadcrumbs([_breadcrumbs.home]);
  } else {
    // Support deep-linking back to a remote cluster in the detail panel.
    var homeBreadcrumb = {
      text: _breadcrumbs.home.text,
      href: "".concat(_breadcrumbs.home.href).concat(queryParams)
    };

    _setBreadcrumbs([homeBreadcrumb, _breadcrumbs[type]]);
  }
}