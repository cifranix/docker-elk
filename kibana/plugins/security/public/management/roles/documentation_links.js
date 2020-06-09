"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentationLinksService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocumentationLinksService =
/*#__PURE__*/
function () {
  function DocumentationLinksService(docLinks) {
    _classCallCheck(this, DocumentationLinksService);

    _defineProperty(this, "esDocBasePath", void 0);

    this.esDocBasePath = "".concat(docLinks.ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(docLinks.DOC_LINK_VERSION, "/");
  }

  _createClass(DocumentationLinksService, [{
    key: "getESClusterPrivilegesDocUrl",
    value: function getESClusterPrivilegesDocUrl() {
      return "".concat(this.esDocBasePath, "security-privileges.html#privileges-list-cluster");
    }
  }, {
    key: "getESRunAsPrivilegesDocUrl",
    value: function getESRunAsPrivilegesDocUrl() {
      return "".concat(this.esDocBasePath, "security-privileges.html#_run_as_privilege");
    }
  }, {
    key: "getESIndicesPrivilegesDocUrl",
    value: function getESIndicesPrivilegesDocUrl() {
      return "".concat(this.esDocBasePath, "security-privileges.html#privileges-list-indices");
    }
  }]);

  return DocumentationLinksService;
}();

exports.DocumentationLinksService = DocumentationLinksService;