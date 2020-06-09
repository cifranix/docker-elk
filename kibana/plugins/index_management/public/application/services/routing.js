"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodePath = exports.getTemplateCloneLink = exports.getTemplateEditLink = exports.getTemplateDetailsLink = exports.getTemplateListLink = void 0;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTemplateListLink = function getTemplateListLink() {
  return "".concat(_constants.BASE_PATH, "templates");
}; // Need to add some additonal encoding/decoding logic to work with React Router
// For background, see: https://github.com/ReactTraining/history/issues/505


exports.getTemplateListLink = getTemplateListLink;

var getTemplateDetailsLink = function getTemplateDetailsLink(name) {
  var withHash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var baseUrl = "".concat(_constants.BASE_PATH, "templates/").concat(encodeURIComponent(encodeURIComponent(name)));
  var url = withHash ? "#".concat(baseUrl) : baseUrl;
  return encodeURI(url);
};

exports.getTemplateDetailsLink = getTemplateDetailsLink;

var getTemplateEditLink = function getTemplateEditLink(name) {
  return encodeURI("".concat(_constants.BASE_PATH, "edit_template/").concat(encodeURIComponent(encodeURIComponent(name))));
};

exports.getTemplateEditLink = getTemplateEditLink;

var getTemplateCloneLink = function getTemplateCloneLink(name) {
  return encodeURI("".concat(_constants.BASE_PATH, "clone_template/").concat(encodeURIComponent(encodeURIComponent(name))));
};

exports.getTemplateCloneLink = getTemplateCloneLink;

var decodePath = function decodePath(pathname) {
  var decodedPath;

  try {
    decodedPath = decodeURI(pathname);
    decodedPath = decodeURIComponent(decodedPath);
  } catch (_error) {
    decodedPath = decodeURIComponent(pathname);
  }

  return decodeURIComponent(decodedPath);
};

exports.decodePath = decodePath;