"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourcesResolvers = void 0;

var _apolloServerErrors = require("apollo-server-errors");

var _PathReporter = require("io-ts/lib/PathReporter");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _sources = require("../../lib/sources");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSourcesResolvers = libs => ({
  Query: {
    async source(root, args, {
      req
    }) {
      const requestedSourceConfiguration = await libs.sources.getSourceConfiguration(req, args.id);
      return requestedSourceConfiguration;
    },

    async allSources(root, args, {
      req
    }) {
      const sourceConfigurations = await libs.sources.getAllSourceConfigurations(req);
      return sourceConfigurations;
    }

  },
  InfraSource: {
    async status(source) {
      return source;
    }

  },
  InfraSourceLogColumn: {
    __resolveType(logColumn) {
      if (_sources.SavedSourceConfigurationTimestampColumnRuntimeType.is(logColumn)) {
        return 'InfraSourceTimestampLogColumn';
      }

      if (_sources.SavedSourceConfigurationMessageColumnRuntimeType.is(logColumn)) {
        return 'InfraSourceMessageLogColumn';
      }

      if (_sources.SavedSourceConfigurationFieldColumnRuntimeType.is(logColumn)) {
        return 'InfraSourceFieldLogColumn';
      }

      return null;
    }

  },
  Mutation: {
    async createSource(root, args, {
      req
    }) {
      const sourceConfiguration = await libs.sources.createSourceConfiguration(req, args.id, compactObject({ ...args.sourceProperties,
        fields: args.sourceProperties.fields ? compactObject(args.sourceProperties.fields) : undefined,
        logColumns: decodeLogColumns(args.sourceProperties.logColumns)
      }));
      return {
        source: sourceConfiguration
      };
    },

    async deleteSource(root, args, {
      req
    }) {
      await libs.sources.deleteSourceConfiguration(req, args.id);
      return {
        id: args.id
      };
    },

    async updateSource(root, args, {
      req
    }) {
      const updatedSourceConfiguration = await libs.sources.updateSourceConfiguration(req, args.id, compactObject({ ...args.sourceProperties,
        fields: args.sourceProperties.fields ? compactObject(args.sourceProperties.fields) : undefined,
        logColumns: decodeLogColumns(args.sourceProperties.logColumns)
      }));
      return {
        source: updatedSourceConfiguration
      };
    }

  }
});

exports.createSourcesResolvers = createSourcesResolvers;

const compactObject = obj => Object.entries(obj).reduce((accumulatedObj, [key, value]) => typeof value === 'undefined' || value === null ? accumulatedObj : { ...accumulatedObj,
  [key]: value
}, {});

const decodeLogColumns = logColumns => logColumns ? logColumns.map(logColumn => (0, _pipeable.pipe)(_sources.SavedSourceConfigurationColumnRuntimeType.decode(logColumn), (0, _Either.fold)(errors => {
  throw new _apolloServerErrors.UserInputError((0, _PathReporter.failure)(errors).join('\n'));
}, _function.identity))) : undefined;