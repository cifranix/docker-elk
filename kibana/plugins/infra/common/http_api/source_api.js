"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceConfigurationSavedObjectRuntimeType = exports.SourceResponseRuntimeType = exports.SourceRuntimeType = exports.SourceConfigurationRuntimeType = exports.StaticSourceConfigurationRuntimeType = exports.pickSavedSourceConfiguration = exports.SavedSourceConfigurationRuntimeType = exports.SavedSourceConfigurationColumnRuntimeType = exports.SavedSourceConfigurationFieldColumnRuntimeType = exports.SavedSourceConfigurationMessageColumnRuntimeType = exports.SavedSourceConfigurationTimestampColumnRuntimeType = exports.TimestampFromString = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _moment = _interopRequireDefault(require("moment"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
const TimestampFromString = new rt.Type('TimestampFromString', input => typeof input === 'number', (input, context) => (0, _pipeable.pipe)(rt.string.validate(input, context), (0, _Either.chain)(stringInput => {
  const momentValue = (0, _moment.default)(stringInput);
  return momentValue.isValid() ? rt.success(momentValue.valueOf()) : rt.failure(stringInput, context);
})), output => new Date(output).toISOString());
/**
 * Stored source configuration as read from and written to saved objects
 */

exports.TimestampFromString = TimestampFromString;
const SavedSourceConfigurationFieldsRuntimeType = rt.partial({
  container: rt.string,
  host: rt.string,
  pod: rt.string,
  tiebreaker: rt.string,
  timestamp: rt.string
});
const SavedSourceConfigurationTimestampColumnRuntimeType = rt.type({
  timestampColumn: rt.type({
    id: rt.string
  })
});
exports.SavedSourceConfigurationTimestampColumnRuntimeType = SavedSourceConfigurationTimestampColumnRuntimeType;
const SavedSourceConfigurationMessageColumnRuntimeType = rt.type({
  messageColumn: rt.type({
    id: rt.string
  })
});
exports.SavedSourceConfigurationMessageColumnRuntimeType = SavedSourceConfigurationMessageColumnRuntimeType;
const SavedSourceConfigurationFieldColumnRuntimeType = rt.type({
  fieldColumn: rt.type({
    id: rt.string,
    field: rt.string
  })
});
exports.SavedSourceConfigurationFieldColumnRuntimeType = SavedSourceConfigurationFieldColumnRuntimeType;
const SavedSourceConfigurationColumnRuntimeType = rt.union([SavedSourceConfigurationTimestampColumnRuntimeType, SavedSourceConfigurationMessageColumnRuntimeType, SavedSourceConfigurationFieldColumnRuntimeType]);
exports.SavedSourceConfigurationColumnRuntimeType = SavedSourceConfigurationColumnRuntimeType;
const SavedSourceConfigurationRuntimeType = rt.partial({
  name: rt.string,
  description: rt.string,
  metricAlias: rt.string,
  logAlias: rt.string,
  fields: SavedSourceConfigurationFieldsRuntimeType,
  logColumns: rt.array(SavedSourceConfigurationColumnRuntimeType)
});
exports.SavedSourceConfigurationRuntimeType = SavedSourceConfigurationRuntimeType;

const pickSavedSourceConfiguration = value => {
  const {
    name,
    description,
    metricAlias,
    logAlias,
    fields,
    logColumns
  } = value;
  const {
    container,
    host,
    pod,
    tiebreaker,
    timestamp
  } = fields;
  return {
    name,
    description,
    metricAlias,
    logAlias,
    fields: {
      container,
      host,
      pod,
      tiebreaker,
      timestamp
    },
    logColumns
  };
};
/**
 * Static source configuration as read from the configuration file
 */


exports.pickSavedSourceConfiguration = pickSavedSourceConfiguration;
const StaticSourceConfigurationFieldsRuntimeType = rt.partial({ ...SavedSourceConfigurationFieldsRuntimeType.props,
  message: rt.array(rt.string)
});
const StaticSourceConfigurationRuntimeType = rt.partial({
  name: rt.string,
  description: rt.string,
  metricAlias: rt.string,
  logAlias: rt.string,
  fields: StaticSourceConfigurationFieldsRuntimeType,
  logColumns: rt.array(SavedSourceConfigurationColumnRuntimeType)
});
exports.StaticSourceConfigurationRuntimeType = StaticSourceConfigurationRuntimeType;

/**
 * Full source configuration type after all cleanup has been done at the edges
 */
const SourceConfigurationFieldsRuntimeType = rt.type({ ...StaticSourceConfigurationFieldsRuntimeType.props
});
const SourceConfigurationRuntimeType = rt.type({ ...SavedSourceConfigurationRuntimeType.props,
  fields: SourceConfigurationFieldsRuntimeType,
  logColumns: rt.array(SavedSourceConfigurationColumnRuntimeType)
});
exports.SourceConfigurationRuntimeType = SourceConfigurationRuntimeType;
const SourceRuntimeType = rt.intersection([rt.type({
  id: rt.string,
  origin: rt.keyof({
    fallback: null,
    internal: null,
    stored: null
  }),
  configuration: SourceConfigurationRuntimeType
}), rt.partial({
  version: rt.string,
  updatedAt: rt.number
})]);
exports.SourceRuntimeType = SourceRuntimeType;
const SourceStatusFieldRuntimeType = rt.type({
  name: rt.string,
  type: rt.string,
  searchable: rt.boolean,
  aggregatable: rt.boolean,
  displayable: rt.boolean
});
const SourceStatusRuntimeType = rt.type({
  logIndicesExist: rt.boolean,
  metricIndicesExist: rt.boolean,
  indexFields: rt.array(SourceStatusFieldRuntimeType)
});
const SourceResponseRuntimeType = rt.type({
  source: SourceRuntimeType,
  status: SourceStatusRuntimeType
});
exports.SourceResponseRuntimeType = SourceResponseRuntimeType;

/**
 * Saved object type with metadata
 */
const SourceConfigurationSavedObjectRuntimeType = rt.intersection([rt.type({
  id: rt.string,
  attributes: SavedSourceConfigurationRuntimeType
}), rt.partial({
  version: rt.string,
  updated_at: TimestampFromString
})]);
exports.SourceConfigurationSavedObjectRuntimeType = SourceConfigurationSavedObjectRuntimeType;