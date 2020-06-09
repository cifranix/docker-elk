"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isApmIndex = isApmIndex;
exports.getESClient = getESClient;

var _lodash = require("lodash");

var _chalk = _interopRequireDefault(require("chalk"));

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _pickKeys = require("../../../../../legacy/plugins/apm/public/utils/pickKeys");

var _get_apm_indices = require("../settings/apm_indices/get_apm_indices");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable no-console */
function isApmIndex(apmIndices, indexParam) {
  if ((0, _lodash.isString)(indexParam)) {
    return apmIndices.includes(indexParam);
  } else if (Array.isArray(indexParam)) {
    // return false if at least one of the indices is not an APM index
    return indexParam.every(index => apmIndices.includes(index));
  }

  return false;
}

function addFilterForLegacyData(apmIndices, params, {
  includeLegacyData = false
} = {}) {
  // search across all data (including data)
  if (includeLegacyData || !isApmIndex(apmIndices, params.index)) {
    return params;
  }

  const nextParams = (0, _lodash.merge)({
    body: {
      query: {
        bool: {
          filter: []
        }
      }
    }
  }, (0, _lodash.cloneDeep)(params)); // add filter for omitting pre-7.x data

  nextParams.body.query.bool.filter.push({
    range: {
      [_elasticsearch_fieldnames.OBSERVER_VERSION_MAJOR]: {
        gte: 7
      }
    }
  });
  return nextParams;
} // add additional params for search (aka: read) requests


async function getParamsForSearchRequest(context, params, apmOptions) {
  const {
    uiSettings
  } = context.core;
  const [indices, includeFrozen] = await Promise.all([(0, _get_apm_indices.getApmIndices)({
    savedObjectsClient: context.core.savedObjects.client,
    config: context.config
  }), uiSettings.client.get('search:includeFrozen')]); // Get indices for legacy data filter (only those which apply)

  const apmIndices = Object.values((0, _pickKeys.pickKeys)(indices, 'apm_oss.sourcemapIndices', 'apm_oss.errorIndices', 'apm_oss.onboardingIndices', 'apm_oss.spanIndices', 'apm_oss.transactionIndices', 'apm_oss.metricsIndices'));
  return { ...addFilterForLegacyData(apmIndices, params, apmOptions),
    // filter out pre-7.0 data
    ignore_throttled: !includeFrozen // whether to query frozen indices or not

  };
}

function formatObj(obj) {
  return JSON.stringify(obj, null, 2);
}

function getESClient(context, request, {
  clientAsInternalUser = false
} = {}) {
  const {
    callAsCurrentUser,
    callAsInternalUser
  } = context.core.elasticsearch.dataClient;

  async function callEs(operationName, params) {
    const startTime = process.hrtime();
    let res;
    let esError = null;

    try {
      res = clientAsInternalUser ? await callAsInternalUser(operationName, params) : await callAsCurrentUser(operationName, params);
    } catch (e) {
      // catch error and throw after outputting debug info
      esError = e;
    }

    if (context.params.query._debug) {
      const highlightColor = esError ? 'bgRed' : 'inverse';
      const diff = process.hrtime(startTime);
      const duration = `${Math.round(diff[0] * 1000 + diff[1] / 1e6)}ms`;
      const routeInfo = `${request.route.method.toUpperCase()} ${request.route.path}`;
      console.log(_chalk.default.bold[highlightColor](`=== Debug: ${routeInfo} (${duration}) ===`));

      if (operationName === 'search') {
        console.log(`GET ${params.index}/_${operationName}`);
        console.log(formatObj(params.body));
      } else {
        console.log(_chalk.default.bold('ES operation:'), operationName);
        console.log(_chalk.default.bold('ES query:'));
        console.log(formatObj(params));
      }

      console.log(`\n`);
    }

    if (esError) {
      throw esError;
    }

    return res;
  }

  return {
    search: async (params, apmOptions) => {
      const nextParams = await getParamsForSearchRequest(context, params, apmOptions);
      return callEs('search', nextParams);
    },
    index: params => {
      return callEs('index', params);
    },
    delete: params => {
      return callEs('delete', params);
    },
    indicesCreate: params => {
      return callEs('indices.create', params);
    },
    hasPrivileges: params => {
      return callEs('transport.request', {
        method: 'POST',
        path: '/_security/user/_has_privileges',
        body: params
      });
    }
  };
}