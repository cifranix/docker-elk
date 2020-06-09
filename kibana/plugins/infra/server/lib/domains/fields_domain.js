"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraFieldsDomain = void 0;

var _types = require("../../graphql/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class InfraFieldsDomain {
  constructor(adapter, libs) {
    this.adapter = adapter;
    this.libs = libs;
  }

  async getFields(requestContext, sourceId, indexType) {
    const {
      configuration
    } = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const includeMetricIndices = [_types.InfraIndexType.ANY, _types.InfraIndexType.METRICS].includes(indexType);
    const includeLogIndices = [_types.InfraIndexType.ANY, _types.InfraIndexType.LOGS].includes(indexType);
    const fields = await this.adapter.getIndexFields(requestContext, `${includeMetricIndices ? configuration.metricAlias : ''},${includeLogIndices ? configuration.logAlias : ''}`);
    return fields;
  }

}

exports.InfraFieldsDomain = InfraFieldsDomain;