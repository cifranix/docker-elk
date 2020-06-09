"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParamsSchema = exports.ExecutorAction = exports.CommentSchema = exports.EntityInformationSchema = exports.UserSchema = exports.SecretsSchema = exports.SecretsSchemaProps = exports.ConfigSchema = exports.ConfigSchemaProps = exports.CasesConfigurationSchema = exports.MapEntrySchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MapEntrySchema = _configSchema.schema.object({
  source: _configSchema.schema.string(),
  target: _configSchema.schema.string(),
  actionType: _configSchema.schema.oneOf([_configSchema.schema.literal('nothing'), _configSchema.schema.literal('overwrite'), _configSchema.schema.literal('append')])
});

exports.MapEntrySchema = MapEntrySchema;

const CasesConfigurationSchema = _configSchema.schema.object({
  mapping: _configSchema.schema.arrayOf(MapEntrySchema)
});

exports.CasesConfigurationSchema = CasesConfigurationSchema;
const ConfigSchemaProps = {
  apiUrl: _configSchema.schema.string(),
  casesConfiguration: CasesConfigurationSchema
};
exports.ConfigSchemaProps = ConfigSchemaProps;

const ConfigSchema = _configSchema.schema.object(ConfigSchemaProps);

exports.ConfigSchema = ConfigSchema;
const SecretsSchemaProps = {
  password: _configSchema.schema.string(),
  username: _configSchema.schema.string()
};
exports.SecretsSchemaProps = SecretsSchemaProps;

const SecretsSchema = _configSchema.schema.object(SecretsSchemaProps);

exports.SecretsSchema = SecretsSchema;

const UserSchema = _configSchema.schema.object({
  fullName: _configSchema.schema.nullable(_configSchema.schema.string()),
  username: _configSchema.schema.string()
});

exports.UserSchema = UserSchema;
const EntityInformationSchemaProps = {
  createdAt: _configSchema.schema.string(),
  createdBy: UserSchema,
  updatedAt: _configSchema.schema.nullable(_configSchema.schema.string()),
  updatedBy: _configSchema.schema.nullable(UserSchema)
};

const EntityInformationSchema = _configSchema.schema.object(EntityInformationSchemaProps);

exports.EntityInformationSchema = EntityInformationSchema;

const CommentSchema = _configSchema.schema.object({
  commentId: _configSchema.schema.string(),
  comment: _configSchema.schema.string(),
  version: _configSchema.schema.maybe(_configSchema.schema.string()),
  ...EntityInformationSchemaProps
});

exports.CommentSchema = CommentSchema;

const ExecutorAction = _configSchema.schema.oneOf([_configSchema.schema.literal('newIncident'), _configSchema.schema.literal('updateIncident')]);

exports.ExecutorAction = ExecutorAction;

const ParamsSchema = _configSchema.schema.object({
  caseId: _configSchema.schema.string(),
  title: _configSchema.schema.string(),
  comments: _configSchema.schema.maybe(_configSchema.schema.arrayOf(CommentSchema)),
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  incidentId: _configSchema.schema.nullable(_configSchema.schema.string()),
  ...EntityInformationSchemaProps
});

exports.ParamsSchema = ParamsSchema;