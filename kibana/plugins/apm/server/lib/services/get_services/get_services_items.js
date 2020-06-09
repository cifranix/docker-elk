"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesItems = getServicesItems;

var _merge_projection = require("../../../../common/projections/util/merge_projection");

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _services = require("../../../../common/projections/services");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServicesItems(setup) {
  const {
    start,
    end,
    client
  } = setup;
  const projection = (0, _services.getServicesProjection)({
    setup
  });
  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      size: 0,
      aggs: {
        services: {
          terms: { ...projection.body.aggs.services.terms,
            size: 500
          },
          aggs: {
            avg: {
              avg: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION
              }
            },
            agents: {
              terms: {
                field: _elasticsearch_fieldnames.AGENT_NAME,
                size: 1
              }
            },
            events: {
              terms: {
                field: _elasticsearch_fieldnames.PROCESSOR_EVENT
              }
            },
            environments: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_ENVIRONMENT
              }
            }
          }
        }
      }
    }
  });
  const resp = await client.search(params);
  const aggs = resp.aggregations;
  const serviceBuckets = (aggs === null || aggs === void 0 ? void 0 : aggs.services.buckets) || [];
  const items = serviceBuckets.map(bucket => {
    var _bucket$agents$bucket;

    const eventTypes = bucket.events.buckets;
    const transactions = eventTypes.find(e => e.key === 'transaction');
    const totalTransactions = (transactions === null || transactions === void 0 ? void 0 : transactions.doc_count) || 0;
    const errors = eventTypes.find(e => e.key === 'error');
    const totalErrors = (errors === null || errors === void 0 ? void 0 : errors.doc_count) || 0;
    const deltaAsMinutes = (end - start) / 1000 / 60;
    const transactionsPerMinute = totalTransactions / deltaAsMinutes;
    const errorsPerMinute = totalErrors / deltaAsMinutes;
    const environmentsBuckets = bucket.environments.buckets;
    const environments = environmentsBuckets.map(environmentBucket => environmentBucket.key);
    return {
      serviceName: bucket.key,
      agentName: (_bucket$agents$bucket = bucket.agents.buckets[0]) === null || _bucket$agents$bucket === void 0 ? void 0 : _bucket$agents$bucket.key,
      transactionsPerMinute,
      errorsPerMinute,
      avgResponseTime: bucket.avg.value,
      environments
    };
  });
  return items;
}