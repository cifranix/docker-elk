"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.proxySettingsUrl = exports.proxyModeUrl = exports.transportPortUrl = exports.remoteClustersUrl = exports.skippingDisconnectedClustersUrl = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var skippingDisconnectedClustersUrl;
exports.skippingDisconnectedClustersUrl = skippingDisconnectedClustersUrl;
var remoteClustersUrl;
exports.remoteClustersUrl = remoteClustersUrl;
var transportPortUrl;
exports.transportPortUrl = transportPortUrl;
var proxyModeUrl;
exports.proxyModeUrl = proxyModeUrl;
var proxySettingsUrl;
exports.proxySettingsUrl = proxySettingsUrl;

function init(docLinks) {
  var DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION,
      ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL;
  var esDocBasePath = "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION);
  exports.skippingDisconnectedClustersUrl = skippingDisconnectedClustersUrl = "".concat(esDocBasePath, "/modules-cross-cluster-search.html#_skipping_disconnected_clusters");
  exports.remoteClustersUrl = remoteClustersUrl = "".concat(esDocBasePath, "/modules-remote-clusters.html");
  exports.transportPortUrl = transportPortUrl = "".concat(esDocBasePath, "/modules-transport.html");
  exports.proxyModeUrl = proxyModeUrl = "".concat(esDocBasePath, "/modules-remote-clusters.html#proxy-mode");
  exports.proxySettingsUrl = proxySettingsUrl = "".concat(esDocBasePath, "/modules-remote-clusters.html#remote-cluster-proxy-settings");
}