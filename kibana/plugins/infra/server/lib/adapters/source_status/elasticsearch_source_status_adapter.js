"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraElasticsearchSourceStatusAdapter = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class InfraElasticsearchSourceStatusAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getIndexNames(requestContext, aliasName) {
    const indexMaps = await Promise.all([this.framework.callWithRequest(requestContext, 'indices.getAlias', {
      name: aliasName,
      filterPath: '*.settings.index.uuid' // to keep the response size as small as possible

    }).catch(withDefaultIfNotFound({})), this.framework.callWithRequest(requestContext, 'indices.get', {
      index: aliasName,
      filterPath: '*.settings.index.uuid' // to keep the response size as small as possible

    }).catch(withDefaultIfNotFound({}))]);
    return indexMaps.reduce((indexNames, indexMap) => [...indexNames, ...Object.keys(indexMap)], []);
  }

  async hasAlias(requestContext, aliasName) {
    return await this.framework.callWithRequest(requestContext, 'indices.existsAlias', {
      name: aliasName
    });
  }

  async hasIndices(requestContext, indexNames) {
    return await this.framework.callWithRequest(requestContext, 'search', {
      ignore_unavailable: true,
      allow_no_indices: true,
      index: indexNames,
      size: 0,
      terminate_after: 1
    }).then(response => response._shards.total > 0, err => {
      if (err.status === 404) {
        return false;
      }

      throw err;
    });
  }

}

exports.InfraElasticsearchSourceStatusAdapter = InfraElasticsearchSourceStatusAdapter;

const withDefaultIfNotFound = defaultValue => error => {
  if (error && error.status === 404) {
    return defaultValue;
  }

  throw error;
};