"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDocumentationLinks = void 0;

var _app_dependencies = require("../app_dependencies");

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useDocumentationLinks = function useDocumentationLinks() {
  var deps = (0, _app_dependencies.useAppDependencies)();
  var _deps$docLinks = deps.docLinks,
      ELASTIC_WEBSITE_URL = _deps$docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = _deps$docLinks.DOC_LINK_VERSION;
  return {
    esDocBasePath: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/"),
    esIndicesCreateIndex: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/indices-create-index.html#indices-create-index"),
    esPluginDocBasePath: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/plugins/").concat(DOC_LINK_VERSION, "/"),
    esQueryDsl: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/query-dsl.html"),
    esStackOverviewDocBasePath: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elastic-stack-overview/").concat(DOC_LINK_VERSION, "/"),
    esTransform: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/").concat(_constants.TRANSFORM_DOC_PATHS.transforms),
    esTransformPivot: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/put-transform.html#put-transform-request-body"),
    mlDocBasePath: "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/")
  };
};

exports.useDocumentationLinks = useDocumentationLinks;