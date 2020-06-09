"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexTemplate = getIndexTemplate;
exports.getIlmPolicy = getIlmPolicy;

var _mappings = _interopRequireDefault(require("../../generated/mappings.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// returns the body of an index template used in an ES indices.putTemplate call
function getIndexTemplate(esNames) {
  const indexTemplateBody = {
    index_patterns: [esNames.indexPatternWithVersion],
    settings: {
      number_of_shards: 1,
      number_of_replicas: 1,
      'index.lifecycle.name': esNames.ilmPolicy,
      'index.lifecycle.rollover_alias': esNames.alias
    },
    mappings: _mappings.default
  };
  return indexTemplateBody;
} // returns the body of an ilm policy used in an ES PUT _ilm/policy call


function getIlmPolicy() {
  return {
    policy: {
      phases: {
        hot: {
          actions: {
            rollover: {
              max_size: '5GB',
              max_age: '30d' // max_docs: 1, // you know, for testing

            }
          }
        }
      }
    }
  };
}