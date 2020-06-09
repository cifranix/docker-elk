"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUrlTemplateValid = isUrlTemplateValid;
exports.isKibanaUrl = isKibanaUrl;
exports.replaceKibanaUrlParam = replaceKibanaUrlParam;
exports.urlTemplateRegex = exports.urlTemplatePlaceholder = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var urlTemplatePlaceholder = '{{gquery}}';
exports.urlTemplatePlaceholder = urlTemplatePlaceholder;
var urlTemplateRegex = /\{\{gquery\}\}/g;
exports.urlTemplateRegex = urlTemplateRegex;
var defaultKibanaQuery = /,query:\(language:kuery,query:'.*?'\)/g;
/**
 * Checks whether a given string is a url template. This is the
 * case if it contains the placeholder `{{gquery}}`
 * @param url The url to check
 */

function isUrlTemplateValid(url) {
  return url.search(urlTemplateRegex) > -1;
}
/**
 * Checks whether a given string is a url that can be can be
 * turned into an url template by calling `replaceKibanaUrlParam`.
 * This is the case if a rison encoded `query` param exists
 * (this is the case e.g. for discover, dashboard and visualize URLs)
 * @param url The url to check
 */


function isKibanaUrl(url) {
  return url.search(defaultKibanaQuery) > -1;
}
/**
 * Replaces the current query with an url template placeholder.
 * This will only have an effect if `isKibanaUrl` returns `true`
 * on the given `url`
 * @param url The url to turn into an url template
 */


function replaceKibanaUrlParam(url) {
  return url.replace(defaultKibanaQuery, ",query:(language:kuery,query:{{".concat(urlTemplatePlaceholder, "}})"));
}