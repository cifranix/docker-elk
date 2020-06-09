"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedResponseHttpInterceptor = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UnauthorizedResponseHttpInterceptor =
/*#__PURE__*/
function () {
  function UnauthorizedResponseHttpInterceptor(sessionExpired, anonymousPaths) {
    _classCallCheck(this, UnauthorizedResponseHttpInterceptor);

    this.sessionExpired = sessionExpired;
    this.anonymousPaths = anonymousPaths;
  }

  _createClass(UnauthorizedResponseHttpInterceptor, [{
    key: "responseError",
    value: function responseError(httpErrorResponse, controller) {
      if (this.anonymousPaths.isAnonymous(window.location.pathname)) {
        return;
      } // if the request was omitting credentials it's to an anonymous endpoint
      // (for example to login) and we don't wish to ever redirect


      if (httpErrorResponse.request.credentials === 'omit') {
        return;
      } // if we happen to not have a response, for example if there is no
      // network connectivity, we don't do anything


      var response = httpErrorResponse.response;

      if (!response) {
        return;
      }

      if (response.status === 401) {
        this.sessionExpired.logout();
        controller.halt();
      }
    }
  }]);

  return UnauthorizedResponseHttpInterceptor;
}();

exports.UnauthorizedResponseHttpInterceptor = UnauthorizedResponseHttpInterceptor;