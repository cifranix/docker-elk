"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraSourceStatus = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class InfraSourceStatus {
  constructor(adapter, libs) {
    this.adapter = adapter;
    this.libs = libs;
  }

  async getLogIndexNames(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const indexNames = await this.adapter.getIndexNames(requestContext, sourceConfiguration.configuration.logAlias);
    return indexNames;
  }

  async getMetricIndexNames(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const indexNames = await this.adapter.getIndexNames(requestContext, sourceConfiguration.configuration.metricAlias);
    return indexNames;
  }

  async hasLogAlias(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const hasAlias = await this.adapter.hasAlias(requestContext, sourceConfiguration.configuration.logAlias);
    return hasAlias;
  }

  async hasMetricAlias(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const hasAlias = await this.adapter.hasAlias(requestContext, sourceConfiguration.configuration.metricAlias);
    return hasAlias;
  }

  async hasLogIndices(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const hasIndices = await this.adapter.hasIndices(requestContext, sourceConfiguration.configuration.logAlias);
    return hasIndices;
  }

  async hasMetricIndices(requestContext, sourceId) {
    const sourceConfiguration = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const hasIndices = await this.adapter.hasIndices(requestContext, sourceConfiguration.configuration.metricAlias);
    return hasIndices;
  }

}

exports.InfraSourceStatus = InfraSourceStatus;