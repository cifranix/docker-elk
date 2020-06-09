"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canRedirectRequest = canRedirectRequest;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ROUTE_TAG_API = 'api';
const KIBANA_XSRF_HEADER = 'kbn-xsrf';
const KIBANA_VERSION_HEADER = 'kbn-version';
/**
 * Checks whether we can reply to the request with redirect response. We can do that
 * only for non-AJAX and non-API requests.
 * @param request HapiJS request instance to check redirection possibility for.
 */

function canRedirectRequest(request) {
  const headers = request.headers;
  const hasVersionHeader = headers.hasOwnProperty(KIBANA_VERSION_HEADER);
  const hasXsrfHeader = headers.hasOwnProperty(KIBANA_XSRF_HEADER);
  const isApiRoute = request.route.options.tags.includes(ROUTE_TAG_API);
  const isAjaxRequest = hasVersionHeader || hasXsrfHeader;
  return !isApiRoute && !isAjaxRequest;
}