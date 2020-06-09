"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localUIFilters = exports.localUIFilterNames = void 0;

var _i18n = require("@kbn/i18n");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const filtersByName = {
  host: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.host', {
      defaultMessage: 'Host'
    }),
    fieldName: _elasticsearch_fieldnames.HOST_NAME
  },
  agentName: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.agentName', {
      defaultMessage: 'Agent name'
    }),
    fieldName: _elasticsearch_fieldnames.AGENT_NAME
  },
  containerId: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.containerId', {
      defaultMessage: 'Container ID'
    }),
    fieldName: _elasticsearch_fieldnames.CONTAINER_ID
  },
  podName: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.podName', {
      defaultMessage: 'Kubernetes pod'
    }),
    fieldName: _elasticsearch_fieldnames.POD_NAME
  },
  transactionResult: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.transactionResult', {
      defaultMessage: 'Transaction result'
    }),
    fieldName: _elasticsearch_fieldnames.TRANSACTION_RESULT
  },
  serviceVersion: {
    title: _i18n.i18n.translate('xpack.apm.localFilters.titles.serviceVersion', {
      defaultMessage: 'Service version'
    }),
    fieldName: _elasticsearch_fieldnames.SERVICE_VERSION
  }
};
const localUIFilterNames = Object.keys(filtersByName);
exports.localUIFilterNames = localUIFilterNames;
const localUIFilters = localUIFilterNames.reduce((acc, key) => {
  const field = filtersByName[key];
  return { ...acc,
    [key]: { ...field,
      name: key
    }
  };
}, {});
exports.localUIFilters = localUIFilters;