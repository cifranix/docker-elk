"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleNavLink = toggleNavLink;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function toggleNavLink(licenseInformation, navLinks) {
  var navLinkUpdates = {
    hidden: !licenseInformation.showAppLink
  };

  if (licenseInformation.showAppLink) {
    navLinkUpdates.disabled = !licenseInformation.enableAppLink;
    navLinkUpdates.tooltip = licenseInformation.message;
  }

  navLinks.update('graph', navLinkUpdates);
}