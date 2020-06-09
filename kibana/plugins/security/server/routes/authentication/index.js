"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCustomResourceResponse = createCustomResourceResponse;
exports.defineAuthenticationRoutes = defineAuthenticationRoutes;

var _session = require("./session");

var _saml = require("./saml");

var _basic = require("./basic");

var _common = require("./common");

var _oidc = require("./oidc");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createCustomResourceResponse(body, contentType, cspHeader) {
  return {
    body,
    headers: {
      'content-type': contentType,
      'cache-control': 'private, no-cache, no-store',
      'content-security-policy': cspHeader
    },
    statusCode: 200
  };
}

function defineAuthenticationRoutes(params) {
  (0, _session.defineSessionRoutes)(params);
  (0, _common.defineCommonRoutes)(params);

  if (params.authc.isProviderTypeEnabled('basic') || params.authc.isProviderTypeEnabled('token')) {
    (0, _basic.defineBasicRoutes)(params);
  }

  if (params.authc.isProviderTypeEnabled('saml')) {
    (0, _saml.defineSAMLRoutes)(params);
  }

  if (params.authc.isProviderTypeEnabled('oidc')) {
    (0, _oidc.defineOIDCRoutes)(params);
  }
}