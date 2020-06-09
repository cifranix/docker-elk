"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemas = void 0;

var _schema = require("../../common/graphql/root/schema.gql");

var _schema2 = require("../../common/graphql/shared/schema.gql");

var _schema3 = require("./source_status/schema.gql");

var _schema4 = require("./sources/schema.gql");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const schemas = [_schema.rootSchema, _schema2.sharedSchema, _schema4.sourcesSchema, _schema3.sourceStatusSchema];
exports.schemas = schemas;