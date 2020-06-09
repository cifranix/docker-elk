"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDependencyCache = setDependencyCache;
exports.getTimefilter = getTimefilter;
exports.getTimeHistory = getTimeHistory;
exports.getDocLinks = getDocLinks;
exports.getToastNotifications = getToastNotifications;
exports.getOverlays = getOverlays;
exports.getUiSettings = getUiSettings;
exports.getRecentlyAccessed = getRecentlyAccessed;
exports.getFieldFormats = getFieldFormats;
exports.getAutocomplete = getAutocomplete;
exports.getChrome = getChrome;
exports.getBasePath = getBasePath;
exports.getSavedObjectsClient = getSavedObjectsClient;
exports.getApplication = getApplication;
exports.getHttp = getHttp;
exports.getSecurity = getSecurity;
exports.getI18n = getI18n;
exports.getGetUrlGenerator = getGetUrlGenerator;
exports.clearCache = clearCache;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var cache = {
  timefilter: null,
  config: null,
  indexPatterns: null,
  chrome: null,
  docLinks: null,
  toastNotifications: null,
  overlays: null,
  recentlyAccessed: null,
  fieldFormats: null,
  autocomplete: null,
  basePath: null,
  savedObjectsClient: null,
  application: null,
  http: null,
  security: null,
  i18n: null,
  urlGenerators: null
};

function setDependencyCache(deps) {
  cache.timefilter = deps.timefilter || null;
  cache.config = deps.config || null;
  cache.chrome = deps.chrome || null;
  cache.indexPatterns = deps.indexPatterns || null;
  cache.docLinks = deps.docLinks || null;
  cache.toastNotifications = deps.toastNotifications || null;
  cache.overlays = deps.overlays || null;
  cache.recentlyAccessed = deps.recentlyAccessed || null;
  cache.fieldFormats = deps.fieldFormats || null;
  cache.autocomplete = deps.autocomplete || null;
  cache.basePath = deps.basePath || null;
  cache.savedObjectsClient = deps.savedObjectsClient || null;
  cache.application = deps.application || null;
  cache.http = deps.http || null;
  cache.security = deps.security || null;
  cache.i18n = deps.i18n || null;
  cache.urlGenerators = deps.urlGenerators || null;
}

function getTimefilter() {
  if (cache.timefilter === null) {
    throw new Error("timefilter hasn't been initialized");
  }

  return cache.timefilter.timefilter;
}

function getTimeHistory() {
  if (cache.timefilter === null) {
    throw new Error("timefilter hasn't been initialized");
  }

  return cache.timefilter.history;
}

function getDocLinks() {
  if (cache.docLinks === null) {
    throw new Error("docLinks hasn't been initialized");
  }

  return cache.docLinks;
}

function getToastNotifications() {
  if (cache.toastNotifications === null) {
    throw new Error("toast notifications haven't been initialized");
  }

  return cache.toastNotifications;
}

function getOverlays() {
  if (cache.overlays === null) {
    throw new Error("overlays haven't been initialized");
  }

  return cache.overlays;
}

function getUiSettings() {
  if (cache.config === null) {
    throw new Error("uiSettings hasn't been initialized");
  }

  return cache.config;
}

function getRecentlyAccessed() {
  if (cache.recentlyAccessed === null) {
    throw new Error("recentlyAccessed hasn't been initialized");
  }

  return cache.recentlyAccessed;
}

function getFieldFormats() {
  if (cache.fieldFormats === null) {
    throw new Error("fieldFormats hasn't been initialized");
  }

  return cache.fieldFormats;
}

function getAutocomplete() {
  if (cache.autocomplete === null) {
    throw new Error("autocomplete hasn't been initialized");
  }

  return cache.autocomplete;
}

function getChrome() {
  if (cache.chrome === null) {
    throw new Error("chrome hasn't been initialized");
  }

  return cache.chrome;
}

function getBasePath() {
  if (cache.basePath === null) {
    throw new Error("basePath hasn't been initialized");
  }

  return cache.basePath;
}

function getSavedObjectsClient() {
  if (cache.savedObjectsClient === null) {
    throw new Error("savedObjectsClient hasn't been initialized");
  }

  return cache.savedObjectsClient;
}

function getApplication() {
  if (cache.application === null) {
    throw new Error("application hasn't been initialized");
  }

  return cache.application;
}

function getHttp() {
  if (cache.http === null) {
    throw new Error("http hasn't been initialized");
  }

  return cache.http;
}

function getSecurity() {
  if (cache.security === null) {
    throw new Error("security hasn't been initialized");
  }

  return cache.security;
}

function getI18n() {
  if (cache.i18n === null) {
    throw new Error("i18n hasn't been initialized");
  }

  return cache.i18n;
}

function getGetUrlGenerator() {
  if (cache.urlGenerators === null) {
    throw new Error("urlGenerators hasn't been initialized");
  }

  return cache.urlGenerators.getUrlGenerator;
}

function clearCache() {
  console.log('clearing dependency cache'); // eslint-disable-line no-console

  Object.keys(cache).forEach(function (k) {
    cache[k] = null;
  });
}