"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegacyDataStatus = getLegacyDataStatus;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// returns true if 6.x data is found
async function getLegacyDataStatus(setup) {
  const {
    client,
    indices
  } = setup;
  const params = {
    terminateAfter: 1,
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['transaction']
            }
          }, {
            range: {
              [_elasticsearch_fieldnames.OBSERVER_VERSION_MAJOR]: {
                lt: 7
              }
            }
          }]
        }
      }
    }
  };
  const resp = await client.search(params, {
    includeLegacyData: true
  });
  const hasLegacyData = resp.hits.total.value > 0;
  return hasLegacyData;
}