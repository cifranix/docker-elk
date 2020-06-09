"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asKQL = asKQL;

var _risonNode = _interopRequireDefault(require("rison-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function asKQL(workspace, joinBy) {
  var nodes = workspace.returnUnpackedGroupeds(workspace.getSelectedOrAllNodes());
  var clauses = nodes.map(function (node) {
    return "\"".concat(escapeQuotes(node.data.field), "\" : \"").concat(escapeQuotes(node.data.term), "\"");
  });
  var expression = clauses.join(" ".concat(joinBy, " "));
  return encodeURIComponent(_risonNode.default.encode(expression));
}