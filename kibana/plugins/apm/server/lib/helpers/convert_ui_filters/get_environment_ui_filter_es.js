"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvironmentUiFilterES = getEnvironmentUiFilterES;

var _environment_filter_values = require("../../../../common/environment_filter_values");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getEnvironmentUiFilterES(environment) {
  if (!environment) {
    return undefined;
  }

  if (environment === _environment_filter_values.ENVIRONMENT_NOT_DEFINED) {
    return {
      bool: {
        must_not: {
          exists: {
            field: _elasticsearch_fieldnames.SERVICE_ENVIRONMENT
          }
        }
      }
    };
  }

  return {
    term: {
      [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: environment
    }
  };
}