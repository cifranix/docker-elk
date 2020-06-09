"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpacesUsageCollector = getSpacesUsageCollector;
exports.registerSpacesUsageCollector = registerSpacesUsageCollector;

var _operators = require("rxjs/operators");

var _constants = require("../../../../legacy/plugins/monitoring/common/constants");

var _constants2 = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 *
 * @param {CallCluster} callCluster
 * @param {string} kibanaIndex
 * @param {PluginsSetup['features']} features
 * @param {boolean} spacesAvailable
 * @return {UsageStats}
 */
async function getSpacesUsage(callCluster, kibanaIndex, features, spacesAvailable) {
  var _ref, _hits$total, _ref2, _aggregations$disable;

  if (!spacesAvailable) {
    return {};
  }

  const knownFeatureIds = features.getFeatures().map(feature => feature.id);
  let resp;

  try {
    resp = await callCluster('search', {
      index: kibanaIndex,
      body: {
        track_total_hits: true,
        query: {
          term: {
            type: {
              value: 'space'
            }
          }
        },
        aggs: {
          disabledFeatures: {
            terms: {
              field: 'space.disabledFeatures',
              include: knownFeatureIds,
              size: knownFeatureIds.length
            }
          }
        },
        size: 0
      }
    });
  } catch (err) {
    if (err.status === 404) {
      return {};
    }

    throw err;
  }

  const {
    hits,
    aggregations
  } = resp;
  const count = (_ref = hits === null || hits === void 0 ? void 0 : (_hits$total = hits.total) === null || _hits$total === void 0 ? void 0 : _hits$total.value) !== null && _ref !== void 0 ? _ref : 0;
  const disabledFeatureBuckets = (_ref2 = aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$disable = aggregations.disabledFeatures) === null || _aggregations$disable === void 0 ? void 0 : _aggregations$disable.buckets) !== null && _ref2 !== void 0 ? _ref2 : [];
  const initialCounts = knownFeatureIds.reduce((acc, featureId) => ({ ...acc,
    [featureId]: 0
  }), {});
  const disabledFeatures = disabledFeatureBuckets.reduce((acc, {
    key,
    doc_count
  }) => {
    return { ...acc,
      [key]: doc_count
    };
  }, initialCounts);
  const usesFeatureControls = Object.values(disabledFeatures).some(disabledSpaceCount => disabledSpaceCount > 0);
  return {
    count,
    usesFeatureControls,
    disabledFeatures
  };
}

/*
 * @param {Object} server
 * @return {Object} kibana usage stats type collection object
 */
function getSpacesUsageCollector(usageCollection, deps) {
  return usageCollection.makeUsageCollector({
    type: _constants2.KIBANA_SPACES_STATS_TYPE,
    isReady: () => true,
    fetch: async callCluster => {
      const license = await deps.licensing.license$.pipe((0, _operators.take)(1)).toPromise();
      const available = license.isAvailable; // some form of spaces is available for all valid licenses

      const kibanaIndex = (await deps.kibanaIndexConfig$.pipe((0, _operators.take)(1)).toPromise()).kibana.index;
      const usageStats = await getSpacesUsage(callCluster, kibanaIndex, deps.features, available);
      return {
        available,
        enabled: available,
        ...usageStats
      };
    },

    /*
     * Format the response data into a model for internal upload
     * 1. Make this data part of the "kibana_stats" type
     * 2. Organize the payload in the usage.xpack.spaces namespace of the data payload
     */
    formatForBulkUpload: result => {
      return {
        type: _constants.KIBANA_STATS_TYPE_MONITORING,
        payload: {
          usage: {
            spaces: result
          }
        }
      };
    }
  });
}

function registerSpacesUsageCollector(usageCollection, deps) {
  const collector = getSpacesUsageCollector(usageCollection, deps);
  usageCollection.registerCollector(collector);
}