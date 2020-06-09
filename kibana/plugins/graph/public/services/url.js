"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHomePath = getHomePath;
exports.getNewPath = getNewPath;
exports.getEditPath = getEditPath;
exports.getEditUrl = getEditUrl;
exports.setBreadcrumbs = setBreadcrumbs;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getHomePath() {
  return '/home';
}

function getNewPath() {
  return '/workspace';
}

function getEditPath(_ref) {
  var id = _ref.id;
  return "/workspace/".concat(id);
}

function getEditUrl(addBasePath, workspace) {
  return addBasePath("#".concat(getEditPath(workspace)));
}

function setBreadcrumbs(options) {
  if ('metaData' in options) {
    options.chrome.setBreadcrumbs([{
      text: _i18n.i18n.translate('xpack.graph.home.breadcrumb', {
        defaultMessage: 'Graph'
      }),
      onClick: function onClick() {
        options.navigateTo(getHomePath());
      },
      'data-test-subj': 'graphHomeBreadcrumb'
    }, {
      text: options.metaData.title,
      'data-test-subj': 'graphCurrentGraphBreadcrumb'
    }]);
  } else {
    options.chrome.setBreadcrumbs([{
      text: _i18n.i18n.translate('xpack.graph.home.breadcrumb', {
        defaultMessage: 'Graph'
      }),
      href: "#".concat(getHomePath()),
      'data-test-subj': 'graphHomeBreadcrumb'
    }]);
  }
}