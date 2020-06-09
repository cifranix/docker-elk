"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourceStatusResolvers = void 0;

var _types = require("../../graphql/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSourceStatusResolvers = libs => ({
  InfraSourceStatus: {
    async metricAliasExists(source, args, {
      req
    }) {
      return await libs.sourceStatus.hasMetricAlias(req, source.id);
    },

    async metricIndicesExist(source, args, {
      req
    }) {
      return await libs.sourceStatus.hasMetricIndices(req, source.id);
    },

    async metricIndices(source, args, {
      req
    }) {
      return await libs.sourceStatus.getMetricIndexNames(req, source.id);
    },

    async logAliasExists(source, args, {
      req
    }) {
      return await libs.sourceStatus.hasLogAlias(req, source.id);
    },

    async logIndicesExist(source, args, {
      req
    }) {
      return await libs.sourceStatus.hasLogIndices(req, source.id);
    },

    async logIndices(source, args, {
      req
    }) {
      return await libs.sourceStatus.getLogIndexNames(req, source.id);
    },

    async indexFields(source, args, {
      req
    }) {
      const fields = await libs.fields.getFields(req, source.id, args.indexType || _types.InfraIndexType.ANY);
      return fields;
    }

  }
});

exports.createSourceStatusResolvers = createSourceStatusResolvers;