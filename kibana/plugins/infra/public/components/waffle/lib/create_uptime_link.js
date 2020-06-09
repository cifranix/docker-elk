"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUptimeLink = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createUptimeLink = function createUptimeLink(options, nodeType, node) {
  if (nodeType === 'host' && node.ip) {
    return {
      app: 'uptime',
      hash: '/',
      search: {
        search: "host.ip:\"".concat(node.ip, "\"")
      }
    };
  }

  var field = (0, _lodash.get)(options, ['fields', nodeType], '');
  return {
    app: 'uptime',
    hash: '/',
    search: {
      search: "".concat(field ? field + ':' : '', "\"").concat(node.id, "\"")
    }
  };
};

exports.createUptimeLink = createUptimeLink;