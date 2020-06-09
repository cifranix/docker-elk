"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visualizationsTaskRunner = visualizationsTaskRunner;

var _lodash = _interopRequireWildcard(require("lodash"));

var _get_next_midnight = require("../../get_next_midnight");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Parse the response data into telemetry payload
 */
async function getStats(callCluster, index) {
  const searchParams = {
    size: 10000,
    // elasticsearch index.max_result_window default value
    index,
    ignoreUnavailable: true,
    filterPath: ['hits.hits._id', 'hits.hits._source.visualization'],
    body: {
      query: {
        bool: {
          filter: {
            term: {
              type: 'visualization'
            }
          }
        }
      }
    }
  };
  const esResponse = await callCluster('search', searchParams);

  const size = _lodash.default.get(esResponse, 'hits.hits.length');

  if (size < 1) {
    return;
  } // `map` to get the raw types


  const visSummaries = esResponse.hits.hits.map(hit => {
    const spacePhrases = hit._id.split(':');

    const space = spacePhrases.length === 3 ? spacePhrases[0] : 'default'; // if in a custom space, the format of a saved object ID is space:type:id

    const visualization = _lodash.default.get(hit, '_source.visualization', {
      visState: '{}'
    });

    const visState = JSON.parse(visualization.visState);
    return {
      type: visState.type || '_na_',
      space
    };
  }); // organize stats per type

  const visTypes = (0, _lodash.groupBy)(visSummaries, 'type'); // get the final result

  return (0, _lodash.mapValues)(visTypes, curr => {
    const total = curr.length;
    const spacesBreakdown = (0, _lodash.countBy)(curr, 'space');

    const spaceCounts = _lodash.default.values(spacesBreakdown);

    return {
      total,
      spaces_min: _lodash.default.min(spaceCounts),
      spaces_max: _lodash.default.max(spaceCounts),
      spaces_avg: total / spaceCounts.length
    };
  });
}

function visualizationsTaskRunner(taskInstance, config, es) {
  const {
    callAsInternalUser: callCluster
  } = es.createClient('data');
  return async () => {
    let stats;
    let error;

    try {
      const index = (await config.toPromise()).kibana.index;
      stats = await getStats(callCluster, index);
    } catch (err) {
      if (err.constructor === Error) {
        error = err.message;
      } else {
        error = err;
      }
    }

    return {
      runAt: (0, _get_next_midnight.getNextMidnight)(),
      state: {
        runs: taskInstance.state.runs + 1,
        stats
      },
      error
    };
  };
}