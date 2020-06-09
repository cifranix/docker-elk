"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSpacesOnRequestInterceptor = initSpacesOnRequestInterceptor;

var _url = require("url");

var _constants = require("../../../common/constants");

var _url2 = require("../utils/url");

var _common = require("../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initSpacesOnRequestInterceptor({
  http
}) {
  http.registerOnPreAuth(async function spacesOnPreAuthHandler(request, response, toolkit) {
    const serverBasePath = http.basePath.serverBasePath;
    const path = request.url.pathname; // If navigating within the context of a space, then we store the Space's URL Context on the request,
    // and rewrite the request to not include the space identifier in the URL.

    const spaceId = (0, _common.getSpaceIdFromPath)(path, serverBasePath);

    if (spaceId !== _constants.DEFAULT_SPACE_ID) {
      const reqBasePath = `/s/${spaceId}`;
      http.basePath.set(request, reqBasePath);
      const newLocation = path && path.substr(reqBasePath.length) || '/';
      const newUrl = (0, _url2.modifyUrl)((0, _url.format)(request.url), parts => {
        return { ...parts,
          pathname: newLocation
        };
      });
      return toolkit.rewriteUrl(newUrl);
    }

    return toolkit.next();
  });
}