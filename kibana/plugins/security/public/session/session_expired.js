"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionExpired = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getNextParameter = function getNextParameter() {
  var _window = window,
      location = _window.location;
  var next = encodeURIComponent("".concat(location.pathname).concat(location.search).concat(location.hash));
  return "&next=".concat(next);
};

var getProviderParameter = function getProviderParameter(tenant) {
  var key = "".concat(tenant, "/session_provider");
  var providerName = sessionStorage.getItem(key);
  return providerName ? "&provider=".concat(encodeURIComponent(providerName)) : '';
};

var SessionExpired =
/*#__PURE__*/
function () {
  function SessionExpired(logoutUrl, tenant) {
    _classCallCheck(this, SessionExpired);

    this.logoutUrl = logoutUrl;
    this.tenant = tenant;
  }

  _createClass(SessionExpired, [{
    key: "logout",
    value: function logout() {
      var next = getNextParameter();
      var provider = getProviderParameter(this.tenant);
      window.location.assign("".concat(this.logoutUrl, "?msg=SESSION_EXPIRED").concat(next).concat(provider));
    }
  }]);

  return SessionExpired;
}();

exports.SessionExpired = SessionExpired;