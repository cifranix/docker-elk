"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpService = exports.HttpService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HttpService =
/*#__PURE__*/
function () {
  function HttpService() {
    _classCallCheck(this, HttpService);

    _defineProperty(this, "client", void 0);
  }

  _createClass(HttpService, [{
    key: "setup",
    value: function setup(httpClient) {
      this.client = httpClient;
    }
  }, {
    key: "httpClient",
    get: function get() {
      return this.client;
    }
  }]);

  return HttpService;
}();

exports.HttpService = HttpService;
var httpService = new HttpService();
exports.httpService = httpService;