"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinks = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getLinks = function getLinks(_ref) {
  var DOC_LINK_VERSION = _ref.DOC_LINK_VERSION,
      ELASTIC_WEBSITE_URL = _ref.ELASTIC_WEBSITE_URL;
  return Object.freeze({
    painlessExecuteAPI: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-execute-api.html"),
    painlessExecuteAPIContexts: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-execute-api.html#_contexts"),
    painlessAPIReference: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-api-reference.html"),
    painlessWalkthrough: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-walkthrough.html"),
    painlessLangSpec: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-lang-spec.html"),
    esQueryDSL: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/query-dsl.html"),
    modulesScriptingPreferParams: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/modules-scripting-using.html#prefer-params")
  });
};

exports.getLinks = getLinks;