"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensePreRoutingFactory = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const licensePreRoutingFactory = ({
  getLicenseStatus
}, handler) => {
  return function licenseCheck(ctx, request, response) {
    const licenseStatus = getLicenseStatus();

    if (!licenseStatus.hasRequired) {
      return response.customError({
        body: {
          message: licenseStatus.message || ''
        },
        statusCode: 403
      });
    }

    return handler(ctx, request, response);
  };
};

exports.licensePreRoutingFactory = licensePreRoutingFactory;