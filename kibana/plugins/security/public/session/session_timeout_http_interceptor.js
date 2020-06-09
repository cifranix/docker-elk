"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionTimeoutHttpInterceptor = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SessionTimeoutHttpInterceptor =
/*#__PURE__*/
function () {
  function SessionTimeoutHttpInterceptor(sessionTimeout, anonymousPaths) {
    _classCallCheck(this, SessionTimeoutHttpInterceptor);

    this.sessionTimeout = sessionTimeout;
    this.anonymousPaths = anonymousPaths;
  }

  _createClass(SessionTimeoutHttpInterceptor, [{
    key: "response",
    value: function response(httpResponse) {
      if (this.anonymousPaths.isAnonymous(window.location.pathname)) {
        return;
      }

      if (httpResponse.fetchOptions.asSystemRequest) {
        return;
      }

      this.sessionTimeout.extend(httpResponse.request.url);
    }
  }, {
    key: "responseError",
    value: function responseError(httpErrorResponse) {
      if (this.anonymousPaths.isAnonymous(window.location.pathname)) {
        return;
      }

      if (httpErrorResponse.fetchOptions.asSystemRequest) {
        return;
      } // if we happen to not have a response, for example if there is no
      // network connectivity, we won't extend the session because there
      // won't be a response with a set-cookie header, which is required
      // to extend the session


      var response = httpErrorResponse.response;

      if (!response) {
        return;
      }

      this.sessionTimeout.extend(httpErrorResponse.request.url);
    }
  }]);

  return SessionTimeoutHttpInterceptor;
}();

exports.SessionTimeoutHttpInterceptor = SessionTimeoutHttpInterceptor;