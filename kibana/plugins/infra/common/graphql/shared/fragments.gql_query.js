"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedFragments = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const sharedFragments = {
  InfraTimeKey: (0, _graphqlTag.default)`
    fragment InfraTimeKeyFields on InfraTimeKey {
      time
      tiebreaker
    }
  `,
  InfraSourceFields: (0, _graphqlTag.default)`
    fragment InfraSourceFields on InfraSource {
      id
      version
      updatedAt
      origin
    }
  `,
  InfraLogEntryFields: (0, _graphqlTag.default)`
    fragment InfraLogEntryFields on InfraLogEntry {
      gid
      key {
        time
        tiebreaker
      }
      columns {
        ... on InfraLogEntryTimestampColumn {
          columnId
          timestamp
        }
        ... on InfraLogEntryMessageColumn {
          columnId
          message {
            ... on InfraLogMessageFieldSegment {
              field
              value
            }
            ... on InfraLogMessageConstantSegment {
              constant
            }
          }
        }
        ... on InfraLogEntryFieldColumn {
          columnId
          field
          value
        }
      }
    }
  `,
  InfraLogEntryHighlightFields: (0, _graphqlTag.default)`
    fragment InfraLogEntryHighlightFields on InfraLogEntry {
      gid
      key {
        time
        tiebreaker
      }
      columns {
        ... on InfraLogEntryMessageColumn {
          columnId
          message {
            ... on InfraLogMessageFieldSegment {
              field
              highlights
            }
          }
        }
        ... on InfraLogEntryFieldColumn {
          columnId
          field
          highlights
        }
      }
    }
  `
};
exports.sharedFragments = sharedFragments;