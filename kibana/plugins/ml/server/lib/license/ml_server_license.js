"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlServerLicense = void 0;

var _license = require("../../../common/license");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class MlServerLicense extends _license.MlLicense {
  fullLicenseAPIGuard(handler) {
    return guard(() => this.isFullLicense(), handler);
  }

  basicLicenseAPIGuard(handler) {
    return guard(() => this.isMinimumLicense(), handler);
  }

}

exports.MlServerLicense = MlServerLicense;

function guard(check, handler) {
  return (context, request, response) => {
    if (check() === false) {
      return response.forbidden();
    }

    return handler(context, request, response);
  };
}