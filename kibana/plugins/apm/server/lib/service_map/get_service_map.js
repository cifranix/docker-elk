"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceMap = getServiceMap;

var _lodash = require("lodash");

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _services = require("../../../common/projections/services");

var _merge_projection = require("../../../common/projections/util/merge_projection");

var _dedupe_connections = require("./dedupe_connections");

var _get_service_map_from_trace_ids = require("./get_service_map_from_trace_ids");

var _get_trace_sample_ids = require("./get_trace_sample_ids");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getConnectionData({
  setup,
  serviceName,
  environment
}) {
  const {
    traceIds
  } = await (0, _get_trace_sample_ids.getTraceSampleIds)({
    setup,
    serviceName,
    environment
  });
  const chunks = (0, _lodash.chunk)(traceIds, setup.config['xpack.apm.serviceMapMaxTracesPerRequest']);
  const init = {
    connections: [],
    discoveredServices: []
  };

  if (!traceIds.length) {
    return init;
  }

  const chunkedResponses = await Promise.all(chunks.map(traceIdsChunk => (0, _get_service_map_from_trace_ids.getServiceMapFromTraceIds)({
    setup,
    serviceName,
    environment,
    traceIds: traceIdsChunk
  })));
  return chunkedResponses.reduce((prev, current) => {
    return {
      connections: prev.connections.concat(current.connections),
      discoveredServices: prev.discoveredServices.concat(current.discoveredServices)
    };
  });
}

async function getServicesData(options) {
  var _response$aggregation;

  const {
    setup
  } = options;
  const projection = (0, _services.getServicesProjection)({
    setup: { ...setup,
      uiFiltersES: []
    }
  });
  const {
    filter
  } = projection.body.query.bool;
  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      size: 0,
      query: {
        bool: { ...projection.body.query.bool,
          filter: options.serviceName ? filter.concat({
            term: {
              [_elasticsearch_fieldnames.SERVICE_NAME]: options.serviceName
            }
          }) : filter
        }
      },
      aggs: {
        services: {
          terms: {
            field: projection.body.aggs.services.terms.field,
            size: 500
          },
          aggs: {
            agent_name: {
              terms: {
                field: _elasticsearch_fieldnames.AGENT_NAME
              }
            },
            service_framework_name: {
              terms: {
                field: _elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME
              }
            }
          }
        }
      }
    }
  });
  const {
    client
  } = setup;
  const response = await client.search(params);
  return ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.services.buckets.map(bucket => {
    var _bucket$agent_name$bu, _bucket$service_frame;

    return {
      [_elasticsearch_fieldnames.SERVICE_NAME]: bucket.key,
      [_elasticsearch_fieldnames.AGENT_NAME]: ((_bucket$agent_name$bu = bucket.agent_name.buckets[0]) === null || _bucket$agent_name$bu === void 0 ? void 0 : _bucket$agent_name$bu.key) || '',
      [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: options.environment || null,
      [_elasticsearch_fieldnames.SERVICE_FRAMEWORK_NAME]: ((_bucket$service_frame = bucket.service_framework_name.buckets[0]) === null || _bucket$service_frame === void 0 ? void 0 : _bucket$service_frame.key) || null
    };
  })) || [];
}

async function getServiceMap(options) {
  const [connectionData, servicesData] = await Promise.all([getConnectionData(options), getServicesData(options)]);
  return (0, _dedupe_connections.dedupeConnections)({ ...connectionData,
    services: servicesData
  });
}